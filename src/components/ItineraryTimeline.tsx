import React from 'react';
import { TranslationContent, Language } from '../data/translations';
import { Compass, MessageCircle, ShieldCheck, Key, CheckCircle } from 'lucide-react';

interface HowItWorksProps {
  t: TranslationContent;
  lang: Language;
}

export const ItineraryTimeline: React.FC<HowItWorksProps> = ({ t, lang }) => {
  const stepIcons = [Compass, MessageCircle, ShieldCheck, Key];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching exact design */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            {t.howItWorks.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t.howItWorks.title}
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.howItWorks.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Compass;
            return (
              <div 
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50/60 border border-stone-200/70 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-teal-100/70 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Step Number */}
                <span className="text-xs font-extrabold text-teal-700 uppercase tracking-widest mb-1">
                  {step.stepNumber}
                </span>

                {/* Step Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Commitment Alert Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-teal-50/90 border border-teal-200 text-slate-800 text-xs sm:text-sm leading-relaxed flex items-start sm:items-center gap-3 shadow-sm max-w-4xl mx-auto">
          <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-slate-800 font-semibold">
            {t.howItWorks.alertBanner}
          </p>
        </div>

      </div>
    </section>
  );
};
