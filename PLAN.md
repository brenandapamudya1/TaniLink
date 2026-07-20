# PLAN.md — TaniLink Build Plan
> Rencana eksekusi build proyek TaniLink dari nol.
> Referensi: AGENTS.md, PROJECT.md, DESIGN.md, PROMPT.md

---

## Ringkasan

- **Total file:** ~35 file
- **Stack:** React.js + TypeScript + Vite + Tailwind CSS v3 + React Router v6 + Lucide React
- **Bahasa:** TypeScript strict, semua .ts/.tsx
- **Phase:** 0 — Static Frontend Display (no backend, no auth, no real payment)

---

## Phase A: Setup & Scaffolding

| Step | Aksi | Output |
|------|------|--------|
| A1 | `npm create vite@latest . -- --template react-ts` | package.json, src/, index.html |
| A2 | `npm install react-router-dom lucide-react` | dependencies |
| A3 | `npm install -D tailwindcss@3 postcss autoprefixer` | devDependencies |
| A4 | `npx tailwindcss init -p` | tailwind.config.ts, postcss.config.js |
| A5 | Konfigurasi `tailwind.config.ts` | token warna, radius, font, shadow dari DESIGN.md 4.2 |
| A6 | Konfigurasi `vite.config.ts` | plugin react + alias `@` → `./src` |
| A7 | Konfigurasi `tsconfig.json` | paths `@/*` → `./src/*` |
| A8 | Update `index.html` | Google Fonts (Fraunces, Plus Jakarta Sans, JetBrains Mono) + meta viewport |
| A9 | Buat `src/index.css` | Tailwind directives + base font-family |
| A10 | Buat `src/main.tsx` | render App + BrowserRouter + CartProvider |

---

## Phase B: Types (4 file)

| File | Interface |
|------|-----------|
| `src/types/product.ts` | Product (id, name, slug, category, farmerId, price, unit, stock, images, description, tags, harvestDate, rating, reviewCount) |
| `src/types/farmer.ts` | Farmer (id, name, slug, location, avatar, coverImage, bio, since, productCount, rating, speciality, verified) |
| `src/types/cart.ts` | CartItem, CartContextType |
| `src/types/category.ts` | Category (id, label, icon, count) |

---

## Phase C: Mock Data (3 file)

| File | Konten |
|------|--------|
| `src/data/categories.ts` | 6 kategori: Sayur Daun, Buah Segar, Rempah, Umbi-umbian, Biji-bijian, Paket Hemat |
| `src/data/farmers.ts` | 5 petani: Jawa Timur, Jawa Barat, Bali, Sumatera Utara, Sulawesi. Avatar Unsplash URL |
| `src/data/products.ts` | 12+ produk, 4+ kategori, harga realistis pasar Indonesia. Gambar Unsplash URL |

---

## Phase D: Context & Utils (2 file)

| File | Fungsi |
|------|--------|
| `src/context/CartContext.tsx` | CartProvider + useCart hook. useState + useMemo. Methods: addItem, removeItem, updateQty, clearCart. Tidak persist localStorage |
| `src/utils/formatPrice.ts` | formatPrice(number) → "Rp 4.500" |

---

## Phase E: UI Components (5 file)

| File | Deskripsi | Referensi |
|------|-----------|-----------|
| `src/components/ui/Button.tsx` | 3 variant: primary/ghost/dark, pill shape | DESIGN.md 4.3 |
| `src/components/ui/StatPill.tsx` | Pill dengan icon + label + value | Hero stat pills |
| `src/components/ui/ProductCard.tsx` | Grid card: badge, wishlist, image square, rating, harga, tombol keranjang | DESIGN.md 4.4 |
| `src/components/ui/FarmerCard.tsx` | Horizontal card: avatar, nama, verified, lokasi, rating, speciality | DESIGN.md 4.5 |
| `src/components/ui/StepItem.tsx` | Icon circle + title + description + garis penghubung vertikal | How It Works section |

---

## Phase F: Layout Components (4 file)

| File | Deskripsi |
|------|-----------|
| `src/components/layout/Navbar.tsx` | Sticky top 56px, bg fog, scroll shadow, mobile icon-only logo, desktop lockup, tombol Masuk + cart badge |
| `src/components/layout/Footer.tsx` | bg soil, compact, logo lockup, link navigasi, copyright |
| `src/components/layout/BottomTabBar.tsx` | Fixed bottom, 5 tab (Beranda, Produk, Keranjang, Petani, Lainnya), bottom sheet untuk Lainnya, hidden di desktop & LandingPage |
| `src/components/layout/PageWrapper.tsx` | padding-bottom 72px mobile untuk tab bar, 0 desktop |

---

## Phase G: Homepage Section Components (7 file)

