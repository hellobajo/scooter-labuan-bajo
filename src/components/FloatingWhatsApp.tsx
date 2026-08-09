import React from 'react';
import { Language } from '../data/translations';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'EN'
      ? 'Hi HelloBajo! I am interested in renting a scooter in Labuan Bajo.'
      : lang === 'ZH'
      ? '你好 HelloBajo！我想咨询在拉布安巴佐租摩托车。'
      : 'Halo HelloBajo! Saya mau tanya booking sewa motor di Labuan Bajo.'
  )}`;

  const chatText = lang === 'EN' ? 'Chat with us' : lang === 'ZH' ? '在线咨询' : 'Chat dengan kami';

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-[46] flex items-center">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="relative group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-full shadow-2xl hover:shadow-teal-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-teal-400/30 backdrop-blur-sm"
      >
        <span className="absolute -inset-0.5 rounded-full bg-teal-400 opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />
        
        {/* WA icon with online indicator */}
        <div className="relative flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-teal-600 relative z-10" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-teal-700"></span>
          </span>
        </div>

        {/* Text Label */}
        <span className="relative z-10 text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
          {chatText}
        </span>
      </a>
    </div>
  );
};


