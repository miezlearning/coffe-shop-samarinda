import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, TrendingUp, Coffee } from 'lucide-react'

const FLOATING_EMOJIS = ['☕', '🫖', '✨', '🌿', '🍵', '💫']

// Floating particle component
function FloatingParticle({ emoji, style }) {
  return (
    <motion.div
      className="absolute text-2xl select-none pointer-events-none"
      style={style}
      animate={{ y: [0, -20, 0], rotate: [-5, 5, -5], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {emoji}
    </motion.div>
  )
}

// Stats badge
function StatBadge({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      <Icon size={15} className="text-coffee-400" />
      <div className="leading-none">
        <div className="text-sm font-bold text-white">{value}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
      </div>
    </div>
  )
}

export default function HeroSection({ searchQuery, onSearchChange, totalCount }) {
  const inputRef = useRef(null)

  // Auto-focus search on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 800)
    return () => clearTimeout(timer)
  }, [])

  const particles = FLOATING_EMOJIS.map((emoji, i) => ({
    emoji,
    style: {
      left: `${10 + (i * 15)}%`,
      top: `${15 + (i % 2 === 0 ? 10 : 40)}%`,
    },
  }))

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background layers */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Radial gradient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-coffee-900/30 via-zinc-950/50 to-zinc-950" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-500/50 to-transparent" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coffee-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cream-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-500/15 border border-coffee-500/30 text-coffee-300 text-sm font-medium mb-8"
        >
          <Sparkles size={14} className="animate-pulse-slow" />
          <span>Direktori Kafe Terlengkap di Samarinda 🔥</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-4">
            <span className="gradient-text-white">Temukan Kafe</span>
            <br />
            <span className="gradient-text">Favoritmu</span>
            <span className="text-white"> di</span>
            <br />
            <span className="gradient-text-white">Samarinda.</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-zinc-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-balance"
        >
          Rating jujur, lokasi akurat, dan rekomendasi autentik dari sesama penikmat kopi. ☕
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <div className="relative group">
            {/* Glow behind input */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-coffee-500/40 via-cream-400/30 to-coffee-600/40 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden focus-within:border-coffee-400/50">
              <Search
                size={20}
                className="absolute left-5 text-zinc-500 group-focus-within:text-coffee-400 transition-colors duration-200 pointer-events-none"
              />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari nama coffee shop, area, atau suasana..."
                className="w-full bg-transparent pl-14 pr-5 py-5 text-white placeholder-zinc-500 outline-none text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 p-1.5 rounded-lg bg-white/8 hover:bg-white/15 text-zinc-400 hover:text-white transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Quick search suggestions */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-4"
            >
              <span className="text-xs text-zinc-600">Coba cari:</span>
              {['Pangko Coffee', 'Specialty', 'Workspace', 'Rooftop'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSearchChange(suggestion)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-zinc-500 hover:text-zinc-300 hover:bg-white/10 hover:border-white/15 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <StatBadge icon={Coffee} value={`${totalCount}+`} label="Coffee Shop" />
          <StatBadge icon={TrendingUp} value="4.5★" label="Rata-rata Rating" />
          <StatBadge icon={Sparkles} value="Update" label="Berkala" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-zinc-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-coffee-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
