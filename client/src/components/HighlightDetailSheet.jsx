import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { formatDate } from "../utils/appUtils.js";

function getPrimaryLabel(highlight) {
  if (highlight?.sourceType === "whisper") return "From whispers";
  return "Highlight";
}

function getSecondaryLabel(highlight) {
  if (!highlight?.sourceLabel || highlight.sourceLabel === "From whispers") return "";
  return highlight.sourceLabel;
}

export default function HighlightDetailSheet({ highlights, selectedHighlightId, readOnly, onClose, onSelect, onRemove }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentIndex = useMemo(() => highlights.findIndex((item) => item.id === selectedHighlightId), [highlights, selectedHighlightId]);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const highlight = highlights[safeIndex];

  useEffect(() => {
    setMenuOpen(false);
  }, [selectedHighlightId]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!highlight) return null;

  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < highlights.length - 1;

  function goPrev() {
    if (!hasPrev) return;
    onSelect(highlights[safeIndex - 1].id);
  }

  function goNext() {
    if (!hasNext) return;
    onSelect(highlights[safeIndex + 1].id);
  }

  return createPortal(
    <motion.div
      className="fixed bottom-16 left-1/2 top-0 z-[140] w-full max-w-[430px] -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="h-full w-full bg-slate-950"
        initial={{ y: 24, opacity: 0.9 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0.9 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        drag="y"
        dragDirectionLock
        dragElastic={0.12}
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 900) onClose();
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          {highlight.imageUrl ? (
            <img src={highlight.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className={`absolute inset-0 ${highlight.coverClass || "bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100"}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/10 to-slate-950/65" />

          <div className="absolute inset-x-0 top-0 z-20 p-3">
            {highlights.length > 1 ? (
              <div className="mb-3 flex gap-1">
                {highlights.map((item, index) => (
                  <span
                    key={item.id}
                    className={`h-1 flex-1 rounded-full ${index === safeIndex ? "bg-white" : "bg-white/35"}`}
                  />
                ))}
              </div>
            ) : null}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full bg-black/30 text-2xl font-light text-white backdrop-blur"
                aria-label="Close highlight viewer"
              >
                ‹
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((value) => !value)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-black/30 text-xl font-black text-white backdrop-blur"
                  aria-label="Highlight options"
                >
                  ...
                </button>
                {menuOpen ? (
                  <div className="absolute right-0 top-11 w-44 overflow-hidden rounded-2xl border border-white/20 bg-slate-950/90 shadow-2xl shadow-slate-950/40 backdrop-blur">
                    <button
                      type="button"
                      disabled={readOnly}
                      onClick={() => {
                        setMenuOpen(false);
                        onRemove(highlight.id);
                      }}
                      className={`block h-11 w-full px-4 text-left text-xs font-black ${readOnly ? "cursor-not-allowed text-slate-500" : "text-rose-300 hover:bg-white/5"}`}
                    >
                      Remove highlight
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-white/75">{getPrimaryLabel(highlight)}</p>
            <h3 className="mt-1 text-2xl font-black leading-tight text-white drop-shadow-[0_1px_10px_rgba(15,23,42,0.45)]">{highlight.title}</h3>
            <p className="mt-1 text-sm font-bold text-white/85">{formatDate(highlight.createdAt)}</p>
            {getSecondaryLabel(highlight) ? <p className="mt-1 text-xs font-bold text-white/75">{getSecondaryLabel(highlight)}</p> : null}
          </div>

          <div className="absolute inset-0 z-10 grid grid-cols-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasPrev}
              className="h-full w-full"
              aria-label="Previous highlight"
            />
            <button
              type="button"
              onClick={goNext}
              disabled={!hasNext}
              className="h-full w-full"
              aria-label="Next highlight"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
