# DESIGN.md — TaniLink
### Landing Page · React.js + Tailwind CSS · Mobile-first

---

## 1. Visi & Konteks

**Produk:** Marketplace sayur dan buah langsung dari petani ke konsumen.  
**Audiens utama:** Konsumen urban usia 22–40 yang peduli harga dan kualitas, serta petani mitra yang melihat halaman ini sebagai "wajah" platform mereka.  
**Satu pekerjaan halaman ini:** Meyakinkan pengunjung bahwa membeli dari sini = murah, segar, dan mereka ikut membantu petani lokal — dalam 10 detik pertama.

---

## 2. Token Sistem Desain

### 2.1 Color Palette

```
--color-soil       : #1C1A14   /* near-black warm, background utama dark section */
--color-harvest    : #E8A838   /* kuning panen — aksen utama, CTA, highlight */
--color-cream      : #F5F0E8   /* background section terang, card base */
--color-leaf       : #2D5016   /* hijau tua — dipakai SANGAT HEMAT, badge/tag saja */
--color-earth      : #6B4E2A   /* coklat tanah — divider, secondary text di bg terang */
--color-fog        : #FAFAF7   /* white hangat — background default page */
```

> **Aturan palet:**
> - `--color-harvest` hanya untuk elemen interaktif (tombol utama, underline highlight, ikon aktif). Tidak boleh dipakai sebagai background section besar.
> - `--color-leaf` maksimal muncul di 3 tempat per halaman (badge kategori, tag "Segar Hari Ini", indikator stok).
> - Tidak ada gradien pelangi. Jika gradien, hanya `soil → #2A2620` (subtle depth).

### 2.2 Typography

```
Display  : "Fraunces" (Google Fonts) — variable, italic tersedia
           Karakter: organik, sedikit quirky, terasa hidup tapi otoritatif
           Digunakan untuk: headline hero, section title besar
           Weight: 700–900, italic untuk emphasis emosional

Body     : "Plus Jakarta Sans" (Google Fonts)
           Karakter: bersih, humanis, nyaman di layar kecil
           Digunakan untuk: semua body copy, label, navigasi
           Weight: 400 (body), 600 (label/nav), 700 (tombol)

Mono     : "JetBrains Mono" — opsional, hanya untuk angka harga & statistik
```

### 2.3 Type Scale (Mobile-first, satuan sp/px)

```
--text-hero    : 36sp / line-height 1.1 / Fraunces 800 italic
--text-title   : 26sp / line-height 1.2 / Fraunces 700
--text-section : 20sp / line-height 1.3 / Fraunces 600
--text-body    : 15sp / line-height 1.6 / Plus Jakarta Sans 400
--text-label   : 12sp / line-height 1.4 / Plus Jakarta Sans 600 uppercase tracking 0.08em
--text-price   : 22sp / line-height 1.0 / JetBrains Mono 700
--text-caption : 11sp / line-height 1.5 / Plus Jakarta Sans 400
```

### 2.4 Spacing & Radius

```
--space-xs  : 4px
--space-sm  : 8px
--space-md  : 16px
--space-lg  : 24px
--space-xl  : 40px
--space-2xl : 64px

--radius-sm : 8px    /* chip, badge */
--radius-md : 12px   /* card petani, container kecil */
--radius-lg : 16px   /* card produk — rounded lebih tegas, komersial */
--radius-xl : 24px   /* bottom sheet, modal */
--radius-pill: 999px /* tombol CTA utama */
```

### 2.5 Shadow & Elevation

```
--shadow-card : 0 1px 4px rgba(28, 26, 20, 0.06), 0 2px 8px rgba(28, 26, 20, 0.04)
--shadow-card-hover : 0 4px 16px rgba(28, 26, 20, 0.10), 0 2px 6px rgba(28, 26, 20, 0.06)
--shadow-cta  : 0 4px 20px rgba(232, 168, 56, 0.30)   /* harvest glow untuk tombol */
--shadow-hero : 0 8px 40px rgba(28, 26, 20, 0.18)
```

