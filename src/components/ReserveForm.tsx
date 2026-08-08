import React, { useState, useMemo, useEffect } from 'react';
import { TranslationContent, Language } from '../data/translations';
import { MessageCircle, Calendar, Clock, MapPin, Zap, Bike, Lock, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface ReserveFormProps {
  t: TranslationContent;
  lang: Language;
  selectedBikeId?: string;
  onBikeChange?: (bikeId: string) => void;
}

const BIKES = [
  {
    id: 'nmax',
    name: 'Yamaha NMAX',
    rate: 175000,
    labelEN: 'Yamaha NMAX (Maxi Scooter - Most Popular) – Rp 175k/day',
    labelZH: 'Yamaha NMAX (豪华踏板 - 最受欢迎) – Rp 175k/天',
    labelID: 'Yamaha NMAX (Maxi Scooter - Paling Populer) – Rp 175rb/hari',
  },
  {
    id: 'scoopy',
    name: 'Honda Scoopy',
    rate: 120000,
    labelEN: 'Honda Scoopy (Retro Style) – Rp 120k/day',
    labelZH: 'Honda Scoopy (复古风格) – Rp 120k/天',
    labelID: 'Honda Scoopy (Gaya Retro) – Rp 120rb/hari',
  },
  {
    id: 'beat',
    name: 'Honda Beat',
    rate: 100000,
    labelEN: 'Honda Beat (Compact & Nimble) – Rp 100k/day',
    labelZH: 'Honda Beat (轻巧灵便) – Rp 100k/天',
    labelID: 'Honda Beat (Lincah & Irit) – Rp 100rb/hari',
  },
];

const TIME_SLOTS = [
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
];

const DURATION_OPTIONS = [
  { days: 1, labelEN: '1 Day (24 Hours)', labelZH: '1 天 (24小时)', labelID: '1 Hari (24 Jam)' },
  { days: 2, labelEN: '2 Days', labelZH: '2 天', labelID: '2 Hari' },
  { days: 3, labelEN: '3 Days', labelZH: '3 天', labelID: '3 Hari' },
  { days: 4, labelEN: '4 Days', labelZH: '4 天', labelID: '4 Hari' },
  { days: 5, labelEN: '5 Days', labelZH: '5 天', labelID: '5 Hari' },
  { days: 7, labelEN: '1 Week (7 Days)', labelZH: '1 周 (7天)', labelID: '1 Minggu (7 Hari)' },
];

// WITA Timezone (UTC+8 - Labuan Bajo) helper
const getWitaDateObj = () => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const witaMs = utcMs + 8 * 60 * 60 * 1000;
  return new Date(witaMs);
};

