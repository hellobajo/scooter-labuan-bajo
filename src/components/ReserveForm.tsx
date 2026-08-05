import React, { useState, useEffect, useMemo } from 'react';
import { TranslationContent, Language } from '../data/translations';
import { MessageCircle, Calendar, Clock, MapPin, AtSign, ShieldCheck, Calculator, AlertCircle, Info } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface ReserveFormProps {
  t: TranslationContent;
  lang: Language;
  selectedBikeId?: string;
  onBikeChange?: (bikeId: string) => void;
}

const HOURLY_TIMES = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

const BIKES = [
  { id: 'beat', name: 'Honda Beat (or similar)', rate: 100000, labelEN: 'Honda Beat (or similar) – Rp 100k/day', labelZH: 'Honda Beat (或同级车型) – Rp 100k/天', labelID: 'Honda Beat (atau sejenis) – Rp 100rb/hari' },
  { id: 'scoopy', name: 'Honda Scoopy (or similar)', rate: 120000, labelEN: 'Honda Scoopy (or similar) – Rp 120k/day', labelZH: 'Honda Scoopy (或同级车型) – Rp 120k/天', labelID: 'Honda Scoopy (atau sejenis) – Rp 120rb/hari' },
  { id: 'nmax', name: 'Yamaha NMAX (or similar)', rate: 175000, labelEN: 'Yamaha NMAX (or similar) – Rp 175k/day', labelZH: 'Yamaha NMAX (或同级车型) – Rp 175k/天', labelID: 'Yamaha NMAX (atau sejenis) – Rp 175rb/hari' },
];

const LOCATION_OPTIONS_EN = [
  'Komodo Airport (LBJ)',
  'Labuan Bajo Town Center',
  'Waecicu Area (Ayana, Meruorah, Sylvia)',
  'Pelabuhan / Marina Harbour',
  'Katamaran / La Prima Hotel',
  'Marriott Ta\'aktana Resort',
  'Sudamala / Bintang Flores Resort',
  'Custom Hotel / Villa / Other',
];

const LOCATION_OPTIONS_ZH = [
  '科莫多机场 (LBJ)',
  '拉布安巴佐镇中心',
  'Waecicu 区域 (阿雅娜, Meruorah, Sylvia)',
  '码头 / Marina Harbour',
  'Katamaran / La Prima 酒店',
  'Marriott Ta\'aktana 渡假村',
  'Sudamala / Bintang Flores 渡假村',
  '自定义酒店 / 民宿 / 其他',
];

const LOCATION_OPTIONS_ID = [
  'Komodo Airport (LBJ)',
  'Labuan Bajo Town Center',
  'Waecicu Area (Ayana, Meruorah, Sylvia)',
  'Pelabuhan / Marina Harbour',
  'Katamaran / La Prima Hotel',
  'Marriott Ta\'aktana Resort',
  'Sudamala / Bintang Flores Resort',
  'Custom Hotel / Villa / Other',
];

// Helper to get WITA timezone (Labuan Bajo, UTC+8) date object
const getWitaNow = () => {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const witaMs = utcMs + 8 * 60 * 60 * 1000;
  return new Date(witaMs);
};

