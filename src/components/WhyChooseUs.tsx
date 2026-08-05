import React from 'react';
import { TranslationContent } from '../data/translations';
import { MessageSquare, ShieldCheck, CheckCircle, Truck, Shield, Heart } from 'lucide-react';

interface WhyChooseUsProps {
  t: TranslationContent;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ t }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'message-square':
        return MessageSquare;
      case 'shield-check':
        return ShieldCheck;
      case 'check-circle':
        return CheckCircle;
      case 'truck':
        return Truck;
      case 'hard-hat':
        return Shield;
      case 'heart':
        return Heart;
      default:
        return CheckCircle;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-white border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            {t.whyUs.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t.whyUs.title}
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {t.whyUs.items.map((item, idx) => {
            const IconComponent = getIcon(item.icon);

            return (
              <div
                key={idx}
                className="bg-stone-50/70 rounded-2xl p-6 sm:p-7 border border-stone-200/80 flex items-start gap-4 hover:bg-white hover:shadow-xl hover:border-teal-200 transition-all duration-300 group"
              >
                {/* Icon Capsule */}
                <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
