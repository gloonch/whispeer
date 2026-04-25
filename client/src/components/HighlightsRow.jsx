import { motion } from "framer-motion";

export default function HighlightsRow({ highlights, onSelect }) {
  if (!highlights.length) return null;

  return (
    <div className="-mx-3 mb-4 overflow-x-auto px-3 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-3">
        {highlights.map((highlight, index) => (
          <motion.button
            key={highlight.id}
            type="button"
            onClick={() => onSelect(highlight)}
            className="grid h-[68px] w-[68px] shrink-0 place-items-center overflow-hidden rounded-full border border-white/80 bg-white/70 p-1 shadow-lg shadow-purple-900/5"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            aria-label={`Open ${highlight.title}`}
            title={highlight.title}
          >
            <span className="block h-full w-full overflow-hidden rounded-full">
              {highlight.imageUrl ? (
                <img src={highlight.imageUrl} alt="" className="block h-full w-full object-cover" />
              ) : (
                <span className={`block h-full w-full ${highlight.coverClass || "bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100"}`} />
              )}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
