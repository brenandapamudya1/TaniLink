# PROMPT.md — TaniLink UI/UX Generation Prompts
> 2 prompt terpisah untuk generate UI/UX secara bertahap.
> Copy setiap prompt dan feed ke AI code generator secara berurutan.

---

## PROMPT 1 — Homepage

```
Konteks Proyek:
Kamu sedang mengerjakan proyek bernama TaniLink — marketplace sayur dan buah yang
menghubungkan petani lokal langsung ke konsumen. Stack: React.js + TypeScript + Vite +
Tailwind CSS v3 + React Router v6. Saat ini Phase 0 (Static Frontend Display) — tidak ada
backend, tidak ada autentikasi nyata, semua data dari mock data statis di /src/data/.
Bahasa: TypeScript strict, semua file .tsx/.ts, tidak ada .js/.jsx.

Referensi wajib — baca file-file ini SEBELUM mulai coding:
- DESIGN.md → token desain, layout wireframe, spesifikasi komponen
- PROJECT.md → struktur folder, schema data, konvensi kode
- AGENTS.md → aturan kerja, workflow, dan larangan

Tugasmu: Bangun seluruh halaman Homepage (LandingPage) secara lengkap dari atas ke bawah.
Ini adalah tampilan mobile-first (max-width 430px) yang diakses via HP dan harus terasa
seperti aplikasi komersial marketplace, bukan landing page presentasi biasa.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — Navbar
File: src/components/layout/Navbar.tsx

Spesifikasi:
- Sticky top, height 56px, background --color-fog
- Mobile: icon-only logo mark (32px, warna harvest) di kiri
- Desktop (≥768px): horizontal lockup logo (mark + wordmark "TaniLink", height 28px)
- Kanan: tombol "Masuk" (ghost, text-soil) + ikon keranjang dengan badge jumlah item
- Shadow muncul saat scroll > 10px (gunakan useState + useEffect untuk track scrollY)
- Badge keranjang dari useCart() context — tampilkan totalItems, hide jika 0
- z-index tinggi agar selalu di atas konten

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 2 — Hero Section
File: src/components/sections/HeroSection.tsx

Spesifikasi:
- Background: --color-soil, min-height 88vh
- Eyebrow label: "Langsung dari tangan petani" → text-label, --color-harvest, uppercase
- Headline: "Hasil bumi yang adil untuk semua." → text-hero, Fraunces 800 italic, --color-cream
- Subtext: "Harga pasar tanpa tengkulak — petani untung, kamu hemat." → text-body, cream opacity 0.7
- 2 tombol CTA:
  - "Belanja Sekarang" → pill primary, bg harvest, navigasi ke /produk
  - "Daftar sebagai Petani" → pill ghost, border cream, navigasi ke /tentang
- Image card: foto tangan petani memegang hasil panen (bukan foto sayur saja),
  aspect-ratio 4:3, border-radius xl, shadow-hero
- 3 Stat Pills di bawah foto (horizontal scroll di layar < 360px):
  - 🌾 120+ Petani Mitra
  - 📦 850+ Produk Segar
  - ⚡ Kirim < 24 Jam
  Gunakan komponen StatPill.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 3 — Kategori Quick Access (BARU)
File: src/components/sections/CategorySection.tsx

Spesifikasi:
- Background: --color-fog, padding-y 24px
- Section title: "Kategori" → text-section, Fraunces, --color-soil
- Horizontal scroll row (overflow-x-auto, scroll-snap) berisi semua kategori dari
  data/categories.ts
- Setiap kategori ditampilkan sebagai:
  ┌──────────┐
  │  [icon]  │   circle bg cream, 56×56px, icon warna harvest
  │  Sayur   │   text-caption, --color-soil, font-semibold
  └──────────┘
- Klik kategori → navigasi ke /produk?category={id}
- Minimal 6 kategori: Sayur Daun, Buah Segar, Rempah, Umbi-umbian, Biji-bijian, Paket Hemat
- Scroll snap: snap-x snap-center per item
- Padding horizontal agar item pertama dan terakhir tidak menempel ke edge layar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 4 — Produk Unggulan
File: src/components/sections/ProductCarousel.tsx

Spesifikasi:
- Background: --color-cream, padding-y 32px
- Header bar: section title "Segar dari kebun hari ini" di kiri, link "Lihat semua →"
  di kanan (text-label, --color-leaf, navigasi ke /produk)
- GRID 2 KOLOM (bukan horizontal scroll), gap 12px
- Tampilkan minimal 4 produk dari data/products.ts (sort by rating desc, ambil 4 teratas)
- Gunakan komponen ProductCard.tsx yang sudah ada di DESIGN.md section 4.4:
  - Badge tag (dari product.tags[0])
  - Wishlist heart icon (dummy, belum ada fungsi)
  - Gambar aspect-square
  - Nama produk (line-clamp-2)
  - Nama petani (text-caption, --color-earth)
  - Rating bintang + review count
  - Harga (font-mono bold) + satuan
  - Tombol "+ Keranjang" full-width, pill, harvest
- Di bawah grid: tombol "Lihat Semua Produk" → button ghost, centered, navigasi ke /produk

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 5 — Problem Section
File: src/components/sections/ProblemSection.tsx

Spesifikasi:
- Background: --color-cream, padding-y 48px
- Headline: "Selama ini, kamu bayar mahal. Petaninya tetap miskin."
  → text-section, Fraunces italic, --color-soil
- 2-column comparison card:
  ┌──────────────┬──────────────┐
  │   Sebelum    │   Sekarang   │
  │   Tengkulak  │   TaniLink   │
  │              │              │
  │  Petani      │  Petani      │
  │  terima      │  terima      │
  │  Rp 1.200/kg │  Rp 3.500/kg │
  └──────────────┴──────────────┘
- Card background: --color-fog, rounded-lg, shadow-card
- Kolom "Sekarang" punya highlight subtle (border kiri harvest atau bg harvest/5)
- Caption di bawah: "*contoh tomat, ilustratif" → text-caption, --color-earth

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 6 — How It Works
File: src/components/sections/HowItWorks.tsx

Spesifikasi:
- Background: --color-fog, padding-y 40px
- Section title: "Sesederhana ini" → text-section, Fraunces
- 3 step item vertikal, gunakan komponen StepItem.tsx:
  1. Icon filled harvest → "Pilih produk" + "Dari petani terverifikasi"
  2. Icon filled harvest → "Kami kumpulkan" + "Langsung dari kebun pagi hari pesananmu masuk"
  3. Icon filled harvest → "Sampai segar" + "Diantar < 24 jam ke pintumu"
- Setiap step: icon kiri (40×40, circle bg harvest/10), teks kanan
- Garis vertikal penghubung antar step (border kiri, --color-harvest opacity 0.3)
- Gunakan Lucide React icon: ShoppingBag, PackageCheck, Truck

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 7 — Testimonial / Suara Petani
File: src/components/sections/TestimonialSlider.tsx

Spesifikasi:
- Background: --color-soil (gelap, kontras tinggi)
- Quote: tanda kutip besar " → --color-harvest, text-title
- Testimoni text: "Dulu saya jual ke tengkulak Rp 800/kg. Sekarang saya bisa dapat
  Rp 3.200/kg." → text-section italic, --color-cream
- Avatar + info: circle 40px, nama "Pak Suryanto", label "Petani Sayur, Malang"
  → text-label, cream opacity 0.7
- Navigation dots: ● ○ ○ (active = harvest, inactive = cream/30)
- Gunakan scroll-snap CSS untuk swipe (overflow-x-auto, scroll-snap-type: x mandatory)
- Siapkan data untuk minimal 3 testimonial (hardcode di komponen atau di data file)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 8 — CTA Penutup
File: src/components/sections/CtaSection.tsx

Spesifikasi:
- Background: --color-harvest (SATU-SATUNYA section dengan bg harvest penuh)
- Headline: "Mulai belanja hari ini." → text-title, --color-soil
- Tombol: "Daftar Gratis" → pill, bg soil, text cream, navigasi ke /produk
- Subtext: "Tidak ada biaya langganan" → text-caption, soil opacity 0.7
- Padding-y: 48px, text-align center

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 9 — Footer
File: src/components/layout/Footer.tsx

Spesifikasi:
- Background: --color-soil, compact
- Logo horizontal lockup (mark harvest + wordmark cream) di atas
- Link navigasi: Tentang · Petani · Kontak · Kebijakan Privasi
  → text-caption, cream opacity 0.7
- Copyright: "© 2025 TaniLink" → text-caption, cream opacity 0.5
- Padding-y: 24px, padding-x: 16px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HALAMAN UTAMA — LandingPage.tsx
File: src/pages/LandingPage.tsx

Gabungkan semua section di atas secara berurutan:
1. Navbar (sticky, diluar scroll container)
2. Hero Section
3. Kategori Quick Access
4. Produk Unggulan
5. Problem Section
6. How It Works
7. Testimonial
8. CTA Penutup
9. Footer

Wrap semua section (kecuali Navbar) dalam <main> tag semantik.
Setiap section menggunakan container wrapper:
<section className="w-full px-4 py-12 md:max-w-[480px] md:mx-auto">

Pastikan:
- Semua warna via Tailwind class (tidak ada hex hardcode)
- Semua gambar punya alt deskriptif dan loading="lazy" (kecuali hero)
- Semua tombol ikon punya aria-label
- tsc --noEmit dan vite build berjalan tanpa error
- prefers-reduced-motion dihormati
```