const getWitaDateISO = (dateObj: Date) => {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Convert time slot string like '4:30 PM' to total minutes from midnight
const parseSlotToMinutes = (slot: string): number => {
  const [time, period] = slot.split(' ');
  const [hStr, mStr] = time.split(':');
  let hour = parseInt(hStr, 10);
  const min = parseInt(mStr, 10);
  if (period === 'PM' && hour < 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour * 60 + min;
};

// Calculate initial pickup date (Today or Tomorrow if past operating hours today)
const getInitialPickupDate = () => {
  const witaNow = getWitaDateObj();
  const currentWitaMinutes = witaNow.getHours() * 60 + witaNow.getMinutes();
  const minAllowedMinutes = currentWitaMinutes + 45; // 45 min buffer
  const lastSlotMinutes = parseSlotToMinutes(TIME_SLOTS[TIME_SLOTS.length - 1]);

  if (minAllowedMinutes > lastSlotMinutes) {
    const tomorrow = new Date(witaNow);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getWitaDateISO(tomorrow);
  }
  return getWitaDateISO(witaNow);
};

export const ReserveForm: React.FC<ReserveFormProps> = ({
  lang,
  selectedBikeId: propSelectedBikeId,
}) => {
  // WITA today ISO string
  const witaTodayISO = getWitaDateISO(getWitaDateObj());

  // State
  const [bikeId, setBikeId] = useState<string>(propSelectedBikeId || 'nmax');
  const [quantity, setQuantity] = useState<number>(1);
  const [pickupDate, setPickupDate] = useState<string>(getInitialPickupDate());
  const [pickupTime, setPickupTime] = useState<string>('4:30 PM');
  const [durationDays, setDurationDays] = useState<number>(1);
  const [pickupMethod, setPickupMethod] = useState<'hotel' | 'airport' | 'garage'>('hotel');
  const [hotelName, setHotelName] = useState<string>('');

  // Sync prop selected bike if passed
  useEffect(() => {
    if (propSelectedBikeId) {
      setBikeId(propSelectedBikeId);
    }
  }, [propSelectedBikeId]);

  // Available pickup times calculated dynamically in realtime (min 45 mins buffer for TODAY WITA)
  const availablePickupTimes = useMemo(() => {
    const witaNow = getWitaDateObj();
    const currentTodayISO = getWitaDateISO(witaNow);

    if (pickupDate === currentTodayISO) {
      const currentWitaMinutes = witaNow.getHours() * 60 + witaNow.getMinutes();
      const minAllowedMinutes = currentWitaMinutes + 45; // 45 minutes preparation buffer
      return TIME_SLOTS.filter((slot) => parseSlotToMinutes(slot) >= minAllowedMinutes);
    }

    return TIME_SLOTS;
  }, [pickupDate]);

  // Auto-adjust pickupTime if selected time is not available
  useEffect(() => {
    if (availablePickupTimes.length > 0) {
      if (!availablePickupTimes.includes(pickupTime)) {
        setPickupTime(availablePickupTimes[0]);
      }
    }
  }, [availablePickupTimes, pickupTime]);

  // Selected Bike Object
  const currentBike = useMemo(() => {
    return BIKES.find((b) => b.id === bikeId) || BIKES[0];
  }, [bikeId]);

  // Delivery Fee Calculation per unit
  const deliveryFeePerUnit = useMemo(() => {
    if (pickupMethod === 'hotel' || pickupMethod === 'airport') {
      return 20000;
    }
    return 0; // garage is free
  }, [pickupMethod]);

  // Total Estimated Price Calculation
  const totalEstimate = useMemo(() => {
    const baseRental = currentBike.rate * quantity * durationDays;
    const totalDeliveryFee = deliveryFeePerUnit * quantity;
    return baseRental + totalDeliveryFee;
  }, [currentBike.rate, quantity, durationDays, deliveryFeePerUnit]);

  // Delivery Tag Text
  const deliveryTagText = useMemo(() => {
    if (pickupMethod === 'hotel') {
      return quantity > 1 ? `+Rp ${(20000 * quantity) / 1000}k delivery (${quantity} units)` : '+Rp 20k delivery';
    }
    if (pickupMethod === 'airport') {
      return quantity > 1 ? `+Rp ${(20000 * quantity) / 1000}k airport delivery` : '+Rp 20k airport delivery';
    }
    return lang === 'EN' ? 'Free garage pickup' : lang === 'ZH' ? '自提免服务费' : 'Gratis ambil di garage';
  }, [pickupMethod, quantity, lang]);

  // Location details string for summary & WhatsApp
  const locationDetailText = useMemo(() => {
    if (pickupMethod === 'hotel') {
      return hotelName.trim() || 'Hotel / Villa';
    }
    if (pickupMethod === 'airport') {
      return 'Komodo International Airport (LBJ)';
    }
    return 'HelloBajo Main Garage';
  }, [pickupMethod, hotelName]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pickupMethod === 'hotel' && !hotelName.trim()) {
      alert(
        lang === 'EN'
          ? 'Please enter your Hotel / Villa name.'
          : lang === 'ZH'
          ? '请输入您的酒店或民宿名称。'
          : 'Harap masukkan nama Hotel / Villa tempat Anda menginap.'
      );
      return;
    }

    let methodText = '';
    if (pickupMethod === 'hotel') methodText = 'Deliver to Hotel / Villa';
    else if (pickupMethod === 'airport') methodText = 'Komodo International Airport (LBJ)';
    else methodText = 'Pick up at Garage (Free)';

    const formattedMessage =
      lang === 'EN'
        ? `Hi HelloBajo! I would like to book a scooter:\n\n` +
          `⚡ *INSTANT SCOOTER BOOKING*\n` +
          `• *Model:* ${currentBike.name}\n` +
          `• *Quantity:* ${quantity} Unit${quantity > 1 ? 's' : ''}\n` +
          `• *Pick-up Date & Time:* ${pickupDate} at ${pickupTime}\n` +
          `• *Duration:* ${durationDays} Day${durationDays > 1 ? 's' : ''}\n` +
          `• *Pick-up Method:* ${methodText}\n` +
          (pickupMethod === 'hotel' ? `• *Hotel / Villa:* ${hotelName}\n\n` : `\n`) +
          `💰 *ESTIMATED TOTAL:* *Rp ${totalEstimate.toLocaleString('id-ID')}*\n` +
          `(${quantity}x ${currentBike.name} @ Rp ${(currentBike.rate / 1000).toLocaleString()}k/day for ${durationDays} day${durationDays > 1 ? 's' : ''}` +
          (deliveryFeePerUnit > 0 ? ` + Rp ${(deliveryFeePerUnit * quantity).toLocaleString('id-ID')} delivery fee` : ' + Free pickup') +
          `)\n\n` +
          `Please confirm unit availability. Thank you!`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想预订摩托车：\n\n` +
          `⚡ *极速摩托车预订*\n` +
          `• *车型:* ${currentBike.name}\n` +
          `• *数量:* ${quantity} 台\n` +
          `• *取车日期与时间:* ${pickupDate} ${pickupTime}\n` +
          `• *租用天数:* ${durationDays} 天\n` +
          `• *取车方式:* ${methodText}\n` +
          (pickupMethod === 'hotel' ? `• *酒店/送车地点:* ${hotelName}\n\n` : `\n`) +
          `💰 *预估总额:* *Rp ${totalEstimate.toLocaleString('id-ID')}*\n\n` +
          `请确认是否有车。谢谢！`
        : `Halo HelloBajo! Saya mau sewa motor:\n\n` +
          `⚡ *PEMESANAN INSTANT MOTOR*\n` +
          `• *Model Motor:* ${currentBike.name}\n` +
          `• *Jumlah Unit:* ${quantity} Unit\n` +
          `• *Tanggal & Jam Ambil:* ${pickupDate} jam ${pickupTime}\n` +
          `• *Durasi Sewa:* ${durationDays} Hari\n` +
          `• *Metode Penyerahan:* ${methodText}\n` +
          (pickupMethod === 'hotel' ? `• *Nama Hotel / Villa:* ${hotelName}\n\n` : `\n`) +
          `💰 *TOTAL ESTIMASI:* *Rp ${totalEstimate.toLocaleString('id-ID')}*\n\n` +
          `Mohon konfirmasi ketersediaan unit. Terima kasih!`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`, '_blank');
  };

  return (
    <section id="reserve" className="relative bg-[#faf8f5] pt-2 pb-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Instant Scooter Booking Card Container */}
        <div className="bg-white rounded-3xl shadow-xl sm:shadow-2xl border border-stone-200/90 p-5 sm:p-8 lg:p-10 transition-all">
          
          {/* Card Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-600/20">
                <Zap className="w-6 h-6 fill-white text-teal-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Instant Scooter Booking
                  </h3>
                  <span className="px-2.5 py-0.5 text-[10px] sm:text-xs font-black uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200/80 rounded-full">
                    EXPRESS
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Fast booking for tourists • Direct WhatsApp chat
                </p>
              </div>
            </div>

            {/* Zero Cash Deposit Badge */}
            <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-extrabold shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Zero Cash Deposit</span>
            </div>
          </div>

          {/* Booking Form Fields */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            
            {/* ROW 1: UNIT MODEL & QUANTITY */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* UNIT MODEL */}
              <div className="md:col-span-8">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Bike className="w-4 h-4 text-teal-600" />
                  <span>UNIT MODEL *</span>
                </label>
                <select
                  required
                  value={bikeId}
                  onChange={(e) => setBikeId(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer shadow-2xs"
                >
                  {BIKES.map((bike) => (
                    <option key={bike.id} value={bike.id}>
                      {lang === 'EN' ? bike.labelEN : lang === 'ZH' ? bike.labelZH : bike.labelID}
                    </option>
                  ))}
                </select>
              </div>

              {/* QUANTITY */}
              <div className="md:col-span-4">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                  <span>QUANTITY *</span>
                </label>
                <select
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer shadow-2xs"
                >
                  <option value={1}>1 Unit</option>
                  <option value={2}>2 Units</option>
                  <option value={3}>3 Units</option>
                  <option value={4}>4 Units</option>
                  <option value={5}>5 Units</option>
                </select>
              </div>

            </div>

            {/* ROW 2: PICK-UP DATE & PICK-UP TIME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* PICK-UP DATE */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>PICK-UP DATE *</span>
                </label>
                <input
                  type="date"
                  required
                  min={witaTodayISO}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer shadow-2xs"
                />
              </div>

              {/* PICK-UP TIME */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>PICK-UP TIME (MIN. 45 MIN PREP) *</span>
                </label>
                <select
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  disabled={availablePickupTimes.length === 0}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer shadow-2xs disabled:bg-stone-100 disabled:text-slate-400"
                >
                  {availablePickupTimes.length > 0 ? (
                    availablePickupTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))
                  ) : (
                    <option value="">
                      {lang === 'EN'
                        ? 'Fully booked for today • Select tomorrow'
                        : lang === 'ZH'
                        ? '今日预订已满 • 请选择明日'
                        : 'Jam operasional hari ini selesai • Pilih tanggal besok'}
                    </option>
                  )}
                </select>
              </div>

            </div>

            {/* REALTIME TIME WARNING IF TODAY HAS NO SLOTS LEFT */}
            {pickupDate === witaTodayISO && availablePickupTimes.length === 0 && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {lang === 'EN'
                    ? 'Earliest pickup requires at least 45 minutes preparation time. Today operating hours have ended. Please select tomorrow.'
                    : lang === 'ZH'
                    ? '最快取车需要至少 45 分钟准备时间。今日可预约时间已过，请选择明天。'
                    : 'Pengambilan motor membutuhkan waktu penyiapan minimal 45 menit. Jam operasional hari ini sudah selesai. Silakan pilih tanggal besok.'}
                </span>
              </div>
            )}

            {/* ROW 3: PICK-UP METHOD & CONDITIONAL HOTEL / VILLA NAME */}
            <div className={`grid grid-cols-1 ${pickupMethod === 'hotel' ? 'md:grid-cols-2' : ''} gap-4`}>
              
              {/* PICK-UP METHOD */}
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>PICK-UP METHOD *</span>
                </label>
                <select
                  required
                  value={pickupMethod}
                  onChange={(e) => setPickupMethod(e.target.value as 'hotel' | 'airport' | 'garage')}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer shadow-2xs"
                >
                  <option value="hotel">🛵 Deliver to Hotel / Villa (+Rp 20k/unit)</option>
                  <option value="airport">✈️ Komodo International Airport (LBJ) (+Rp 20k/unit)</option>
                  <option value="garage">🏢 Pick up at Garage (Free)</option>
                </select>
              </div>

              {/* HOTEL / VILLA NAME (ONLY SHOWN IF PICKUP METHOD IS HOTEL) */}
              {pickupMethod === 'hotel' && (
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    <span>HOTEL / VILLA NAME *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    placeholder="e.g., Ayana, Meruorah, Sudamala..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-2xs"
                  />
                </div>
              )}

            </div>

            {/* OPTIONAL RENTAL DURATION / DAYS SELECTOR */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  RENTAL DURATION
                </label>
                <span className="text-xs text-teal-700 font-bold">
                  {durationDays} Day{durationDays > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.days}
                    type="button"
                    onClick={() => setDurationDays(opt.days)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      durationDays === opt.days
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {lang === 'EN' ? opt.labelEN : lang === 'ZH' ? opt.labelZH : opt.labelID}
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 4: CALCULATION SUMMARY CARD BOX */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#f0fdfa] border border-[#ccfbf1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              
              {/* Summary Details */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {quantity} Unit {currentBike.name}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-md bg-teal-100/90 text-teal-800 border border-teal-200/80">
                    {deliveryTagText}
                  </span>
                  {durationDays > 1 && (
                    <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                      {durationDays} Days
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    EST. TOTAL:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-teal-800 tracking-tight">
                    Rp {totalEstimate.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Send on WhatsApp Action Button */}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0d9488] hover:bg-[#0b7269] text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-teal-700/20 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shrink-0"
              >
                <MessageCircle className="w-5 h-5 fill-white text-teal-600" />
                <span>Send on WhatsApp</span>
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
};


