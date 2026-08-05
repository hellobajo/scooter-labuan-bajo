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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Floating Tooltip Card */}
      <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold py-2 px-3.5 rounded-full shadow-xl border border-slate-700 animate-in fade-in slide-in-from-right-2 duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span>{lang === 'EN' ? 'Chat with us' : lang === 'ZH' ? '在线咨询' : 'Chat dengan kami'}</span>
      </div>

      {/* Floating Button with Pulse Effect */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="relative group p-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full shadow-2xl hover:shadow-teal-600/50 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        <span className="absolute -inset-1 rounded-full bg-teal-400 opacity-40 group-hover:opacity-75 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-teal-600 relative z-10" />
      </a>
    </div>
  );
};

