import { ArrowUpRight, MapPin, MessageCircle, Plane, Ship, Warehouse } from 'lucide-react';
import type { Language } from '../data/translations';
import { SITE_CONFIG } from '../data/siteConfig';

const area = 'Wae Mata, Gorontalo, Labuan Bajo';
const coordinates = '-8.5035334,119.8878866';
const mapPin = encodeURIComponent(coordinates);
const garageMap = `https://www.google.com/maps?q=${mapPin}&z=13&output=embed`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${mapPin}`;
const airportRoute = `${directions}&origin=${encodeURIComponent('Komodo Airport (LBJ), Labuan Bajo')}&travelmode=driving`;
const harborMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Pelabuhan Labuan Bajo')}`;
const airportDrive: Record<Language, string> = {
  EN: 'About 10 minutes by car from Komodo Airport (LBJ)',
  ID: 'Sekitar 10 menit berkendara dari Bandara Komodo (LBJ)',
  ZH: '距离科莫多机场（LBJ）约 10 分钟车程',
  ES: 'A unos 10 minutos en coche del aeropuerto de Komodo (LBJ)',
  IT: 'A circa 10 minuti di auto dall’aeroporto di Komodo (LBJ)',
  JA: 'コモド空港（LBJ）から車で約10分',
};
const harborLabel: Record<Language, string> = {
  EN: 'Labuan Bajo Harbor',
  ID: 'Pelabuhan Labuan Bajo',
  ZH: '拉布安巴佐港',
  ES: 'Puerto de Labuan Bajo',
  IT: 'Porto di Labuan Bajo',
  JA: 'ラブアンバジョ港',
};
const copy: Record<Language, {
  label: string; title: string; description: string; location: string;
  instructions: string; contact: string; map: string; alt: string; message: string;
}> = {
  EN: {
    label: 'Garage & direct pickup', title: 'Pick up your scooter in Labuan Bajo.',
    description: 'Prefer to collect your scooter in person? Arrange pickup at our garage in Wae Mata.',
    location: 'Our Garage', instructions: 'Confirm your pickup time with HelloBajo on WhatsApp before you visit.',
    contact: 'Arrange pickup', map: 'Get directions', alt: 'Scooters parked inside our pickup garage',
    message: 'Hi HelloBajo! I’d like to pick up a scooter at your garage in Wae Mata. What pickup times are available?',
  },
  ID: {
    label: 'Garasi & ambil langsung', title: 'Ambil motor langsung di Labuan Bajo.',
    description: 'Mau ambil motor sendiri? Atur pengambilan di garasi kami di Wae Mata.',
    location: 'Garasi Kami', instructions: 'Konfirmasi jam pengambilan ke HelloBajo lewat WhatsApp sebelum datang.',
    contact: 'Atur pengambilan', map: 'Petunjuk arah', alt: 'Deretan motor di dalam garasi kami',
    message: 'Halo HelloBajo! Saya mau ambil motor langsung di garasi di Wae Mata. Jam berapa saya bisa datang?',
  },
  ZH: {
    label: '车库自取', title: '在拉布安巴佐自取摩托车。',
    description: '想亲自取车？可预约前往位于 Wae Mata 的我们的车库取车。',
    location: '我们的车库', instructions: '出发前请通过 WhatsApp 联系 HelloBajo，确认取车时间。',
    contact: '预约取车', map: '查看路线', alt: '停放在车库里的摩托车',
    message: '你好 HelloBajo！我想在 Wae Mata 的车库取车，请问有哪些时间可以取车？',
  },
  ES: {
    label: 'Garaje y recogida directa', title: 'Recoge tu scooter en Labuan Bajo.',
    description: '¿Prefieres recoger el scooter en persona? Acuerda la recogida en nuestro garaje en Wae Mata.',
    location: 'Nuestro garaje', instructions: 'Antes de ir, confirma la hora de recogida con HelloBajo por WhatsApp.',
    contact: 'Coordinar recogida', map: 'Cómo llegar', alt: 'Scooters estacionados en nuestro garaje',
    message: '¡Hola, HelloBajo! Quisiera recoger un scooter en su garaje en Wae Mata. ¿Qué horarios de recogida tienen disponibles?',
  },
  IT: {
    label: 'Garage e ritiro diretto', title: 'Ritira il tuo scooter a Labuan Bajo.',
    description: 'Preferisci ritirare lo scooter di persona? Organizza il ritiro presso il nostro garage a Wae Mata.',
    location: 'Il nostro garage', instructions: 'Prima di partire, conferma l’orario di ritiro con HelloBajo su WhatsApp.',
    contact: 'Organizza il ritiro', map: 'Indicazioni stradali', alt: 'Scooter parcheggiati nel nostro garage',
    message: 'Ciao HelloBajo! Vorrei ritirare uno scooter nel vostro garage a Wae Mata. Quali orari sono disponibili per il ritiro?',
  },
  JA: {
    label: 'ガレージで直接受け取り', title: 'ラブアンバジョでスクーターを受け取る。',
    description: '直接受け取りをご希望の場合は、ワエ・マタにある私たちのガレージでお受け取りいただけます。',
    location: '私たちのガレージ', instructions: 'お越しになる前に、WhatsAppでHelloBajoに受け取り時間をご確認ください。',
    contact: '受け取りを相談する', map: '経路を見る', alt: '私たちのガレージに並ぶスクーター',
    message: 'こんにちは。ワエ・マタのガレージでスクーターを受け取りたいです。受け取り可能な時間を教えていただけますか？',
  },
};

export function PartnerGarage({ lang }: { lang: Language }) {
  const t = copy[lang];
  const whatsapp = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(t.message)}`;

  return (
    <section id="garage" aria-labelledby="garage-title" className="scroll-mt-28 border-t border-stone-200 bg-stone-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
              <Warehouse aria-hidden="true" className="h-4 w-4" />{t.label}
            </p>
            <h2 id="garage-title" className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{t.title}</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-slate-600">{t.description}</p>
            <div className="mt-6 flex gap-3 rounded-2xl border border-stone-200 bg-white p-4">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
              <div>
                <p className="font-bold text-slate-900">{t.location}</p>
                <p className="mt-1 text-sm text-slate-700">{area}</p>
                <div className="mt-3 grid justify-items-start gap-2">
                  <a href={airportRoute} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:underline">
                    <Plane aria-hidden="true" className="h-4 w-4 shrink-0" />{airportDrive[lang]}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </a>
                  <a href={harborMap} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:underline">
                    <Ship aria-hidden="true" className="h-4 w-4 shrink-0" />{harborLabel[lang]}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </a>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.instructions}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-800 px-4 py-3 text-sm font-bold text-white hover:bg-teal-900">
                <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />{t.contact}
              </a>
              <a href={directions} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-teal-800 hover:underline">
                {t.map}<ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </div>
          <div className="grid min-w-0 gap-3">
            <img src="/partner-garage.jpg" alt={t.alt} width={1672} height={940} loading="lazy" decoding="async"
              className="block h-auto w-full rounded-2xl border border-stone-200 shadow-sm" />
            <iframe src={garageMap} title={`Google Maps: ${t.location}`} loading="lazy"
              className="block h-64 w-full rounded-2xl border border-stone-200 bg-stone-100"
              referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}
