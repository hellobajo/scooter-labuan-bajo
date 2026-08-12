import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Language } from '../data/translations';
import { X, MessageCircle, Zap, AlertCircle, Info, Plus, Minus, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { SCOOTER_IMAGES, HERO_IMAGE, RIDING_DESTINATIONS } from '../data/images';

interface InstantReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialBikeId?: string;
}

export interface ModelOption {
  id: string;
  name: string;
  price: number;
  shortSpec: Record<Language, string>;
  image: string;
}

export interface CategoryOption {
  id: 'compact_economy' | 'medium_sport' | 'maxi_scooter';
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  badge: Record<Language, string>;
  badgeStyle: 'teal' | 'amber' | 'emerald';
  priceDisplay: Record<Language, string>;
  basePrice: number;
  models: ModelOption[];
  specPills: Record<Language, string[]>;
}

export const FLEET_CATEGORIES: CategoryOption[] = [
  {
    id: 'compact_economy',
    title: {
      EN: 'Compact / Economy',
      ID: 'Compact / Economy',
      ZH: '紧凑经济型',
    },
    subtitle: {
      EN: '110cc – 125cc • Easy, agile & super fuel efficient',
      ID: '110cc – 125cc • Lincah, mudah & sangat irit',
      ZH: '110cc – 125cc • 轻松灵活且极度省油',
    },
    badge: {
      EN: 'BEST VALUE',
      ID: 'PALING HEMAT',
      ZH: '超值性价比',
    },
    badgeStyle: 'teal',
    priceDisplay: {
      EN: 'Rp 100.000 / day',
      ID: 'Rp 100.000 / hari',
      ZH: 'Rp 100.000 / 天',
    },
    basePrice: 100000,
    specPills: {
      EN: ['Automatic', '110cc – 125cc', 'EFI / Hybrid'],
      ID: ['Matik', '110cc – 125cc', 'EFI / Hybrid'],
      ZH: ['自动档', '110cc – 125cc', '电喷 / 轻混'],
    },
    models: [
      {
        id: 'beat',
        name: 'Honda Beat',
        price: 100000,
        shortSpec: {
          EN: '110cc eSP • Super Fuel-Efficient',
          ID: '110cc eSP • Super Irit',
          ZH: '110cc eSP • 超级省油',
        },
        image: SCOOTER_IMAGES.beat,
      },
      {
        id: 'scoopy',
        name: 'Honda Scoopy',
        price: 100000,
        shortSpec: {
          EN: '110cc Retro • Chic Style',
          ID: '110cc Retro • Gaya Chic',
          ZH: '110cc 复古 • 时尚外观',
        },
        image: SCOOTER_IMAGES.scoopy,
      },
      {
        id: 'fazzio',
        name: 'Yamaha Fazzio',
        price: 100000,
        shortSpec: {
          EN: '125cc Hybrid • Modern Chic',
          ID: '125cc Hybrid • Modern Chic',
          ZH: '125cc 混动 • 现代时尚',
        },
        image: SCOOTER_IMAGES.fazzio,
      },
    ],
  },
  {
    id: 'medium_sport',
    title: {
      EN: 'Medium / Sport',
      ID: 'Medium / Sport',
      ZH: '中型运动型',
    },
    subtitle: {
      EN: '150cc – 160cc • Strong acceleration for hill climbs',
      ID: '150cc – 160cc • Bertenaga & mantap menanjak',
      ZH: '150cc – 160cc • 强劲加速与坡道动力',
    },
    badge: {
      EN: 'HILL POWER',
      ID: 'TANGGUH MENANJAK',
      ZH: '强劲爬坡',
    },
    badgeStyle: 'amber',
    priceDisplay: {
      EN: 'Rp 130.000 – 140.000 / day',
      ID: 'Rp 130.000 – 140.000 / hari',
      ZH: 'Rp 130.000 – 140.000 / 天',
    },
    basePrice: 130000,
    specPills: {
      EN: ['Automatic', '150cc – 160cc', 'Liquid Cooled'],
      ID: ['Matik', '150cc – 160cc', 'Pendingin Cairan'],
      ZH: ['自动档', '150cc – 160cc', '水冷发动机'],
    },
    models: [
      {
        id: 'vario150',
        name: 'Honda Vario 150',
        price: 130000,
        shortSpec: {
          EN: '150cc eSP • Powerful & Agile',
          ID: '150cc eSP • Tangguh & Lincah',
          ZH: '150cc eSP • 强劲灵活',
        },
        image: SCOOTER_IMAGES.vario150,
      },
      {
        id: 'vario160',
        name: 'Honda Vario 160',
        price: 140000,
        shortSpec: {
          EN: '160cc eSP+ 4-Valve • Smart Key & Power',
          ID: '160cc eSP+ 4-Katup • Smart Key & Bertenaga',
          ZH: '160cc eSP+ 4气门 • 智能钥匙',
        },
        image: SCOOTER_IMAGES.vario160,
      },
    ],
  },
  {
    id: 'maxi_scooter',
    title: {
      EN: 'Maxi Scooter',
      ID: 'Maxi Scooter',
      ZH: '豪华踏板巡航',
    },
    subtitle: {
      EN: '155cc VVA • Plush double seat & extra large storage',
      ID: '155cc VVA • Jok empuk lebar & bagasi ekstra luas',
      ZH: '155cc VVA • 宽大舒适座垫与超大行李箱',
    },
    badge: {
      EN: 'MOST POPULAR',
      ID: 'PALING POPULER',
      ZH: '最受欢迎',
    },
    badgeStyle: 'emerald',
    priceDisplay: {
      EN: 'Rp 160.000 / day',
      ID: 'Rp 160.000 / hari',
      ZH: 'Rp 160.000 / 天',
    },
    basePrice: 160000,
    specPills: {
      EN: ['Automatic', '155cc VVA', 'ABS / Disc Brake'],
      ID: ['Matik', '155cc VVA', 'Rem ABS / Cakram'],
      ZH: ['自动档', '155cc VVA', 'ABS / 碟刹'],
    },
    models: [
      {
        id: 'nmax',
        name: 'Yamaha NMAX 155',
        price: 160000,
        shortSpec: {
          EN: '155cc VVA Engine • Big Storage & Plush Seat',
          ID: '155cc Mesin VVA • Bagasi Luas & Jok Empuk',
          ZH: '155cc VVA 引擎 • 大储物箱',
        },
        image: SCOOTER_IMAGES.nmax,
      },
      {
        id: 'pcx',
        name: 'Honda PCX 155',
        price: 160000,
        shortSpec: {
          EN: '155cc eSP+ • Luxury Comfort Touring',
          ID: '155cc eSP+ • Touring Mewah & Nyaman',
          ZH: '155cc eSP+ • 豪华舒适巡航',
        },
        image: SCOOTER_IMAGES.pcx,
      },
    ],
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
  // Primary Scooter Selection
  const [primaryCategoryId, setPrimaryCategoryId] = useState<string>('compact_economy');
  const [primaryModelId, setPrimaryModelId] = useState<string>('beat');
  const [primaryQty, setPrimaryQty] = useState<number>(1);

  // Optional Secondary Scooter Selection
  const [showSecondaryBike, setShowSecondaryBike] = useState<boolean>(false);
  const [secondaryCategoryId, setSecondaryCategoryId] = useState<string>('medium_sport');
  const [secondaryModelId, setSecondaryModelId] = useState<string>('vario150');
  const [secondaryQty, setSecondaryQty] = useState<number>(1);

  // Form Field States
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

  // Scheduled date & time state
  const [scheduledDate, setScheduledDate] = useState<string>(defaultDate);
  const [scheduledTime, setScheduledTime] = useState<string>('');

  // Location state
  const [locationType, setLocationType] = useState<'' | 'AIRPORT' | 'HOTEL'>('');
  const [hotelName, setHotelName] = useState('');

  // Duration (default to 1 day for instant usability)
  const [durationDays, setDurationDays] = useState<number>(1);

  // Map initialBikeId to Category and Preferred Model
  useEffect(() => {
    if (!isOpen) return;

    let initCat = 'compact_economy';
    let initModel = 'beat';

    if (initialBikeId) {
      const lower = initialBikeId.toLowerCase();
      if (lower.includes('beat') || lower.includes('scoopy') || lower.includes('fazzio')) {
        initCat = 'compact_economy';
        initModel = lower.includes('scoopy') ? 'scoopy' : lower.includes('fazzio') ? 'fazzio' : 'beat';
      } else if (lower.includes('vario') || lower.includes('sport')) {
        initCat = 'medium_sport';
        initModel = lower.includes('160') ? 'vario160' : 'vario150';
      } else if (lower.includes('nmax') || lower.includes('pcx') || lower.includes('maxi')) {
        initCat = 'maxi_scooter';
        initModel = lower.includes('pcx') ? 'pcx' : 'nmax';
      }
    }

    setPrimaryCategoryId(initCat);
    setPrimaryModelId(initModel);
    setPrimaryQty(1);

    setShowSecondaryBike(false);
    setSecondaryCategoryId('medium_sport');
    setSecondaryModelId('vario150');
    setSecondaryQty(1);

    setScheduledDate(defaultDate);
    setScheduledTime('');
    setLocationType('');
    setHotelName('');
    setDurationDays(1);
    setShowErrors(false);
  }, [initialBikeId, isOpen, defaultDate]);

  // Lock body scroll & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  // Browser History back button handling
  const pushedHistoryRef = useRef<boolean>(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

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
      if (pushedHistoryRef.current) {
        pushedHistoryRef.current = false;
        window.history.back();
      }
    };
  }, [isOpen]);

  // Selected Category & Model Resolvers
  const primaryCategory = useMemo(() => {
    return FLEET_CATEGORIES.find((cat) => cat.id === primaryCategoryId) || FLEET_CATEGORIES[0];
  }, [primaryCategoryId]);

  const primaryModel = useMemo(() => {
    return primaryCategory.models.find((m) => m.id === primaryModelId) || primaryCategory.models[0];
  }, [primaryCategory, primaryModelId]);

  const secondaryCategory = useMemo(() => {
    return FLEET_CATEGORIES.find((cat) => cat.id === secondaryCategoryId) || FLEET_CATEGORIES[1];
  }, [secondaryCategoryId]);

  const secondaryModel = useMemo(() => {
    return secondaryCategory.models.find((m) => m.id === secondaryModelId) || secondaryCategory.models[0];
  }, [secondaryCategory, secondaryModelId]);

  // Top Image Slider Images
  const sliderImages = useMemo(() => {
    return primaryCategory.models.map((m) => ({
      url: m.image,
      title: m.name,
      subtitle: m.shortSpec[lang],
      badge: primaryCategory.badge[lang],
      modelId: m.id,
    }));
  }, [primaryCategory, lang]);

  // Slider navigation
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const touchStartX = useRef<number>(0);

  // Reset slide index when category changes
  useEffect(() => {
    setCurrentSlideIdx(0);
  }, [primaryCategoryId]);

  const handleSelectPrimaryModel = (modelId: string) => {
    setPrimaryModelId(modelId);
    const idx = primaryCategory.models.findIndex((m) => m.id === modelId);
    if (idx !== -1) {
      setCurrentSlideIdx(idx);
    }
  };

  const handleNextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlideIdx((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlideIdx((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextSlide();
      else handlePrevSlide();
    }
  };

  // Pricing Calculations
  const primaryUnitPrice = primaryModel.price || primaryCategory.basePrice;
  const secondaryUnitPrice = secondaryModel.price || secondaryCategory.basePrice;

  const totalUnits = primaryQty + (showSecondaryBike ? secondaryQty : 0);
  const subtotalPerDay = (primaryUnitPrice * primaryQty) + (showSecondaryBike ? secondaryUnitPrice * secondaryQty : 0);
  const days = durationDays > 0 ? durationDays : 1;
  const subtotalMotorcyclesCost = subtotalPerDay * days;

  const deliveryFeePerUnit = 20000;
  const deliveryFee = locationType ? deliveryFeePerUnit * totalUnits : 0;
  const grandTotal = subtotalMotorcyclesCost + deliveryFee;

  // Validation Checks
  const isScheduleValid = Boolean(scheduledDate && scheduledTime);
  const isLocationValid = locationType === 'AIRPORT' || (locationType === 'HOTEL' && hotelName.trim().length > 0);
  const isDurationValid = durationDays > 0;
  const isFormValid = isScheduleValid && isLocationValid && isDurationValid && totalUnits > 0;

  // Time slot filtering
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

  // Missing fields helper text
  const getMissingFieldsText = () => {
    const missing: string[] = [];
    if (!scheduledDate) missing.push(lang === 'EN' ? 'Delivery Date' : lang === 'ZH' ? '送车日期' : 'Tanggal Pengantaran');
    if (!scheduledTime) missing.push(lang === 'EN' ? 'Time Slot' : lang === 'ZH' ? '送车时间' : 'Jam Pengantaran');
    if (!locationType) missing.push(lang === 'EN' ? 'Delivery Location' : lang === 'ZH' ? '送车地点' : 'Lokasi Pengantaran');
    else if (locationType === 'HOTEL' && !hotelName.trim()) missing.push(lang === 'EN' ? 'Hotel/Villa Name' : lang === 'ZH' ? '酒店/民宿名称' : 'Nama Hotel/Villa');
    if (!isDurationValid) missing.push(lang === 'EN' ? 'Rental Duration' : lang === 'ZH' ? '租用天数' : 'Durasi Sewa');

    if (missing.length === 0) return '';

    if (lang === 'EN') return `Please complete: ${missing.join(', ')}`;
    if (lang === 'ZH') return `请选择/填写: ${missing.join('、')}`;
    return `Harap lengkapi: ${missing.join(', ')}`;
  };

  if (!isOpen) return null;

  // WhatsApp Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setShowErrors(true);
      return;
    }

    const deliveryTimeText = `${scheduledDate} at ${scheduledTime} WITA`;

    let locationText = '';
    if (locationType === 'AIRPORT') {
      locationText = `Komodo International Airport (LBJ) [+Rp ${(20000 * totalUnits).toLocaleString('id-ID')}]`;
    } else {
      locationText = `Hotel / Villa: ${hotelName.trim()} [+Rp ${(20000 * totalUnits).toLocaleString('id-ID')}]`;
    }

    const primaryBikeText = `   • ${primaryQty}x ${primaryModel.name} (${primaryCategory.title[lang]}) @ Rp ${primaryUnitPrice.toLocaleString('id-ID')}/day`;
    const secondaryBikeText = showSecondaryBike
      ? `   • ${secondaryQty}x ${secondaryModel.name} (${secondaryCategory.title[lang]}) @ Rp ${secondaryUnitPrice.toLocaleString('id-ID')}/day`
      : '';

    const scootersList = secondaryBikeText ? `${primaryBikeText}\n${secondaryBikeText}` : primaryBikeText;

    const msg =
      lang === 'EN'
        ? `⚡ *INSTANT SCOOTER RESERVATION - HELLOBAJO*\n\n` +
          `🛵 *SCOOTERS BOOKED (${totalUnits} Unit):*\n${scootersList}\n\n` +
          `📅 *Delivery Schedule:* ${deliveryTimeText}\n` +
          `⏳ *Rental Duration:* ${durationDays} Day(s)\n` +
          `📍 *Delivery Location:* ${locationText}\n` +
          `\n💰 *ESTIMATED COST*\n` +
          `• Scooter Rental Subtotal (${totalUnits} Unit x ${durationDays} Day): Rp ${subtotalMotorcyclesCost.toLocaleString('id-ID')}\n` +
          (deliveryFee > 0 ? `• Delivery Fee (${totalUnits} Unit): Rp ${deliveryFee.toLocaleString('id-ID')}\n` : '') +
          `• *GRAND TOTAL:* *Rp ${grandTotal.toLocaleString('id-ID')}*\n\n` +
          `ℹ️ *High-Season Note:* Preferred model is subject to daily stock; equivalent unit guaranteed.\n\n` +
          `Hi HelloBajo! Please confirm unit availability for my schedule. Thank you!`
        : lang === 'ZH'
        ? `⚡ *摩托车预订请求 - HELLOBAJO*\n\n` +
          `🛵 *预订车辆 (${totalUnits} 辆):*\n${scootersList}\n\n` +
          `📅 *送车时间:* ${deliveryTimeText}\n` +
          `⏳ *租用天数:* ${durationDays} 天\n` +
          `📍 *送车地点:* ${locationText}\n` +
          `\n💰 *预估费用明细*\n` +
          `• 车辆租金小计 (${totalUnits} 辆 x ${durationDays} 天): Rp ${subtotalMotorcyclesCost.toLocaleString('id-ID')}\n` +
          (deliveryFee > 0 ? `• 送车服务费 (${totalUnits} 辆): Rp ${deliveryFee.toLocaleString('id-ID')}\n` : '') +
          `• *预估总额:* *Rp ${grandTotal.toLocaleString('id-ID')}*\n\n` +
          `ℹ️ *旺季预订说明:* 偏好车型视每日存货而定，保证提供同等规格车型。\n\n` +
          `你好 HelloBajo！请帮我确认该时间段是否有车。谢谢！`
        : `⚡ *RESERVASI SEWA MOTOR - HELLOBAJO*\n\n` +
          `🛵 *DAFTAR MOTOR DISEWA (${totalUnits} Unit):*\n${scootersList}\n\n` +
          `📅 *Jadwal Antar:* ${deliveryTimeText}\n` +
          `⏳ *Durasi Sewa:* ${durationDays} Hari\n` +
          `📍 *Lokasi Antar:* ${locationText}\n` +
          `\n💰 *ESTIMASI BIAYA*\n` +
          `• Subtotal Sewa Motor (${totalUnits} Unit x ${durationDays} Hari): Rp ${subtotalMotorcyclesCost.toLocaleString('id-ID')}\n` +
          (deliveryFee > 0 ? `• Biaya Antar/Jemput (${totalUnits} Unit): Rp ${deliveryFee.toLocaleString('id-ID')}\n` : '') +
          `• *GRAND TOTAL:* *Rp ${grandTotal.toLocaleString('id-ID')}*\n\n` +
          `ℹ️ *Catatan High-Season:* Model pilihan menyesuaikan stok harian; unit setara dijamin.\n\n` +
          `Halo HelloBajo! Mohon konfirmasi ketersediaan unit untuk jadwal ini. Terima kasih!`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  const activeSlide = sliderImages[currentSlideIdx % sliderImages.length] || sliderImages[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300 transition-all cursor-pointer"
    >
      {/* Modal Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-300 cursor-default"
      >
        {/* Header Bar - Restored Dark Navy / Teal Branding */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-5 py-3.5 sm:px-6 flex items-center justify-between shrink-0 border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#0d9488]/20 text-teal-400 rounded-xl border border-teal-500/30">
              <Zap className="w-5 h-5 fill-teal-400 text-teal-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight text-white">
                {lang === 'EN' ? 'Reserve Scooter' : lang === 'ZH' ? '预订摩托车' : 'Reservasi Sewa Motor'}
              </h3>
              <p className="text-[11px] text-teal-300 font-medium flex items-center gap-1">
                <span>⚡</span>
                <span>{lang === 'EN' ? 'No Deposit • High-Season Instant Booking' : lang === 'ZH' ? '免押金 • 旺季即时确认' : 'Bebas Deposit • Konfirmasi Cepat'}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow font-sans text-slate-800 space-y-4">

          {/* Top Scooter Preview Image Display (Static, object-contain, no auto-play buttons) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative h-40 sm:h-48 w-full bg-white rounded-2xl overflow-hidden border border-stone-200 select-none group/slider shrink-0 shadow-sm flex items-center justify-center"
          >
            <img
              src={activeSlide.url}
              alt={activeSlide.title}
              className="w-full h-full object-contain p-2 sm:p-3 transition-all duration-300"
            />

            {/* Category Badge */}
            <div className="absolute top-2.5 right-2.5 z-10">
              <span className="px-2.5 py-1 bg-[#0d9488] text-white text-[10px] sm:text-[11px] font-black rounded-full shadow-md border border-teal-400/50">
                {activeSlide.badge}
              </span>
            </div>

            {/* Nav Arrows */}
            {sliderImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md transition-opacity opacity-80 sm:opacity-0 group-hover/slider:opacity-100 z-10 cursor-pointer border border-white/20 shadow-md"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md transition-opacity opacity-80 sm:opacity-0 group-hover/slider:opacity-100 z-10 cursor-pointer border border-white/20 shadow-md"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Bottom Floating Title */}
            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
              <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md flex items-center gap-1.5 text-white max-w-[75%] min-w-0">
                <Sparkles className="w-3 h-3 text-teal-400 fill-teal-400 shrink-0" />
                <span className="text-[11px] font-extrabold text-teal-300 truncate whitespace-nowrap">
                  {activeSlide.title}
                </span>
              </div>

              {sliderImages.length > 1 && (
                <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-black text-slate-200 shadow-md shrink-0 whitespace-nowrap">
                  <span>{currentSlideIdx + 1}/{sliderImages.length}</span>
                </div>
              )}
            </div>
          </div>

          {/* High-Season Operational Safety Disclaimer Banner */}
          <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-2xl flex items-start gap-2 text-amber-900 text-xs">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-extrabold block text-[11px] text-amber-950 uppercase tracking-wider">
                {lang === 'EN' ? '⚡ High-Season Category Booking' : lang === 'ZH' ? '⚡ 旺季分类预订服务' : '⚡ Reservasi Kategori Layanan'}
              </span>
              <p className="text-[11px] font-medium text-amber-900/90 mt-0.5">
                {lang === 'EN'
                  ? 'Preferred model is subject to daily stock. We guarantee an equivalent unit with identical specs within your chosen category.'
                  : lang === 'ZH'
                  ? '偏好车型视每日库存而定。我们保证提供同等分类下相同规格的高品质车型。'
                  : 'Model pilihan menyesuaikan stok harian. Kami menjamin unit setara dengan spesifikasi identik dalam kategori yang dipilih.'}
              </p>
            </div>
          </div>

          <form id="instant-book-form" onSubmit={handleSubmit} className="space-y-4">

            {/* 1. MINIMALIST CATEGORY & PREFERRED MODEL SELECTION */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>1. {lang === 'EN' ? 'Select Category & Model' : lang === 'ZH' ? '选择车辆分类与车型' : 'Pilih Kategori & Model Motor'} <span className="text-rose-600">*</span></span>
                </label>
                <span className="text-[10px] font-extrabold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                  {lang === 'EN' ? 'No Deposit' : lang === 'ZH' ? '免押金' : 'Tanpa Deposit'}
                </span>
              </div>

              {/* 3 Main Category Cards */}
              <div className="grid grid-cols-1 gap-2">
                {FLEET_CATEGORIES.map((category) => {
                  const isSelected = primaryCategoryId === category.id;

                  return (
                    <div
                      key={category.id}
                      onClick={() => {
                        setPrimaryCategoryId(category.id);
                        handleSelectPrimaryModel(category.models[0].id);
                        if (showErrors) setShowErrors(false);
                      }}
                      className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0d9488] bg-teal-50/50 shadow-sm ring-2 ring-teal-600/20'
                          : 'border-stone-200 bg-stone-50/40 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900 leading-tight">
                              {category.title[lang]}
                            </h4>
                            <span
                              className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                                category.badgeStyle === 'amber'
                                  ? 'bg-amber-500 text-slate-950'
                                  : category.badgeStyle === 'emerald'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-teal-700 text-white'
                              }`}
                            >
                              {category.badge[lang]}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 font-medium">
                            {category.subtitle[lang]}
                          </p>
                        </div>

                        {/* Price & Selection Indicator */}
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-[#0d9488] block">
                            {category.priceDisplay[lang]}
                          </span>

                          <div className="mt-2 flex justify-end">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                isSelected ? 'border-[#0d9488] bg-[#0d9488]' : 'border-stone-300 bg-white'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Clean Preferred Model Pills (Displayed under active category) */}
                      {isSelected && (
                        <div className="mt-2.5 pt-2.5 border-t border-teal-200/80 animate-in fade-in duration-200">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-extrabold text-teal-900 uppercase mr-1">
                              {lang === 'EN' ? 'Model:' : lang === 'ZH' ? '偏好车型:' : 'Model:'}
                            </span>
                            {category.models.map((m) => {
                              const isModelSelected = primaryModelId === m.id;
                              return (
                                <button
                                  type="button"
                                  key={m.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectPrimaryModel(m.id);
                                  }}
                                  className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                                    isModelSelected
                                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                      : 'bg-white text-slate-700 border-stone-300 hover:bg-stone-100'
                                  }`}
                                >
                                  {m.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quantity Counter for Primary Category */}
              <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block">
                    {lang === 'EN' ? 'Scooter Quantity' : lang === 'ZH' ? '预订数量' : 'Jumlah Unit Motor'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {primaryModel.name} ({primaryCategory.title[lang]})
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-xl border border-stone-300 p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setPrimaryQty(Math.max(1, primaryQty - 1))}
                    className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-slate-800 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-extrabold text-slate-900">
                    {primaryQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPrimaryQty(Math.min(10, primaryQty + 1))}
                    className="w-7 h-7 rounded-lg bg-[#0d9488] hover:bg-teal-700 text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SUBTLE LINK TO TOGGLE SECONDARY BIKE */}
              {!showSecondaryBike ? (
                <div className="mt-2 text-left">
                  <button
                    type="button"
                    onClick={() => setShowSecondaryBike(true)}
                    className="text-xs font-bold text-[#0d9488] hover:text-teal-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ {lang === 'EN' ? 'Add another scooter unit' : lang === 'ZH' ? '添加其他车型/车辆' : 'Tambah unit motor lainnya'}</span>
                  </button>
                </div>
              ) : (
                /* OPTIONAL SECONDARY BIKE SELECTOR (REVEALED ON CLICK) */
                <div className="mt-3 p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-950 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                      {lang === 'EN' ? '2nd Scooter Selection' : lang === 'ZH' ? '第二辆车型选择' : 'Pilihan Motor Ke-2'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSecondaryBike(false)}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                    >
                      {lang === 'EN' ? '× Remove 2nd bike' : lang === 'ZH' ? '× 取消第二辆' : '× Hapus motor ke-2'}
                    </button>
                  </div>

                  {/* Secondary Category Picker */}
                  <div>
                    <label className="text-[10px] font-extrabold text-teal-900 uppercase block mb-1">
                      {lang === 'EN' ? 'Category:' : lang === 'ZH' ? '分类:' : 'Kategori:'}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {FLEET_CATEGORIES.map((cat) => (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => {
                            setSecondaryCategoryId(cat.id);
                            setSecondaryModelId(cat.models[0].id);
                          }}
                          className={`p-2 rounded-xl text-center text-xs font-bold border transition-all cursor-pointer ${
                            secondaryCategoryId === cat.id
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-white text-slate-700 border-teal-200 hover:bg-teal-100/50'
                          }`}
                        >
                          <span className="block truncate">{cat.title[lang].split('/')[0].trim()}</span>
                          <span className="text-[9px] opacity-80 block">Rp {cat.basePrice / 1000}k</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Model Picker */}
                  <div>
                    <label className="text-[10px] font-extrabold text-teal-900 uppercase block mb-1">
                      {lang === 'EN' ? 'Model:' : lang === 'ZH' ? '车型:' : 'Model:'}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {secondaryCategory.models.map((m) => (
                        <button
                          type="button"
                          key={m.id}
                          onClick={() => setSecondaryModelId(m.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                            secondaryModelId === m.id
                              ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                              : 'bg-white text-slate-700 border-teal-200 hover:bg-white'
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Qty Counter */}
                  <div className="flex items-center justify-between pt-1 border-t border-teal-200/60">
                    <span className="text-xs font-bold text-teal-950">
                      {lang === 'EN' ? '2nd Bike Qty:' : lang === 'ZH' ? '第二辆数量:' : 'Jumlah Motor Ke-2:'}
                    </span>
                    <div className="flex items-center gap-2 bg-white rounded-xl border border-teal-300 p-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setSecondaryQty(Math.max(1, secondaryQty - 1))}
                        className="w-6 h-6 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-900 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-extrabold text-slate-900">
                        {secondaryQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSecondaryQty(Math.min(10, secondaryQty + 1))}
                        className="w-6 h-6 rounded-lg bg-[#0d9488] hover:bg-teal-700 text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. DELIVERY DATE & TIME */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                2. {lang === 'EN' ? 'Delivery Date & Time' : lang === 'ZH' ? '送车日期与时间' : 'Tanggal & Jam Antar'} <span className="text-rose-600">*</span>
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
                    {lang === 'EN' ? 'Time Slot (WITA)' : lang === 'ZH' ? '送车时间 (WITA)' : 'Pilihan Jam (WITA)'}
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
                          {slot} WITA
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
            </div>

            {/* 3. DELIVERY LOCATION */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                3. {lang === 'EN' ? 'Delivery Location' : lang === 'ZH' ? '送车地点' : 'Lokasi Pengantaran'} <span className="text-rose-600">*</span>
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
                      ? 'border-[#0d9488] bg-teal-50 text-teal-950 font-extrabold shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <span className="text-xs">{lang === 'EN' ? 'Airport Komodo (LBJ)' : lang === 'ZH' ? '科莫多机场 (LBJ)' : 'Bandara Komodo (LBJ)'}</span>
                  <span className="text-[10px] text-teal-700 font-extrabold">+Rp 20.000 / unit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLocationType('HOTEL');
                    if (showErrors && hotelName.trim()) setShowErrors(false);
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-0.5 transition-all cursor-pointer ${
                    locationType === 'HOTEL'
                      ? 'border-[#0d9488] bg-teal-50 text-teal-950 font-extrabold shadow-xs'
                      : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  <span className="text-xs">{lang === 'EN' ? 'Hotel / Villa' : lang === 'ZH' ? '酒店 / 度假村' : 'Hotel / Villa'}</span>
                  <span className="text-[10px] text-teal-700 font-extrabold">+Rp 20.000 / unit</span>
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

            {/* 4. RENTAL DURATION */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  4. {lang === 'EN' ? 'Rental Duration' : lang === 'ZH' ? '租用天数' : 'Durasi Sewa'} <span className="text-rose-600">*</span>
                </label>
                <span className={`text-xs font-extrabold ${durationDays > 0 ? 'text-[#0d9488]' : 'text-slate-400'}`}>
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

              {/* Sub-text for 24-Hour Rental clarity */}
              <p className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>
                  {lang === 'EN'
                    ? '(1 day = 24-Hour Rental)'
                    : lang === 'ZH'
                    ? '(1天 = 24小时计费)'
                    : '(1 hari = Sewa 24 Jam)'}
                </span>
              </p>

              {showErrors && durationDays === 0 && (
                <p className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'EN' ? 'Required: Please select rental duration.' : lang === 'ZH' ? '必填：请选择租用天数。' : 'Wajib: Harap pilih durasi sewa.'}</span>
                </p>
              )}
            </div>

            {/* DYNAMIC COST ESTIMATE BOX */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5 shadow-inner border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>
                  {durationDays > 0
                    ? `${totalUnits} ${lang === 'EN' ? 'Unit(s)' : lang === 'ZH' ? '辆' : 'Unit'} x ${durationDays} ${lang === 'EN' ? 'days' : lang === 'ZH' ? '天' : 'hari'}`
                    : (lang === 'EN' ? 'Scooter Rental Subtotal' : lang === 'ZH' ? '车辆租金小计' : 'Subtotal Sewa Motor')}
                </span>
                <span className="font-bold text-white">
                  {durationDays > 0 ? `Rp ${subtotalMotorcyclesCost.toLocaleString('id-ID')}` : 'Rp -'}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>
                  {lang === 'EN' ? 'Delivery Fee' : lang === 'ZH' ? '送车服务费' : 'Ongkir Antar'} ({totalUnits} Unit)
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
                      {lang === 'EN' ? 'Rp - (Complete form)' : lang === 'ZH' ? 'Rp - (请填写完整选项)' : 'Rp - (Lengkapi detail)'}
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
                    ? 'bg-[#0d9488] hover:bg-teal-700 active:bg-teal-800 text-white shadow-xl shadow-teal-700/30 active:scale-98 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
                title={!isFormValid ? getMissingFieldsText() : ''}
              >
                <MessageCircle className={`w-5 h-5 ${isFormValid ? 'fill-white text-teal-600' : 'fill-slate-400 text-slate-200'}`} />
                <span>
                  {lang === 'EN'
                    ? 'CONFIRM & BOOK VIA WHATSAPP ⚡'
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
