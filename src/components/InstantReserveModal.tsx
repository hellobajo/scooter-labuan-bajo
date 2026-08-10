import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Language } from '../data/translations';
import { X, MessageCircle, Calendar, Clock, MapPin, Zap, AlertCircle, Info, Plus, Minus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { SCOOTER_IMAGES } from '../data/images';

interface InstantReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialBikeId?: string;
}

export const SCOOTER_UNITS = [
  {
    id: 'nmax',
    name: 'Yamaha NMAX',
    tagline: 'Maxi Scooter — Most Popular',
    rate: 175000,
    formattedRate: 'Rp 175.000',
    image: SCOOTER_IMAGES.nmax,
    badge: 'MOST POPULAR',
    badgeColor: 'bg-teal-600 text-white',
  },
  {
    id: 'scoopy',
    name: 'Honda Scoopy',
    tagline: 'Classic Style Scooter',
    rate: 120000,
    formattedRate: 'Rp 120.000',
    image: SCOOTER_IMAGES.scoopy,
    badge: 'STYLISH & EASY',
    badgeColor: 'bg-amber-500 text-white',
  },
  {
    id: 'beat',
    name: 'Honda Beat',
    tagline: 'Standard / Compact Scooter',
    rate: 100000,
    formattedRate: 'Rp 100.000',
    image: SCOOTER_IMAGES.beat,
    badge: 'BEST VALUE',
    badgeColor: 'bg-slate-700 text-white',
  },
];

// Helper to get current WITA (UTC+8) Date
const getWitaNow = () => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const witaMs = utcMs + 8 * 60 * 60 * 1000;
  return new Date(witaMs);
};

const ALL_TIME_SLOTS = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

