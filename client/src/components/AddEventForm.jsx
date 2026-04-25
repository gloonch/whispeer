import { useState } from "react";
import { motion } from "framer-motion";
import { EVENT_TAGS } from "../data/appData.js";
import { makeDefaultPhotos, todayISO } from "../utils/appUtils.js";
import IconButton from "./IconButton.jsx";
import TagChooserRow from "./TagChooserRow.jsx";

export default function AddEventForm({ onAdd, onClose, seedTitle = "" }) {
  const [title, setTitle] = useState(seedTitle);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(todayISO());
  const [tags, setTags] = useState({ what: ["date"], where: ["home"], how: ["cozy"], with: ["just_us"] });

  function toggleTag(group, value) {
    setTags((prev) => {
      const groupValues = Array.isArray(prev[group]) ? prev[group] : [];
      const exists = groupValues.includes(value);
      const next = exists ? groupValues.filter((x) => x !== value) : [...groupValues, value];
      if (group === "what" && next.length > 2) return prev;
      return { ...prev, [group]: next };
    });
  }

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const photos = makeDefaultPhotos();
    onAdd({ id: `e_${Date.now()}`, title: title.trim(), note: note.trim() || "A small moment worth remembering.", date, photos, coverPhotoId: photos[0]?.id, tags });
    onClose();
  }

  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-purple-950/25 p-3 backdrop-blur-[1px] sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.form onSubmit={submit} className="relative max-h-[88vh] w-full max-w-[406px] overflow-hidden rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 shadow-2xl shadow-purple-900/20 sm:max-h-[92vh] sm:rounded-3xl sm:p-4" initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 28, opacity: 0 }}>
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/85">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200/70 px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <h3 className="text-lg font-black text-slate-950 sm:text-xl">Create memory</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">Turn a moment into a clean timeline card.</p>
            </div>
            <IconButton label="×" onClick={onClose} className="h-10 w-10 shrink-0" title="Close modal" />
          </div>
          <div className="max-h-[calc(88vh-6.5rem)] overflow-y-auto px-4 pb-4 pt-4 sm:max-h-[calc(92vh-6.5rem)] sm:px-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sm:col-span-2"><span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Title</span><input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Sunset coffee date" className="h-12 w-full rounded-2xl border border-white/80 bg-white/90 px-4 text-sm font-bold text-slate-800 outline-none focus:border-purple-300" /></label>
              <label><span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Date</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 w-full rounded-2xl border border-white/80 bg-white/90 px-4 text-sm font-bold text-slate-800 outline-none focus:border-purple-300" /></label>
              <label className="sm:col-span-2"><span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Note</span><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="One short sentence about what made it special." className="w-full resize-none rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-sm text-slate-800 outline-none focus:border-purple-300" /></label>
            </div>
            <div className="mt-5 space-y-3">{Object.entries(EVENT_TAGS).map(([group, values]) => <TagChooserRow key={group} group={group} values={values} selectedValues={tags[group]} onToggle={toggleTag} />)}</div>
            <div className="sticky bottom-0 -mx-4 mt-6 flex gap-3 border-t border-slate-200/70 bg-white/85 px-4 py-3 backdrop-blur sm:-mx-5 sm:px-5"><button type="button" onClick={onClose} className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600">Cancel</button><button type="submit" className="min-h-12 flex-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15">Add memory</button></div>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
