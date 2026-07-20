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

## Phase K: Complete Buyer Experience ✅

> **Tujuan:** Selesaikan semua fitur pembeli yang partial agar Phase 0 siap demo. Fokus pada UX pembeli yang lengkap.

### K1: Filter Harga di ProductListPage ✅

| File | Perubahan |
|------|-----------|
| `src/pages/ProductListPage.tsx` | Tambah price range filter (min-max input atau slider). Filter products berdasarkan range harga. UI: Input min & max dengan tombol "Terapkan" |

### K2: Filter Lokasi Petani di ProductListPage ✅

| File | Perubahan |
|------|-----------|
| `src/pages/ProductListPage.tsx` | Tambah filter chip lokasi (Malang, Lembang, Bali, dll). Ambil data lokasi dari `farmers`. Filter products berdasarkan farmerId → farmer.location |

### K3: Grade Kualitas di ProductDetailPage ✅

| File | Perubahan |
|------|-----------|
| `src/types/product.ts` | Tambah field `grade?: 'A' \| 'B' \| 'C'` |
| `src/data/products.ts` | Tambah data grade untuk setiap produk |
| `src/pages/ProductDetailPage.tsx` | Tampilkan grade badge (A=leaf, B=earth, C=earth/50) di detail produk |

### K4: Checkout Flow di CartPage ✅

| File | Perubahan |
|------|-----------|
| `src/pages/CheckoutPage.tsx` (baru) | Halaman checkout: alamat pengiriman, metode pembayaran (Transfer/E-Wallet/COD), pilihan pengiriman (Instant/Regular), ringkasan pesanan, tombol "Bayar" |
| `src/App.tsx` | Tambah route `/checkout` |
| `src/pages/CartPage.tsx` | Ubah tombol "Checkout" → navigate ke `/checkout` |

### K5: Order Tracking UI di OrdersPage ✅

| File | Perubahan |
|------|-----------|
| `src/data/orders.ts` (baru) | Mock data pesanan (2-3 pesanan dummy) dengan status: diproses/dikirim/selesai |
| `src/components/ui/OrderCard.tsx` (baru) | Komponen order dengan tracking timeline: Dipanen → Dikumpulkan → Perjalanan → Selesai |
| `src/pages/OrdersPage.tsx` | Render daftar pesanan dari mock data. Highlight step aktif, step sebelumnya completed |

### K6: Mock Notifikasi di NotifikasiPage ✅

| File | Perubahan |
|------|-----------|
| `src/data/notifications.ts` (baru) | Mock data notifikasi (5-6 item): status pesanan, promo, harga naik/turun |
| `src/components/ui/NotificationItem.tsx` (baru) | Komponen notifikasi: icon, judul, deskripsi, timestamp, badge read/unread |
| `src/pages/NotifikasiPage.tsx` | Render daftar notifikasi dari mock data |

### K7: Verifikasi Phase K ✅

| Step | Command | Expected |
|------|---------|----------|
| K7a | `npx tsc -b` | 0 error |
| K7b | `npm run build` | Build sukses |
| K7c | Manual test: filter harga, lokasi, checkout, tracking, notifikasi | Semua fitur berjalan |

### Ringkasan File Phase K

| Kategori | File |
|----------|------|
| **Baru (5)** | `src/pages/CheckoutPage.tsx`, `src/data/orders.ts`, `src/components/ui/OrderCard.tsx`, `src/data/notifications.ts`, `src/components/ui/NotificationItem.tsx` |
| **Diubah (5)** | `src/types/product.ts`, `src/data/products.ts`, `src/pages/ProductListPage.tsx`, `src/pages/ProductDetailPage.tsx`, `src/pages/OrdersPage.tsx`, `src/pages/NotifikasiPage.tsx`, `src/pages/CartPage.tsx`, `src/App.tsx` |
| **Total** | ~10-12 file |

---

## Phase L: Farmer Dashboard + Login Flow ✅

> **Tujuan:** Bangun dashboard petani dengan dummy login flow. User bisa masuk sebagai petani dan akses dashboard khusus petani.

### L1: Enhance LoginPage → Dummy Petani Login ✅

