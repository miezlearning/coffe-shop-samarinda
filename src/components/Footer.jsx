import { motion } from 'framer-motion'
import { Coffee, Heart, MapPin, Github, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="about" className="relative border-t border-white/5 bg-zinc-950 mt-8">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffee-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coffee-400 to-coffee-700 flex items-center justify-center shadow-glow-coffee">
                <Coffee size={20} className="text-white" />
              </div>
              <div>
                <div className="font-extrabold text-white text-lg">Ngopi Samarinda</div>
                <div className="text-xs text-zinc-600">Direktori Kafe & Coffee Shop</div>
              </div>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Platform direktori coffee shop pertama di Samarinda yang dibangun oleh penikmat kopi,
              untuk para penikmat kopi. ☕
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wide">Navigasi</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Semua Kafe', href: '#directory' },
                { label: 'Top Picks', href: '#featured' },
                { label: 'Workspace Friendly', href: '#directory' },
                { label: 'Budget-Friendly', href: '#directory' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-coffee-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-coffee-700 group-hover:bg-coffee-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wide">Tentang Data</h4>
            <div className="space-y-3 text-sm text-zinc-500">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-coffee-500 mt-0.5 shrink-0" />
                <span>Data dikumpulkan dari Google Maps dan ulasan komunitas Samarinda.</span>
              </div>
              <div className="flex items-start gap-2">
                <Coffee size={14} className="text-coffee-500 mt-0.5 shrink-0" />
                <span>Rating dan ulasan bersumber dari data aktual. Selalu verifikasi langsung sebelum berkunjung.</span>
              </div>
            </div>

            {/* Data freshness badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Data diperbarui berkala</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600 text-center sm:text-left">
            © {currentYear} Ngopi Samarinda. Dibuat dengan{' '}
            <Heart size={12} className="inline text-rose-500 fill-rose-500 mx-0.5" />{' '}
            untuk para pecinta kopi Kalimantan.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-700">
            <a href="#" className="hover:text-zinc-400 transition-colors">Kebijakan Privasi</a>
            <span>·</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Syarat & Ketentuan</a>
            <span>·</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Daftarkan Kafe</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
