import { motion } from 'framer-motion'
import {
  Star, TrendingUp, Zap, MapPin, Coffee, Laptop,
  Leaf, DollarSign, ArrowUpDown, SlidersHorizontal
} from 'lucide-react'

const FILTERS = [
  { id: 'all',       label: 'Semua',         icon: Coffee },
  { id: 'top_rated', label: 'Rating 4.5+',   icon: Star },
  { id: 'trending',  label: 'Paling Populer', icon: TrendingUp },
  { id: 'workspace', label: 'Workspace',      icon: Laptop },
  { id: 'local',     label: 'Kopi Lokal',     icon: Leaf },
  { id: 'cheap',     label: 'Budget Friendly',icon: DollarSign },
  { id: 'outdoor',   label: 'Outdoor',        icon: MapPin },
]

const SORTS = [
  { id: 'rating',   label: 'Rating Tertinggi' },
  { id: 'reviews',  label: 'Terbanyak Diulas' },
  { id: 'name',     label: 'Nama A–Z' },
]

export default function FilterBar({ activeFilter, onFilterChange, sortBy, onSortChange, resultCount }) {
  return (
    <div className="sticky top-16 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto scrollbar-hide">
            <SlidersHorizontal size={16} className="text-zinc-600 shrink-0 mr-1" />
            {FILTERS.map((filter) => {
              const Icon = filter.icon
              const isActive = activeFilter === filter.id
              return (
                <motion.button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`pill shrink-0 ${isActive ? 'pill-active' : 'pill-inactive'}`}
                >
                  <Icon size={13} />
                  <span>{filter.label}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Sort + Count */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Result count badge */}
            <span className="text-xs text-zinc-600 whitespace-nowrap">
              <span className="text-coffee-400 font-semibold">{resultCount}</span> tempat ditemukan
            </span>

            {/* Sort dropdown */}
            <div className="relative">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-400">
                <ArrowUpDown size={13} />
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-zinc-300 text-xs appearance-none pr-1"
                  style={{ colorScheme: 'dark' }}
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id} className="bg-zinc-900">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
