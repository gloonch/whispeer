import { useRef, useState } from "react";
import { motion } from "framer-motion";

function whisperTimeLabel(whisper) {
  if (Number.isFinite(whisper?.minutes)) return `${whisper.minutes} min`;
  if (whisper?.timeLabel) return whisper.timeLabel;
  return "Time optional";
}

export default function AddHighlightModal({ whisper, onAdd, onClose }) {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const fromExplore = whisper?.source?.type === "public_memory";

  function chooseImage(event) {
    const file = event.target.files?.[0];
    setError("");
    setImageUrl("");
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setImageUrl(reader.result);
      else setError("Couldn’t upload photo. Try again.");
    };
    reader.onerror = () => setError("Couldn’t upload photo. Try again.");
    reader.readAsDataURL(file);
  }

  function openPicker() {
    fileInputRef.current?.click();
  }

  function submit(event) {
    event.preventDefault();
    if (!imageUrl) return;
    onAdd(whisper, imageUrl);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close overlay"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.form
        onSubmit={submit}
        className="relative z-10 mx-auto w-full max-w-[420px] rounded-[2rem] border border-white/70 bg-[#fbf7ef]/95 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.18)]"
        initial={{ opacity: 0, y: 12, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.985 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={chooseImage} className="sr-only" />

        <div className="mt-4">
          <h3 className="text-lg font-black text-slate-950">Keep as highlight</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">Add one photo to remember this small moment.</p>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="truncate text-sm font-black text-slate-950">{whisper.title}</p>
          <p className="mt-0.5 text-xs font-bold text-slate-500">{whisperTimeLabel(whisper)} · from whispers</p>
          {fromExplore ? <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-purple-600">{whisper.source?.label || "Inspired from Explore"}</p> : null}
        </div>

        {!imageUrl ? (
          <button
            type="button"
            onClick={openPicker}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-black text-slate-700 transition hover:border-slate-300"
          >
            + Add photo
          </button>
        ) : (
          <div className="mt-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <img src={imageUrl} alt="" className="aspect-[4/5] w-full object-cover" />
            </div>
            <button type="button" onClick={openPicker} className="mt-2 text-xs font-black text-slate-500 hover:text-slate-900">Change photo</button>
          </div>
        )}

        {error ? <p className="mt-3 text-xs font-bold text-rose-500">{error}</p> : null}

        <p className="mt-4 text-xs font-bold leading-5 text-slate-500">This will mark the whisper as done and add it to highlights.</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={onClose} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Cancel</button>
          <button
            type="submit"
            disabled={!imageUrl}
            className={`h-11 rounded-2xl px-3 text-xs font-black ${imageUrl ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15" : "cursor-not-allowed bg-slate-300 text-slate-500"}`}
          >
            Keep highlight
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
