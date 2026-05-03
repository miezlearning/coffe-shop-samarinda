import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Heart,
  Sparkles,
} from "lucide-react";

// Star rating renderer
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            className={filled || half ? "text-cream-400" : "text-zinc-700"}
          >
            <defs>
              {half && (
                <linearGradient id={`half-${star}`}>
                  <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                  <stop
                    offset="50%"
                    stopColor="currentColor"
                    stopOpacity="0.15"
                  />
                </linearGradient>
              )}
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={half ? `url(#half-${star})` : "currentColor"}
              stroke="currentColor"
              strokeWidth={filled || half ? 0 : 1}
            />
          </svg>
        );
      })}
    </div>
  );
}

// Price range badge
function PriceBadge({ price }) {
  const colors = {
    $: "text-emerald-400 bg-emerald-400/10",
    $$: "text-amber-400 bg-amber-400/10",
    $$$: "text-rose-400 bg-rose-400/10",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${colors[price] || colors["$$"]}`}
    >
      {price}
    </span>
  );
}

// Card variant animations
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function CoffeeCard({ shop, index }) {
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formatReviews = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="group relative flex flex-col glass-card overflow-hidden cursor-pointer"
    >
      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-zinc-800 shrink-0">
        {!imgError ? (
          <img
            src={shop.thumbnail}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          /* Aesthetic placeholder when image fails */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coffee-900/60 to-zinc-900">
            <div className="text-center">
              <div className="text-5xl mb-2">☕</div>
              <div className="text-xs text-zinc-500">{shop.name}</div>
            </div>
          </div>
        )}

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

        {/* Top-right: like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <Heart
            size={14}
            className={`transition-colors ${liked ? "fill-rose-500 text-rose-500" : "text-white/70"}`}
          />
        </button>

        {/* Price range badge — only shown when data available */}
        {shop.priceRange && (
          <div className="absolute top-3 left-3">
            <PriceBadge price={shop.priceRange} />
          </div>
        )}

        {/* Must Try — only shown when data available */}
        {shop.mustTry && (
          <motion.div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
              <Sparkles size={11} className="text-cream-400 shrink-0" />
              <span className="text-xs text-zinc-300 truncate">
                <span className="text-cream-400 font-medium">Wajib coba: </span>
                {shop.mustTry}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          {shop.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-xs px-2.5 py-0.5 rounded-full bg-coffee-500/15 text-coffee-300 border border-coffee-500/20 font-medium"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Name */}
        <div>
          <h3 className="font-bold text-white text-lg leading-tight group-hover:text-coffee-300 transition-colors duration-200 line-clamp-1">
            {shop.name}
          </h3>
          {shop.tagline && (
            <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 italic">
              {shop.tagline}
            </p>
          )}
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-2">
          <StarRating rating={shop.rating} />
          <span className="text-sm font-bold text-white">{shop.rating}</span>
          <span className="text-xs text-zinc-500">
            ({formatReviews(shop.reviewCount)} ulasan)
          </span>
        </div>

        {/* Tags — only shown when ada */}
        {shop.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {shop.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-zinc-500 border border-white/8"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2">
          {/* Address */}
          <div className="flex items-start gap-1.5 min-w-0">
            <MapPin size={13} className="text-coffee-500 mt-0.5 shrink-0" />
            <span className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
              {shop.address}
            </span>
          </div>

          {/* Hours — only shown when data available */}
          {shop.openHours && (
            <div className="flex items-center gap-1 shrink-0">
              <Clock size={12} className="text-zinc-600" />
              <span className="text-xs text-zinc-600 whitespace-nowrap">
                {shop.openHours}
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={shop.gmapsLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-coffee-500/15 hover:bg-coffee-500/25 border border-coffee-500/20 hover:border-coffee-500/40 text-coffee-300 hover:text-coffee-200 text-sm font-medium transition-all duration-200 group/btn"
        >
          <MapPin size={14} />
          <span>Lihat di Maps</span>
          <ExternalLink
            size={12}
            className="opacity-0 group-hover/btn:opacity-100 transition-opacity"
          />
        </a>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-coffee-500/30" />
    </motion.div>
  );
}
