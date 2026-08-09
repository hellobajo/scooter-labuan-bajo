import React from 'react';
import { Language } from '../data/translations';
import { Camera, Star, ShieldCheck } from 'lucide-react';
import { HANDOVER_GALLERY_IMAGES } from '../data/images';

interface SocialProofGalleryProps {
  lang: Language;
}

export const SocialProofGallery: React.FC<SocialProofGalleryProps> = ({ lang }) => {
  // We duplicate the image list to create a seamless infinite marquee loop
  const marqueeItems = [...HANDOVER_GALLERY_IMAGES, ...HANDOVER_GALLERY_IMAGES];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-stone-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 mb-4 rounded-full bg-teal-50 border border-teal-100">
            <Camera className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              {lang === 'EN' ? 'Real Deliveries. Happy Customers.' : lang === 'ZH' ? '真实交车，满意的客户' : 'Pengantaran Nyata. Pelanggan Puas.'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            {lang === 'EN' 
              ? 'Trusted Handover Gallery' 
              : lang === 'ZH' 
              ? '实景交车与旅行者风采' 
              : 'Galeri Serah Terima Motor'}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            {lang === 'EN'
              ? 'Hover or tap photos to pause. We deliver clean, fueled scooters directly to Komodo Airport (LBJ) and luxury hotels across Labuan Bajo.'
              : lang === 'ZH'
              ? '悬停或轻触照片可暂停滚动。我们直接将准备就绪的摩托车送到科莫多机场 (LBJ) 及各大酒店。'
              : 'Arahkan kursor atau sentuh foto untuk jeda. Kami mengantar motor bersih dan siap pakai langsung ke Bandara & Hotel.'}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>5.0 {lang === 'EN' ? 'Customer Rating' : 'Rating Pelanggan'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'EN' ? 'Verified Airport & Hotel Delivery' : 'Pengantaran Terverifikasi'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        
        {/* Subtle Fade Vignette Overlays on Left & Right */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex w-max gap-4 sm:gap-6 animate-marquee">
          {marqueeItems.map((img, idx) => (
            <div 
              key={`${img.id}-${idx}`} 
              className="relative w-[260px] sm:w-[320px] aspect-[4/5] shrink-0 rounded-3xl overflow-hidden shadow-lg shadow-stone-200/60 group transition-all cursor-pointer border border-stone-100"
            >
              <img 
                src={img.url} 
                alt="HelloBajo Handover"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