### 2.6 Logo & Brand Mark

**Konsep:** Daun/sprout stylized yang terbentuk dari dua lengkungan ke atas, secara halus menyerupai rantai link atau dua node terhubung — merepresentasikan pertanian (daun) dan koneksi digital (link).

**Varian Logo:**

```
┌──────────────────────────────────────────────────────┐
│  HORIZONTAL LOCKUP (3:1)                             │
│                                                      │
│  ┌────┐                                              │
│  │ 🌱 │  TaniLink                                    │
│  └────┘                                              │
│   mark    wordmark                                   │
│                                                      │
│  Mark color    : --color-harvest (#E8A838)           │
│  Wordmark color: --color-cream (#F5F0E8)             │
│  Background    : --color-soil (#1C1A14)              │
│  Typeface      : Plus Jakarta Sans 700               │
└──────────────────────────────────────────────────────┘

┌──────────────────┐
│  ICON ONLY       │  dipakai di: favicon, app icon,
│                  │  navbar mobile (hanya mark),
│  ┌────┐          │  bottom tab bar aktif state
│  │ 🌱 │          │
│  └────┘          │  ukuran: 32×32px (navbar)
│                  │           48×48px (app icon)
│  Mark color      │          16×16px (favicon)
│  : harvest       │
│  Background      │
│  : soil atau     │
│    transparent   │
└──────────────────┘
```

**Aturan Logo:**

```
✅ DO:
- Gunakan horizontal lockup di navbar desktop dan footer
- Gunakan icon-only di navbar mobile (hemat space)
- Selalu pertahankan clear space minimal = lebar 1 daun di sekitar logo
- Di background terang, gunakan mark color harvest + wordmark soil
- Di background gelap, gunakan mark color harvest + wordmark cream

❌ DON'T:
- Jangan ubah proporsi atau stretch mark
- Jangan tambahkan drop shadow, gradient, atau efek 3D pada logo
- Jangan letakkan logo di background yang kontrasnya rendah
- Jangan rotate atau mirror mark
- Jangan gunakan warna di luar palette yang sudah ditentukan
```

**Spesifikasi Teknis:**

```
Format file   : SVG (primary), PNG @2x (fallback)
File location : src/assets/logo.svg (lockup), src/assets/logo-mark.svg (icon only)
Ukuran navbar : height 28px (lockup), 32×32px (icon only)
Favicon       : public/favicon.ico (16×16, 32×32, 48×48 multi-size)
```

---

## 3. Layout — Struktur Halaman (Mobile, max-width 430px)

