# PROJECT.md — TaniLink
> Sumber kebenaran tunggal proyek ini. Semua keputusan teknis dan desain merujuk ke dokumen ini.

---

## 1. Ringkasan Proyek

**Nama:** TaniLink  
**Tagline:** Dari kebun langsung ke tanganmu  
**Deskripsi singkat:** Marketplace sayur dan buah yang menghubungkan petani lokal langsung ke konsumen — tanpa tengkulak, harga adil untuk semua pihak.

**Fase saat ini:** Phase 0 — Static Frontend Display  
**Tujuan phase ini:** Membangun tampilan lengkap aplikasi sebagai demo/prototype yang bisa dinavigasi, tanpa koneksi backend. Semua data menggunakan mock data statis.

---

## 2. Stack Teknologi

```
Framework     : React.js + TypeScript (Vite sebagai bundler)
Styling       : Tailwind CSS v3
Routing       : React Router v6
State         : React useState / useContext (lokal, tidak ada global state manager)
Data          : Mock data statis (typed TS object dalam /src/data/)
Icons         : Lucide React
Font          : Google Fonts — Fraunces (display) + Plus Jakarta Sans (body)
Gambar        : Unsplash placeholder via URL (tidak ada upload)
Testing       : Tidak diperlukan di phase ini
Backend       : TIDAK ADA — semua statis
Bahasa        : TypeScript strict mode — semua file .ts / .tsx
```

> **Tidak boleh diinstall:** Redux, Zustand, Axios, Firebase, Supabase, atau library apapun yang memerlukan koneksi network ke server nyata.

---

## 3. Struktur Halaman (Sitemap)

```
/                    → Landing Page (homepage)
/produk              → Daftar Produk (browse semua sayur & buah)
/produk/:id          → Detail Produk
/petani              → Daftar Petani Mitra
/petani/:id          → Profil Petani
/keranjang           → Keranjang Belanja (state lokal, tidak persist)
/tentang             → Tentang TaniLink (misi & cara kerja)
```

**Halaman yang TIDAK dibangun di phase ini:**
- Login / Register
- Checkout / Payment
- Dashboard Admin
- Notifikasi
- Riwayat Pesanan

---

## 4. Design System (Ringkasan — detail di DESIGN.md)

### Warna

| Token           | Hex       | Penggunaan                              |
|-----------------|-----------|----------------------------------------|
| `soil`          | `#1C1A14` | Background gelap, hero section          |
| `harvest`       | `#E8A838` | CTA utama, aksen interaktif             |
| `cream`         | `#F5F0E8` | Background section terang, card        |
| `leaf`          | `#2D5016` | Badge, tag — dipakai sangat hemat      |
| `earth`         | `#6B4E2A` | Secondary text, divider                |
| `fog`           | `#FAFAF7` | Default page background                |

### Font

```
Display : Fraunces — weight 700–900, italic untuk headline emosional
Body    : Plus Jakarta Sans — weight 400/600/700
```

### Breakpoint

```
Mobile  : default (max-width: 430px) — prioritas utama
Tablet  : 480px
Desktop : 768px — max-width container 480px, center aligned
```

---

## 5. Struktur Folder