---

## PROMPT 2 — Tab Navigation & Tab Pages

```
Konteks Proyek:
Kamu sedang mengerjakan proyek bernama TaniLink — marketplace sayur dan buah yang
menghubungkan petani lokal langsung ke konsumen. Stack: React.js + TypeScript + Vite +
Tailwind CSS v3 + React Router v6. Saat ini Phase 0 (Static Frontend Display) — tidak ada
backend, tidak ada autentikasi nyata, semua data dari mock data statis di /src/data/.
Bahasa: TypeScript strict, semua file .tsx/.ts, tidak ada .js/.jsx.

Referensi wajib — baca file-file ini SEBELUM mulai coding:
- DESIGN.md → token desain, layout wireframe, spesifikasi komponen
- PROJECT.md → struktur folder, schema data, konvensi kode
- AGENTS.md → aturan kerja, workflow, dan larangan

Prasyarat: Homepage (LandingPage) sudah selesai dibangun. Sekarang bangun sistem navigasi
tab dan semua halaman yang dituju oleh setiap tab. Tampilan mobile-first (max-width 430px)
yang diakses via HP dan harus terasa seperti aplikasi komersial marketplace.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KOMPONEN 1 — Bottom Tab Bar
File: src/components/layout/BottomTabBar.tsx

Spesifikasi:
- Fixed di bawah layar, hanya muncul di viewport < 768px (hidden di desktop)
- Height: 60px + safe area bottom (env(safe-area-inset-bottom))
- Background: --color-fog, border-top 1px solid --color-cream
- z-index: 40 (di bawah Navbar yang z-50)

5 Tab yang ditampilkan:
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│  🏠      │  🥦      │  🛒      │  👨‍🌾     │  ⋯       │
│  Beranda │  Produk  │  Keranj. │  Petani  │  Lainnya │
└──────────┴──────────┴──────────┴──────────┴──────────┘

Setiap tab:
- Icon dari Lucide React: Home, Leaf, ShoppingCart, Users, MoreHorizontal
- Label di bawah icon: text-caption (10px), font-semibold
- Active state: icon + label warna --color-harvest
- Inactive state: icon + label warna --color-earth opacity 0.6
- Active indicator: dot kecil (4px) warna harvest di atas label, atau border-top 2px harvest
- Transition: color 150ms ease

Tab "Keranjang" spesial:
- Badge counter (jumlah item dari useCart()) di pojok kanan atas icon
- Badge: circle min-width 18px, bg harvest, text soil, text 10px bold
- Hide badge jika totalItems === 0

Tab "Lainnya" → klik membuka BottomSheet/Modal kecil dari bawah berisi menu:
┌─────────────────────────────┐
│  📋 Pesanan                 │  navigasi ke /pesanan
│  👤 Profil                  │  navigasi ke /profil
│  ℹ️  Tentang                │  navigasi ke /tentang
└─────────────────────────────┘
- Bottom sheet: bg fog, rounded-t-xl, shadow-hero
- Overlay backdrop: soil/50, klik overlay untuk tutup
- Setiap item: flex row, gap-3, padding 16px, border-b cream
- Close handle bar di atas (40×4px, rounded, bg earth/30)

Gunakan useLocation() dari React Router untuk menentukan tab aktif.
Navigasi menggunakan useNavigate() atau <Link>.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KOMPONEN 2 — Page Wrapper
File: src/components/layout/PageWrapper.tsx

Spesifikasi:
- Wrapper untuk semua halaman yang punya Bottom Tab Bar
- Menambahkan padding-bottom 72px (60px tab bar + 12px spacing) agar konten tidak
  tertutup tab bar di mobile
- Di desktop (≥768px): padding-bottom 0 (tab bar hidden)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HALAMAN 1 — ProductListPage (Tab: Produk)
File: src/pages/ProductListPage.tsx
Route: /produk dan /produk?category={id}

Spesifikasi:
- Background: --color-fog
- Navbar di atas (sticky)

Search Bar (sticky di bawah Navbar):
- Input search: rounded-pill, bg cream, height 44px
- Placeholder: "Cari sayur, buah, rempah..."
- Icon search (Lucide: Search) di kiri dalam input
- Clear button (X) muncul saat input tidak kosong
- Filter real-time: filter array products berdasarkan name (case-insensitive)

Filter Chips (horizontal scroll di bawah search):
- Chip "Semua" selalu aktif default
- Chip per kategori dari data/categories.ts
- Active chip: bg leaf, text cream
- Inactive chip: border earth, text earth, bg transparent
- Klik chip → filter produk by category (bisa combine dengan search)
- Chip "Semua" → reset filter kategori

Sort Dropdown:
- Text: "Urutkan: Terpopuler ▼" → text-caption, --color-earth
- Opsi: Terpopuler (by rating), Termurah (by price asc), Terbaru (by harvestDate desc)
- Implementasi: simple <select> atau custom dropdown

Product Grid:
- GRID 2 KOLOM, gap 12px, padding-x 16px
- Gunakan komponen ProductCard.tsx
- Tampilkan semua produk yang match filter + search
- Jika hasil kosong: tampilkan empty state (ilustrasi + "Produk tidak ditemukan")

Load More:
- Tombol "Muat lebih banyak" → ghost button, centered
- Atau: tampilkan semua sekaligus (karena Phase 0 data sedikit, max ~20 produk)
- Jumlah hasil: "Menampilkan 12 dari 24 produk" → text-caption, --color-earth

URL Query Params:
- /produk?category=sayur-daun → auto-select chip kategori "Sayur Daun"
- /produk?search=bayam → auto-fill search bar dengan "bayam"
- Gunakan useSearchParams() dari React Router

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HALAMAN 2 — CartPage (Tab: Keranjang)
File: src/pages/CartPage.tsx
Route: /keranjang

Spesifikasi:
- Background: --color-fog
- Title: "Keranjang Belanja" → text-title, Fraunces

Jika keranjang KOSONG (empty state):
- Ilustrasi/icon keranjang kosong (Lucide: ShoppingCart, size 64, color earth/30)
- Text: "Keranjangmu masih kosong" → text-body, --color-soil
- Subtext: "Yuk, mulai belanja sayur dan buah segar dari petani!" → text-caption, --color-earth
- Tombol CTA: "Mulai Belanja" → pill primary, navigasi ke /produk

Jika keranjang ADA ISI:
- List item keranjang (vertikal, gap 12px):
  Setiap CartItem:
  ┌──────────────────────────────────────┐
  │ ┌──────┐  Nama Produk               │
  │ │ foto │  Pak Amin · Malang          │
  │ │ 60px │  Rp 4.500 /250g            │
  │ └──────┘                             │
  │            [-]  2  [+]    [🗑️]       │
  └──────────────────────────────────────┘
  - Foto: 60×60px, rounded-md, object-cover
  - Info: nama (font-semibold), petani + lokasi (caption, earth)
  - Harga: font-mono bold, --color-soil
  - Quantity control: tombol [-] dan [+] (circle 32px, border earth), angka di tengah
  - Min qty: 1 (tombol [-] disabled di qty 1)
  - Max qty: stok tersedia
  - Tombol hapus (🗑️): icon Lucide Trash2, color earth, klik → removeItem()
  - Swipe left untuk delete (optional, bisa skip untuk Phase 0)

- Ringkasan Belanja (sticky di bawah atau sebelum tab bar):
  ┌──────────────────────────────────────┐
  │  Total (3 item)       Rp 25.500     │  text-body 600 + font-mono bold
  │  Ongkir               Segera        │  text-caption + text-caption
  │                                      │
  │  [ Checkout ———————▶ ]              │  pill primary, full-width, harvest
  │  *Dummy — belum ada pembayaran      │  text-caption, earth
  └──────────────────────────────────────┘
  - Total dihitung dari CartContext (totalPrice)
  - Tombol Checkout: klik → alert("Fitur checkout akan segera hadir!") atau dummy modal
  - Ringkasan sticky: position fixed di atas bottom tab bar, bg fog, shadow-card,
    border-top cream

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HALAMAN 3 — FarmerListPage (Tab: Petani)
File: src/pages/FarmerListPage.tsx
Route: /petani

Spesifikasi:
- Background: --color-fog
- Title: "Petani Mitra" → text-title, Fraunces

Search Bar:
- Sama seperti ProductListPage tapi placeholder: "Cari petani..."
- Filter berdasarkan nama petani (case-insensitive)

Filter Lokasi (horizontal scroll chips):
- Chip "Semua" + chip per lokasi unik dari data/farmers.ts
- Contoh: [Semua] [Jawa Timur] [Jawa Barat] [Bali] [Sumatera Utara] [Sulawesi]
- Active chip: bg leaf, text cream
- Inactive: border earth, text earth

Farmer List (VERTIKAL, single column, gap 12px):
- Gunakan komponen FarmerCard.tsx yang sudah ada di DESIGN.md section 4.5:
  - Avatar circle 56px
  - Nama + verified badge (CheckCircle2, warna leaf)
  - Lokasi (icon MapPin + text)
  - Rating + jumlah produk
  - Speciality badge (pill, bg cream)
- Klik card → navigasi ke /petani/:id
- Empty state jika tidak ada hasil: "Petani tidak ditemukan"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HALAMAN 4 — MoreMenuPage (Tab: Lainnya)
File: src/pages/MoreMenuPage.tsx
Route: tidak punya route sendiri (hanya bottom sheet dari tab bar)

TAPI jika dibuka sebagai halaman penuh (opsional, bisa skip):
Route: /lainnya

Menu items (vertical list):
┌──────────────────────────────────────┐
│  📋  Pesanan Saya              ▶     │  → /pesanan
├──────────────────────────────────────┤
│  👤  Profil                      ▶     │  → /profil
├──────────────────────────────────────┤
│  ℹ️  Tentang TaniLink            ▶     │  → /tentang
├──────────────────────────────────────┤
│  📞  Hubungi Kami               ▶     │  → dummy alert
├──────────────────────────────────────┤
│  📜  Kebijakan Privasi           ▶     │  → dummy alert
└──────────────────────────────────────┘

Setiap item:
- Flex row: icon (24px, Lucide) + label (text-body) + chevron right (ChevronRight)
- Padding 16px, border-b cream
- Hover/active: bg cream
- Icon warna: harvest (untuk konsistensi)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HALAMAN 5 — ProfilePage (Tab: Lainnya → Profil)
File: src/pages/ProfilePage.tsx
Route: /profil

Spesifikasi:
- Background: --color-fog
- Ini adalah DUMMY/PLACEHOLDER — Phase 0 belum ada autentikasi

Header Profil:
- Background: --color-soil, padding 32px
- Avatar: circle 80px, bg cream, icon User (Lucide) sebagai placeholder
- Nama: "Tamu" → text-section, --color-cream
- Subtext: "Masuk untuk pengalaman lengkap" → text-caption, cream opacity 0.7
- Tombol: "Masuk / Daftar" → pill ghost, border cream, centered
  → klik: alert("Fitur login akan segera hadir!")

Menu Profil (di bawah header):
┌──────────────────────────────────────┐
│  📋  Pesanan Saya              ▶     │
│  ❤️  Wishlist                   ▶     │
│  📍  Alamat Pengiriman          ▶     │
│  🔔  Notifikasi                 ▶     │
│  ⚙️  Pengaturan                ▶     │
│  ❓  Bantuan                    ▶     │
└──────────────────────────────────────┘
- Semua item: dummy, klik → alert("Segera hadir!")
- Style sama seperti MoreMenuPage

Versi: "TaniLink v0.1.0 — Phase 0" di bawah → text-caption, earth

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HALAMAN 6 — OrdersPage (Tab: Lainnya → Pesanan)
File: src/pages/OrdersPage.tsx
Route: /pesanan

Spesifikasi:
- Background: --color-fog
- Title: "Pesanan Saya" → text-title, Fraunces
- Ini DUMMY/PLACEHOLDER — Phase 0 tidak ada transaksi

Empty State (karena belum ada pesanan):
- Icon Package (Lucide), size 64, color earth/30
- Text: "Belum ada pesanan" → text-body, --color-soil
- Subtext: "Mulai belanja dan pesananmu akan muncul di sini." → text-caption, earth
- Tombol: "Mulai Belanja" → pill primary, navigasi ke /produk

Tab filter (dummy, untuk visual completeness):
- [Semua] [Diproses] [Dikirim] [Selesai]
- Active: text harvest, border-b harvest
- Inactive: text earth
- Klik tab: tetap tampilkan empty state (tidak ada data)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROUTING — Update App.tsx
File: src/App.tsx

Tambahkan semua route baru:
/              → LandingPage (sudah ada)
/produk        → ProductListPage
/produk/:id    → ProductDetailPage (placeholder jika belum dibuat)
/petani        → FarmerListPage
/petani/:id    → FarmerDetailPage (placeholder jika belum dibuat)
/keranjang     → CartPage
/profil        → ProfilePage
/pesanan       → OrdersPage
/tentang       → AboutPage (placeholder jika belum dibuat)

Semua halaman kecuali LandingPage di-wrap dengan PageWrapper (padding-bottom untuk tab bar).
LandingPage TIDAK pakai PageWrapper dan TIDAK menampilkan Bottom Tab Bar.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASTIKAN:
- Semua warna via Tailwind class (tidak ada hex hardcode)
- Semua gambar punya alt deskriptif dan loading="lazy"
- Semua tombol ikon punya aria-label
- Bottom Tab Bar hidden di desktop (≥768px)
- Bottom Tab Bar hidden di LandingPage
- Cart badge update real-time dari CartContext
- tsc --noEmit dan vite build berjalan tanpa error
- Tidak ada console.log
- Tidak ada `any` — gunakan tipe yang tepat
- prefers-reduced-motion dihormati untuk semua animasi
```

---

*Prompt 1 dan Prompt 2 dikerjakan secara berurutan. Selesaikan Prompt 1 dulu, pastikan build berhasil, baru lanjut ke Prompt 2.*
