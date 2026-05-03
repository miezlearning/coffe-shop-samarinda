import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FilterBar from './components/FilterBar'
import FeaturedSection from './components/FeaturedSection'
import CoffeeCard from './components/CoffeeCard'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'

// Data & Hooks
import coffeeShopsData from './data/coffeeShops.json'
import { useDebounce } from './hooks/useDebounce'

// ─── Filter logic ──────────────────────────────────────────────────────────────
function applyFilter(shops, filter) {
  switch (filter) {
    case 'top_rated':
      return shops.filter((s) => s.rating >= 4.5)
    case 'trending':
      return shops.filter((s) => s.reviewCount >= 700)
    case 'workspace':
      return shops.filter((s) =>
        s.category.some((c) => c.toLowerCase().includes('workspace'))
      )
    case 'local':
      return shops.filter((s) =>
        s.category.some((c) => c.toLowerCase().includes('lokal') || c.toLowerCase().includes('tradisional'))
      )
    case 'cheap':
      return shops.filter((s) => s.priceRange === '$')
    case 'outdoor':
      return shops.filter((s) =>
        s.category.some((c) => c.toLowerCase().includes('outdoor')) ||
        s.tags.some((t) => t.toLowerCase().includes('outdoor') || t.toLowerCase().includes('garden'))
      )
    default:
      return shops
  }
}

// ─── Sort logic ────────────────────────────────────────────────────────────────
function applySort(shops, sortBy) {
  const copy = [...shops]
  switch (sortBy) {
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating)
    case 'reviews':
      return copy.sort((a, b) => b.reviewCount - a.reviewCount)
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name, 'id'))
    default:
      return copy
  }
}

// ─── Search logic ──────────────────────────────────────────────────────────────
function applySearch(shops, query) {
  if (!query.trim()) return shops
  const q = query.toLowerCase()
  return shops.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.district.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.category.some((c) => c.toLowerCase().includes(q)) ||
      s.mustTry.toLowerCase().includes(q)
  )
}

// ─── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="skeleton h-48 rounded-t-2xl" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-1/3 rounded-lg" />
        <div className="skeleton h-5 w-3/4 rounded-lg" />
        <div className="skeleton h-3 w-1/2 rounded-lg" />
        <div className="skeleton h-3 w-full rounded-lg" />
        <div className="skeleton h-9 w-full rounded-xl mt-2" />
      </div>
    </div>
  )
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode]         = useState(true)
  const [searchQuery, setSearchQuery]   = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy]             = useState('rating')
  const [isLoading, setIsLoading]       = useState(true)

  const debouncedSearch = useDebounce(searchQuery, 300)

  // Simulate initial loading state for skeleton animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  // Apply dark mode class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Compute filtered + sorted + searched shops
  const processedShops = useMemo(() => {
    let result = applyFilter(coffeeShopsData, activeFilter)
    result = applySearch(result, debouncedSearch)
    result = applySort(result, sortBy)
    return result
  }, [debouncedSearch, activeFilter, sortBy])

  const handleReset = () => {
    setSearchQuery('')
    setActiveFilter('all')
    setSortBy('rating')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* ── Navbar ──────────────────────────────────────── */}
      <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)} />

      {/* ── Hero ────────────────────────────────────────── */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={coffeeShopsData.length}
      />

      {/* ── Featured / Top Picks ────────────────────────── */}
      {!debouncedSearch && activeFilter === 'all' && (
        <FeaturedSection shops={coffeeShopsData} />
      )}

      {/* ── Directory Section ───────────────────────────── */}
      <section id="directory" className="pb-20">
        {/* Filter bar (sticky) */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={processedShops.length}
        />

        {/* Section header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-zinc-400 to-zinc-700" />
              <span className="text-xs text-zinc-500 font-semibold tracking-widest uppercase">
                {debouncedSearch
                  ? `Hasil pencarian untuk "${debouncedSearch}"`
                  : 'Direktori Lengkap'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {debouncedSearch ? (
                <>
                  <span className="gradient-text">{processedShops.length}</span> tempat ditemukan
                </>
              ) : (
                <>
                  Semua <span className="gradient-text">Coffee Shop</span> Samarinda
                </>
              )}
            </h2>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            /* Skeleton loading state */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : processedShops.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${debouncedSearch}-${sortBy}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {processedShops.map((shop, index) => (
                  <CoffeeCard key={shop.id} shop={shop} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Empty state */
            <div className="grid grid-cols-1">
              <EmptyState query={debouncedSearch || activeFilter} onReset={handleReset} />
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
