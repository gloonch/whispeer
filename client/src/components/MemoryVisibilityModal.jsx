import { motion } from "framer-motion";
import { getEventCover, getEventCoverImage, slugLabel } from "../utils/appUtils.js";

export default function MemoryVisibilityModal({ memory, onClose, onConfirm }) {
  if (!memory) return null;

  const isPublic = memory.visibility === "public";
  const imageUrl = getEventCoverImage(memory);
  const tagText = Object.values(memory.tags || {}).flat().slice(0, 4).map(slugLabel).join(" · ");

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
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/85">
          <div className="relative h-44 bg-white">
            {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : <div className={`h-full w-full ${getEventCover(memory)}`} />}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-black text-slate-950">{isPublic ? "Make this memory private?" : "Make this memory public?"}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isPublic
                ? "This memory will be removed from Explore."
                : "Only the selected photo and basic tags will appear in Explore. Notes and partner details stay private."}
            </p>
            {tagText ? <p className="mt-3 truncate text-xs font-black uppercase tracking-wide text-slate-400">{tagText}</p> : null}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={onClose} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Cancel</button>
              <button type="button" onClick={() => onConfirm(memory)} className="h-11 rounded-2xl bg-slate-950 px-3 text-xs font-black text-white shadow-lg shadow-slate-950/15">
                {isPublic ? "Make private" : "Make public"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
