import { motion } from "framer-motion";
import { Star, MapPin, Crown, ExternalLink, Zap, Award } from "lucide-react";

const LABEL_STYLES = {
  "Partner Unggulan": {
    bg: "bg-gradient-to-r from-coffee-600 to-coffee-400",
    text: "text-white",
    icon: Crown,
    borderGlow: "shadow-glow-coffee",
  },
  "Top Rated": {
    bg: "bg-gradient-to-r from-cream-500 to-amber-400",
    text: "text-zinc-900",
    icon: Star,
    borderGlow: "shadow-glow-gold",
  },
  "Most Reviewed": {
    bg: "bg-gradient-to-r from-violet-500 to-purple-400",
    text: "text-white",
    icon: Zap,
    borderGlow: "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
  },
  default: {
    bg: "bg-gradient-to-r from-coffee-500 to-coffee-400",
    text: "text-white",
    icon: Award,
    borderGlow: "shadow-glow-coffee",
  },
};

function FeaturedCard({ shop, index }) {
  const style = LABEL_STYLES[shop.featuredLabel] || LABEL_STYLES.default;
  const LabelIcon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`featured-border relative flex flex-col overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 cursor-pointer group ${style.borderGlow}`}
    >
      {/* Large image */}
      <div className="relative h-56 overflow-hidden bg-zinc-800">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-900/20 to-transparent" />

        {/* Featured label badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${style.bg} ${style.text} text-xs font-bold shadow-lg`}
          >
            <LabelIcon size={12} />
            <span>{shop.featuredLabel}</span>
          </div>
        </div>

        {/* Rating in top-right */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm border border-white/15">
          <Star size={12} className="fill-cream-400 text-cream-400" />
          <span className="text-white text-sm font-bold">{shop.rating}</span>
        </div>

        {/* Name overlay on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-extrabold text-xl leading-tight">
            {shop.name}
          </h3>
          {shop.tagline && (
            <p className="text-zinc-400 text-sm mt-1 line-clamp-1 italic">
              {shop.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-1.5">
          {shop.category.map((cat) => (
            <span
              key={cat}
              className="text-xs px-2.5 py-0.5 rounded-full bg-coffee-500/15 text-coffee-300 border border-coffee-500/20 font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={13}
                  className={
                    s <= Math.round(shop.rating)
                      ? "fill-cream-400 text-cream-400"
                      : "text-zinc-700"
                  }
                />
              ))}
            </div>
            <span className="text-zinc-400 text-xs">
              ({(shop.reviewCount ?? 0).toLocaleString("id-ID")} ulasan)
            </span>
          </div>
        </div>

        {/* Must try — only shown when data available */}
        {shop.mustTry && (
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/4 border border-white/8">
            <span className="text-lg leading-none mt-0.5">✨</span>
            <div>
              <div className="text-xs text-zinc-600 font-medium uppercase tracking-wide">
                Wajib Coba
              </div>
              <div className="text-sm text-zinc-300 font-medium mt-0.5">
                {shop.mustTry}
              </div>
            </div>
          </div>
        )}

        {/* Address */}
        <div className="flex items-start gap-2 text-xs text-zinc-500">
          <MapPin size={13} className="text-coffee-500 mt-0.5 shrink-0" />
          <span>{shop.address}</span>
        </div>

        {/* CTA */}
        <a
          href={shop.gmapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-coffee-500 hover:bg-coffee-400 text-white text-sm font-semibold transition-all duration-200 group/btn shadow-glow-coffee"
        >
          <MapPin size={15} />
          <span>Kunjungi Sekarang</span>
          <ExternalLink
            size={13}
            className="opacity-70 group-hover/btn:opacity-100"
          />
        </a>
      </div>
    </motion.div>
  );
}

export default function FeaturedSection({ shops }) {
  const featured = shops.filter((s) => s.featured);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-coffee-400 to-coffee-700" />
              <span className="text-xs text-coffee-400 font-semibold tracking-widest uppercase">
                Pilihan Terbaik
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Top Picks <span className="gradient-text">Samarinda</span> ✨
            </h2>
            <p className="text-zinc-500 text-sm mt-2 max-w-lg">
              Kafe-kafe yang paling direkomendasikan, dikurasi khusus
              berdasarkan rating dan popularitas.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-coffee-400 animate-pulse" />
            <span className="text-xs text-zinc-600">
              {featured.length} kafe pilihan
            </span>
          </div>
        </motion.div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((shop, i) => (
            <FeaturedCard key={shop.id} shop={shop} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
