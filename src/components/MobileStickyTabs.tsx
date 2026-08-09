import React, { useEffect, useState, useRef } from 'react';
import { Language } from '../data/translations';

interface MobileStickyTabsProps {
  lang: Language;
}

interface TabItem {
  id: string;
  labels: {
    EN: string;
    ID: string;
    ZH: string;
  };
}

const TABS: TabItem[] = [
  { id: 'hero', labels: { EN: "Let's Ride", ID: 'Beranda', ZH: '首页' } },
  { id: 'how-it-works', labels: { EN: 'How It Works', ID: 'Cara Kerja', ZH: '预订流程' } },
  { id: 'fleet', labels: { EN: 'Fleet & Rates', ID: 'Pilihan Motor', ZH: '车型价格' } },
  { id: 'why-us', labels: { EN: 'Why Us', ID: 'Keunggulan', ZH: '选择我们' } },
  { id: 'gallery', labels: { EN: 'Gallery', ID: 'Galeri', ZH: '客照展示' } },
  { id: 'faq', labels: { EN: 'FAQ', ID: 'FAQ', ZH: '常见问题' } },
];

export const MobileStickyTabs: React.FC<MobileStickyTabsProps> = ({ lang }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const navContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130; // Offset for header + tab bar height

      let currentSection = TABS[0].id;
      for (const tab of TABS) {
        const element = document.getElementById(tab.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            currentSection = tab.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-scroll the active tab into view horizontally inside the nav container
  useEffect(() => {
    const activeTabElem = tabRefs.current[activeSection];
    if (activeTabElem && navContainerRef.current) {
      activeTabElem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeSection]);

  const handleTabClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 110; // offset for sticky header + sub-menu

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-xs">
      <div
        ref={navContainerRef}
        className="flex items-center gap-2 px-3 py-2 overflow-x-auto hide-scrollbar scroll-smooth whitespace-nowrap min-w-full"
      >
        {TABS.map((tab) => {
          const isActive = activeSection === tab.id;
          const label = tab.labels[lang] || tab.labels.EN;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClick={() => handleTabClick(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30 ring-1 ring-teal-600'
                  : 'bg-stone-100 text-slate-600 hover:text-slate-900 hover:bg-stone-200/80 border border-stone-200/60'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
