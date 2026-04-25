import { motion } from "framer-motion";
import { formatDate } from "../utils/appUtils.js";

export default function HighlightDetailSheet({ highlight, readOnly, onClose, onRemove }) {
  if (!highlight) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-purple-950/25 p-3 backdrop-blur-[1px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-[406px] rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 shadow-2xl shadow-purple-900/20"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-4">
          <div className="flex items-start gap-3">
            {highlight.imageUrl ? (
              <img src={highlight.imageUrl} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
            ) : (
              <div className={`h-16 w-16 shrink-0 rounded-full ${highlight.coverClass || "bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100"}`} />
            )}
            <div className="min-w-0">
              <h3 className="text-lg font-black leading-tight text-slate-950">{highlight.title}</h3>
              <p className="mt-1 text-sm font-bold text-slate-500">{highlight.minutes} minutes of quality attention</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">{formatDate(highlight.createdAt)}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={onClose} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Close</button>
            <button
              type="button"
              disabled={readOnly}
              onClick={() => onRemove(highlight.id)}
              className={`h-11 rounded-2xl px-3 text-xs font-black ${readOnly ? "cursor-not-allowed bg-slate-300 text-slate-500" : "bg-slate-950 text-white shadow-lg shadow-slate-950/15"}`}
            >
              Remove
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
