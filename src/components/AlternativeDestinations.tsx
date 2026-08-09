import React, { useState, useEffect } from 'react';
import { TranslationContent, Language } from '../data/translations';
import { CAR_CHARTER_BANNER, SPEEDBOAT_BANNER, RIDING_DESTINATIONS } from '../data/images';
import { SITE_CONFIG } from '../data/siteConfig';
import { MessageCircle, MapPin, Sparkles, Car, Shield, ChevronLeft, ChevronRight, ExternalLink, FileText, ArrowRight } from 'lucide-react';

interface AlternativeDestinationsProps {
  t: TranslationContent;
  lang: Language;
  onOpenReserveModal?: (bikeId?: string) => void;
}

export const AlternativeDestinations: React.FC<AlternativeDestinationsProps> = ({ t, lang, onOpenReserveModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselSlides = [
    {
      id: 1,
      image: CAR_CHARTER_BANNER,
      tag: lang === 'EN' ? 'PRIVATE CAR & HIACE' : lang === 'ZH' ? '私人包车与商务车' : 'SEWA MOBIL & HIACE',
      title: lang === 'EN' ? 'Private Charter: Comfort, Your Way' : lang === 'ZH' ? '私人包车：舒适随心，专业出行' : 'Private Charter: Nyaman & Privat',
      subtitle: lang === 'EN' ? 'Private Car (1-4 Pax) & HiAce Commuter (Up to 14 Pax)' : lang === 'ZH' ? '私人轿车 (1-4人) & HiAce 商务车 (最多14人)' : 'Sewa Mobil MPV (1-4 Orang) & HiAce (S.D 14 Orang)',
      caption: lang === 'EN' 
        ? 'Whether it is a scenic escape or a group adventure, we have the perfect ride for you. Safe, reliable, and driven by professionals.' 
        : lang === 'ZH'
        ? '无论是风景漫游还是团队出行，我们都能为您提供完美的车辆。安全可靠，由本地专业司机驾驶。'
        : 'Pilihan mobil MPV/SUV AC bersih dan HiAce Commuter rombongan. Pengemudi lokal ramah, profesional, dan berpengalaman.',
      badge: lang === 'EN' ? 'Car & HiAce Charter' : lang === 'ZH' ? '包车 & HiAce 租用' : 'Sewa Mobil & HiAce',
      buttonText: lang === 'EN' ? 'Explore Cars' : lang === 'ZH' ? '查看租车' : 'Sewa Mobil',
      buttonType: 'external',
      url: 'https://hellobajo.com/cars',
    },
    {
      id: 2,
      image: SPEEDBOAT_BANNER,
      tag: lang === 'EN' ? 'SPEEDBOAT FULLDAY TRIP' : lang === 'ZH' ? '快艇一日游套餐' : 'PAKET SPEEDBOAT 1 HARI',
      title: lang === 'EN' ? 'Komodo Island Speedboat Daytour' : lang === 'ZH' ? '科莫多岛豪华快艇一日游' : 'Speedboat Fullday Trip Komodo',
      subtitle: lang === 'EN' ? 'Premium AC Speedboat & Island Hopping' : lang === 'ZH' ? '空调快艇 & 6大经典岛屿跳岛游' : 'Speedboat AC Nyaman & Island Hopping 6 Destinasi',
      caption: lang === 'EN'
        ? 'Explore Padar Island, Pink Beach, Komodo Island, Taka Makassar, Manta Point & Kanawa in 1 day. Includes lunch box, snorkeling gear & local guide.'
        : lang === 'ZH'
        ? '一天打卡帕达尔岛、粉红沙滩、科莫多巨蜥岛、塔卡麦加萨、魔鬼鱼点及卡纳瓦岛。含午餐便当、浮潜装备及本地导游。'
        : 'Jelajah Pulau Padar, Pink Beach, Pulau Komodo, Taka Makassar, Manta Point & Kanawa. Lengkap dengan lunch box, alat snorkeling & guide.',
      badge: lang === 'EN' ? 'Speedboat & Daytour' : lang === 'ZH' ? '快艇跳岛游' : 'Speedboat & Tour Laut',
      buttonText: lang === 'EN' ? 'Explore Boats' : lang === 'ZH' ? '查看游船' : 'Sewa Speedboat',
      buttonType: 'external',
      url: 'https://hellobajo.com/boats',
    },
    {
      id: 3,
      image: RIDING_DESTINATIONS.waeRebo,
      tag: lang === 'EN' ? '2 DAYS 1 NIGHT TOUR' : lang === 'ZH' ? '两天一夜经典行程' : 'PAKET TOUR 2H1M',
      title: lang === 'EN' ? 'Wae Rebo: Hidden Village Above the Clouds' : lang === 'ZH' ? '瓦埃雷博：云端之上的古老传统村落' : 'Wae Rebo: Desa Tradisional di Atas Awan',
      subtitle: lang === 'EN' ? 'All-Inclusive 2D1N Overnight Trip' : lang === 'ZH' ? '全包式 2天1夜 深度研学体验' : 'Paket Tour Lengkap 2 Hari 1 Malam',
      caption: lang === 'EN'
        ? 'Step into the heart of Flores and discover Waerebo traditional village. Package includes AC transport, Mbaru Niang stay, meals, and local guide.'
        : lang === 'ZH'
        ? '深入弗洛勒斯腹地，探秘瓦埃雷博特色圆锥形传统高脚屋。套餐含空调接送、传统圆屋住宿、餐食及本地导游。'
        : 'Nikmati keindahan Wae Rebo & rumah adat Mbaru Niang. Paket komplit termasuk transport AC, makan, tiket masuk, inap & guide.',
      badge: lang === 'EN' ? 'Wae Rebo 2D1N Package' : lang === 'ZH' ? '瓦埃雷博 2天1夜 套餐' : 'Paket Wae Rebo 2H1M',
      buttonText: lang === 'EN' ? 'See Package' : lang === 'ZH' ? '查看行程详情' : 'Lihat Paket',
      buttonType: 'pdf_package',
      waMsg: lang === 'EN'
        ? 'Hi HelloBajo! Please send me the Wae Rebo 2D1N Tour Package details and PDF document.'
        : lang === 'ZH'
        ? '你好 HelloBajo！请发送瓦埃雷博 2天1夜 旅游套餐详情及 PDF 资料。'
        : 'Halo HelloBajo! Tolong kirimkan rincian & dokumen PDF Paket Tour Wae Rebo 2D1N.',
    },
    {
      id: 4,
      image: RIDING_DESTINATIONS.goloMori,
      tag: lang === 'EN' ? 'MORE ROADS, MORE STORIES, MORE BAJO' : lang === 'ZH' ? '骑行探秘弗洛勒斯' : 'RIDE & EXPLORE FLORES',
      title: lang === 'EN' ? 'A Journey Worth Exploring' : lang === 'ZH' ? '开启值得期待的骑行之旅' : 'Sensasi Berkendara Jelajah Bajo',
      subtitle: lang === 'EN' ? 'Discover Labuan Bajo Beyond the Sea' : lang === 'ZH' ? '探索拉布安巴佐陆地之美' : 'Jelajah Labuan Bajo Lebih Dari Sekadar Laut',
      caption: lang === 'EN'
        ? 'Labuan Bajo is not just about the sea. Explore breathtaking landscapes, hidden gems, and local culture on unforgettable scooter adventures.'
        : lang === 'ZH'
        ? '拉布安巴佐不仅有大海。骑上品质踏板车，穿梭戈洛莫里景观大道与落日山丘，体验独特本地风情。'
        : 'Rasakan kebebasan riding menyusuri jalanan mulus Golo Mori, bukit sunset, & pantai rahasia dengan motor matic prima.',
      badge: lang === 'EN' ? 'Scooter Land Adventures' : lang === 'ZH' ? '踏板车陆地探索' : 'Jelajah Motor Matic',
      buttonText: lang === 'EN' ? 'Book a Scooter' : lang === 'ZH' ? '立即预订摩托车' : 'Sewa Motor Sekarang',
      buttonType: 'scroll_reserve',
    },
  ];

  const handleSlideCtaClick = (slide: typeof carouselSlides[0]) => {
    if (slide.buttonType === 'external' && slide.url) {
      window.open(slide.url, '_blank', 'noopener,noreferrer');
    } else if (slide.buttonType === 'scroll_reserve') {
      if (onOpenReserveModal) {
        onOpenReserveModal();
      } else {
        const reserveElement = document.getElementById('fleet');
        if (reserveElement) {
          reserveElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else if (slide.buttonType === 'pdf_package' && slide.waMsg) {
      window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(slide.waMsg)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Minimum distance threshold of 35px for horizontal swipe
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped Left -> Next slide
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      } else {
        // Swiped Right -> Previous slide
        setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
      }
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Auto-advance carousel every 6 seconds (6000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const carWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    lang === 'EN'
      ? 'Hi HelloBajo! I am interested in inquiring about Private Car Charter / Land Tours in Labuan Bajo.'
      : 'Halo HelloBajo! Saya mau tanya info sewa mobil / tur darat privat di Labuan Bajo.'
  )}`;

  const popularRoutes = [
    {
      title: lang === 'EN' ? 'Golo Mori Coastal Highway' : lang === 'ZH' ? '戈洛莫里沿海景观大道' : 'Jalan Pesisir Golo Mori',
      desc: lang === 'EN' ? 'Scenic smooth asphalt road along turquoise bays.' : lang === 'ZH' ? '沿着蔚蓝海湾蜿蜒而过的平整景观柏油路。' : 'Jalan mulus beraspal indah menyusuri teluk biru.',
      img: RIDING_DESTINATIONS.goloMori,
      tag: lang === 'EN' ? 'Must Ride' : lang === 'ZH' ? '骑行首选' : 'Must Ride',
    },
    {
      title: lang === 'EN' ? 'Gua Rangko Cave' : lang === 'ZH' ? '朗科天然盐水溶洞' : 'Gua Rangko Salt Lake',
      desc: lang === 'EN' ? 'Ride to the cave and swim in crystal clear blue cave pool.' : lang === 'ZH' ? '骑行至码头，畅游阳光穿透的晶莹天然溶洞水池。' : 'Mandi di kolam gua alami berkilau air asin.',
      img: RIDING_DESTINATIONS.guaRangko,
      tag: lang === 'EN' ? 'Popular' : lang === 'ZH' ? '热门推荐' : 'Popular',
    },
    {
      title: lang === 'EN' ? 'Bukit Cinta Sunset View' : lang === 'ZH' ? 'Bukit Cinta 爱情山落日观景台' : 'Bukit Cinta Sunset',
      desc: lang === 'EN' ? 'Panoramic hill top view overlooking Komodo islands sunset.' : lang === 'ZH' ? '登顶山丘全景俯瞰弗洛勒斯海绝美落日霞光。' : 'Pemandangan bukit indah melihat sunset laut Flores.',
      img: RIDING_DESTINATIONS.bukitCinta,
      tag: lang === 'EN' ? 'Sunset Spot' : lang === 'ZH' ? '落日胜地' : 'Sunset Spot',
    },
  ];

  return (
    <section id="explore-more" className="py-16 sm:py-20 bg-[#faf8f5] border-t border-stone-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
            {t.exploreMore.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
            {t.exploreMore.title}
          </h2>
          <p className="text-slate-600 mt-2 text-xs sm:text-sm">
            {t.exploreMore.subtitle}
          </p>
        </div>

        {/* Private Car Charter Cross-Promotion Full Landscape Media Carousel */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-slate-950 mb-14 max-w-5xl mx-auto group select-none touch-pan-y"
        >
          {/* Landscape Image Container (16:9 on mobile, 21:9 on desktop) */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[380px] sm:min-h-[420px] overflow-hidden">
            {carouselSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Full Landscape Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000"
                />

                {/* Gradient Overlays for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent hidden md:block" />

                {/* Content Overlay inside Landscape Frame */}
                <div className="absolute inset-0 pl-12 sm:pl-20 lg:pl-24 pr-12 sm:pr-20 py-6 sm:py-8 lg:py-10 flex flex-col justify-end md:justify-center max-w-2xl text-white space-y-2.5 sm:space-y-3 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-teal-500/30 text-teal-300 border border-teal-400/40 text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>{slide.tag}</span>
                  </span>

                  <h3 className="text-lg sm:text-3xl font-extrabold tracking-tight text-white leading-snug drop-shadow-md">
                    {slide.title}
                  </h3>

                  {slide.subtitle && (
                    <p className="text-xs sm:text-sm font-semibold text-teal-300 -mt-1 drop-shadow">
                      {slide.subtitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-medium drop-shadow max-w-xl line-clamp-3 sm:line-clamp-none">
                    {slide.caption}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <button
                      onClick={() => handleSlideCtaClick(slide)}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-full shadow-lg shadow-teal-500/30 transition-all active:scale-95 cursor-pointer"
                    >
                      {slide.buttonType === 'external' ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : slide.buttonType === 'pdf_package' ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                      <span>{slide.buttonText}</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold text-stone-200">
                      <Car className="w-4 h-4 text-teal-300" />
                      <span>{slide.badge}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Navigation Arrow Controls */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 hover:bg-teal-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}
              aria-label="Next slide"
              className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/70 hover:bg-teal-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slider Dots Indicator */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {carouselSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? 'w-6 bg-teal-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Popular Scooter Riding Routes in Labuan Bajo */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-5 text-center">
            {lang === 'EN' ? 'Top Scooter Riding Spots in Labuan Bajo' : lang === 'ZH' ? '拉布安巴佐骑行热门景点' : 'Spot Favorit Berkendara Motor di Labuan Bajo'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularRoutes.map((route, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative h-44 bg-stone-900 overflow-hidden">
                  <img 
                    src={route.img} 
                    alt={route.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                    {route.tag}
                  </span>
                </div>

                <div className="p-4">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{route.title}</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {route.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