| File | Background | Deskripsi |
|------|------------|-----------|
| `src/components/sections/HeroSection.tsx` | soil | Eyebrow, headline italic, subtext, 2 CTA, image card, 3 stat pills |
| `src/components/sections/CategorySection.tsx` | fog | Title + horizontal scroll row icon kategori, navigasi ke /produk?category={id} |
| `src/components/sections/ProductCarousel.tsx` | cream | Title + "Lihat semua" link, grid 2 kolom, 4 produk top rating, ProductCard |
| `src/components/sections/ProblemSection.tsx` | cream | Headline italic + 2-column comparison card (Sebelum/Sekarang) |
| `src/components/sections/HowItWorks.tsx` | fog | Title + 3 step vertikal dengan icon Lucide (ShoppingBag, PackageCheck, Truck) |
| `src/components/sections/TestimonialSlider.tsx` | soil | Quote, testimoni text, avatar + info, nav dots, scroll-snap |
| `src/components/sections/CtaSection.tsx` | harvest | Headline + tombol "Daftar Gratis" + subtext (SATU-SATUNYA section bg harvest) |

---

## Phase H: Pages (9 file) + Routing

| File | Route | Tab | Deskripsi |
|------|-------|-----|-----------|
| `src/pages/LandingPage.tsx` | `/` | — | Gabung semua section. TIDAK pakai PageWrapper, TIDAK tampilkan BottomTabBar |
| `src/pages/ProductListPage.tsx` | `/produk` | Produk | Search bar, filter chips kategori, sort dropdown, grid 2 kolom, empty state |
| `src/pages/CartPage.tsx` | `/keranjang` | Keranjang | List item, qty control, ringkasan sticky, checkout dummy, empty state |
| `src/pages/FarmerListPage.tsx` | `/petani` | Petani | Search bar, filter lokasi chips, list vertikal FarmerCard |
| `src/pages/ProfilePage.tsx` | `/profil` | Lainnya | Dummy: header soil, avatar placeholder, menu items dummy |
| `src/pages/OrdersPage.tsx` | `/pesanan` | Lainnya | Dummy: tab filter, empty state "Belum ada pesanan" |
| `src/pages/AboutPage.tsx` | `/tentang` | Lainnya | Placeholder: "Halaman segera hadir" |
| `src/pages/ProductDetailPage.tsx` | `/produk/:id` | — | Placeholder: "Halaman segera hadir" |
| `src/pages/FarmerDetailPage.tsx` | `/petani/:id` | — | Placeholder: "Halaman segera hadir" |
| `src/App.tsx` | — | — | Semua routes + CartProvider wrapper |

---

## Phase I: Verifikasi ✅

| Step | Command | Expected |
|------|---------|----------|
| I1 | `npx tsc --noEmit` | 0 error |
| I2 | `npm run build` | Build sukses tanpa warning kritis |
| I3 | `npm run dev` | Visual check di browser |

---

## Phase J: Profile Menu Pages + Wishlist Integration ✅

> **Tujuan:** Mengisi semua menu di ProfilePage dengan halaman statis yang bermakna, dan mengintegrasikan tombol Heart di ProductCard/ProductDetailPage ke WishlistContext agar wishlist bisa diisi dari mana saja.

### J1: Type & Context — Wishlist (2 file baru) ✅

| File | Deskripsi |
|------|-----------|
| `src/types/wishlist.ts` | Interface `WishlistContextType` — `wishlistIds: Set<string>`, `toggleWishlist(productId: string): void`, `isWishlisted(productId: string): boolean`, `wishlistCount: number` |
| `src/context/WishlistContext.tsx` | `WishlistProvider` + `useWishlist` hook. State: `Set<string>` berisi product ID. Methods: `toggleWishlist`, `isWishlisted`, `wishlistCount`. Tidak persist localStorage (sama seperti CartContext) |

### J2: Integrasikan Wishlist ke Komponen Existing (2 file diubah) ✅

| File | Perubahan |
|------|-----------|
| `src/components/ui/ProductCard.tsx` | Import `useWishlist`. Tombol Heart: panggil `toggleWishlist(product.id)`, icon `fill-harvest text-harvest` jika wishlisted, `text-earth` jika tidak. `e.stopPropagation()` tetap ada |
| `src/pages/ProductDetailPage.tsx` | Import `useWishlist`. Tombol Heart di sticky header: panggil `toggleWishlist(product.id)`, visual state sama seperti ProductCard |

### J3: Halaman Baru — WishlistPage (1 file baru) ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/pages/WishlistPage.tsx` | `/wishlist` | Header "Wishlist Saya" + count. Ambil product IDs dari `useWishlist()`, filter dari `products` data. Grid 2 kolom pakai `ProductCard`. Empty state: icon Heart + "Belum ada produk di wishlist" + tombol "Mulai Belanja" ke /produk |

### J4: Halaman Baru — AlamatPage (1 file baru) ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/pages/AlamatPage.tsx` | `/alamat` | Header "Alamat Pengiriman". 1 alamat mock statis (read-only): nama penerima, no HP, label "Utama", alamat lengkap, kota. Tombol "Tambah Alamat Baru" → alert "Segera hadir". Card dengan border kiri harvest untuk alamat utama |

