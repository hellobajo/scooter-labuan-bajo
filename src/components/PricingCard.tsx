import React from 'react';
import { TranslationContent, Language } from '../data/translations';
import { SCOOTER_IMAGES } from '../data/images';
import { SITE_CONFIG } from '../data/siteConfig';

interface PricingCardProps {
  t: TranslationContent;
  lang: Language;
  onSelectScooter?: (bikeId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ t, lang, onSelectScooter }) => {
  const getScooterImage = (id: string) => {
    switch (id) {
      case 'beat':
        return SCOOTER_IMAGES.beat;
      case 'scoopy':
        return SCOOTER_IMAGES.scoopy;
      case 'nmax':
        return SCOOTER_IMAGES.nmax;
      default:
        return SCOOTER_IMAGES.beat;
    }
  };

  const handleBookClick = (bikeId: string) => {
    if (onSelectScooter) {
      onSelectScooter(bikeId);
    } else {
      const reserveElement = document.getElementById('reserve');
      if (reserveElement) {
        reserveElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="fleet" className="py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            {t.fleet.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t.fleet.title}
          </h2>
          <p className="text-slate-700 mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t.fleet.subtitle}
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {t.fleet.items.map((item) => {
            const image = getScooterImage(item.id);

            return (
              <div 
                key={item.id}
                onClick={() => handleBookClick(item.id)}
                className="bg-white rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-200/80 overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div>
                  {/* Image Container with Badges - Full Edge to Edge Photo */}
                  <div className="relative h-60 sm:h-64 w-full bg-white flex items-center justify-center overflow-hidden border-b border-stone-100">
                    <img 
                      src={image} 
                      alt={item.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Right Badge (e.g. Min 1 Day / Most Popular) */}
                    {item.badge ? (
                      <span className="absolute top-4 right-4 bg-teal-100 text-teal-900 border border-teal-300 text-xs font-extrabold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-md">
                        {item.badge}
                      </span>
                    ) : item.minDaysLabel ? (
                      <span className="absolute top-4 right-4 bg-amber-50/90 text-amber-900 border border-amber-300 text-xs font-extrabold px-3 py-1 rounded-full shadow-md z-10 backdrop-blur-md">
                        {item.minDaysLabel}
                      </span>
                    ) : null}
                  </div>

                  {/* Card Body Details */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        {item.name}
                      </h3>
                      <span className="text-xs sm:text-sm text-slate-600 font-bold">
                        {item.variant}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 font-medium mt-2.5 leading-relaxed min-h-[40px]">
                      {item.description}
                    </p>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {item.specs.map((spec, specIdx) => (
                        <span 
                          key={specIdx}
                          className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Price & Action Button */}
                <div className="p-6 sm:p-7 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {item.priceFormatted}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-600 font-semibold block">
                      {lang === 'EN' ? 'per day' : lang === 'ZH' ? '/ 天' : 'per hari'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookClick(item.id)}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:shadow-teal-600/30 transition-all transform active:scale-95 cursor-pointer"
                  >
                    {t.fleet.bookBtn}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
