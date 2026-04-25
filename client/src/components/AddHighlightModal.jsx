import { useState } from "react";
import { motion } from "framer-motion";

export default function AddHighlightModal({ whisper, onAdd, onClose }) {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

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

  function submit(event) {
    event.preventDefault();
    if (!imageUrl) return;
    onAdd(whisper, imageUrl);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-purple-950/25 p-3 backdrop-blur-[1px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        onSubmit={submit}
        className="w-full max-w-[406px] rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 shadow-2xl shadow-purple-900/20"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-4">
          <div>
            <h3 className="text-lg font-black text-slate-950">Add to highlights</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">Choose one photo for this whisper. It will appear in your shared highlights.</p>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/70 p-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-slate-950">{whisper.title}</p>
              <p className="mt-0.5 text-xs font-bold text-slate-400">{whisper.minutes} min</p>
            </div>
          </div>

          <label className="mt-4 grid h-44 cursor-pointer place-items-center overflow-hidden rounded-[1.35rem] border border-dashed border-purple-300 bg-white/65 text-center transition hover:border-purple-400">
            {imageUrl ? (
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="p-3">
                <span className="block text-sm font-black text-slate-800">Upload photo</span>
                <span className="mt-1 block text-xs font-bold leading-5 text-slate-400">Select one image from your device.</span>
              </span>
            )}
            <input type="file" accept="image/*" onChange={chooseImage} className="sr-only" />
          </label>

          {error ? <p className="mt-3 text-xs font-bold text-rose-500">{error}</p> : null}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={onClose} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Cancel</button>
            <button
              type="submit"
              disabled={!imageUrl}
              className={`h-11 rounded-2xl px-3 text-xs font-black ${imageUrl ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15" : "cursor-not-allowed bg-slate-300 text-slate-500"}`}
            >
              Add to highlights
            </button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
