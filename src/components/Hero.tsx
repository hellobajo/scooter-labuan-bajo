import React from 'react';
import { TranslationContent, Language } from '../data/translations';
import { MessageCircle, Check, ShieldCheck, Truck, Clock, Key } from 'lucide-react';
import { HERO_IMAGE, SCOOTER_IMAGES } from '../data/images';
import { SITE_CONFIG } from '../data/siteConfig';

interface HeroProps {
  t: TranslationContent;
  lang: Language;
  onOpenReserveModal?: (bikeId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ t, lang, onOpenReserveModal }) => {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'EN'
      ? 'Hi HelloBajo! I am interested in renting a scooter in Labuan Bajo.'
      : 'Halo HelloBajo! Saya mau tanya sewa motor di Labuan Bajo.'
  )}`;

  return (
    <section id="hero" className="relative bg-[#faf8f5] text-slate-900 pt-10 pb-16 sm:py-20 overflow-hidden border-b border-stone-200/60">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ITEM 1: Headline & Subtitle (Left on Desktop, Top on Mobile) */}
          <div className="w-full lg:col-span-7 lg:col-start-1 space-y-4 sm:space-y-6 text-left order-1">
            {/* EST Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 border border-teal-200 text-teal-800 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>{t.hero.estTag}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {t.hero.titleLine1} <br className="hidden sm:inline" />
              <span className="text-teal-600">
                {t.hero.titleLine2}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
              {lang === 'EN'
                ? 'Explore Labuan Bajo on your own terms. We deliver well-maintained scooters directly to Komodo Airport (LBJ), your hotel, or villa. Zero deposit and fast WhatsApp response.'
                : lang === 'ZH'
                ? '随心探索拉布安巴佐。免费送车至科莫多机场 (LBJ)、酒店或度假村。零押金，WhatsApp 快速回复。'
                : 'Jelajahi Labuan Bajo dengan fleksibel. Motor siap antar ke Bandara Komodo (LBJ), hotel, atau villa Anda. Bebas deposit dan respon cepat via WhatsApp.'}
            </p>
          </div>

          {/* ITEM 2: HERO Image (Right Column on Desktop, 2nd position on Mobile) */}
          <div className="w-full lg:col-span-5 lg:col-start-8 lg:row-span-3 relative order-2 my-2 lg:my-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] sm:aspect-[4/3] lg:aspect-[1/1] min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] group">
              <img
                src={HERO_IMAGE}
                alt="Labuan Bajo coastal scenery"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -top-3 -right-1 sm:-right-4 bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-xl border border-stone-200/90 flex items-center gap-2 animate-bounce z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-extrabold text-slate-800">
                {lang === 'EN' ? 'Airport LBJ Delivery' : lang === 'ZH' ? '科莫多机场 LBJ 送车' : 'Siap Antar Bandara LBJ'}
              </span>
            </div>
          </div>

          {/* ITEM 3: Key Value Props Pill Grid (3rd position on Mobile, below image) */}
          <div className="w-full lg:col-span-7 lg:col-start-1 order-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl antialiased">
              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {lang === 'EN' ? 'No Security Deposit' : lang === 'ZH' ? '无需押金' : 'Bebas Deposit'}
                  </h4>
                  <p className="text-xs text-slate-600 font-normal mt-0.5">
                    {lang === 'EN' ? 'Pay only daily rate on delivery' : lang === 'ZH' ? '送车时结清日租金即可' : 'Bayar saat motor diantar'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {lang === 'EN' ? 'Easy Delivery' : lang === 'ZH' ? '送到酒店 / 机场' : 'Antar s.d Hotel / Bandara'}
                  </h4>
                  <p className="text-xs text-slate-600 font-normal mt-0.5">
                    {lang === 'EN' ? 'Only Rp 20k per trip' : lang === 'ZH' ? '单程送车费仅 Rp 20k' : 'Hanya Rp 20rb per trip'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {lang === 'EN' ? '24h Minimum Rental' : lang === 'ZH' ? '最少 1 天 (24 小时)' : 'Minimal 1 Hari (24 Jam)'}
                  </h4>
                  <p className="text-xs text-slate-600 font-normal mt-0.5">
                    {lang === 'EN' ? 'Overtime Rp 15k/hr (Max 4h)' : lang === 'ZH' ? '超时费 Rp 15k/小时 (最多 4 小时)' : 'Overtime Rp 15rb/jam (Max 4 jam)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {lang === 'EN' ? 'Quick WA Approval' : lang === 'ZH' ? 'WhatsApp 快速审核' : 'Proses Cepat WhatsApp'}
                  </h4>
                  <p className="text-xs text-slate-600 font-normal mt-0.5">
                    {lang === 'EN' ? 'Ready in 5 minutes' : lang === 'ZH' ? '5 分钟内即可确认' : 'Siap dalam 5 menit'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ITEM 4: CTAs (4th position on Mobile) */}
          <div className="w-full lg:col-span-7 lg:col-start-1 order-4">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenReserveModal ? onOpenReserveModal('nmax') : null}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-black text-sm sm:text-base rounded-full shadow-xl shadow-teal-600/30 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>⚡</span>
                <span>{lang === 'EN' ? 'BOOK NOW (Instant Delivery)' : lang === 'ZH' ? '立即预订 (即时送车)' : 'RESERVE NOW (Antar Instant)'}</span>
              </button>

              <a
                href="#fleet"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-stone-100 text-slate-800 font-extrabold text-sm rounded-full border border-stone-300 shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>🛵</span>
                <span>{lang === 'EN' ? 'Explore Scooter Fleet' : lang === 'ZH' ? '查看所有车型' : 'Lihat Pilihan Motor'}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
