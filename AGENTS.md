# AGENTS.md — TaniLink
> Instruksi operasional untuk AI agent yang mengerjakan proyek ini.
> Baca dokumen ini SEBELUM menyentuh satu baris kode pun.

---

## 0. Urutan Baca Wajib

Sebelum mengerjakan task apapun, agent HARUS membaca dokumen berikut dalam urutan ini:

1. `AGENTS.md` ← kamu sedang baca ini
2. `PROJECT.md` ← definisi lengkap apa yang dibangun
3. `DESIGN.md` ← token warna, tipografi, spacing, layout per halaman

Kalau salah satu dari tiga file ini tidak ada atau tidak terbaca, **berhenti dan lapor ke user** sebelum melanjutkan.

---

## 1. Konteks Proyek

TaniLink adalah marketplace sayur dan buah yang menghubungkan petani lokal langsung ke konsumen. Proyek ini sedang di **Phase 0: Static Frontend Display** — tidak ada backend, tidak ada autentikasi nyata, tidak ada pembayaran nyata. Semua data dari mock data statis di `/src/data/`.

Stack: **React.js + TypeScript + Vite + Tailwind CSS v3 + React Router v6**  
Bahasa: **TypeScript strict** — semua file komponen `.tsx`, semua utilitas/data/types `.ts`, tidak ada `.js` atau `.jsx`

---

## 2. Cara Menerima Task

Task akan diberikan dalam salah satu format berikut:

### Format A — Task spesifik
```
Buat komponen ProductCard di src/components/ui/ProductCard.tsx
```
→ Kerjakan langsung. Tidak perlu konfirmasi.

### Format B — Task ambigu
```
Tambahkan filter ke halaman produk
```
→ Sebelum koding, tulis rencana singkat:
```
Rencana:
- Filter by category (dari categories.ts)
- Filter by price range (slider atau input)
- Filter state disimpan di useState lokal di ProductListPage
- Tidak ada URL query param untuk phase ini
Lanjut? (ya/tidak)
```
Tunggu konfirmasi sebelum koding.

### Format C — Task multi-file besar
```
Bangun halaman Daftar Petani lengkap
```
→ Pecah jadi sub-task, kerjakan satu per satu, lapor setelah tiap sub-task selesai.

---

## 3. Workflow per Task

```
1. BACA   → Pahami task. Cek PROJECT.md jika ada yang tidak jelas.
2. PLAN   → Identifikasi file yang akan dibuat / diubah.
3. CHECK  → Pastikan tidak ada yang sudah ada dan akan di-overwrite tanpa sengaja.
4. CODE   → Tulis kode.
5. VERIFY → Cek mental: apakah kode sesuai konvensi di bawah?
6. REPORT → Sebutkan file apa saja yang dibuat/diubah dan kenapa.
```

---

## 4. Aturan Kode — WAJIB Diikuti

### 4.1 Umum

```
✅ Gunakan functional component + hooks — tidak ada class component
✅ Semua file komponen: .tsx — semua utilitas, data, types: .ts
✅ Setiap props komponen didefinisikan sebagai interface (bukan type alias inline)
✅ Tidak ada penggunaan `any` — gunakan unknown, generics, atau tipe yang tepat
✅ Semua warna dari Tailwind config yang sudah dipetakan ke token DESIGN.md
✅ Semua spacing menggunakan Tailwind utility — tidak ada inline style px/rem hardcode
✅ Import path menggunakan alias @ untuk /src (sudah dikonfigurasi di vite.config.ts)
✅ Semua type & interface disimpan di /src/types/ — tidak didefinisikan inline di data file
❌ Jangan install package baru tanpa sebutkan ke user terlebih dahulu
❌ Jangan gunakan .jsx atau .js untuk file baru — semua harus .tsx atau .ts
❌ Jangan import PropTypes — TypeScript menggantikan PropTypes sepenuhnya
❌ Jangan gunakan CSS module kecuali untuk animasi yang tidak bisa di-Tailwind
❌ Jangan hardcode warna hex di JSX — selalu lewat Tailwind class
❌ Jangan gunakan dangerouslySetInnerHTML
❌ Jangan ada console.log di kode yang di-submit
```

### 4.2 Struktur Komponen

```tsx
// Template standar komponen TypeScript
import { useState } from 'react'

interface NamaKomponenProps {
  prop1: string
  prop2?: number          // ? artinya opsional
  onClick?: () => void
}

/**
 * NamaKomponen — deskripsi singkat satu kalimat
 */
export function NamaKomponen({ prop1, prop2 = 0, onClick }: NamaKomponenProps) {
  // hooks di atas
  // handler di tengah
  // return JSX di bawah
  return (
    <div>...</div>
  )
}
```

### 4.3 Tailwind

```tsx
// ✅ Benar — class string langsung
<div className="bg-soil text-cream px-4 py-3 rounded-pill">

// ✅ Benar — conditional class dengan template literal atau clsx
<div className={`${isActive ? 'bg-harvest' : 'bg-fog'} px-4`}>

// ❌ Salah — inline style
<div style={{ backgroundColor: '#1C1A14' }}>

// ❌ Salah — class tidak ada di Tailwind config
<div className="bg-[#1C1A14]">   // boleh hanya jika token belum di-config
```

### 4.4 Data & State

```typescript
// Semua data produk dari:
import { products } from '@/data/products'
import type { Product } from '@/types/product'

// Semua data petani dari:
import { farmers } from '@/data/farmers'
import type { Farmer } from '@/types/farmer'

// State keranjang SELALU dari context:
import { useCart } from '@/context/CartContext'

// Filter & search: useState lokal di page component — tidak perlu context
const [filtered, setFiltered] = useState<Product[]>(products)
```

