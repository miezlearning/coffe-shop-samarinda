import { motion } from 'framer-motion'
import { SearchX, RotateCcw } from 'lucide-react'

export default function EmptyState({ query, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="empty-state col-span-full"
    >
      {/* Animated coffee cup */}
      <div className="relative mb-6">
        <div className="text-7xl animate-float">☕</div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
          <SearchX size={16} className="text-rose-400" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Kafe &quot;{query}&quot; belum terdaftar
      </h3>
      <p className="text-zinc-500 text-sm mb-6 max-w-sm">
        Coba kata kunci lain, atau reset filter untuk melihat semua coffee shop di Samarinda.
      </p>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['Pangko', 'Specialty', 'Workspace', 'Outdoor', 'Murah'].map((s) => (
          <span
            key={s}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-500 text-xs"
          >
            {s}
          </span>
        ))}
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-coffee-500/20 border border-coffee-500/30 text-coffee-300 text-sm font-medium hover:bg-coffee-500/30 transition-all"
      >
        <RotateCcw size={15} />
        <span>Reset Pencarian</span>
      </button>
    </motion.div>
  )
}