```
┌─────────────────────────────┐
│  NAVBAR                     │  height: 56px, bg: --color-fog, sticky
│  [🌱]         [Masuk] [🛒]  │  mobile: icon-only mark (32px)
│                             │  shadow muncul saat scroll > 10px
│  [🌱 TaniLink] [Masuk] [🛒] │  desktop: horizontal lockup (h: 28px)
└─────────────────────────────┘

┌─────────────────────────────┐
│  HERO SECTION               │  bg: --color-soil, min-height: 88vh
│                             │
│  [eyebrow label]            │  "Langsung dari tangan petani"
│                             │  text-label, --color-harvest
│  Hasil bumi yang            │
│  adil untuk                 │  text-hero, --color-cream, italic
│  semua.                     │
│                             │
│  [subtext]                  │  text-body, --color-cream opacity 0.7
│  Harga pasar tanpa tengkulak│
│  — petani untung, kamu      │
│  hemat.                     │
│                             │
│  [ Belanja Sekarang ——▶ ]   │  pill CTA, bg: --color-harvest
│  [ Daftar sebagai Petani ]  │  ghost button, border: --color-cream
│                             │
│  ┌──────────────────┐       │
│  │  Foto: tangan    │       │  Image card, border-radius-lg
│  │  petani memegang │       │  bukan foto sayur — tangan manusia
│  │  hasil panen     │       │  aspect ratio 4:3
│  └──────────────────┘       │
│                             │
│  [3 stat pills]             │  row horizontal scroll
│  🌾 120+ Petani Mitra       │
│  📦 850+ Produk Segar       │
│  ⚡ Kirim < 24 Jam          │
└─────────────────────────────┘

┌─────────────────────────────┐
│  MASALAH YANG DISELESAIKAN  │  bg: --color-cream, padding-y: 48px
│                             │
│  "Selama ini, kamu bayar    │  text-section, --color-soil, Fraunces
│  mahal. Petaninya tetap     │  italic
│  miskin."                   │
│                             │
│  [2-column comparison]      │
│  ┌──────────┬──────────┐    │
│  │ Sebelum  │ Sekarang │    │  card ringan, --color-fog
│  │ Tengkulak│ TaniLink │    │
│  ├──────────┼──────────┤    │
│  │ Petani   │ Petani   │    │
│  │ terima   │ terima   │    │
│  │ Rp 1.200 │ Rp 3.500 │    │  harga pakai --text-price
│  │ /kg      │ /kg      │    │
│  └──────────┴──────────┘    │
│  *contoh tomat, ilustratif  │  text-caption, --color-earth
└─────────────────────────────┘

┌─────────────────────────────┐
│  CARA KERJA                 │  bg: --color-fog
│                             │
│  [Section title]            │  "Sesederhana ini"
│                             │
│  Step 1 ─────────────────   │  bukan numbered 01/02/03 generic
│  [icon] Pilih produk        │  icon filled, --color-harvest
│  Dari petani terverifikasi  │
│                             │
│  Step 2 ─────────────────   │
│  [icon] Kami kumpulkan      │
│  Langsung dari kebun pagi   │
│  hari pesananmu masuk       │
│                             │
│  Step 3 ─────────────────   │
│  [icon] Sampai segar        │
│  Diantar < 24 jam ke pintumu│
└─────────────────────────────┘

┌─────────────────────────────────────┐
│  PRODUK UNGGULAN                    │  bg: --color-cream
│                                     │
│  [Section title]                    │  "Segar dari kebun hari ini"
│  [Lihat semua →]                    │  aligned right, text-label --color-leaf
│                                     │
│  ┌─────────────┐ ┌─────────────┐    │  GRID 2 KOLOM, gap: 12px
│  │ [Badge]     │ │ [Badge]     │    │  card width: flex-1, radius-lg
│  │ ┌─────────┐ │ │ ┌─────────┐ │    │  bg: --color-fog, shadow-card
│  │ │  foto   │ │ │ │  foto   │ │    │  aspect-ratio gambar: 1/1
│  │ │         │ │ │ │         │ │    │
│  │ └─────────┘ │ │ └─────────┘ │    │
│  │ ♡           │ │ ♡           │    │  wishlist icon, absolute top-right
│  │             │ │             │    │
│  │ Bayam Hijau │ │ Tomat Merah │    │  text-body 600, max 2 line clamp
│  │ Pak Amin    │ │ Bu Sari     │    │  text-caption, --color-earth
│  │ ⭐ 4.8 (24) │ │ ⭐ 4.9 (31) │    │  rating + review count
│  │             │ │             │    │
│  │ Rp 4.500    │ │ Rp 8.000    │    │  text-price, --color-soil, bold
│  │ /250g       │ │ /500g       │    │  text-caption, --color-earth
│  │             │ │             │    │
│  │ [+ Keranjang]│ │[+ Keranjang]│   │  full-width button, pill, harvest
│  └─────────────┘ └─────────────┘    │
│                                     │
│  ┌─────────────┐ ┌─────────────┐    │
│  │   ...       │ │   ...       │    │  min 4 produk ditampilkan
│  └─────────────┘ └─────────────┘    │
│                                     │
│  [ Lihat Semua Produk ——▶ ]         │  button ghost, center, mt-4
└─────────────────────────────────────┘

┌─────────────────────────────┐
│  SUARA PETANI               │  bg: --color-soil (gelap, kontras)
│                             │
│  "                          │  tanda kutip besar, --color-harvest
│  Dulu saya jual ke tengkulak│  text-section italic, --color-cream
│  Rp 800/kg. Sekarang saya   │
│  bisa dapat Rp 3.200/kg."   │
│                             │
│  ┌──┐ Pak Suryanto          │  avatar circle kecil (40px)
│  │  │ Petani Sayur, Malang  │  text-label, --color-cream op 0.7
│  └──┘                       │
│                             │
│  ● ○ ○  [nav dots]          │  untuk swipe testimonial
└─────────────────────────────┘

┌─────────────────────────────┐
│  CTA PENUTUP                │  bg: --color-harvest (SATU-SATUNYA
│                             │  section bg harvest di seluruh page)
│  Mulai belanja              │  text-title, --color-soil
│  hari ini.                  │
│                             │
│  [ Daftar Gratis ——▶ ]      │  pill, bg: --color-soil, text: cream
│                             │
│  Tidak ada biaya langganan  │  text-caption, --color-soil op 0.7
└─────────────────────────────┘

┌─────────────────────────────┐
│  FOOTER                     │  bg: --color-soil, compact
│  [🌱 TaniLink]              │  horizontal lockup, harvest+cream
│  Tentang · Petani · Kontak  │  text-caption, cream op 0.7
│  Kebijakan Privasi          │
│  © 2025 TaniLink           │  text-caption, cream op 0.5
└─────────────────────────────┘

┌─────────────────────────────────────┐
│  HALAMAN DAFTAR PRODUK (/produk)    │  bg: --color-fog
│                                     │
│  [Search bar]                       │  sticky di bawah navbar
│  ┌─────────────────────────────────┐│  rounded-pill, bg: cream
│  │ 🔍  Cari sayur, buah...        ││  height: 44px
│  └─────────────────────────────────┘│
│                                     │
│  [Filter chips horizontal scroll]   │  bg: transparent
│  [Semua] [Sayur] [Buah] [Rempah]   │  active: bg-leaf, text-cream
│                                     │  inactive: border earth, text-earth
│                                     │
│  [Sort: Terpopuler ▼]               │  text-caption, --color-earth
│                                     │
│  ┌──────────┐  ┌──────────┐         │  GRID 2 KOLOM, gap-3
│  │ ProductCard │  │ ProductCard │     │  card: ProductCard component
│  └──────────┘  └──────────┘         │  padding: 4px horizontal
│  ┌──────────┐  ┌──────────┐         │
│  │ ProductCard │  │ ProductCard │     │  infinite scroll atau
│  └──────────┘  └──────────┘         │  "Muat lebih banyak" button
│  ┌──────────┐  ┌──────────┐         │
│  │ ProductCard │  │ ProductCard │     │
│  └──────────┘  └──────────┘         │
│                                     │
│  [ Muat lebih banyak ]              │  ghost button, center
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  HALAMAN DAFTAR PETANI (/petani)    │  bg: --color-fog
│                                     │
│  [Search bar]                       │  sama seperti halaman produk
│                                     │
│  [Filter lokasi]                    │  chips horizontal scroll
│  [Semua] [Jawa] [Bali] [Sumatera]  │
│                                     │
│  ┌─────────────────────────────────┐│  LIST VERTIKAL, gap-3
│  │ FarmerCard                      ││  full-width, single column
│  ├─────────────────────────────────┤│
│  │ FarmerCard                      ││  card: FarmerCard component
│  ├─────────────────────────────────┤│
│  │ FarmerCard                      ││
│  ├─────────────────────────────────┤│
│  │ FarmerCard                      ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

---

## 4. Komponen React.js

### 4.1 Struktur File yang Disarankan

```
src/
  pages/
    LandingPage.tsx          ← entry point halaman ini
  components/
    sections/
      HeroSection.tsx
      ProblemSection.tsx
      HowItWorks.tsx
      ProductCarousel.tsx
      TestimonialSlider.tsx
      CtaSection.tsx
    ui/
      StatPill.tsx
      ProductCard.tsx
      FarmerCard.tsx
      StepItem.tsx
      Button.tsx
