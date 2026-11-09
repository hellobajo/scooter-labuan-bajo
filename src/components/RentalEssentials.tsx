import { ChevronDown } from 'lucide-react';
import type { Language } from '../data/translations';

const copy: Record<Language, {
  title: string;
  rental: string;
  privacy: string;
  terms: string[];
  verification: string[];
}> = {
  EN: {
    title: 'Rental essentials', rental: 'Rental terms', privacy: 'Privacy & verification',
    terms: [
      'One rental day is 24 hours from handover. All times are WITA (UTC+8).',
      'Request an extension on WhatsApp at least 8 hours before your return time. Extensions depend on availability and confirmation. Otherwise, return on time.',
      'Overtime costs Rp15,000 per hour per scooter for up to 4 hours. Beyond 4 hours, one full day at the scooter’s daily rate replaces the hourly charge for that period.',
      'Service and collection run daily from 08:00 to 19:00. Garage returns are possible until 21:00 by prior confirmation; overtime still applies. Hand the scooter and keys to our team.',
      'If collection is needed after 19:00, we collect the next morning and charge one extra rental day per scooter. Arrange a garage return before 21:00 to avoid this overnight charge.',
      'Return the scooter with the same fuel level. We inspect and photograph it together at handover and return. Renters cover new physical damage, excluding recorded pre-existing damage and normal wear. Repair costs are itemized.',
      'Ride only in the agreed Labuan Bajo area. No out-of-town trips, intercity returns, lending or sub-rental. Confirm your route and return location. Ride with a valid appropriate licence and a helmet, and never ride under the influence.',
      'Report accidents or damage promptly. Stop if it is unsafe to ride, call emergency services if needed and agree on repairs with us first. Confirm availability, final price, collection and cancellation or refund terms before accepting or paying.',
    ],
    verification: [
      'At handover, we photograph your passport or national ID in person and document the handover to verify the renter and record the rental. We may ask for flight tickets or hotel confirmation when needed to coordinate travel and handover. Your original passport stays with you.',
      'This website has no passport upload form. The booking form prepares a WhatsApp message with the details you enter; you choose whether to send it. Please avoid sharing unrelated sensitive information.',
      'We use verification records to manage the rental, document handover and resolve rental issues. We do not use them for public marketing. We do not publish handover photos containing personal information without separate permission.',
      'Verification photos are kept on the owner’s phone or in a private database that only the owner can access. Copies under our control are deleted 7 days after the scooter is returned, unless needed for an unresolved rental issue or a retention obligation. If an exception applies, we explain why and retain only what is necessary.',
      'Contact us to request access, correction or deletion of your records.',
      'This site saves your language preference on your device. Google Maps and Google Fonts load external resources. Booking links open WhatsApp, and social links open the named platform. Each service handles information under its own privacy policy.',
    ],
  },
  ID: {
    title: 'Info penting sewa', rental: 'Ketentuan sewa', privacy: 'Privasi & verifikasi',
    terms: [
      'Satu hari sewa adalah 24 jam sejak serah terima. Semua jam menggunakan WITA (UTC+8).',
      'Ajukan perpanjangan lewat WhatsApp minimal 8 jam sebelum jadwal kembali. Perpanjangan bergantung pada ketersediaan dan konfirmasi. Jika belum disetujui, kembalikan motor tepat waktu.',
      'Biaya keterlambatan Rp15.000 per jam per motor, maksimal 4 jam. Jika lewat 4 jam, tarif sewa satu hari penuh untuk motor tersebut menggantikan biaya per jam untuk periode itu.',
      'Layanan dan penjemputan setiap hari pukul 08.00–19.00. Pengembalian di garasi bisa sampai pukul 21.00 dengan konfirmasi sebelumnya; biaya keterlambatan tetap berlaku. Serahkan motor dan kunci ke tim kami.',
      'Jika perlu dijemput setelah pukul 19.00, motor dijemput besok pagi dan dikenakan tambahan satu hari sewa per motor. Atur pengembalian di garasi sebelum pukul 21.00 untuk menghindari biaya menginap ini.',
      'Kembalikan motor dengan tingkat bensin yang sama. Kita periksa dan foto kondisinya bersama saat serah terima dan pengembalian. Penyewa menanggung kerusakan fisik baru, di luar kerusakan lama yang sudah dicatat dan keausan wajar. Biaya perbaikan dirinci.',
      'Berkendara hanya di area Labuan Bajo yang disepakati. Dilarang ke luar kota, mengembalikan motor di kota lain, meminjamkan atau menyewakan ulang. Konfirmasi rute dan lokasi kembali. Gunakan SIM yang sesuai dan masih berlaku, pakai helm, dan jangan berkendara di bawah pengaruh alkohol atau obat.',
      'Segera laporkan kecelakaan atau kerusakan. Berhenti jika tidak aman, hubungi layanan darurat bila diperlukan, dan sepakati perbaikan dengan kami terlebih dahulu. Konfirmasi ketersediaan, harga akhir, penjemputan, serta ketentuan pembatalan atau refund sebelum menyetujui atau membayar.',
    ],
    verification: [
      'Saat bertemu, kami memotret paspor atau KTP dan mendokumentasikan serah terima untuk memverifikasi penyewa dan mencatat transaksi. Tiket pesawat atau konfirmasi hotel bisa diminta bila diperlukan untuk mengatur perjalanan dan serah terima. Paspor asli tetap dipegang penyewa.',
      'Situs ini tidak memiliki formulir unggah paspor. Formulir booking menyiapkan pesan WhatsApp dari data yang Anda isi; Anda yang memilih apakah akan mengirimnya. Hindari mengirim informasi sensitif yang tidak terkait.',
      'Catatan verifikasi digunakan untuk mengurus sewa, mendokumentasikan serah terima dan menyelesaikan masalah sewa. Catatan ini tidak digunakan untuk pemasaran publik. Foto serah terima yang memuat data pribadi tidak dipublikasikan tanpa izin terpisah.',
      'Foto verifikasi disimpan di ponsel pemilik atau basis data privat yang hanya dapat diakses pemilik. Salinan di bawah kendali kami dihapus 7 hari setelah motor dikembalikan, kecuali diperlukan untuk masalah sewa yang belum selesai atau kewajiban penyimpanan. Jika ada pengecualian, kami jelaskan alasannya dan menyimpan hanya catatan yang diperlukan.',
      'Hubungi kami untuk meminta akses, koreksi atau penghapusan catatan.',
      'Situs menyimpan pilihan bahasa di perangkat Anda. Google Maps dan Google Fonts memuat sumber eksternal. Tautan booking membuka WhatsApp dan tautan sosial membuka platform yang tertera. Tiap layanan mengelola informasi sesuai kebijakan privasinya sendiri.',
    ],
  },
  ZH: {
    title: '租车须知', rental: '租车条款', privacy: '隐私与身份核验',
    terms: [
      '从交车起每 24 小时为一个租赁日。所有时间均为印尼中部时间 WITA（UTC+8）。',
      '续租请至少提前 8 小时通过 WhatsApp 提出，须视车辆情况并经确认；未确认请按时归还。',
      '每辆车超时费为每小时 Rp15,000，最多计 4 小时。超过 4 小时，该时段按该车一整天租金计费，不再另收小时费。',
      '每天服务和取车时间为 08:00–19:00。事先确认后可在 21:00 前到车库还车，超时费仍适用。请将车辆和钥匙交给工作人员。',
      '19:00 后需要上门取车的，次日上午取车，每辆车加收一天租金。提前安排在 21:00 前到车库还车，可避免这笔过夜费用。',
      '请按交车时的油量归还。交车和还车时双方一起检查并拍照。租客承担新增的实际损坏，已记录的旧损伤和正常磨损除外；维修费用逐项列明。',
      '仅限约定的拉布安巴佐区域。不得出城、异地还车、出借或转租。请确认路线和还车地点，持有效且适用的驾照，戴头盔，不酒驾或在药物影响下骑行。',
      '发生事故或损坏请及时报告。不安全时停止骑行，必要时联系紧急服务，维修前先与我们商定。接受订单或付款前，请确认车辆、最终价格、取车及取消和退款条款。',
    ],
    verification: [
      '见面交车时，我们会拍摄护照或身份证并记录交车过程，用于核验身份和登记租赁。为安排出行和交车，必要时可能要求机票或酒店确认。护照原件由您保管。',
      '本网站没有护照上传表单。预订表单将您填写的信息整理成 WhatsApp 消息，由您决定是否发送。请勿提供无关的敏感信息。',
      '核验记录用于租赁管理、交车记录及处理租赁问题，不用于公开营销。含个人信息的交车照片未经另行许可不会公开。',
      '核验照片存放在店主的手机或仅店主可访问的私有数据库中。我们控制的副本在还车后 7 天删除；未解决的租赁问题或适用的留存义务除外。例外时会说明原因，仅保留必要记录。',
      '如需访问、更正或删除记录，请联系我们。',
      '网站在您的设备上保存语言偏好。Google Maps 和 Google Fonts 加载外部资源。预订链接打开 WhatsApp，社交链接打开对应平台。各服务按自己的隐私政策处理信息。',
    ],
  },
  ES: {
    title: 'Información esencial del alquiler', rental: 'Condiciones de alquiler', privacy: 'Privacidad y verificación',
    terms: [
      'Un día de alquiler son 24 horas desde la entrega. Todos los horarios son WITA (UTC+8).',
      'Pide una prórroga por WhatsApp al menos 8 horas antes de la devolución. Está sujeta a disponibilidad y confirmación; de lo contrario, devuelve el scooter a tiempo.',
      'El retraso cuesta Rp15.000 por hora y scooter, hasta 4 horas. Si supera 4 horas, se cobra un día completo a la tarifa del scooter en lugar del cargo por hora de ese periodo.',
      'Atención y recogida a diario de 08:00 a 19:00. Puedes devolver el scooter en el garaje hasta las 21:00 si lo confirmas antes; se aplican cargos por retraso. Entrega el scooter y las llaves a nuestro equipo.',
      'Si necesitas que recojamos el scooter después de las 19:00, lo recogeremos a la mañana siguiente y cobraremos un día adicional por scooter. Acuerda la devolución en el garaje antes de las 21:00 para evitar ese cargo.',
      'Devuelve el scooter con el mismo nivel de combustible. Revisamos y fotografiamos su estado juntos al entregarlo y devolverlo. El arrendatario cubre los daños físicos nuevos, salvo daños previos registrados y desgaste normal. Los costes de reparación se desglosan.',
      'Circula solo en la zona acordada de Labuan Bajo. No se permiten viajes fuera de la ciudad, devoluciones en otra ciudad, préstamos ni subalquiler. Confirma la ruta y el lugar de devolución. Usa un permiso válido y adecuado y casco; no conduzcas bajo los efectos de alcohol o drogas.',
      'Informa enseguida de accidentes o daños. Detente si no es seguro continuar, llama a emergencias si hace falta y acuerda las reparaciones con nosotros primero. Confirma disponibilidad, precio final, recogida y condiciones de cancelación o reembolso antes de aceptar o pagar.',
    ],
    verification: [
      'Al reunirnos, fotografiamos tu pasaporte o documento nacional de identidad y documentamos la entrega para verificar al arrendatario y registrar el alquiler. Podemos pedir billetes de avión o la confirmación del hotel para coordinar el viaje y la entrega. Conservas el pasaporte original.',
      'Este sitio no permite subir pasaportes. El formulario prepara un mensaje de WhatsApp con tus datos; tú decides si lo envías. Evita compartir información sensible que no sea necesaria.',
      'Usamos los registros para administrar el alquiler, documentar la entrega y resolver incidencias, nunca para publicidad pública. No publicamos fotos de entrega con datos personales sin un permiso aparte.',
      'Guardamos las fotos de verificación en el teléfono del propietario o en una base privada a la que solo accede el propietario. Eliminamos las copias bajo nuestro control 7 días después de la devolución, salvo incidencias pendientes u obligaciones de conservación. En ese caso explicamos el motivo y guardamos solo lo necesario.',
      'Contáctanos para solicitar acceso, corrección o eliminación.',
      'El sitio guarda tu preferencia de idioma en el dispositivo. Google Maps y Google Fonts cargan recursos externos. Los enlaces de reserva abren WhatsApp y los sociales abren la plataforma indicada. Cada servicio aplica su propia política de privacidad.',
    ],
  },
  IT: {
    title: 'Informazioni essenziali sul noleggio', rental: 'Condizioni di noleggio', privacy: 'Privacy e verifica',
    terms: [
      'Un giorno di noleggio dura 24 ore dalla consegna. Tutti gli orari sono WITA (UTC+8).',
      'Chiedi una proroga su WhatsApp almeno 8 ore prima della restituzione. È soggetta a disponibilità e conferma; altrimenti restituisci lo scooter in orario.',
      'Il ritardo costa Rp15.000 all’ora per scooter, fino a 4 ore. Oltre le 4 ore, si applica la tariffa di un giorno intero dello scooter al posto dell’addebito orario per quel periodo.',
      'Servizio e ritiro ogni giorno dalle 08:00 alle 19:00. Con conferma preventiva, puoi restituire lo scooter in garage entro le 21:00; gli addebiti per il ritardo restano validi. Consegna scooter e chiavi al nostro team.',
      'Se serve il ritiro dopo le 19:00, ritiriamo lo scooter la mattina successiva e addebitiamo un giorno aggiuntivo per scooter. Concorda la restituzione in garage entro le 21:00 per evitare il costo notturno.',
      'Restituisci lo scooter con lo stesso livello di carburante. Verifichiamo e fotografiamo insieme le condizioni alla consegna e alla restituzione. Il cliente copre i nuovi danni materiali, esclusi quelli preesistenti documentati e la normale usura. I costi di riparazione sono dettagliati.',
      'Guida solo nell’area concordata di Labuan Bajo. Vietati viaggi fuori città, restituzioni in altre città, prestiti e subnoleggio. Conferma percorso e luogo di restituzione. Usa patente valida e adeguata, casco e guida in condizioni di sobrietà.',
      'Segnala subito incidenti o danni. Fermati se non è sicuro proseguire, chiama i soccorsi se necessario e concorda prima le riparazioni con noi. Conferma disponibilità, prezzo finale, ritiro e condizioni di cancellazione o rimborso prima di accettare o pagare.',
    ],
    verification: [
      'All’incontro fotografiamo il passaporto o la carta d’identità e documentiamo la consegna per verificare il cliente e registrare il noleggio. Potremmo chiedere biglietti aerei o conferma dell’hotel per coordinare viaggio e consegna. Il passaporto originale resta con te.',
      'Il sito non consente di caricare passaporti. Il modulo prepara un messaggio WhatsApp con i dati inseriti; decidi tu se inviarlo. Evita di condividere informazioni sensibili non pertinenti.',
      'Usiamo i dati di verifica per gestire il noleggio, documentare la consegna e risolvere problemi, non per pubblicità. Non pubblichiamo foto di consegna con dati personali senza un’autorizzazione separata.',
      'Le foto sono conservate sul telefono del proprietario o in un database privato accessibile solo al proprietario. Eliminiamo le copie sotto il nostro controllo 7 giorni dopo la restituzione, salvo problemi irrisolti o obblighi di conservazione. In questi casi spieghiamo il motivo e conserviamo solo il necessario.',
      'Contattaci per chiedere accesso, correzione o cancellazione.',
      'Il sito salva la lingua sul dispositivo. Google Maps e Google Fonts caricano risorse esterne. I link di prenotazione aprono WhatsApp e quelli social la piattaforma indicata. Ogni servizio segue la propria informativa sulla privacy.',
    ],
  },
  JA: {
    title: 'レンタルのご案内', rental: 'レンタル条件', privacy: 'プライバシーと本人確認',
    terms: [
      '貸出時から24時間を1日とします。時刻はすべてインドネシア中部時間（WITA、UTC+8）です。',
      '延長は返却予定の8時間前までにWhatsAppでご相談ください。空き状況と当店の確認が必要です。未確認の場合は予定どおりご返却ください。',
      '超過料金は4時間まで、1台につき1時間Rp15,000です。4時間を超えた場合、その超過期間は時間料金に代えて車種ごとの1日分の料金を適用します。',
      '営業時間と引き取りは毎日08:00〜19:00です。事前確認があれば21:00までガレージへ返却できます。超過料金は適用されます。車両と鍵をスタッフへお渡しください。',
      '19:00以降に引き取りが必要な場合、翌朝に引き取り、1台につき1日分を追加します。この料金を避けるには、21:00までのガレージ返却を事前に調整してください。',
      '貸出時と同じ燃料残量でご返却ください。貸出時と返却時に一緒に車両を確認し、撮影します。既に記録された傷と通常の摩耗を除き、新たな物理的損傷は利用者の負担です。修理費は明細を提示します。',
      '合意したラブアンバジョの範囲内のみ走行できます。市外への移動、他都市での返却、又貸しや転貸は禁止です。ルートと返却場所をご確認ください。有効かつ適切な免許証とヘルメットが必要です。飲酒や薬物の影響下での運転はできません。',
      '事故や損傷は速やかにご連絡ください。危険な場合は走行を中止し、必要に応じて緊急機関へ連絡し、修理前に当店とご相談ください。承諾または支払いの前に、空き状況、最終料金、引き取り、キャンセル・返金条件をご確認ください。',
    ],
    verification: [
      '対面での貸出時に、パスポートまたは身分証明書を撮影し、本人確認とレンタルの記録のために引き渡しを記録します。旅行や引き渡しの調整に必要な場合、航空券やホテルの予約確認をお願いすることがあります。パスポート原本はお客様が保管します。',
      'このサイトにパスポートのアップロードフォームはありません。予約フォームは入力内容でWhatsAppメッセージを作成します。送信するかはお客様が選べます。無関係な機密情報は送らないでください。',
      '確認記録はレンタル管理、引き渡しの記録、問題解決に使用し、公開広告には使いません。個人情報を含む引き渡し写真は別途許可がなければ公開しません。',
      '確認写真は、オーナーの携帯電話またはオーナーだけがアクセスできる非公開データベースに保存します。当店の管理下にあるコピーは返却から7日後に削除します。未解決の問題や保存義務がある場合は理由を説明し、必要な記録のみ保持します。',
      '記録の開示、訂正、削除をご希望の場合は当店にご連絡ください。',
      'サイトは端末に言語設定を保存します。Google MapsとGoogle Fontsは外部リソースを読み込みます。予約リンクはWhatsAppを、SNSリンクは表示されたサービスを開きます。各サービスは独自のプライバシーポリシーに従って情報を処理します。',
    ],
  },
};

export function RentalEssentials({ lang }: { lang: Language }) {
  const t = copy[lang];
  return (
    <section id="rental-essentials" aria-labelledby="rental-essentials-title" className="scroll-mt-28 border-t border-stone-200 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="rental-essentials-title" className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{t.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.terms[0]}</p>
        <div className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
          {[
            { title: t.rental, items: t.terms, open: true },
            { title: t.privacy, items: t.verification, open: false },
          ].map(({ title, items, open }) => (
            <details key={title} open={open} className="group">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-4 font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-teal-700 [&::-webkit-details-marker]:hidden">
                {title}
                <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-teal-700 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="list-disc space-y-2 pb-5 pl-5 text-sm leading-relaxed text-slate-700 marker:text-teal-700 sm:text-base">
                {items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