| File | Perubahan |
|------|-----------|
| `src/context/AuthContext.tsx` (baru) | AuthContext untuk simulasi login: `isLoggedIn`, `userType` ('buyer' \| 'farmer'), `farmerId`, `login()`, `logout()`. State disimpan di localStorage |
| `src/pages/LoginPage.tsx` | Setelah klik "Masuk" sebagai petani → panggil `login()` dengan dummy credentials → redirect ke `/dashboard-petani`. Email: `petani@tanilink.id`, Password: `petani123` |
| `src/main.tsx` | Wrap App dengan `<AuthProvider>` |

### L2: Dashboard Petani ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/pages/FarmerDashboardPage.tsx` | `/dashboard-petani` | Stats cards (4): Total Penjualan, Pesanan Bulan Ini, Produk Aktif, Rating. Grafik penjualan sederhana (bar chart mock). Riwayat pesanan terbaru. Tombol "Upload Produk" → `/upload-produk` |

### L3: Upload Produk Petani ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/pages/UploadProdukPage.tsx` | `/upload-produk` | Form: nama produk, kategori (dropdown), harga, stok, tanggal panen, deskripsi. Tombol "Upload" → dummy alert sukses, redirect ke dashboard |

### L4: Harga Pasar ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/data/marketPrices.ts` (baru) | — | Mock data 10-15 komoditas: nama, harga rata-rata, perubahan (%), trend (up/down) |
| `src/pages/HargaPasarPage.tsx` | `/harga-pasar` | Tabel komoditas dengan filter kategori. Kolom: nama, harga, perubahan (↑ hijau / ↓ merah), trend icon |

### L5: Riwayat Pesanan Petani ✅

| File | Route | Deskripsi |
|------|-------|-----------|
| `src/data/farmerOrders.ts` (baru) | — | Mock data pesanan petani: status (Baru/Diproses/Dikirim/Selesai), detail pembeli, produk, total |
| `src/pages/PetaniOrdersPage.tsx` | `/pesanan-petani` | List pesanan masuk dengan tab filter status. Tombol "Proses" / "Kirim" (dummy) |

### L6: Integrasi ke ProfilePage ✅

| File | Perubahan |
|------|-----------|
| `src/pages/ProfilePage.tsx` | Tambah menu "Dashboard Petani" (hanya muncul jika `userType === 'farmer'` dari AuthContext). Navigate ke `/dashboard-petani` |

### L7: Mock Session & Protected Routes ✅

| File | Perubahan |
|------|-----------|
| `src/components/layout/ProtectedRoute.tsx` (baru) | Wrapper untuk route petani: cek `isLoggedIn && userType === 'farmer'`, jika tidak → redirect ke `/login` |
| `src/App.tsx` | Wrap route `/dashboard-petani`, `/upload-produk`, `/harga-pasar`, `/pesanan-petani` dengan ProtectedRoute |

### L8: Verifikasi Phase L ✅

| Step | Command | Expected |
|------|---------|----------|
| L8a | `npx tsc -b` | 0 error |
| L8b | `npm run build` | Build sukses |
| L8c | Manual test: login sebagai petani → dashboard → upload produk → harga pasar | Semua fitur berjalan |

### Ringkasan File Phase L

| Kategori | File |
|----------|------|
| **Baru (7)** | `src/context/AuthContext.tsx`, `src/components/layout/ProtectedRoute.tsx`, `src/pages/FarmerDashboardPage.tsx`, `src/pages/UploadProdukPage.tsx`, `src/pages/HargaPasarPage.tsx`, `src/data/marketPrices.ts`, `src/data/farmerOrders.ts`, `src/pages/PetaniOrdersPage.tsx` |
| **Diubah (4)** | `src/pages/LoginPage.tsx`, `src/pages/ProfilePage.tsx`, `src/App.tsx`, `src/main.tsx` |
| **Total** | ~11-12 file |

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
K1-K7  → Complete Buyer Experience ✅
L1-L8  → Farmer Dashboard + Login Flow ✅
```

---

*Dokumen ini sebagai peta eksekusi. Update status di sini seiring progres.*