### J5: Halaman Baru — NotifikasiPage (1 file baru) ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/pages/NotifikasiPage.tsx` | `/notifikasi` | Header "Notifikasi". Empty state: icon Bell + "Belum ada notifikasi" + subtext "Notifikasi pesanan dan promo akan muncul di sini" |

### J6: Halaman Baru — PengaturanPage (1 file baru) ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/pages/PengaturanPage.tsx` | `/pengaturan` | Header "Pengaturan". 3 toggle mock (non-fungsional, pakai useState lokal): Bahasa (ID/EN), Mode Gelap (on/off), Notifikasi Push (on/off). Section "Akun": "Kelola Akun" → alert, "Hapus Akun" → alert. Section "Tentang": versi app "TaniLink v0.1.0" |

### J7: Halaman Baru — BantuanPage (1 file baru) ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/pages/BantuanPage.tsx` | `/bantuan` | Header "Pusat Bantuan". 6 FAQ statis pakai `<details>` atau accordion custom: (1) Apa itu TaniLink? (2) Bagaimana cara memesan? (3) Metode pembayaran apa saja? (4) Berapa lama pengiriman? (5) Bagaimana jika produk tidak segar? (6) Cara hubungi customer service? |

### J8: Update ProfilePage (1 file diubah) ✅

| File | Perubahan |
|------|-----------|
| `src/pages/ProfilePage.tsx` | Ganti semua `action: handleDummy` jadi navigasi: Pesanan Saya → `/pesanan`, Wishlist → `/wishlist`, Alamat → `/alamat`, Notifikasi → `/notifikasi`, Pengaturan → `/pengaturan`, Bantuan → `/bantuan`. Import `useNavigate` dari react-router-dom |

### J9: Update Routing & Provider (2 file diubah) ✅

| File | Perubahan |
|------|-----------|
| `src/App.tsx` | Tambah 5 route baru: `/wishlist`, `/alamat`, `/notifikasi`, `/pengaturan`, `/bantuan`. Import halaman baru |
| `src/main.tsx` | Wrap App dengan `<WishlistProvider>` (di dalam `<CartProvider>`) |

### J10: Verifikasi ✅

| Step | Command | Expected |
|------|---------|----------|
| J10a | `npx tsc -b` | 0 error |
| J10b | `npm run build` | Build sukses |
| J10c | Manual test: klik Heart di ProductCard → navigasi ke /wishlist → produk muncul | Heart terisi, produk ada di wishlist |
| J10d | Manual test: semua menu ProfilePage bisa diklik dan navigasi ke halaman yang benar | Tidak ada alert "Segera hadir" |

### Ringkasan File Phase J ✅

| Kategori | File |
|----------|------|
| **Baru (7)** | `src/types/wishlist.ts`, `src/context/WishlistContext.tsx`, `src/pages/WishlistPage.tsx`, `src/pages/AlamatPage.tsx`, `src/pages/NotifikasiPage.tsx`, `src/pages/PengaturanPage.tsx`, `src/pages/BantuanPage.tsx` |
| **Diubah (5)** | `src/components/ui/ProductCard.tsx`, `src/pages/ProductDetailPage.tsx`, `src/pages/ProfilePage.tsx`, `src/App.tsx`, `src/main.tsx` |
| **Total** | 12 file |

---

## Assets (Placeholder untuk Sekarang)

| File | Lokasi | Status |
|------|--------|--------|
| `logo.svg` | `src/assets/logo.svg` | Placeholder: inline SVG daun sederhana di kode |
| `logo-mark.svg` | `src/assets/logo-mark.svg` | Placeholder: inline SVG di kode |
| `favicon.ico` | `public/favicon.ico` | Pakai default Vite, diganti nanti |

**Isi asset yang dibutuhkan nanti:**

1. **logo.svg** — Horizontal lockup SVG: mark daun/sprout stylized (2 lengkungan ke atas menyerupai chain link) warna #E8A838 + wordmark "TaniLink" warna #F5F0E8, Plus Jakarta Sans 700, transparent background, aspect ratio 3:1
2. **logo-mark.svg** — Icon only SVG: mark daun/sprout yang sama, warna #E8A838, transparent background, square aspect ratio, works standalone
3. **favicon.ico** — Multi-size (16x16, 32x32, 48x48), mark daun warna harvest di background soil atau transparent

---

## Urutan Eksekusi

```
A1-A4  → Init project + install deps ✅
A5-A10 → Konfigurasi semua file setup ✅
B1-B4  → Types dulu (wajib sebelum data & komponen) ✅
C1-C3  → Mock data ✅
D1-D2  → Context + Utils ✅
E1-E5  → UI components ✅
F1-F4  → Layout components ✅
G1-G7  → Homepage sections ✅
H1-H9  → Pages + App.tsx routing ✅
I1-I3  → Verifikasi build ✅
J1-J10 → Profile menu pages + Wishlist integration ✅
```

---

*Dokumen ini sebagai peta eksekusi. Update status di sini seiring progres.*
