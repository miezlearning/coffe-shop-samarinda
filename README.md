# ☕ Ngopi Samarinda — Direktori Coffee Shop

Website direktori modern bergaya milenial untuk menemukan coffee shop terbaik di Samarinda, Kalimantan Timur.

---

## 🚀 Quick Start

### 1. Prasyarat
Pastikan sudah menginstal:
- **Node.js** v18+ → [Download](https://nodejs.org)
- **npm** v9+ (sudah termasuk dalam Node.js)

### 2. Inisialisasi & Install Dependencies

```bash
# Masuk ke direktori project
cd "Coffe Shop Samarinda"

# Install semua dependencies
npm install
```

### 3. Jalankan Dev Server

```bash
npm run dev
```

Buka browser di `http://localhost:5173` ✅

### 4. Build untuk Production

```bash
npm run build
npm run preview   # Preview hasil build
```

---

## 📦 Library yang Digunakan

| Library | Versi | Kegunaan |
|---|---|---|
| `react` + `react-dom` | ^18.3 | Core framework |
| `vite` + `@vitejs/plugin-react` | ^5.3 | Build tool & HMR |
| `tailwindcss` | ^3.4 | Utility-first CSS + glassmorphism |
| `framer-motion` | ^11.3 | Animasi hover, page transition |
| `lucide-react` | ^0.414 | Icon pack (star, map-pin, dsb.) |
| `autoprefixer` + `postcss` | latest | CSS processing |

---

## 🗂️ Struktur Project

```
src/
├── components/
│   ├── Navbar.jsx          # Navigasi sticky + mobile menu + dark mode toggle
│   ├── HeroSection.jsx     # Hero dengan search bar besar + animasi partikel
│   ├── FilterBar.jsx       # Filter pills (Rating, Workspace, dll.) + sort dropdown
│   ├── FeaturedSection.jsx # Blok Top Picks dengan gradient border khusus
│   ├── CoffeeCard.jsx      # Kartu coffee shop dengan hover lift (Framer Motion)
│   ├── EmptyState.jsx      # State ketika hasil pencarian kosong
│   └── Footer.jsx          # Footer dengan info & links
├── data/
│   └── coffeeShops.json    # Data statis 12 coffee shop Samarinda
├── hooks/
│   └── useDebounce.js      # Custom hook untuk debounce search input
├── App.jsx                 # Root component: filter + sort + search logic
├── main.jsx                # Entry point React
└── index.css               # Tailwind directives + custom glass utilities
```

---

## ✨ Fitur Utama

- **🔍 Smart Search** — Cari berdasarkan nama, alamat, kategori, tag, dan "wajib coba"
- **🎛️ Filter Pills** — Rating 4.5+, Workspace, Kopi Lokal, Budget Friendly, Outdoor
- **↕️ Sort** — Rating Tertinggi, Terbanyak Diulas, Nama A–Z
- **⭐ Top Picks** — Featured section dengan gradient border berbeda per kategori
- **💳 Glassmorphism Cards** — Kartu dengan efek blur + hover lift animasi
- **💀 Skeleton Loading** — Shimmer placeholder saat data loading pertama kali
- **❤️ Like Button** — Tombol favorit per kartu (state lokal)
- **🌙 Dark/Light Mode** — Toggle dari navbar
- **📱 Fully Responsive** — Mobile-first, rapi di semua ukuran layar
- **🗺️ Google Maps Link** — CTA langsung ke Google Maps per kafe

---

## 🗃️ Menambah Data Coffee Shop

Edit file `src/data/coffeeShops.json`. Salin struktur berikut:

```json
{
  "id": 13,
  "name": "Nama Kafe",
  "slug": "nama-kafe",
  "tagline": "Tagline singkat kafe",
  "rating": 4.5,
  "reviewCount": 300,
  "address": "Jl. Contoh No.1, Kelurahan",
  "district": "Samarinda Ulu",
  "priceRange": "$$",
  "category": ["Specialty Coffee", "Workspace"],
  "openHours": "08.00 – 22.00",
  "featured": false,
  "featuredLabel": null,
  "image": "URL_GAMBAR_BESAR",
  "thumbnail": "URL_GAMBAR_KECIL",
  "tags": ["WiFi", "Cozy"],
  "mustTry": "Nama menu wajib coba",
  "gmapsLink": "https://maps.google.com/?q=Nama+Kafe+Samarinda"
}
```

Untuk `featured: true`, tambahkan `featuredLabel` salah satu dari:
- `"Partner Unggulan"` → border gold
- `"Top Rated"` → border kuning  
- `"Most Reviewed"` → border ungu

---

## 🎨 Kustomisasi Warna

Edit `tailwind.config.js` untuk mengubah palet warna utama:

```js
colors: {
  coffee: { /* palet utama coklat kopi */ },
  cream:  { /* palet aksen krem/kuning */ },
}
```

---

## 📸 Screenshot

> Jalankan `npm run dev` dan buka `http://localhost:5173` untuk melihat hasilnya.

---

## 📄 Lisensi

MIT — Free to use & modify.