```

### 4.2 Tailwind Token Mapping (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        soil:    '#1C1A14',
        harvest: '#E8A838',
        cream:   '#F5F0E8',
        leaf:    '#2D5016',
        earth:   '#6B4E2A',
        fog:     '#FAFAF7',
      },
      borderRadius: {
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '24px',
        pill: '999px',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans:    ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        hero:    ['36px', { lineHeight: '1.1', fontWeight: '800' }],
        title:   ['26px', { lineHeight: '1.2', fontWeight: '700' }],
        section: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        price:   ['22px', { lineHeight: '1.0', fontWeight: '700' }],
        label:   ['12px', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        caption: ['11px', { lineHeight: '1.5' }],
      },
      boxShadow: {
        card:       '0 1px 4px rgba(28, 26, 20, 0.06), 0 2px 8px rgba(28, 26, 20, 0.04)',
        'card-hover': '0 4px 16px rgba(28, 26, 20, 0.10), 0 2px 6px rgba(28, 26, 20, 0.06)',
        cta:        '0 4px 20px rgba(232, 168, 56, 0.30)',
        hero:       '0 8px 40px rgba(28, 26, 20, 0.18)',
      },
    },
  },
  plugins: [],
}

export default config
```

### 4.3 Button.tsx

```tsx
interface ButtonProps {
  label: string
  variant?: 'primary' | 'ghost' | 'dark'
  onClick?: () => void
}

const variantClass = {
  primary: 'bg-harvest text-soil shadow-cta hover:brightness-105',
  ghost:   'bg-transparent text-cream border border-cream hover:bg-cream/10',
  dark:    'bg-soil text-cream hover:bg-soil/90',
}

export function Button({ label, variant = 'primary', onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-7 py-3.5 rounded-pill font-sans font-bold text-base
        transition-all duration-150 active:scale-95
        ${variantClass[variant]}
      `}
    >
      {label}
    </button>
  )
}
```

### 4.4 ProductCard.tsx

```tsx
import { Star, Heart } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onClick?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  const { name, images, price, unit, farmerId, rating, reviewCount, tags } = product

  return (
    <article
      onClick={() => onClick?.(product)}
      className="
        relative flex flex-col bg-fog rounded-lg overflow-hidden
        shadow-card hover:shadow-card-hover transition-shadow duration-200
        cursor-pointer
      "
    >
      {/* Badge */}
      {tags.length > 0 && (
        <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-pill bg-leaf text-cream text-caption font-semibold">
          {tags[0]}
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={(e) => { e.stopPropagation() }}
        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-fog/80 flex items-center justify-center"
        aria-label="Tambah ke wishlist"
      >
        <Heart size={16} className="text-earth" />
      </button>

      {/* Image */}
      <div className="aspect-square bg-cream overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        <h3 className="text-soil font-semibold text-sm leading-snug line-clamp-2">
          {name}
        </h3>
        <p className="text-caption text-earth">{farmerId}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={12} className="fill-harvest text-harvest" />
          <span className="text-caption font-semibold text-soil">{rating}</span>
          <span className="text-caption text-earth">({reviewCount})</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-2">
          <p className="font-mono text-base font-bold text-soil">
            Rp {price.toLocaleString('id-ID')}
            <span className="text-caption text-earth font-normal font-sans"> /{unit}</span>
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
            className="
              w-full mt-2 py-2 rounded-pill bg-harvest text-soil
              font-semibold text-sm hover:brightness-105
              active:scale-95 transition-all
            "
            aria-label={`Tambah ${name} ke keranjang`}
          >
            + Keranjang
          </button>
        </div>
      </div>
    </article>
  )
}
```

### 4.5 FarmerCard.tsx

```tsx
import { MapPin, CheckCircle2 } from 'lucide-react'
import type { Farmer } from '@/types/farmer'

interface FarmerCardProps {
  farmer: Farmer
  onClick?: (farmer: Farmer) => void
}

export function FarmerCard({ farmer, onClick }: FarmerCardProps) {
  const { name, avatar, location, speciality, productCount, rating, verified } = farmer

  return (
    <article
      onClick={() => onClick?.(farmer)}
      className="
        flex items-center gap-3 p-3 bg-fog rounded-lg
        shadow-card hover:shadow-card-hover transition-shadow duration-200
        cursor-pointer
      "
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={name}
        loading="lazy"
        className="w-14 h-14 rounded-full object-cover flex-shrink-0 bg-cream"
      />

      {/* Info */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h3 className="text-soil font-semibold text-sm truncate">{name}</h3>
          {verified && <CheckCircle2 size={14} className="text-leaf flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-1 text-caption text-earth">
          <MapPin size={11} />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-caption text-earth">⭐ {rating}</span>
          <span className="text-caption text-earth">·</span>
          <span className="text-caption text-earth">{productCount} produk</span>
        </div>
      </div>

      {/* Speciality badge */}
      <span className="px-2 py-1 rounded-pill bg-cream text-caption text-earth font-medium flex-shrink-0">
        {speciality[0]}
      </span>
    </article>
  )
}
```

---

## 5. Aturan Web Compatibility (React + Vite)

```typescript
// vite.config.ts — pastikan alias @ sudah dikonfigurasi:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

```typescript
// Pastikan semua komponen menggunakan:
// ✅ HTML semantik: <main>, <section>, <nav>, <article>, <footer>
// ✅ Tailwind class untuk semua styling — tidak ada inline style
// ✅ loading="lazy" untuk semua <img> di bawah fold
// ✅ aria-label pada semua tombol ikon (tanpa teks)
// ❌ Hindari animasi CSS yang berat di hero (gunakan transition Tailwind)
// ❌ Hindari library yang tidak tree-shakeable
```

### Responsive breakpoint (Tailwind):

```
Mobile  : default (< 480px)         → single column, prioritas utama
Tablet  : sm: (≥ 480px)             → sedikit lebih lebar
Desktop : md: (≥ 768px)             → container max-w-[480px] mx-auto
```

```tsx
// Container wrapper standar — dipakai di setiap section:
<section className="w-full px-4 py-12 md:max-w-[480px] md:mx-auto">
  {/* konten */}
</section>
```

---

## 6. Elemen Signature

**Satu elemen yang membedakan halaman ini:**

Di hero section, headline *tidak* dimulai dari sisi produk atau marketplace — tapi dari **pernyataan nilai yang berpihak**. Dikombinasikan dengan font Fraunces italic yang berkarakter organik dan latar gelap `--color-soil`, kesan pertamanya bukan "toko sayur online" tapi lebih dekat ke "gerakan sosial yang kebetulan bisa belanja."

Ini yang membedakan dari Tokopedia/Shopee (marketplace umum) dan dari kompetitor agrikultur yang biasanya pakai foto sayur hijau dengan background putih bersih.

---

## 7. Checklist Sebelum Build

- [ ] Font Fraunces & Plus Jakarta Sans dimuat via `<link>` Google Fonts di `index.html`
- [ ] `tailwind.config.ts` sudah berisi semua token warna, radius, font, shadow
- [ ] Semua warna dipakai via Tailwind class — tidak ada hex hardcode di JSX/TSX
- [ ] Setiap `<img>` punya `alt` yang deskriptif dan `loading="lazy"` (kecuali hero)
- [ ] Setiap tombol ikon punya `aria-label`
- [ ] Stat pills di hero bisa di-scroll horizontal di layar < 360px (`overflow-x-auto`)
- [ ] Testimonial slider bisa diswipe (gunakan scroll-snap CSS atau library ringan)
- [ ] CTA section `bg-harvest` adalah **satu-satunya** section dengan background harvest
- [ ] Di desktop (≥ 768px), container `max-w-[480px] mx-auto` diterapkan di semua section
- [ ] `prefers-reduced-motion` dihormati — animasi scroll trigger dibungkus media query
- [ ] `tsc --noEmit` dan `vite build` berjalan tanpa error

---

*DESIGN.md ini adalah living document — update token dan komponen di sini sebelum mengubah kode.*
