import React from 'react';
import { TranslationContent, Language } from '../data/translations';
import { MessageCircle, ShieldCheck, Heart, MapPin, Mail, Globe, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface FooterProps {
  t: TranslationContent;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ t, lang }) => {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'EN'
      ? 'Hi HelloBajo! I have a question regarding scooter rental in Labuan Bajo.'
      : lang === 'ZH'
      ? '你好 HelloBajo！我想咨询在拉布安巴佐租摩托车的相关信息。'
      : 'Halo HelloBajo! Saya mau tanya info sewa motor di Labuan Bajo.'
  )}`;

  return (
    <footer className="bg-[#f4efe6] text-slate-800 pt-12 sm:pt-16 pb-12 border-t border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-stone-300/70">
          
          {/* Brand Logo & Subtitle */}
          <div className="space-y-3 max-w-md">
            <a href="#" className="inline-block" aria-label="HelloBajo Home">
              <img 
                src={SITE_CONFIG.logo} 
                alt={SITE_CONFIG.name} 
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" 
              />
            </a>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-teal-800 font-medium">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Labuan Bajo, Flores, Nusa Tenggara Timur</span>
            </div>
          </div>

          {/* Contact Buttons & Main Website */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <a
              href={SITE_CONFIG.mainWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all active:scale-95 group"
            >
              <Globe className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Visit Travel Blog (hellobajo.com/blog)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-emerald-600/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{SITE_CONFIG.whatsappDisplay}</span>
            </a>

            <a 
              href={`mailto:${SITE_CONFIG.email}`} 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 hover:text-teal-700 transition-colors font-medium px-1"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>

        </div>

        {/* Verified Badge Notice */}
        <div className="py-5 border-b border-stone-300/60 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-700 font-medium text-center">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>{t.footer.verifiedText}</span>
        </div>

        {/* Bottom Copyright & Location */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-700 font-medium">
          <p>{t.footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>in Labuan Bajo</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