```
tanilink/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/           ← Logo, ilustrasi SVG lokal
│   ├── components/
│   │   ├── ui/           ← Komponen atom: Button, Badge, Card, Avatar
│   │   ├── layout/       ← Navbar, Footer, PageWrapper
│   │   └── sections/     ← Section besar per halaman
│   ├── data/             ← Semua mock data statis (typed)
│   │   ├── products.ts
│   │   ├── farmers.ts
│   │   └── categories.ts
│   ├── types/            ← Semua type & interface global
│   │   ├── product.ts
│   │   ├── farmer.ts
│   │   └── cart.ts
│   ├── pages/            ← Satu file per route
│   │   ├── LandingPage.tsx
│   │   ├── ProductListPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── FarmerListPage.tsx
│   │   ├── FarmerDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   └── AboutPage.tsx
│   ├── hooks/            ← Custom hooks (useCart, useFilter)
│   ├── context/          ← CartContext
│   ├── utils/            ← formatPrice, formatWeight, dll
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css         ← Tailwind directives + font imports
├── DESIGN.md
├── PROJECT.md
├── AGENTS.md
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 6. Mock Data Schema

### types/product.ts
```typescript
export interface Product {
  id: string
  name: string
  slug: string
  category: string
  farmerId: string
  price: number        // dalam rupiah
  unit: string
  stock: number        // dalam satuan unit
  images: string[]
  description: string
  tags: string[]
  harvestDate: string  // ISO 8601: "2025-01-10"
  rating: number
  reviewCount: number
}
```

### types/farmer.ts
```typescript
export interface Farmer {
  id: string
  name: string
  slug: string
  location: string
  avatar: string
  coverImage: string
  bio: string
  since: string        // tahun bergabung, e.g. "2023"
  productCount: number
  rating: number
  speciality: string[]
  verified: boolean
}
```

### types/cart.ts
```typescript
export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
```

### types/category.ts
```typescript
export interface Category {
  id: string
  label: string
  icon: string
  count: number        // jumlah produk
}
```

### data/products.ts
```typescript
import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Bayam Hijau Segar",
    // ...
  }
]
```

---

## 7. Komponen Kritis

### CartContext
- Menyimpan item keranjang di `useState`
- Methods: `addItem`, `removeItem`, `updateQty`, `clearCart`
- Total item & total harga dihitung dengan `useMemo`
- **Tidak persist ke localStorage** — reset saat refresh (intentional untuk phase ini)

### Navbar
- Sticky, height 56px
- Logo kiri, ikon keranjang kanan (dengan badge jumlah item)
- Shadow muncul saat `scrollY > 10`
- Mobile: tidak ada hamburger menu — navigasi utama lewat bottom tab bar

### Bottom Tab Bar (mobile only)
```
[🏠 Beranda] [🥦 Produk] [👨‍🌾 Petani] [🛒 Keranjang]
```
- Fixed di bawah layar
- Hanya muncul di viewport < 768px

---

## 8. Konvensi Kode

```typescript
// Penamaan komponen : PascalCase
// File komponen     : PascalCase.tsx
// File utilitas     : camelCase.ts
// File type/interface: namaEntity.ts (di /src/types/)
// CSS class         : Tailwind utility — tidak ada CSS module kecuali animasi custom
// Semua teks rupiah : formatPrice(angka: number): string → "Rp 4.500"
// Semua gambar      : lazy loading dengan loading="lazy"
// Tidak ada console.log di kode final
// Tidak ada `any`   : gunakan unknown atau type yang tepat
// Props komponen    : selalu definisikan sebagai interface, bukan type alias inline
// Contoh props:
//   interface ButtonProps {
//     label: string
//     variant?: 'primary' | 'ghost' | 'dark'
//     onClick?: () => void
//   }
```

---

## 9. Hal yang Sengaja Disederhanakan (Phase 0)

| Fitur                     | Status Phase 0         | Catatan                         |
|---------------------------|------------------------|---------------------------------|
| Autentikasi               | ❌ Tidak ada           | Tombol "Masuk" ada tapi dummy   |
| Pembayaran                | ❌ Tidak ada           | Tombol "Beli" ada tapi dummy    |
| Search & filter backend   | ✅ Frontend filter saja | Filter dari array mock data     |
| Gambar produk             | ✅ Unsplash URL        | Tidak ada upload                |
| Ulasan produk             | ✅ Data statis         | Tidak bisa submit ulasan baru   |
| Notifikasi                | ❌ Tidak ada           | —                               |

---

## 10. Definition of Done — Phase 0

Phase 0 selesai ketika:
- [ ] Semua 7 halaman bisa diakses dan dirender tanpa error
- [ ] Navigasi antar halaman berjalan mulus
- [ ] Keranjang bisa tambah/hapus item dan menampilkan total
- [ ] Tampilan responsif di mobile (375px) dan desktop (1280px)
- [ ] Tidak ada broken layout di Chrome mobile dan Safari iOS
- [ ] Semua warna, font, dan spacing sesuai DESIGN.md
- [ ] Build `vite build` berhasil tanpa warning kritis
