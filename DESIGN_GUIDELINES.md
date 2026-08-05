# HelloBajo Brand & Design System Guidelines

Panduan ini dibuat sebagai acuan visual, tipografi, ukuran font (Mobile vs Desktop), struktur bahasa, dan pengelolaan media untuk seluruh landing page dalam ekosistem **HelloBajo** (`scooter.hellobajo.com`, `car.hellobajo.com`, `speedboat.hellobajo.com`, dll).

---

## 🎨 1. Palette Warna (Color Palette)

HelloBajo menggunakan tema **Tropical Clean & Premium Coastal**:

* **Primary Accent (Teal / Emerald)**:
  * Main CTA: `bg-teal-600` (`#0d9488`), Hover: `bg-teal-500`
  * Light Background Accent: `bg-teal-50` (`#f0fdf4`), Border: `border-teal-200`
  * WhatsApp Floating & Direct Button: `bg-emerald-500` / `bg-emerald-600`
  * Text Highlight Accent: `text-teal-600` / `text-teal-700`

* **Canvas & Neutral Backgrounds**:
  * Page Main Background: Warm off-white `bg-[#FAF9F6]`
  * Card Backgrounds: Clean white `bg-white` dengan border halus `border-stone-200/90`
  * Footer Background: Warm sandy tint `bg-[#f4efe6]` dengan border top `border-stone-300/80`
  * Text Heading: High-contrast slate `text-slate-900`
  * Text Body: Muted neutral `text-slate-600` / `text-stone-600`

* **Dark Accent / Luxury Banners**:
  * Dark Canvas (e.g., Carousel / Speedboat / Luxury banner): `bg-slate-950` / `bg-slate-900`
  * Accent badge text: `text-teal-300`, `text-amber-300`

---

## 📐 2. Standard Ukuran Font & Tipografi (Mobile vs Desktop)

| Elemen Tipografi | Tailwind Class (Mobile -> Desktop) | Ukuran Font (px) Mobile | Ukuran Font (px) Desktop | Weight & Style |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | `text-3xl sm:text-4xl lg:text-5xl` | 30px | 36px - 48px | `font-extrabold tracking-tight text-slate-900` |
| **Hero Subtitle** | `text-sm sm:text-base lg:text-lg` | 14px | 16px - 18px | `text-slate-600 font-normal leading-relaxed` |
| **Section Title (H2)** | `text-2xl sm:text-3xl lg:text-4xl` | 24px | 30px - 36px | `font-extrabold text-slate-900 tracking-tight` |
| **Section Tag Badge** | `text-[11px] sm:text-xs` | 11px | 12px | `font-bold tracking-widest uppercase text-teal-800` |
| **Card Title (H3)** | `text-lg sm:text-xl` | 18px | 20px | `font-bold text-slate-900` |
| **Body Text Standard**| `text-xs sm:text-sm` | 12px - 13px | 14px | `text-slate-600 leading-relaxed` |
| **Caption / Footnote** | `text-[11px] sm:text-xs` | 11px | 12px | `text-slate-500 font-medium` |
| **CTA Button Text** | `text-xs sm:text-sm` | 12px | 14px | `font-extrabold rounded-full px-6 py-3.5` |
| **Floating Badges** | `text-xs` | 12px | 12px | `font-extrabold text-slate-800` |

---

## 🦶 3. Footer Design & Color Specs

Footer HelloBajo menggunakan warna hangat **Warm Sandy Tint** (`#f4efe6`) yang menyatu lembut dengan background utama web (`#FAF9F6`).

### Specs Footer:
* **Background Color**: `bg-[#f4efe6]`
* **Border Top**: `border-stone-300/80`
* **Text Main**: `text-slate-800` (Headings) / `text-slate-600` (Subtitles & Tagline)
* **WhatsApp Button**: `bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-full`
* **Verified Badge Line**: `py-5 border-b border-stone-300/60 text-xs text-teal-800 font-bold`