export const InstantReserveModal: React.FC<InstantReserveModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialBikeId = '',
}) => {
  // Form States - Start empty/unselected by default
  const [selectedBikeId, setSelectedBikeId] = useState<string>(initialBikeId || '');
  const [qty, setQty] = useState<number>(1);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  // WITA current time calculations
  const witaNow = getWitaNow();
  const currentHour = witaNow.getHours();

  // Helper to format Date object to YYYY-MM-DD
  const formatDateISO = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const witaTodayISO = formatDateISO(witaNow);
  const witaTomorrow = new Date(witaNow.getTime() + 24 * 60 * 60 * 1000);
  const witaTomorrowISO = formatDateISO(witaTomorrow);
  const defaultDate = currentHour >= 19 ? witaTomorrowISO : witaTodayISO;

  // Scheduled date & time state - Date pre-filled with defaultDate, time slot unselected
  const [scheduledDate, setScheduledDate] = useState<string>(defaultDate);
  const [scheduledTime, setScheduledTime] = useState<string>('');

  // Available time slots based on selected date
  const availableTimeSlots = useMemo(() => {
    if (!scheduledDate) return ALL_TIME_SLOTS;
    if (scheduledDate === witaTodayISO) {
      const minHour = currentHour + 1;
      return ALL_TIME_SLOTS.filter((slot) => {
        const slotHour = parseInt(slot.split(':')[0], 10);
        return slotHour >= minHour;
      });
    }
    return ALL_TIME_SLOTS;
  }, [scheduledDate, witaTodayISO, currentHour]);

  // Location state - Start unselected
  const [locationType, setLocationType] = useState<'' | 'AIRPORT' | 'HOTEL'>('');
  const [hotelName, setHotelName] = useState('');

  // Duration - Start unselected (0)
  const [durationDays, setDurationDays] = useState<number>(0);

  // Reset form states whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedBikeId(initialBikeId || '');
      setQty(1);
      setScheduledDate(defaultDate);
      setScheduledTime('');
      setLocationType('');
      setHotelName('');
      setDurationDays(0);
      setShowErrors(false);
    }
  }, [initialBikeId, isOpen, defaultDate]);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Browser History State Management for Mobile / Hardware Back Button
  const pushedHistoryRef = useRef<boolean>(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Push dummy history entry so pressing back closes the modal instead of exiting the page
    window.history.pushState({ modalOpen: true }, '');
    pushedHistoryRef.current = true;

    const handlePopState = () => {
      if (pushedHistoryRef.current) {
        pushedHistoryRef.current = false;
        onCloseRef.current();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      // If modal was closed via UI (X button, backdrop click, or submit) instead of back button
      if (pushedHistoryRef.current) {
        pushedHistoryRef.current = false;
        window.history.back();
      }
    };
  }, [isOpen]);

  // Selected Unit & Pricing Calculations
  const selectedUnit = SCOOTER_UNITS.find((u) => u.id === selectedBikeId) || null;
  const unitRate = selectedUnit ? selectedUnit.rate : 0;
  const subtotalUnits = unitRate * qty * durationDays;

  // Delivery fee calculation (+20k per unit)
  const deliveryFeePerUnit = 20000;
  const deliveryFee = deliveryFeePerUnit * qty;
  const grandTotal = selectedUnit ? subtotalUnits + deliveryFee : 0;

  // Validation Checks
  const isScooterSelected = Boolean(selectedBikeId);
  const isScheduleValid = Boolean(scheduledDate && scheduledTime);
  const isLocationValid = locationType === 'AIRPORT' || (locationType === 'HOTEL' && hotelName.trim().length > 0);
  const isDurationValid = durationDays > 0;
  const isFormValid = isScooterSelected && isScheduleValid && isLocationValid && isDurationValid;

  // Dynamic missing fields feedback text
  const getMissingFieldsText = () => {
    const missing: string[] = [];
    if (!isScooterSelected) missing.push(lang === 'EN' ? 'Scooter Model' : lang === 'ZH' ? '车辆型号' : 'Unit Motor');
    if (!scheduledDate) missing.push(lang === 'EN' ? 'Delivery Date' : lang === 'ZH' ? '送车日期' : 'Tanggal Pengantaran');
    if (!scheduledTime) missing.push(lang === 'EN' ? 'Time Slot' : lang === 'ZH' ? '送车时间' : 'Jam Pengantaran');
    if (!locationType) missing.push(lang === 'EN' ? 'Delivery Location' : lang === 'ZH' ? '送车地点' : 'Lokasi Pengantaran');
    else if (locationType === 'HOTEL' && !hotelName.trim()) missing.push(lang === 'EN' ? 'Hotel/Villa Name' : lang === 'ZH' ? '酒店/民宿名称' : 'Nama Hotel/Villa');
    if (!isDurationValid) missing.push(lang === 'EN' ? 'Rental Duration' : lang === 'ZH' ? '租用天数' : 'Durasi Sewa');

    if (missing.length === 0) return '';

    if (lang === 'EN') {
      return `Please complete: ${missing.join(', ')}`;
    } else if (lang === 'ZH') {
      return `请选择/填写: ${missing.join('、')}`;
    } else {
      return `Harap lengkapi: ${missing.join(', ')}`;
    }
  };

  if (!isOpen) return null;

  // Submit Handler -> Direct to WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowErrors(true);
      return;
    }

    if (!selectedUnit) return;

    const deliveryTimeText = `${scheduledDate} at ${scheduledTime}`;

    // Format location text
    let locationText = '';
    if (locationType === 'AIRPORT') {
      locationText = `Komodo International Airport (LBJ) [+Rp ${deliveryFee.toLocaleString('id-ID')}]`;
    } else {
      locationText = `Hotel / Villa: ${hotelName.trim()} [+Rp ${deliveryFee.toLocaleString('id-ID')}]`;
    }

    // Format WhatsApp Message
    const msg =
      lang === 'EN'
        ? `⚡ *INSTANT SCOOTER RESERVATION*\n\n` +
          `🛵 *Selected Unit:* ${selectedUnit.name} (${selectedUnit.tagline})\n` +
          `🔢 *Quantity:* ${qty} unit(s)\n` +
          `📅 *Delivery Schedule:* ${deliveryTimeText}\n` +
          `📍 *Delivery Location:* ${locationText}\n` +
          `🗓️ *Rental Duration:* ${durationDays} Day(s)\n\n` +
          `💰 *ESTIMATED COST*\n` +
          `• ${qty}x ${selectedUnit.name} @ Rp ${unitRate.toLocaleString('id-ID')}/day x ${durationDays} day(s): Rp ${subtotalUnits.toLocaleString('id-ID')}\n` +
          `• Delivery Service Fee (${qty} unit): Rp ${deliveryFee.toLocaleString('id-ID')}\n` +
          `• *GRAND TOTAL:* *Rp ${grandTotal.toLocaleString('id-ID')}*\n\n` +
          `Hi HelloBajo! Please confirm unit availability for my schedule. Thank you!`
        : lang === 'ZH'
        ? `⚡ *摩托车预订请求*\n\n` +
          `🛵 *选择车型:* ${selectedUnit.name} (${selectedUnit.tagline})\n` +
          `🔢 *预订数量:* ${qty} 辆\n` +
          `📅 *送车时间:* ${deliveryTimeText}\n` +
          `📍 *送车地点:* ${locationText}\n` +
          `🗓️ *租用天数:* ${durationDays} 天\n\n` +
          `💰 *预估费用*\n` +
          `• ${qty} 辆 ${selectedUnit.name} @ Rp ${unitRate.toLocaleString('id-ID')}/天 x ${durationDays} 天: Rp ${subtotalUnits.toLocaleString('id-ID')}\n` +
          `• 送车服务费 (${qty} 辆): Rp ${deliveryFee.toLocaleString('id-ID')}\n` +
          `• *预估总额:* *Rp ${grandTotal.toLocaleString('id-ID')}*\n\n` +
          `你好 HelloBajo！请帮我确认该时间段是否有车。谢谢！`
        : `⚡ *RESERVASI SEWA MOTOR*\n\n` +
          `🛵 *Pilihan Unit:* ${selectedUnit.name} (${selectedUnit.tagline})\n` +
          `🔢 *Jumlah Motor:* ${qty} unit\n` +
          `📅 *Jadwal Antar:* ${deliveryTimeText}\n` +
          `📍 *Lokasi Antar:* ${locationText}\n` +
          `🗓️ *Durasi Sewa:* ${durationDays} Hari\n\n` +
          `💰 *ESTIMASI BIAYA*\n` +
          `• ${qty}x ${selectedUnit.name} @ Rp ${unitRate.toLocaleString('id-ID')}/hari x ${durationDays} hari: Rp ${subtotalUnits.toLocaleString('id-ID')}\n` +
          `• Ongkir Antar (${qty} unit): Rp ${deliveryFee.toLocaleString('id-ID')}\n` +
          `• *GRAND TOTAL:* *Rp ${grandTotal.toLocaleString('id-ID')}*\n\n` +
          `Halo HelloBajo! Mohon konfirmasi ketersediaan unit untuk jadwal ini. Terima kasih!`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300 transition-all cursor-pointer"
    >
      {/* Modal Card Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-300 cursor-default"
      >
        
        {/* Header Bar - Soft Minimalist Orange Theme */}
        <div className="sticky top-0 z-20 bg-amber-500/90 backdrop-blur-md text-white px-5 py-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs border-b border-amber-600/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 text-white rounded-xl backdrop-blur-xs">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-tight">
                {lang === 'EN' ? 'Reserve Your Scooter' : lang === 'ZH' ? '预订摩托车' : 'Reservasi Sewa Motor'}
              </h3>
              <p className="text-xs text-amber-100/90 font-medium">
                {lang === 'EN' ? 'No Deposit • Instant WhatsApp Confirmation' : lang === 'ZH' ? '免押金 • WhatsApp 快速确认' : 'Bebas Deposit • Konfirmasi Cepat via WhatsApp'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-amber-100 hover:text-white bg-black/10 hover:bg-black/20 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow font-sans text-slate-800 space-y-5">
          
          {/* High Season Alert Banner */}
          <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-2xl flex items-center justify-between text-amber-900 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-extrabold text-[10px] rounded-md uppercase tracking-wider">
                High Season
              </span>
              <span className="font-semibold">
                {lang === 'EN'
                  ? 'Advance booking active. Delivery available at Airport & Hotel.'
                  : lang === 'ZH'
                  ? '旺季预订中，支持机场及酒店/民宿送车上门。'
                  : 'Booking dibuka. Layanan antar ke Airport & Hotel/Villa.'}
              </span>
            </div>
          </div>

          <form id="instant-book-form" onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. SELECT UNIT */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isScooterSelected ? 'bg-teal-500' : 'bg-rose-500 animate-pulse'}`}></span>
                  <span>1. {lang === 'EN' ? 'Select Scooter Model' : lang === 'ZH' ? '选择车型' : 'Pilih Unit Motor'} <span className="text-rose-600">*</span></span>
                </label>
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {lang === 'EN' ? 'No Deposit' : lang === 'ZH' ? '免押金' : 'Tanpa Deposit'}
                </span>
              </div>

              <div className={`grid grid-cols-1 gap-2 transition-all ${
                showErrors && !isScooterSelected 
                  ? 'p-2 rounded-2xl border-2 border-rose-500 bg-rose-50/30' 
                  : ''
              }`}>
                {SCOOTER_UNITS.map((unit) => {
                  const isSelected = selectedBikeId === unit.id;
                  return (
                    <div
                      key={unit.id}
                      onClick={() => {
                        setSelectedBikeId(unit.id);
                        if (showErrors) setShowErrors(false);
                      }}
                      className={`relative flex items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/60 shadow-sm ring-2 ring-teal-600/20'
                          : showErrors && !isScooterSelected
                          ? 'border-rose-300 bg-white hover:border-rose-400'
                          : 'border-stone-200 bg-stone-50/40 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Thumbnail Image */}
                        <div className="relative w-20 h-15 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-white shadow-xs">
                          <img
                            src={unit.image}
                            alt={unit.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Title & Specs */}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                              {unit.name}
                            </h4>
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${unit.badgeColor}`}>
                              {lang === 'EN' 
                                ? unit.badge 
                                : lang === 'ZH' 
                                ? (unit.id === 'nmax' ? '最受欢迎' : unit.id === 'scoopy' ? '时尚轻便' : '超值性价比')
                                : (unit.id === 'nmax' ? 'PALING POPULER' : unit.id === 'scoopy' ? 'STYLISH & MUDAH' : 'HEMAT & TERBAIK')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {lang === 'EN' 
                              ? unit.tagline 
                              : lang === 'ZH' 
                              ? (unit.id === 'nmax' ? '大排量踏板 — 最受欢迎' : unit.id === 'scoopy' ? '复古时尚踏板' : '标准紧凑型踏板')
                              : (unit.id === 'nmax' ? 'Maxi Scooter — Paling Populer' : unit.id === 'scoopy' ? 'Scooter Klasik & Stylish' : 'Scooter Ringkas & Hemat')}
                          </p>
                          <p className="text-xs font-bold text-teal-700 mt-0.5">
                            {unit.formattedRate} <span className="text-[10px] font-normal text-slate-500">/ {lang === 'EN' ? 'day' : lang === 'ZH' ? '天' : 'hari'}</span>
                          </p>
                        </div>
                      </div>

                      {/* Check Indicator */}
                      <div className="shrink-0 pl-2">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'border-teal-600 bg-teal-600' : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Error Visual Feedback */}
              {showErrors && !isScooterSelected && (
                <p className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'EN' ? 'Required: Please select a scooter model first.' : lang === 'ZH' ? '必填：请先选择车辆型号。' : 'Wajib: Silakan pilih unit motor terlebih dahulu.'}</span>
                </p>
              )}
            </div>

            {/* 2. QUANTITY INPUT */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  2. {lang === 'EN' ? 'Quantity' : lang === 'ZH' ? '预订数量' : 'Jumlah Motor'}
                </label>
                <span className="text-[11px] text-slate-500">
                  {lang === 'EN' ? 'How many scooters needed?' : lang === 'ZH' ? '需要预订几辆摩托车？' : 'Berapa unit motor yang diperlukan?'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-xl border border-stone-300 p-1">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-800 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-extrabold text-slate-900">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(10, qty + 1))}
                  className="w-7 h-7 rounded-lg bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. DELIVERY DATE & TIME */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                3. {lang === 'EN' ? 'Delivery Date & Time' : lang === 'ZH' ? '送车日期与时间' : 'Tanggal & Jam Antar'} <span className="text-rose-600">*</span>
              </label>

              <div className={`grid grid-cols-2 gap-2.5 p-3 rounded-2xl border transition-all ${
                showErrors && (!scheduledDate || !scheduledTime)
                  ? 'bg-rose-50/40 border-2 border-rose-500'
                  : 'bg-stone-50 border-stone-200'
              }`}>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {lang === 'EN' ? 'Date' : lang === 'ZH' ? '送车日期' : 'Tanggal'}
                  </label>
                  <input
                    type="date"
                    required
                    min={witaTodayISO}
                    value={scheduledDate}
                    onChange={(e) => {
                      setScheduledDate(e.target.value);
                      if (showErrors && e.target.value && scheduledTime) setShowErrors(false);
                    }}
                    className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 ${
                      showErrors && !scheduledDate
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-stone-300 focus:ring-teal-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    {lang === 'EN' ? 'Time Slot' : lang === 'ZH' ? '送车时间' : 'Pilihan Jam'}
                  </label>
                  {availableTimeSlots.length > 0 ? (
                    <select
                      value={scheduledTime}
                      onChange={(e) => {
                        setScheduledTime(e.target.value);
                        if (showErrors && scheduledDate && e.target.value) setShowErrors(false);
                      }}
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 ${
                        showErrors && !scheduledTime
                          ? 'border-rose-500 focus:ring-rose-500/30'
                          : 'border-stone-300 focus:ring-teal-500'
                      }`}
                    >
                      <option value="">
                        -- {lang === 'EN' ? 'Select Time' : lang === 'ZH' ? '选择时间' : 'Pilih Jam'} --
                      </option>
                      {availableTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-[11px] text-amber-800 font-medium">
                      {lang === 'EN' ? 'Fully booked today' : lang === 'ZH' ? '今日时段已满' : 'Slot hari ini penuh'}
                    </div>
                  )}
                </div>
              </div>

              {showErrors && (!scheduledDate || !scheduledTime) && (
                <p className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {lang === 'EN'
                      ? 'Required: Please select both delivery date and time slot.'
                      : lang === 'ZH'
                      ? '必填：请选择送车日期和时间段。'
                      : 'Wajib: Harap pilih tanggal dan jam pengantaran.'}
                  </span>
                </p>
              )}

              {scheduledDate === witaTodayISO && availableTimeSlots.length === 0 && (
                <p className="text-[11px] text-amber-700 font-semibold mt-1">
                  💡 {lang === 'EN' ? 'Today\'s operational hours (08:00 - 19:00 WITA) have ended. Please select tomorrow\'s date.' : lang === 'ZH' ? '今日营业时间 (08:00 - 19:00 WITA) 已结束，请选择明天的日期。' : 'Jam operasional hari ini (08.00 - 19.00 WITA) telah selesai. Silakan pilih tanggal besok.'}
                </p>
              )}
            </div>

            {/* 4. DELIVERY LOCATION (AIRPORT OR HOTEL ONLY) */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                4. {lang === 'EN' ? 'Delivery Location' : lang === 'ZH' ? '送车地点' : 'Lokasi Pengantaran'} <span className="text-rose-600">*</span>
              </label>

              <div className={`grid grid-cols-2 gap-2 mb-2 p-1 rounded-2xl transition-all ${
                showErrors && !locationType ? 'p-2 bg-rose-50/40 border-2 border-rose-500' : ''
              }`}>
                <button
                  type="button"
                  onClick={() => {
                    setLocationType('AIRPORT');
                    if (showErrors) setShowErrors(false);
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-0.5 transition-all cursor-pointer ${
                    locationType === 'AIRPORT'
                      ? 'border-teal-600 bg-teal-50 text-teal-900 font-extrabold shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <span className="text-xs">{lang === 'EN' ? 'Airport Komodo (LBJ)' : lang === 'ZH' ? '科莫多机场 (LBJ)' : 'Bandara Komodo (LBJ)'}</span>
                  <span className="text-[10px] text-teal-700 font-semibold">+Rp 20.000</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLocationType('HOTEL');
                    if (showErrors && hotelName.trim()) setShowErrors(false);
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-0.5 transition-all cursor-pointer ${
                    locationType === 'HOTEL'
                      ? 'border-teal-600 bg-teal-50 text-teal-900 font-extrabold shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <span className="text-xs">{lang === 'EN' ? 'Hotel / Villa' : lang === 'ZH' ? '酒店 / 度假村' : 'Hotel / Villa'}</span>
                  <span className="text-[10px] text-teal-700 font-semibold">+Rp 20.000</span>
                </button>
              </div>

              {showErrors && !locationType && (
                <p className="text-[11px] text-rose-600 font-bold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'EN' ? 'Required: Please select a delivery location.' : lang === 'ZH' ? '必填：请选择送车地点。' : 'Wajib: Harap pilih lokasi pengantaran.'}</span>
                </p>
              )}

              {locationType === 'HOTEL' && (
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={hotelName}
                    onChange={(e) => {
                      setHotelName(e.target.value);
                      if (showErrors && e.target.value.trim()) setShowErrors(false);
                    }}
                    placeholder={
                      lang === 'EN'
                        ? 'Type Hotel / Villa name (e.g. Meruorah, Ayana, Sylvia)...'
                        : lang === 'ZH'
                        ? '请输入酒店或民宿名称 (例如 Meruorah, Ayana)...'
                        : 'Ketik nama Hotel / Villa / Homestay...'
                    }
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 ${
                      showErrors && !hotelName.trim()
                        ? 'bg-rose-50 border-2 border-rose-500 focus:ring-rose-500/30'
                        : 'bg-amber-50/60 border border-amber-300 focus:ring-amber-500/30'
                    }`}
                  />
                  {showErrors && !hotelName.trim() && (
                    <p className="text-[11px] text-rose-600 font-bold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{lang === 'EN' ? 'Required: Please enter your Hotel or Villa name.' : lang === 'ZH' ? '必填：请输入酒店或度假村名称。' : 'Wajib: Harap isi nama Hotel / Villa.'}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 5. RENTAL DURATION */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  5. {lang === 'EN' ? 'Rental Duration' : lang === 'ZH' ? '租用天数' : 'Durasi Sewa'} <span className="text-rose-600">*</span>
                </label>
                <span className={`text-xs font-bold ${durationDays > 0 ? 'text-teal-700' : 'text-slate-400'}`}>
                  {durationDays > 0
                    ? `${durationDays} ${lang === 'EN' ? (durationDays > 1 ? 'Days' : 'Day') : lang === 'ZH' ? '天' : 'Hari'}`
                    : (lang === 'EN' ? 'Not selected' : lang === 'ZH' ? '未选择' : 'Belum dipilih')}
                </span>
              </div>

              <div className={`flex flex-wrap gap-1.5 p-1 rounded-2xl transition-all ${
                showErrors && durationDays === 0 ? 'p-2 bg-rose-50/40 border-2 border-rose-500' : ''
              }`}>
                {[1, 2, 3, 4, 5, 6, 7, 14].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => {
                      setDurationDays(d);
                      if (showErrors) setShowErrors(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                      durationDays === d
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {d === 7 
                      ? (lang === 'EN' ? '1 Week' : lang === 'ZH' ? '1 周' : '1 Minggu') 
                      : d === 14 
                      ? (lang === 'EN' ? '2 Weeks' : lang === 'ZH' ? '2 周' : '2 Minggu') 
                      : `${d} ${lang === 'EN' ? (d > 1 ? 'Days' : 'Day') : lang === 'ZH' ? '天' : 'Hari'}`}
                  </button>
                ))}
              </div>

              {showErrors && durationDays === 0 && (
                <p className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'EN' ? 'Required: Please select rental duration.' : lang === 'ZH' ? '必填：请选择租用天数。' : 'Wajib: Harap pilih durasi sewa.'}</span>
                </p>
              )}
            </div>

            {/* DYNAMIC COST ESTIMATE BOX */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 shadow-inner border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>
                  {selectedUnit && durationDays > 0
                    ? `${qty}x ${selectedUnit.name} (${durationDays} ${lang === 'EN' ? 'days' : lang === 'ZH' ? '天' : 'hari'})`
                    : (lang === 'EN' ? 'Scooter Rental Subtotal' : lang === 'ZH' ? '车辆租金小计' : 'Subtotal Sewa Motor')}
                </span>
                <span className="font-bold text-white">
                  {selectedUnit && durationDays > 0 ? `Rp ${subtotalUnits.toLocaleString('id-ID')}` : 'Rp -'}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>
                  {lang === 'EN' ? 'Delivery Fee' : lang === 'ZH' ? '送车费' : 'Ongkir Antar'} {qty > 1 ? `(${qty}x)` : ''} {locationType ? `(${locationType === 'AIRPORT' ? (lang === 'EN' ? 'Airport' : lang === 'ZH' ? '机场' : 'Airport') : (lang === 'EN' ? 'Hotel' : lang === 'ZH' ? '酒店' : 'Hotel')})` : ''}
                </span>
                <span className="font-bold text-white">
                  {locationType ? `+ Rp ${deliveryFee.toLocaleString('id-ID')}` : 'Rp -'}
                </span>
              </div>

              <div className="border-t border-slate-800 pt-2 flex justify-between items-center">
                <span className="text-xs sm:text-sm font-extrabold text-teal-400">
                  {lang === 'EN' ? 'TOTAL ESTIMATE' : lang === 'ZH' ? '预估总额' : 'TOTAL ESTIMASI'}
                </span>
                <span className="text-lg sm:text-xl font-black text-emerald-400">
                  {isFormValid ? `Rp ${grandTotal.toLocaleString('id-ID')}` : (
                    <span className="text-slate-400 text-base font-bold">
                      {lang === 'EN' ? 'Rp - (Select all details)' : lang === 'ZH' ? 'Rp - (请填写完整选项)' : 'Rp - (Lengkapi detail)'}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* VISUAL HINT IF INCOMPLETE */}
            {!isFormValid && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-900 text-xs font-semibold">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{getMissingFieldsText()}</span>
              </div>
            )}

            {/* ACTION BUTTON WITH CONDITIONAL LOCKING */}
            <div onClick={() => { if (!isFormValid) setShowErrors(true); }}>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-4 font-black text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2.5 ${
                  isFormValid
                    ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-xl shadow-teal-600/30 active:scale-98 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
                title={!isFormValid ? getMissingFieldsText() : ''}
              >
                <MessageCircle className={`w-5 h-5 ${isFormValid ? 'fill-white text-teal-600' : 'fill-slate-400 text-slate-200'}`} />
                <span>
                  {lang === 'EN'
                    ? 'CHAT TO CONFIRM & BOOK ⚡'
                    : lang === 'ZH'
                    ? '通过 WHATSAPP 确认车源 ⚡'
                    : 'KONFIRMASI UNIT VIA WHATSAPP ⚡'}
                </span>
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-500 font-medium">
              ⚡ {lang === 'EN' ? 'Instant WhatsApp approval • No advance payment or deposit needed' : lang === 'ZH' ? 'WhatsApp 快速确认 • 免预付费及押金' : 'Konfirmasi WhatsApp instan • Tanpa bayar dimuka / deposit'}
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