export const ReserveForm: React.FC<ReserveFormProps> = ({ t, lang, selectedBikeId: propSelectedBikeId, onBikeChange }) => {
  // Get WITA date and time
  const witaNow = getWitaNow();
  const witaYear = witaNow.getFullYear();
  const witaMonth = String(witaNow.getMonth() + 1).padStart(2, '0');
  const witaDay = String(witaNow.getDate()).padStart(2, '0');
  const witaTodayISO = `${witaYear}-${witaMonth}-${witaDay}`;
  const currentWitaHour = witaNow.getHours(); // e.g. 20 for 20:00

  // Calculate WITA tomorrow
  const witaTomorrowObj = new Date(witaNow);
  witaTomorrowObj.setDate(witaTomorrowObj.getDate() + 1);
  const witaTomorrowISO = `${witaTomorrowObj.getFullYear()}-${String(witaTomorrowObj.getMonth() + 1).padStart(2, '0')}-${String(witaTomorrowObj.getDate()).padStart(2, '0')}`;

  const witaDayAfterObj = new Date(witaNow);
  witaDayAfterObj.setDate(witaDayAfterObj.getDate() + 2);
  const witaDayAfterISO = `${witaDayAfterObj.getFullYear()}-${String(witaDayAfterObj.getMonth() + 1).padStart(2, '0')}-${String(witaDayAfterObj.getDate()).padStart(2, '0')}`;

  // If today in WITA is past operating hours (past 5:00 PM / 17:00), default pickup to tomorrow!
  const isTodayPastHours = currentWitaHour >= 17;
  const initialPickupDate = isTodayPastHours ? witaTomorrowISO : witaTodayISO;
  const initialDropoffDate = isTodayPastHours ? witaDayAfterISO : witaTomorrowISO;

  // State
  const [selectedBikeId, setSelectedBikeId] = useState(propSelectedBikeId || '');

  useEffect(() => {
    if (propSelectedBikeId) {
      setSelectedBikeId(propSelectedBikeId);
    }
  }, [propSelectedBikeId]);
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState('8:00 AM');
  const [dropoffDate, setDropoffDate] = useState(initialDropoffDate);
  const [dropoffTime, setDropoffTime] = useState('8:00 AM');

  // Location state
  const [deliveryAreaOption, setDeliveryAreaOption] = useState('');
  const [customDeliveryText, setCustomDeliveryText] = useState('');
  
  const [returnAreaOption, setReturnAreaOption] = useState('');
  const [customReturnText, setCustomReturnText] = useState('');

  const [socialHandle, setSocialHandle] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  // Helper to parse time string to hour number (0 - 23)
  const parseHour = (timeStr: string): number => {
    let hour = 8;
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      const parts = timeStr.replace(/(AM|PM)/i, '').trim().split(':');
      hour = parseInt(parts[0], 10);
      if (timeStr.toUpperCase().includes('PM') && hour < 12) hour += 12;
      if (timeStr.toUpperCase().includes('AM') && hour === 12) hour = 0;
    }
    return hour;
  };

  // Filter pickup times dynamically based on selected date & current WITA time
  const availablePickupTimes = useMemo(() => {
    if (pickupDate === witaTodayISO) {
      // Allow only hours strictly greater than current WITA hour
      const filtered = HOURLY_TIMES.filter((timeStr) => {
        const hour = parseHour(timeStr);
        return hour > currentWitaHour;
      });
      return filtered;
    }
    return HOURLY_TIMES;
  }, [pickupDate, witaTodayISO, currentWitaHour]);

  // Ensure pickupTime is valid whenever availablePickupTimes changes
  useEffect(() => {
    if (availablePickupTimes.length > 0 && !availablePickupTimes.includes(pickupTime)) {
      setPickupTime(availablePickupTimes[0]);
    }
  }, [availablePickupTimes, pickupTime]);

  // Minimum dropoff date calculation: must be at least same date or 1 day after pickup
  const minDropoffDateISO = useMemo(() => {
    if (!pickupDate) return witaTodayISO;
    const pDate = new Date(pickupDate);
    pDate.setDate(pDate.getDate() + 1);
    return pDate.toISOString().split('T')[0];
  }, [pickupDate, witaTodayISO]);

  // Handle pickup date change & ensure dropoff date is updated if invalid
  const handlePickupDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPickup = e.target.value;
    setPickupDate(newPickup);

    const pDate = new Date(newPickup);
    const minDrop = new Date(pDate);
    minDrop.setDate(minDrop.getDate() + 1);
    const minDropISO = minDrop.toISOString().split('T')[0];

    if (!dropoffDate || dropoffDate <= newPickup) {
      setDropoffDate(minDropISO);
    }
  };

  // Live Price Calculator
  const calculation = useMemo(() => {
    const currentBike = BIKES.find((b) => b.id === selectedBikeId) || BIKES[0];
    const dailyRate = currentBike.rate;

    if (!pickupDate || !dropoffDate) {
      return {
        fullDays: 1,
        overtimeHours: 0,
        basePrice: dailyRate,
        overtimePrice: 0,
        deliveryFee: 40000,
        totalEstimate: dailyRate + 40000,
      };
    }

    const pDate = new Date(pickupDate);
    pDate.setHours(parseHour(pickupTime), 0, 0, 0);

    const dDate = new Date(dropoffDate);
    dDate.setHours(parseHour(dropoffTime), 0, 0, 0);

    // Difference in milliseconds and hours
    const diffMs = dDate.getTime() - pDate.getTime();
    let totalHours = Math.max(1, Math.round(diffMs / (1000 * 60 * 60)));

    // Minimum rental is 1 day (24 hours)
    if (totalHours < 24) {
      totalHours = 24;
    }

    let fullDays = Math.floor(totalHours / 24);
    let overtimeHours = totalHours % 24;

    // Overtime logic: Rp 15,000 / hour, up to 4 hours max.
    // If overtime is 5+ hours, automatically count as +1 full additional day rental.
    if (overtimeHours >= 5) {
      fullDays += 1;
      overtimeHours = 0;
    }

    const basePrice = fullDays * dailyRate;
    const overtimePrice = overtimeHours * 15000;
    const deliveryFee = 40000; // Rp 20,000 for pickup + Rp 20,000 for drop-off
    const totalEstimate = basePrice + overtimePrice + deliveryFee;

    return {
      fullDays,
      overtimeHours,
      basePrice,
      overtimePrice,
      deliveryFee,
      totalEstimate,
    };
  }, [selectedBikeId, pickupDate, pickupTime, dropoffDate, dropoffTime]);

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBikeId) {
      alert(lang === 'EN' ? 'Please select a scooter model.' : lang === 'ZH' ? '请选择摩托车型号。' : 'Harap pilih jenis motor terlebih dahulu.');
      return;
    }

    if (!deliveryAreaOption) {
      alert(lang === 'EN' ? 'Please select a delivery / pickup location area.' : lang === 'ZH' ? '请选择送车/取车地点。' : 'Harap pilih area lokasi pengantaran motor.');
      return;
    }

    if (!returnAreaOption) {
      alert(lang === 'EN' ? 'Please select a return / drop-off location area.' : lang === 'ZH' ? '请选择还车地点。' : 'Harap pilih area lokasi pengembalian motor.');
      return;
    }

    if (!ageConfirmed) {
      alert(lang === 'EN' ? 'Please confirm rider age (20 - 65 years).' : lang === 'ZH' ? '请确认骑行者年龄在 20 - 65 岁之间。' : 'Harap konfirmasi usia pengendara (20 - 65 tahun).');
      return;
    }

    const selectedBike = BIKES.find((b) => b.id === selectedBikeId) || BIKES[0];

    // Final Location Strings
    const finalPickupLocation =
      deliveryAreaOption === 'Custom Hotel / Villa / Other'
        ? customDeliveryText || 'Custom Hotel / Villa'
        : deliveryAreaOption;

    let finalReturnLocation = '';
    if (returnAreaOption === 'Same as Delivery Area') {
      finalReturnLocation = `Same as Delivery Area (${finalPickupLocation})`;
    } else if (returnAreaOption === 'Custom Hotel / Villa / Other') {
      finalReturnLocation = customReturnText || 'Custom Return Location';
    } else {
      finalReturnLocation = returnAreaOption;
    }

    const formattedMessage =
      lang === 'EN'
        ? `Hi HelloBajo! I would like to book a scooter:\n\n` +
          `🛵 *SCOOTER BOOKING REQUEST*\n` +
          `• *Bike:* ${selectedBike.name}\n` +
          `• *Pick-up Date & Time:* ${pickupDate} at ${pickupTime}\n` +
          `• *Drop-off Date & Time:* ${dropoffDate} at ${dropoffTime}\n` +
          `• *Pickup Location:* ${finalPickupLocation}\n` +
          `• *Return Location:* ${finalReturnLocation}\n` +
          `• *Social Handle:* ${socialHandle || 'Will provide in chat'}\n` +
          `• *Rider Age Verified:* Yes (20-65 yrs)\n\n` +
          `💰 *PRICE ESTIMATE BREAKDOWN*\n` +
          `• Base Rental (${calculation.fullDays} day${calculation.fullDays > 1 ? 's' : ''}): Rp ${calculation.basePrice.toLocaleString('id-ID')}\n` +
          (calculation.overtimeHours > 0 ? `• Overtime (${calculation.overtimeHours} hrs @ Rp 15k/hr): + Rp ${calculation.overtimePrice.toLocaleString('id-ID')}\n` : '') +
          `• Delivery & Pickup Fee: + Rp ${calculation.deliveryFee.toLocaleString('id-ID')} (Rp 20k/trip)\n` +
          `• *TOTAL ESTIMATE:* *Rp ${calculation.totalEstimate.toLocaleString('id-ID')}*\n\n` +
          `Please confirm availability. Thank you!`
        : lang === 'ZH'
        ? `你好 HelloBajo！我想预订摩托车：\n\n` +
          `🛵 *摩托车预订请求*\n` +
          `• *车型:* ${selectedBike.name}\n` +
          `• *取车日期与时间:* ${pickupDate} ${pickupTime}\n` +
          `• *还车日期与时间:* ${dropoffDate} ${dropoffTime}\n` +
          `• *送车地点:* ${finalPickupLocation}\n` +
          `• *还车地点:* ${finalReturnLocation}\n` +
          `• *社交账号:* ${socialHandle || '稍后在聊天中提供'}\n` +
          `• *骑行者年龄核验:* 已确认 (20-65岁)\n\n` +
          `💰 *预估费用明细*\n` +
          `• 基础租金 (${calculation.fullDays} 天): Rp ${calculation.basePrice.toLocaleString('id-ID')}\n` +
          (calculation.overtimeHours > 0 ? `• 超时费 (${calculation.overtimeHours} 小时 @ Rp 15k/小时): + Rp ${calculation.overtimePrice.toLocaleString('id-ID')}\n` : '') +
          `• 接送服务费: + Rp ${calculation.deliveryFee.toLocaleString('id-ID')} (Rp 20k/单程)\n` +
          `• *预估总额:* *Rp ${calculation.totalEstimate.toLocaleString('id-ID')}*\n\n` +
          `请确认是否有车。谢谢！`
        : `Halo HelloBajo! Saya mau reservasi sewa motor:\n\n` +
          `🛵 *PEMESANAN SEWA MOTOR*\n` +
          `• *Pilihan Motor:* ${selectedBike.name}\n` +
          `• *Tanggal & Jam Ambil:* ${pickupDate} jam ${pickupTime}\n` +
          `• *Tanggal & Jam Kembali:* ${dropoffDate} jam ${dropoffTime}\n` +
          `• *Lokasi Antar / Hotel:* ${finalPickupLocation}\n` +
          `• *Lokasi Pengembalian:* ${finalReturnLocation}\n` +
          `• *Social Media:* ${socialHandle || 'Akan dikirim di chat'}\n` +
          `• *Pengendara 20-65 Thn:* Ya\n\n` +
          `💰 *RINCIAN ESTIMASI HARGA*\n` +
          `• Sewa Pokok (${calculation.fullDays} hari): Rp ${calculation.basePrice.toLocaleString('id-ID')}\n` +
          (calculation.overtimeHours > 0 ? `• Overtime (${calculation.overtimeHours} jam @ Rp 15rb/jam): + Rp ${calculation.overtimePrice.toLocaleString('id-ID')}\n` : '') +
          `• Ongkir Antar & Jemput: + Rp ${calculation.deliveryFee.toLocaleString('id-ID')} (Rp 20rb/trip)\n` +
          `• *TOTAL ESTIMASI:* *Rp ${calculation.totalEstimate.toLocaleString('id-ID')}*\n\n` +
          `Mohon konfirmasi ketersediaan unit. Terima kasih!`;

    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`, '_blank');
  };

  return (
    <section id="reserve" className="py-20 bg-[#faf8f5] border-t border-stone-200/60 scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            {t.reserve.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t.reserve.title}
          </h2>
          <p className="text-slate-700 mt-2 text-sm sm:text-base font-medium">
            {t.reserve.subtitle}
          </p>
        </div>

        {/* Clean Reservation Form Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/60 border border-stone-200/80 p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. BIKE SELECT */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.reserve.labels.bike} *
              </label>
              <select
                required
                value={selectedBikeId}
                onChange={(e) => setSelectedBikeId(e.target.value)}
                className={`w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer font-medium ${
                  !selectedBikeId ? 'text-slate-400' : 'text-slate-900'
                }`}
              >
                <option value="" disabled>
                  {lang === 'EN' ? '-- Select Scooter Model --' : lang === 'ZH' ? '-- 选择摩托车型号 --' : '-- Pilih Model Motor --'}
                </option>
                {BIKES.map((bike) => (
                  <option key={bike.id} value={bike.id} className="text-slate-800">
                    {lang === 'EN' ? bike.labelEN : lang === 'ZH' ? bike.labelZH : bike.labelID}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. PICK-UP DATE & TIME */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.reserve.labels.pickupDate} *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={witaTodayISO}
                    value={pickupDate}
                    onChange={handlePickupDateChange}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer font-medium"
                  />
                </div>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer font-medium"
                  >
                    {availablePickupTimes.length > 0 ? (
                      availablePickupTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))
                    ) : (
                      <option value="">
                        {lang === 'EN' ? 'Closed for today' : lang === 'ZH' ? '今日营业已结束' : 'Hari ini sudah tutup'}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              {pickupDate === witaTodayISO && availablePickupTimes.length === 0 && (
                <p className="text-xs font-semibold text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {lang === 'EN'
                      ? 'Operational hours for today (8:00 AM - 5:00 PM WITA) have ended. Please select tomorrow.'
                      : lang === 'ZH'
                      ? '今日营业时间 (08:00 - 17:00 WITA) 已结束，请选择明日日期。'
                      : 'Jam operasional hari ini (08:00 - 17:00 WITA) telah selesai. Silakan pilih tanggal besok.'}
                  </span>
                </p>
              )}
            </div>

            {/* 3. DROP-OFF DATE & TIME */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.reserve.labels.dropoffDate} *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={minDropoffDateISO}
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer font-medium"
                  />
                </div>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    required
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer font-medium"
                  >
                    {HOURLY_TIMES.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. HOTEL / DELIVERY AREA */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.reserve.labels.hotelPickup} *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  required
                  value={deliveryAreaOption}
                  onChange={(e) => setDeliveryAreaOption(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer font-medium ${
                    !deliveryAreaOption ? 'text-slate-400' : 'text-slate-900'
                  }`}
                >
                  <option value="" disabled>
                    {lang === 'EN' ? '-- Select Delivery / Hotel Area --' : lang === 'ZH' ? '-- 选择送车/酒店区域 --' : '-- Pilih Area Pengantaran --'}
                  </option>
                  {(lang === 'EN' ? LOCATION_OPTIONS_EN : lang === 'ZH' ? LOCATION_OPTIONS_ZH : LOCATION_OPTIONS_ID).map((loc, i) => (
                    <option key={i} value={loc} className="text-slate-800">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Input when Custom Hotel is selected */}
              {(deliveryAreaOption === 'Custom Hotel / Villa / Other' || deliveryAreaOption === '自定义酒店 / 民宿 / 其他') && (
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={customDeliveryText}
                    onChange={(e) => setCustomDeliveryText(e.target.value)}
                    placeholder={lang === 'EN' ? 'Type hotel / villa name or address...' : lang === 'ZH' ? '请输入酒店/民宿名称或详细地址...' : 'Ketik nama hotel / villa / alamat...'}
                    className="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
                  />
                </div>
              )}
            </div>

            {/* 5. RETURN AREA / DROP-OFF */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.reserve.labels.hotelDropoff} *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  required
                  value={returnAreaOption}
                  onChange={(e) => setReturnAreaOption(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer font-medium ${
                    !returnAreaOption ? 'text-slate-400' : 'text-slate-900'
                  }`}
                >
                  <option value="" disabled>
                    {lang === 'EN' ? '-- Select Return / Drop-off Area --' : lang === 'ZH' ? '-- 选择还车/退车区域 --' : '-- Pilih Area Pengembalian --'}
                  </option>
                  <option value="Same as Delivery Area" className="text-slate-800">
                    {lang === 'EN' ? 'Same as Delivery Area' : lang === 'ZH' ? '与送车地点相同' : 'Sama dengan Lokasi Antar'}
                  </option>
                  {(lang === 'EN' ? LOCATION_OPTIONS_EN : lang === 'ZH' ? LOCATION_OPTIONS_ZH : LOCATION_OPTIONS_ID).map((loc, i) => (
                    <option key={i} value={loc} className="text-slate-800">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Input when Custom Return is selected */}
              {(returnAreaOption === 'Custom Hotel / Villa / Other' || returnAreaOption === '自定义酒店 / 民宿 / 其他') && (
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={customReturnText}
                    onChange={(e) => setCustomReturnText(e.target.value)}
                    placeholder={lang === 'EN' ? 'Type return hotel / location name...' : lang === 'ZH' ? '请输入还车地点/酒店名称...' : 'Ketik lokasi pengembalian...'}
                    className="w-full px-3.5 py-2.5 bg-amber-50/60 border border-amber-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
                  />
                </div>
              )}
            </div>

            {/* 6. SOCIAL HANDLE */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.reserve.labels.social} *
              </label>
              <div className="relative">
                <AtSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                  placeholder={lang === 'EN' ? '@username (Instagram / TikTok / Facebook)' : lang === 'ZH' ? '@社交账号 (用于核验的 Instagram / TikTok / 脸书账号)' : '@username (Nama Instagram / TikTok / Facebook)'}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* 7. AGE CONFIRMATION CHECKBOX */}
            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/70 flex items-center gap-2.5">
              <input
                type="checkbox"
                id="ageCheck"
                required
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 border-stone-300 cursor-pointer shrink-0"
              />
              <label htmlFor="ageCheck" className="text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer select-none">
                {t.reserve.labels.ageCheckbox} *
              </label>
            </div>

            {/* 8. LIVE TOTAL ESTIMATE CALCULATOR BOX */}
            <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200 text-slate-800 space-y-2.5 shadow-sm">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-700">
                <span>
                  {lang === 'EN' ? `Base Rental (${calculation.fullDays} day${calculation.fullDays > 1 ? 's' : ''})` : lang === 'ZH' ? `基础租金 (${calculation.fullDays} 天)` : `Sewa Pokok (${calculation.fullDays} hari)`}
                </span>
                <span className="font-bold text-slate-900">
                  Rp {calculation.basePrice.toLocaleString('id-ID')}
                </span>
              </div>

              {calculation.overtimeHours > 0 && (
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-sky-800">
                  <span>
                    {lang === 'EN'
                      ? `Overtime (${calculation.overtimeHours} hrs @ Rp 15,000/hr)`
                      : lang === 'ZH'
                      ? `超时费 (${calculation.overtimeHours} 小时 @ Rp 15k/小时)`
                      : `Overtime (${calculation.overtimeHours} jam @ Rp 15rb/jam)`}
                  </span>
                  <span className="font-bold">
                    + Rp {calculation.overtimePrice.toLocaleString('id-ID')}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-slate-700">
                <span>
                  {lang === 'EN' ? 'Delivery & Pickup Fee (Rp 20k / trip)' : lang === 'ZH' ? '接送服务费 (Rp 20k / 单程)' : 'Ongkir Antar & Jemput (Rp 20rb / trip)'}
                </span>
                <span className="font-bold text-slate-900">
                  + Rp {calculation.deliveryFee.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="border-t border-sky-200 pt-3 flex justify-between items-center">
                <span className="text-sm sm:text-base font-extrabold text-sky-950">
                  {lang === 'EN' ? 'Total Estimate' : lang === 'ZH' ? '预估总额' : 'Total Estimasi'}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-teal-700">
                  Rp {calculation.totalEstimate.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex items-start gap-1.5 pt-1 text-[11px] text-slate-600 font-medium">
                <Info className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  {lang === 'EN'
                    ? 'Overtime rate is Rp 15,000/hr (up to 4 hrs max). Rentals exceeding 4 hrs overtime automatically count as 1 full additional day.'
                    : lang === 'ZH'
                    ? '超时费为 Rp 15,000/小时 (最多 4 小时)。超过 4 小时将自动按 1 天整算。'
                    : 'Tarif overtime Rp 15.000/jam (maksimal 4 jam). Lebih dari 4 jam otomatis dihitung sewa 1 hari penuh.'}
                </span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-teal-600/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer mt-4"
            >
              <MessageCircle className="w-5 h-5 fill-white text-teal-600" />
              <span>{t.reserve.labels.submitBtn}</span>
            </button>

            <p className="text-center text-xs text-slate-500 mt-3">
              {t.reserve.labels.note}
            </p>

          </form>
        </div>

      </div>
    </section>
  );
};
