/**
 * shopHelpers.js
 *
 * Normalisasi data mentah hasil scraping Google Maps ke format
 * yang konsisten untuk digunakan di seluruh komponen.
 *
 * Format scraped (INPUT):
 *   nama          – string, bisa ada suffix "· Visited link" atau "· Open"
 *   rating        – string, misal "4.6"
 *   jumlah_ulasan – string, misal "575", "1.247", "1,247", "1.2rb", "1.2k"
 *   kategori      – string, misal "Coffee shop" atau "Cafe"
 *   alamat        – string
 *   url           – string (Google Maps URL)
 *   [+ opsional]  – featured, featuredLabel, image, tagline, tags, mustTry,
 *                   openHours, priceRange
 *
 * Format normalized (OUTPUT): field yang sama dengan dummy data lama,
 * sehingga komponen tidak perlu diubah.
 */

// ── Nama cleaner ──────────────────────────────────────────────────────────────
// Menghapus berbagai suffix yang ditambahkan oleh scraper Google Maps.
const NAMA_SUFFIXES = /\s*·\s*(Visited link|Open|Closed|Opens soon|Temporarily closed).*/gi

export function cleanNama(raw) {
  return String(raw ?? '').replace(NAMA_SUFFIXES, '').trim()
}

// ── Jumlah ulasan parser ───────────────────────────────────────────────────────
// Mendukung format: "575" · "1.247" · "1,247" · "1.2k" · "1.2rb" · "1rb"
export function parseUlasan(raw) {
  if (raw == null) return 0
  const s = String(raw).trim().toLowerCase()

  // Suffix "k" (ribuan dalam format internasional): "1.2k" → 1200
  if (s.endsWith('k')) {
    const n = parseFloat(s.replace('k', '').replace(',', '.'))
    return Math.round(n * 1000)
  }

  // Suffix "rb" (ribuan dalam format Indonesia): "1.2rb" atau "1rb" → 1200
  if (s.endsWith('rb')) {
    const n = parseFloat(s.replace('rb', '').replace(',', '.'))
    return Math.round(n * 1000)
  }

  // Format titik-sebagai-pemisah-ribuan (ID locale): "1.247" → 1247
  // Deteksi: ada titik tapi bukan desimal (lebih dari 3 digit setelah titik terakhir)
  const dotIdx = s.lastIndexOf('.')
  if (dotIdx !== -1 && s.length - dotIdx - 1 === 3) {
    return parseInt(s.replace(/\./g, ''), 10) || 0
  }

  // Format koma-sebagai-pemisah-ribuan (EN locale): "1,247" → 1247
  return parseInt(s.replace(/,/g, ''), 10) || 0
}

// ── Rating parser ─────────────────────────────────────────────────────────────
export function parseRating(raw) {
  const n = parseFloat(String(raw ?? '0').replace(',', '.'))
  return isNaN(n) ? 0 : n
}

// ── Placeholder images by index ───────────────────────────────────────────────
const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?w=600&auto=format&fit=crop&q=80',
]

// ── Main normalizer ───────────────────────────────────────────────────────────
/**
 * Mengubah satu objek raw scraped menjadi format normalized.
 * @param {object} raw  – entri mentah dari JSON
 * @param {number} idx  – index dalam array (dipakai sebagai fallback id & image)
 * @returns {object}    – normalized shop object
 */
export function normalizeShop(raw, idx) {
  const rating      = parseRating(raw.rating)
  const reviewCount = parseUlasan(raw.jumlah_ulasan)
  const name        = cleanNama(raw.nama)

  return {
    // ── Identitas ──────────────────────────────────────────────
    id:           raw.id ?? idx,
    name,

    // ── Data utama (dari scraping) ─────────────────────────────
    rating,
    reviewCount,
    address:      raw.alamat  ?? '',
    gmapsLink:    raw.url     ?? '#',
    category:     raw.kategori
                    ? [raw.kategori]          // wrap string → array
                    : ['Coffee shop'],

    // ── Data opsional (dari enrichment manual di JSON) ─────────
    tagline:      raw.tagline      ?? null,
    tags:         raw.tags         ?? [],
    mustTry:      raw.mustTry      ?? null,
    openHours:    raw.openHours    ?? null,
    priceRange:   raw.priceRange   ?? null,
    featured:     raw.featured     ?? false,
    featuredLabel:raw.featuredLabel?? null,

    // ── Gambar: pakai dari JSON kalau ada, fallback ke placeholder ─
    image:        raw.image        ?? PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length],
    thumbnail:    raw.thumbnail    ?? raw.image
                    ?? PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length],

    // ── Simpan data mentah asli (berguna untuk debug) ──────────
    _raw: raw,
  }
}

/**
 * Normalisasi seluruh array data.
 * @param {object[]} rawArray
 * @returns {object[]}
 */
export function normalizeAll(rawArray) {
  return rawArray.map((item, idx) => normalizeShop(item, idx))
}