### Kode React Component (`Footer.tsx`):
```tsx
import React from 'react';
import { MessageCircle, ShieldCheck, Heart, MapPin, Mail } from 'lucide-react';

export const Footer: React.FC<{ t: any; lang: string }> = ({ t, lang }) => {
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    lang === 'EN' ? 'Hi HelloBajo!' : 'Halo HelloBajo!'
  )}`;

  return (
    <footer className="bg-[#f4efe6] text-slate-800 pt-14 pb-10 border-t border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-stone-300/70">
          
          {/* Brand Logo & Subtitle */}
          <div className="space-y-3 max-w-md">
            <a href="#" className="inline-block">
              <img 
                src="/logo.png" 
                alt="HelloBajo" 
                className="h-10 w-auto object-contain" 
              />
            </a>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {t?.footer?.tagline || 'Easy & hassle-free rental in Labuan Bajo.'}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-teal-800 font-bold">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Labuan Bajo, Flores, Nusa Tenggara Timur</span>
            </div>
          </div>

          {/* Contact Buttons & Email */}
          <div className="flex flex-col items-start md:items-end gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:shadow-emerald-600/30 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>+62 821-4752-6685</span>
            </a>

            <a 
              href="mailto:hellobajo.go@gmail.com" 
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-700 transition-colors font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>hellobajo.go@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Verified Badge Notice */}
        <div className="py-5 border-b border-stone-300/60 flex items-center justify-center gap-2 text-xs text-teal-800 font-bold text-center">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>{t?.footer?.verifiedText || 'Verified local provider'}</span>
        </div>

        {/* Bottom Copyright & Location */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>{t?.footer?.rights || '© 2026 hellobajo.go — All rights reserved.'}</p>
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
```

---

## 🤖 4. AI Prompt untuk Pembuatan Landing Page HelloBajo Lainnya

Berikut adalah prompt standar yang bisa langsung di-copy paste ke AI untuk membuat website landing page HelloBajo baru (misalnya `car.hellobajo.com` atau `speedboat.hellobajo.com`):

```text
Buatkan website landing page modern, responsive, dan high-converting untuk ekosistem HelloBajo (misal: car.hellobajo.com / speedboat.hellobajo.com) dengan ketentuan desain resmi HelloBajo Design System berikut:

1. THEME & COLOR PALETTE:
   - Primary Accent: Teal-600 (#0d9488), Hover: Teal-500, Highlight Text: Teal-700.
   - WhatsApp Button: Emerald-600 dengan icon Lucide MessageCircle.
   - Page Main Background: Warm off-white (#FAF9F6).
   - Card Background: Clean white (#ffffff) dengan border border-stone-200/90.
   - Footer Background: Warm sandy tint (#f4efe6) dengan border-t border-stone-300/80.
   - Text Colors: Slate-900 (Headings), Slate-600 (Body), Stone-500 (Captions).

2. TYPOGRAPHY & FONT SCALING (MOBILE & DESKTOP):
   - Hero H1: text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900
   - Hero Subtitle: text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed
   - Section H2: text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight
   - Section Tag Badge: text-[11px] sm:text-xs font-bold uppercase text-teal-800 bg-teal-100/80 px-3.5 py-1.5 rounded-full
   - Card H3: text-lg sm:text-xl font-bold text-slate-900
   - Body Text: text-xs sm:text-sm text-slate-600 leading-relaxed
   - Buttons: font-extrabold text-xs sm:text-sm rounded-full px-6 py-3.5 shadow-lg shadow-teal-600/25

3. MOBILE-FIRST OPTIMIZATION:
   - Di mobile view (screen < 1024px), pada Hero Section pastikan Gambar Utama berada di posisi ATAS (di bawah judul H1) agar begitu website dibuka di HP, pengunjung langsung melihat gambar produk/layanan utama sebelum daftar fitur.
   - Semua button, input field, dan touch target berukuran minimal 44px dengan rounded-full pill shape.
   - Carousel/Slider wajib mendukung gestures swipe kiri/kanan di layar sentuh HP (onTouchStart/onTouchEnd).

4. MULTI-LANGUAGE & MEDIA STRUCTURE:
   - Sediakan toggle bahasa 3 opsi (EN | ID | ZH) di Header.
   - Seluruh teks disimpan dalam file terpusat `/src/data/translations.ts`.
   - Seluruh asset gambar diimpor melalui `/src/data/images.ts`.

5. FOOTER DESIGN:
   - Samakan background `#f4efe6` dengan border-t `border-stone-300/80`, tombol WhatsApp emerald pill, dan baris Verified Badge `border-stone-300/60`.
```

---

## 🖼️ 5. Pengelolaan Gambar & Asset (Image Management)

Seluruh gambar terpusat dalam **`/src/data/images.ts`**:

* **Cara Memperbarui Gambar**:
  1. Masukkan file baru ke dalam folder `/public` atau `/src/assets/images/`.
  2. Edit file `/src/data/images.ts` dan ubah `import` atau URL string-nya.

---

## 🌐 6. Struktur Multi-Bahasa (English, Indonesian, Chinese)

Seluruh teks aplikasi terpusat dalam **`/src/data/translations.ts`**:

* **Cara Menambah Bahasa Baru** (misal: Bahasa Prancis / FR):
  1. Tambahkan kode bahasa ke type `Language`: `export type Language = 'EN' | 'ID' | 'ZH' | 'FR';`
  2. Tambahkan objek terjemahan baru di dalam `translations` export.
  3. Tambahkan tombol toggle di `Header.tsx`.

---

## 🔗 7. Ekosistem Domain HelloBajo

* Motor / Scooter Rental: `scooter.hellobajo.com`
* Car & HiAce Charter: `car.hellobajo.com`
* Speedboat & Daytour: `speedboat.hellobajo.com`

