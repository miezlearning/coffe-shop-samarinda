import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Menu, X, Sun, Moon, MapPin } from 'lucide-react'

export default function Navbar({ darkMode, onToggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Semua Kafe', href: '#directory' },
    { label: 'Top Picks', href: '#featured' },
    { label: 'Tentang', href: '#about' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/8 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coffee-400 to-coffee-700 flex items-center justify-center shadow-glow-coffee group-hover:scale-110 transition-transform">
                <Coffee size={18} className="text-white" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-cream-400 rounded-full animate-pulse-slow" />
            </div>
            <div className="leading-none">
              <span className="font-extrabold text-white text-base tracking-tight">Ngopi</span>
              <span className="font-extrabold text-coffee-400 text-base tracking-tight"> Samarinda</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/8 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Location chip */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400">
              <MapPin size={12} className="text-coffee-400" />
              <span>Samarinda, Kaltim</span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={onToggleDark}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-zinc-950/95 backdrop-blur-xl border-t border-white/8"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/8 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-1.5 px-4 py-3 text-xs text-zinc-500">
                <MapPin size={12} className="text-coffee-400" />
                <span>Samarinda, Kalimantan Timur</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
