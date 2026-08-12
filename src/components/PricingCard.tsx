import React, { useState, useEffect, useRef } from 'react';
import { TranslationContent, Language } from '../data/translations';
import { SCOOTER_IMAGES, HERO_IMAGE, RIDING_DESTINATIONS } from '../data/images';
import { ChevronLeft, ChevronRight, Info, Sparkles, Check, Pause, Play } from 'lucide-react';

interface PricingCardProps {
  t: TranslationContent;
  lang: Language;
  onSelectScooter?: (bikeId: string) => void;
}

interface ModelVariant {
  id: string; // 'beat' | 'scoopy' | 'nmax'
  name: string;
  price: number;
  shortSpec: Record<Language, string>;
  image: string;
}

interface CategoryCardData {
  categoryId: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  categoryBadge: Record<Language, string>;
  badgeStyle: 'teal' | 'amber' | 'emerald';
  specsPills: Record<Language, string[]>;
  models: ModelVariant[];
}

export const PricingCard: React.FC<PricingCardProps> = ({ t, lang, onSelectScooter }) => {
  // 3 Category Cards Layout Specification
  const categories: CategoryCardData[] = [
    {
      categoryId: 'compact_economy',
      title: {
        EN: 'Compact / Economy',
        ID: 'Compact / Economy',
        ZH: '紧凑经济型',
      },
      description: {
        EN: 'Compact, fuel-efficient, and highly agile. Ideal for solo riders and couples cruising town streets, cafes, and beach roads.',
        ID: 'Compact, irit bahan bakar, dan sangat lincah. Cocok untuk solo traveler & pasangan keliling kota, kafe, serta jalanan pantai.',
        ZH: '小巧省油且非常灵活。非常适合单人或情侣在小镇街道、咖啡馆和海滩曲折公路上骑行。',
      },
      categoryBadge: {
        EN: 'Best Value Choice',
        ID: 'Pilihan Paling Hemat',
        ZH: '超值性价比首选',
      },
      badgeStyle: 'teal',
      specsPills: {
        EN: ['Automatic', '110cc – 125cc', 'EFI / Hybrid'],
        ID: ['Matik', '110cc – 125cc', 'EFI / Hybrid'],
        ZH: ['自动档', '110cc – 125cc', '电喷 / 轻混'],
      },
      models: [
        {
          id: 'beat',
          name: 'Honda Beat',
          price: 100000,
          shortSpec: {
            EN: '110cc eSP • Ultra Fuel-Efficient',
            ID: '110cc eSP • Super Irit',
            ZH: '110cc eSP • 超级省油',
          },
          image: SCOOTER_IMAGES.beat,
        },
        {
          id: 'scoopy',
          name: 'Honda Scoopy',
          price: 100000,
          shortSpec: {
            EN: '110cc Retro • Chic Style',
            ID: '110cc Retro • Gaya Chic',
            ZH: '110cc 复古 • 时尚外观',
          },
          image: SCOOTER_IMAGES.scoopy,
        },
        {
          id: 'beat',
          name: 'Yamaha Fazzio',
          price: 100000,
          shortSpec: {
            EN: '125cc Hybrid • Modern Chic',
            ID: '125cc Hybrid • Modern Chic',
            ZH: '125cc 混动 • 现代时尚',
          },
          image: RIDING_DESTINATIONS.goloMori,
        },
      ],
    },
    {
      categoryId: 'medium_sport',
      title: {
        EN: 'Medium / Sport',
        ID: 'Medium / Sport',
        ZH: '中型运动型',
      },
      description: {
        EN: 'Stronger horsepower & sharp acceleration for effortlessly navigating steep Labuan Bajo hill climbs, scenic viewpoints, and longer island rides.',
        ID: 'Mesin lebih bertenaga & akselerasi responsif untuk melibas tanjakan terjal Labuan Bajo, bukit pemandangan, dan perjalanan jauh.',
        ZH: '更强劲的马力与极速响应，轻松征服拉布安巴佐陡峭山路、观景台及更长途的环岛骑行。',
      },
      categoryBadge: {
        EN: 'Hill Climbing Power',
        ID: 'Tenaga Mantap Menanjak',
        ZH: '强劲爬坡动力',
      },
      badgeStyle: 'amber',
      specsPills: {
        EN: ['Automatic', '150cc – 160cc', 'Liquid Cooled'],
        ID: ['Matik', '150cc – 160cc', 'Pendingin Cairan'],
        ZH: ['自动档', '150cc – 160cc', '水冷发动机'],
      },
      models: [
        {
          id: 'scoopy',
          name: 'Honda Vario 150',
          price: 130000,
          shortSpec: {
            EN: '150cc eSP • Powerful & Agile',
            ID: '150cc eSP • Tangguh & Lincah',
            ZH: '150cc eSP • 强劲灵活',
          },
          image: HERO_IMAGE,
        },
        {
          id: 'scoopy',
          name: 'Honda Vario 160',
          price: 140000,
          shortSpec: {
            EN: '160cc eSP+ 4-Valve • Smart Key & Power',
            ID: '160cc eSP+ 4-Katup • Smart Key & Bertenaga',
            ZH: '160cc eSP+ 4气门 • 智能钥匙与强劲动力',
          },
          image: RIDING_DESTINATIONS.guaRangko,
        },
      ],
    },
    {
      categoryId: 'maxi_scooter',
      title: {
        EN: 'Maxi Scooter',
        ID: 'Maxi Scooter',
        ZH: '豪华踏板巡航',
      },
      description: {
        EN: 'Ultimate comfort & highway stability. Features generous under-seat storage for backpacks, wide plush double seat, and powerful 155cc engine.',
        ID: 'Kenyamanan maksimal & stabil di kecepatan tinggi. Bagasi ekstra luas untuk ransel, jok ganda empuk lebar, & mesin 155cc bertenaga.',
        ZH: '极佳骑乘舒适度与巡航稳定性。拥有超大座桶存储空间，宽大舒适双人座垫及强劲 155cc 引擎。',
      },
      categoryBadge: {
        EN: 'Most Popular & Comfortable',
        ID: 'Paling Populer & Nyaman',
        ZH: '最受欢迎与舒适',
      },
      badgeStyle: 'emerald',
      specsPills: {
        EN: ['Automatic', '155cc VVA', 'ABS / Disc Brake'],
        ID: ['Matik', '155cc VVA', 'Rem ABS / Cakram'],
        ZH: ['自动档', '155cc VVA', 'ABS / 碟刹'],
      },
      models: [
        {
          id: 'nmax',
          name: 'Yamaha NMAX 155',
          price: 160000,
          shortSpec: {
            EN: '155cc VVA Engine • Big Storage & Plush Seat',
            ID: '155cc Mesin VVA • Bagasi Luas & Jok Empuk',
            ZH: '155cc VVA 引擎 • 大储物箱与舒适座垫',
          },
          image: SCOOTER_IMAGES.nmax,
        },
        {
          id: 'pcx',
          name: 'Honda PCX 155',
          price: 160000,
          shortSpec: {
            EN: '155cc eSP+ • Luxury Comfort Touring',
            ID: '155cc eSP+ • Touring Mewah & Nyaman',
            ZH: '155cc eSP+ • 豪华舒适巡航',
          },
          image: RIDING_DESTINATIONS.bukitCinta,
        },
      ],
    },
  ];

  // Active Model Index per card category [0, 0, 0]
  const [activeModelIndexes, setActiveModelIndexes] = useState<number[]>([0, 0, 0]);

  // Paused state for 3s auto slide per card category
  const [isPaused, setIsPaused] = useState<boolean[]>([false, false, false]);

  // Timers store for 10-second auto-resume after user interaction
  const pauseTimers = useRef<(NodeJS.Timeout | null)[]>([null, null, null]);

  // 3s Auto-advance interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModelIndexes((prevIndexes) =>
        prevIndexes.map((currentIdx, cardIdx) => {
          if (isPaused[cardIdx]) return currentIdx;
          const totalModels = categories[cardIdx].models.length;
          return totalModels > 0 ? (currentIdx + 1) % totalModels : 0;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Trigger 10-second temporary pause on manual user interaction
  const triggerTenSecondPause = (cardIdx: number) => {
    // Set card paused state
    setIsPaused((prev) => {
      const copy = [...prev];
      copy[cardIdx] = true;
      return copy;
    });

    // Clear existing timer if any
    if (pauseTimers.current[cardIdx]) {
      clearTimeout(pauseTimers.current[cardIdx]!);
    }

    // Set new 10-second timer to resume auto-slider
    pauseTimers.current[cardIdx] = setTimeout(() => {
      setIsPaused((prev) => {
        const copy = [...prev];
        copy[cardIdx] = false;
        return copy;
      });
      pauseTimers.current[cardIdx] = null;
    }, 10000);
  };

  const handleSelectModel = (cardIdx: number, modelIdx: number) => {
    setActiveModelIndexes((prev) => {
      const copy = [...prev];
      copy[cardIdx] = modelIdx;
      return copy;
    });
    // Trigger 10s pause on user selection
    triggerTenSecondPause(cardIdx);
  };

  const handleNextModel = (cardIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModelIndexes((prev) => {
      const copy = [...prev];
      const totalModels = categories[cardIdx].models.length;
      copy[cardIdx] = (copy[cardIdx] + 1) % totalModels;
      return copy;
    });
    triggerTenSecondPause(cardIdx);
  };

  const handlePrevModel = (cardIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModelIndexes((prev) => {
      const copy = [...prev];
      const totalModels = categories[cardIdx].models.length;
      copy[cardIdx] = (copy[cardIdx] - 1 + totalModels) % totalModels;
      return copy;
    });
    triggerTenSecondPause(cardIdx);
  };

  const togglePauseManual = (cardIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Clear 10s timer if manual toggle
    if (pauseTimers.current[cardIdx]) {
      clearTimeout(pauseTimers.current[cardIdx]!);
      pauseTimers.current[cardIdx] = null;
    }

    setIsPaused((prev) => {
      const copy = [...prev];
      copy[cardIdx] = !copy[cardIdx];
      return copy;
    });
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

  const formatRupiah = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const getBookBtnText = () => {
    if (lang === 'EN') return 'Book Now';
    if (lang === 'ZH') return '立即预订';
    return 'Sewa Sekarang';
  };

  return (
    <section id="fleet" className="py-12 sm:py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-teal-800 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80 shadow-xs">
            <span>⚡</span>
            <span>{t.fleet.tag}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            {t.fleet.title}
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-base max-w-2xl mx-auto font-medium">
            {t.fleet.subtitle}
          </p>
        </div>

        {/* 3-Card Category Grid (1 Col Mobile, 3 Cols Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {categories.map((category, cardIdx) => {
            const activeModelIdx = activeModelIndexes[cardIdx];
            const activeModel = category.models[activeModelIdx];
            const totalModels = category.models.length;
            const cardIsPaused = isPaused[cardIdx];

            return (
              <div
                key={category.categoryId}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Top Image Slider Container - 100% Bright, Clean Image without dark film */}
                  <div
                    className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden select-none group/slider"
                  >
                    {/* Active Model Image - Completely bright & crisp */}
                    <img
                      src={activeModel.image}
                      alt={activeModel.name}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      {/* Left Badge: 3s Auto / Paused Toggle */}
                      <button
                        type="button"
                        onClick={(e) => togglePauseManual(cardIdx, e)}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-900 text-white text-[10px] font-extrabold rounded-full backdrop-blur-md border border-white/20 shadow-sm cursor-pointer transition-all"
                        title={
                          cardIsPaused
                            ? lang === 'EN'
                              ? 'Auto slider paused (wait 10s or click to resume)'
                              : lang === 'ZH'
                              ? '自动播放已暂停（等待10秒或点击恢复）'
                              : 'Slider otomatis dijedakan (tunggu 10d atau klik untuk lanjut)'
                            : lang === 'EN'
                            ? 'Auto slider active (3s)'
                            : lang === 'ZH'
                            ? '自动播放模式 (3秒)'
                            : 'Slider otomatis aktif (3d)'
                        }
                      >
                        {cardIsPaused ? (
                          <>
                            <Play className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                            <span className="text-amber-200">
                              {lang === 'EN' ? 'Paused (10s)' : lang === 'ZH' ? '已暂停 (10秒)' : 'Jeda (10d)'}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white">
                              {lang === 'EN' ? '3s Auto' : lang === 'ZH' ? '3秒 自动' : 'Otomatis 3d'}
                            </span>
                            <Pause className="w-2.5 h-2.5 fill-white text-white opacity-80" />
                          </>
                        )}
                      </button>

                      {/* Right Category Badge */}
                      <span
                        className={`text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full shadow-md backdrop-blur-md border ${
                          category.badgeStyle === 'amber'
                            ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-300'
                            : category.badgeStyle === 'emerald'
                            ? 'bg-emerald-600 text-white border-emerald-400/50'
                            : 'bg-teal-600 text-white border-teal-400/50'
                        }`}
                      >
                        {category.categoryBadge[lang]}
                      </span>
                    </div>

                    {/* Left & Right Nav Arrows */}
                    {totalModels > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => handlePrevModel(cardIdx, e)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md transition-opacity opacity-80 sm:opacity-0 group-hover/slider:opacity-100 z-10 cursor-pointer border border-white/20 shadow-md"
                          aria-label="Previous model"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleNextModel(cardIdx, e)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md transition-opacity opacity-80 sm:opacity-0 group-hover/slider:opacity-100 z-10 cursor-pointer border border-white/20 shadow-md"
                          aria-label="Next model"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Bottom Overlay Pill: Minimalist 1-Line Active Model Label & Counter */}
                    <div className="absolute bottom-2.5 inset-x-2.5 sm:inset-x-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-md flex items-center gap-1.5 text-white max-w-[75%] min-w-0">
                        <Sparkles className="w-3 h-3 text-teal-400 fill-teal-400 shrink-0" />
                        <span className="text-[11px] font-extrabold text-teal-300 truncate whitespace-nowrap">
                          {activeModel.name}
                        </span>
                      </div>

                      {/* Counter Box (e.g., 1 / 3) */}
                      {totalModels > 1 && (
                        <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] font-black text-slate-200 shadow-md shrink-0 whitespace-nowrap">
                          <span>{activeModelIdx + 1}/{totalModels}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 space-y-4">
                    
                    {/* Category Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {category.title[lang]}
                    </h3>

                    {/* Category Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed min-h-[40px]">
                      {category.description[lang]}
                    </p>

                    {/* Available Models Section */}
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider block mb-2">
                        {lang === 'EN' ? 'AVAILABLE MODELS:' : lang === 'ZH' ? '可选车型:' : 'MODEL TERSEDIA:'}
                      </span>
                      
                      {/* Interactive Chips (Clicking temporarily pauses slider for 10s to view selection) */}
                      <div className="flex flex-wrap gap-1.5">
                        {category.models.map((model, mIdx) => {
                          const isSelected = mIdx === activeModelIdx;
                          return (
                            <button
                              key={mIdx}
                              type="button"
                              onClick={() => handleSelectModel(cardIdx, mIdx)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0d9488] text-white shadow-md shadow-teal-700/20 ring-1 ring-teal-600 scale-[1.02]'
                                  : 'bg-stone-100 hover:bg-stone-200 text-slate-700 border border-stone-200/80'
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                                  isSelected ? 'bg-white text-[#0d9488]' : 'bg-slate-200 text-slate-600'
                                }`}
                              >
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span>{model.name}</span>
                              <span className={`text-[10px] font-normal ${isSelected ? 'text-teal-100' : 'text-slate-600'}`}>
                                ({formatRupiah(model.price)})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {category.specsPills[lang].map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 bg-stone-100 text-slate-700 text-[11px] font-bold rounded-md border border-stone-200/70"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Card Footer: Dynamic Single Line Price & Compact CTA Button */}
                <div className="p-5 sm:p-6 pt-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-3 mt-2">
                  
                  {/* Dynamic Single-Line Price */}
                  <div className="shrink-0 flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap">
                      {formatRupiah(activeModel.price)}
                    </span>
                    <span className="text-xs text-slate-600 font-bold whitespace-nowrap">
                      / {lang === 'EN' ? 'day' : lang === 'ZH' ? '天' : 'hari'}
                    </span>
                  </div>

                  {/* Compact CTA Button */}
                  <button
                    type="button"
                    onClick={() => handleBookClick(activeModel.id)}
                    className="px-5 py-2.5 bg-[#0d9488] hover:bg-teal-700 active:bg-teal-800 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md shadow-teal-700/20 hover:shadow-lg transition-all transform active:scale-95 shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{getBookBtnText()}</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* Disclaimer / Stock Note Banner at Bottom */}
        <div className="mt-8 sm:mt-10 p-3.5 sm:p-4 bg-amber-50 border border-amber-200/90 rounded-xl flex items-center justify-center gap-2.5 text-amber-900 text-xs sm:text-sm shadow-2xs text-center">
          <div className="p-1 bg-amber-200/80 text-amber-900 rounded-full shrink-0">
            <Info className="w-3.5 h-3.5 text-amber-900" />
          </div>
          <p className="font-semibold leading-relaxed">
            {lang === 'EN'
              ? 'Unit availability, exact color, and year may vary depending on daily stock. Photos are for visual reference.'
              : lang === 'ZH'
              ? '车辆存货、颜色及年份以每日库存为准。图片仅供视觉参考。'
              : 'Ketersediaan unit, warna, dan tahun motor menyesuaikan stok harian. Foto adalah contoh visual.'}
          </p>
        </div>

      </div>
    </section>
  );
};
