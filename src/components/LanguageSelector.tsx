import { flagSources } from '../data/flags';
import React, { useEffect, useId, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import type { Language } from '../data/translations';

export const LANGUAGE_OPTIONS: { code: Language; name: string; locale: string; flag: keyof typeof flagSources }[] = [
  { code: 'EN', name: 'English', locale: 'en', flag: 'gb' },
  { code: 'ZH', name: '中文', locale: 'zh-CN', flag: 'cn' },
  { code: 'ES', name: 'Español', locale: 'es', flag: 'es' },
  { code: 'IT', name: 'Italiano', locale: 'it', flag: 'it' },
  { code: 'ID', name: 'Indonesia', locale: 'id', flag: 'id' },
  { code: 'JA', name: '日本語', locale: 'ja', flag: 'jp' },
];

export function LanguageSelector({ language, onChange }: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const active = LANGUAGE_OPTIONS.find(option => option.code === language) ?? LANGUAGE_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) options.current[LANGUAGE_OPTIONS.findIndex(option => option.code === language)]?.focus();
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
    }}>
      <button ref={trigger} type="button" aria-label={`Language: ${active.name}`}
        aria-haspopup="menu" aria-expanded={open} aria-controls={menuId}
        onClick={() => setOpen(value => !value)}
        onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault(); setOpen(true);
          }
        }}
        className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 cursor-pointer">
        <img src={flagSources[active.flag]} width="24" height="16" alt="" className="h-4 w-6 object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
      </button>
      {open && (
        <div id={menuId} role="menu" aria-label="Language" className="absolute right-0 top-full mt-2 w-48 max-w-[calc(100vw-2rem)] rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl z-[60]"
          onKeyDown={event => {
            const index = options.current.indexOf(document.activeElement as HTMLButtonElement);
            let next: number | undefined;
            if (event.key === 'ArrowDown') next = (index + 1) % LANGUAGE_OPTIONS.length;
            if (event.key === 'ArrowUp') next = (index + LANGUAGE_OPTIONS.length - 1) % LANGUAGE_OPTIONS.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = LANGUAGE_OPTIONS.length - 1;
            if (next !== undefined) { event.preventDefault(); options.current[next]?.focus(); }
            if (event.key === 'Escape') { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
          }}>
          {LANGUAGE_OPTIONS.map((option, index) => (
            <button key={option.code} ref={element => { options.current[index] = element; }}
              type="button" role="menuitemradio" aria-checked={language === option.code}
              lang={option.locale} onClick={() => {
                onChange(option.code); setOpen(false); trigger.current?.focus();
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-teal-700 ${language === option.code ? 'bg-teal-50 text-teal-900 font-semibold' : 'text-slate-700 hover:bg-stone-100'}`}>
              <img src={flagSources[option.flag]} width="24" height="16" alt="" className="h-4 w-6 shrink-0 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
              <span className="flex-1">{option.name}</span>
              {language === option.code && <Check aria-hidden="true" className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
