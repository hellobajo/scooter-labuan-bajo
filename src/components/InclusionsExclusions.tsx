import React from 'react';
import { TranslationContent } from '../data/translations';
import { CheckCircle2, XCircle, Shield, AlertCircle } from 'lucide-react';

interface InclusionsExclusionsProps {
  t: TranslationContent;
}

export const InclusionsExclusions: React.FC<InclusionsExclusionsProps> = ({ t }) => {
  return (
    <section className="py-20 bg-white border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            {t.inclusions.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            {t.inclusions.title}
          </h2>
          <p className="text-slate-700 mt-3 text-base sm:text-lg font-medium">
            {t.inclusions.subtitle}
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Includes Box */}
          <div className="bg-teal-50/60 rounded-3xl p-6 sm:p-8 border border-teal-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-teal-600 text-white rounded-2xl shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {t.inclusions.includesTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-900 font-bold">Covered by HelloBajo</p>
                </div>
              </div>

              <ul className="space-y-4">
                {t.inclusions.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-900 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-teal-200 text-xs sm:text-sm text-teal-950 flex items-center gap-2 font-bold">
              <Shield className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Full air conditioning & clean vehicle guaranteed</span>
            </div>
          </div>

          {/* Excludes Box */}
          <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-stone-200 text-slate-700 rounded-2xl shrink-0">
                  <XCircle className="w-6 h-6 text-stone-600" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {t.inclusions.excludesTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold">Paid separately during tour</p>
                </div>
              </div>

              <ul className="space-y-4">
                {t.inclusions.excludes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-800 text-xs sm:text-sm font-semibold">
                    <XCircle className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 text-xs sm:text-sm text-slate-700 flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Driver tipping is purely optional & at your discretion</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