---

## 5. Tailwind Config yang Sudah Dipetakan

Agent harus tahu bahwa `tailwind.config.ts` sudah berisi mapping token berikut sehingga class-class ini valid:

```typescript
// tailwind.config.ts (ringkasan)
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
      pill: '999px',
    },
    fontFamily: {
      display: ['Fraunces', 'serif'],
      sans:    ['Plus Jakarta Sans', 'sans-serif'],
    },
  }
}
```

Jadi class seperti `bg-soil`, `text-harvest`, `font-display`, `rounded-pill` adalah valid.

---

## 6. Prioritas Task (Urutan Pengerjaan yang Disarankan)

Jika tidak ada instruksi urutan dari user, kerjakan dalam urutan ini:

```
Phase 0 Build Order:

[1] Setup & Scaffolding
    ├── Inisialisasi Vite + React
    ├── Install Tailwind + konfigurasi token
    ├── Install React Router + setup routes dasar
    └── Buat struktur folder sesuai PROJECT.md

[2] Types terlebih dahulu (wajib sebelum data & komponen)
    ├── types/product.ts
    ├── types/farmer.ts
    ├── types/cart.ts
    └── types/category.ts

[3] Foundation Components
    ├── ui/Button.tsx
    ├── ui/Badge.tsx
    ├── ui/ProductCard.tsx
    ├── ui/FarmerCard.tsx
    └── ui/Avatar.tsx

[4] Layout
    ├── layout/Navbar.tsx
    ├── layout/BottomTabBar.tsx
    ├── layout/Footer.tsx
    └── layout/PageWrapper.tsx

[5] Mock Data
    ├── data/categories.ts (min. 6 kategori)
    ├── data/farmers.ts (min. 5 petani)
    └── data/products.ts (min. 12 produk)

[6] Context
    └── context/CartContext.tsx

[7] Pages — urutan prioritas
    ├── LandingPage.tsx       ← paling penting, dikerjakan pertama
    ├── ProductListPage.tsx
    ├── ProductDetailPage.tsx
    ├── FarmerListPage.tsx
    ├── FarmerDetailPage.tsx
    ├── CartPage.tsx
    └── AboutPage.tsx

[7] Polish
    ├── Scroll animations (CSS transition, bukan library)
    ├── Loading skeleton untuk card
    └── Empty state untuk keranjang kosong
```

---

## 7. Aturan Mock Data

```typescript
// Produk: minimal 12 item, minimal 4 kategori berbeda
// Petani: minimal 5 profil, lokasi bervariasi (Jawa, Sumatera, Bali, dll)
// Gambar: gunakan Unsplash Source URL dengan kata kunci spesifik

// Format URL gambar yang dipakai:
// Produk sayuran : https://images.unsplash.com/photo-[id]?w=400&q=80
// Petani         : https://images.unsplash.com/photo-[id]?w=200&q=80

// Harga: realistis untuk pasar Indonesia
// Sayuran daun   : Rp 3.000 – Rp 8.000 / 250g
// Buah lokal     : Rp 8.000 – Rp 25.000 / 500g
// Rempah         : Rp 5.000 – Rp 15.000 / 100g
```

---

## 8. Format Laporan Setelah Selesai Task

Setelah menyelesaikan task, agent HARUS melapor dalam format ini:

```
✅ Selesai: [nama task]

File yang dibuat:
- src/components/ui/ProductCard.tsx
- src/types/product.ts  ← jika belum ada

File yang diubah:
- src/App.tsx (ditambahkan import ProductCard)

Catatan:
- Menggunakan clsx untuk conditional class karena ada 3+ kondisi
- Gambar menggunakan lazy loading
- Belum ada: animasi hover (bisa ditambah di task berikutnya)

Siap untuk task berikutnya.
```

---

## 9. Hal yang Tidak Boleh Dilakukan Agent

```
❌ Mengubah DESIGN.md, PROJECT.md, atau AGENTS.md tanpa instruksi eksplisit
❌ Menginstall package baru tanpa menyebut ke user
❌ Membuat endpoint API atau fetch ke URL manapun
❌ Menyimpan state ke localStorage tanpa izin eksplisit
❌ Membuat file di luar struktur folder yang sudah didefinisikan
❌ Mengganti nama folder atau file yang sudah ada
❌ Menambahkan fitur yang tidak ada di PROJECT.md tanpa konfirmasi
❌ Menggunakan library animasi (Framer Motion, GSAP) tanpa konfirmasi
❌ Membuat file .js atau .jsx — semua file baru wajib .ts atau .tsx
❌ Menggunakan `any` sebagai tipe — gunakan unknown atau definisikan interface yang tepat
❌ Mendefinisikan type/interface langsung di file data atau komponen — selalu taruh di /src/types/
```

---

## 10. Jika Agent Menemukan Konflik atau Ketidakjelasan

Gunakan hierarki ini untuk resolusi:

```
1. AGENTS.md   → aturan cara kerja (kamu sedang baca ini)
2. PROJECT.md  → apa yang dibangun dan batasannya
3. DESIGN.md   → tampilan dan token
4. Tanya user  → jika ketiga dokumen tidak memberikan jawaban
```

Jangan membuat asumsi dan langsung koding untuk hal yang ambigu. Lebih baik tanya satu pertanyaan spesifik daripada salah arah 50 baris kode.

---

*Dokumen ini adalah kontrak antara agent dan proyek. Ikuti, dan pengerjaan akan berjalan lancar.*
