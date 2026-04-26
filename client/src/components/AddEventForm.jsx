import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { EVENT_TAGS } from "../data/appData.js";
import { todayISO } from "../utils/appUtils.js";
import TagChooserRow from "./TagChooserRow.jsx";

export default function AddEventForm({ onAdd, onClose, seedTitle = "" }) {
  const [title, setTitle] = useState(seedTitle);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(todayISO());
  const [tags, setTags] = useState({ what: [], where: [], how: [], with: [] });
  const [photos, setPhotos] = useState([]);
  const [coverPhotoId, setCoverPhotoId] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  function toggleTag(group, value) {
    setTags((prev) => {
      const groupValues = Array.isArray(prev[group]) ? prev[group] : [];
      const exists = groupValues.includes(value);
      const next = exists ? groupValues.filter((item) => item !== value) : [...groupValues, value];
      if (group === "what" && next.length > 2) return prev;
      return { ...prev, [group]: next };
    });
  }

  function removePhoto(photoId) {
    setPhotos((prev) => {
      const next = prev.filter((photo) => photo.id !== photoId);
      if (coverPhotoId === photoId) setCoverPhotoId(next[0]?.id || "");
      return next;
    });
  }

  function openPicker() {
    fileInputRef.current?.click();
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("invalid-file"));
      };
      reader.onerror = () => reject(new Error("failed"));
      reader.readAsDataURL(file);
    });
  }

  async function choosePhotos(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    setPhotoError("");
    try {
      const loaded = await Promise.all(
        files.map(async (file, index) => ({
          id: `photo_${Date.now()}_${index}_${Math.floor(Math.random() * 99999)}`,
          imageUrl: await readFileAsDataUrl(file),
        })),
      );
      setPhotos((prev) => [...prev, ...loaded]);
      setCoverPhotoId((current) => current || loaded[0]?.id || "");
    } catch {
      setPhotoError("Could not load one or more photos. Try again.");
    }
  }

  function submit(event) {
    event.preventDefault();
    if (!title.trim() || !date || photos.length === 0 || saving) return;

    setSaving(true);
    onAdd({
      id: `e_${Date.now()}`,
      title: title.trim(),
      note: note.trim(),
      date,
      photos,
      coverPhotoId: coverPhotoId || photos[0]?.id,
      tags,
    });
    onClose();
  }

  const canSave = Boolean(title.trim() && date && photos.length > 0 && !saving);
  const coverPhoto = photos.find((photo) => photo.id === coverPhotoId) || photos[0];

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button
        type="button"
        aria-label="Close overlay"
        className="absolute inset-0 bg-slate-950/20 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.form
        onSubmit={submit}
        className="relative z-10 flex w-full max-w-[420px] max-h-[86vh] flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-[#fbf7ef]/95 shadow-[0_30px_100px_rgba(15,23,42,0.18)]"
        initial={{ y: 12, opacity: 0, scale: 0.985 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 10, opacity: 0, scale: 0.985 }}
      >
        <header className="grid h-16 grid-cols-[44px_1fr_44px] items-center border-b border-slate-200/80 bg-white/95 px-3">
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full text-2xl font-light text-slate-950" aria-label="Close">‹</button>
          <h3 className="text-center text-lg font-black text-slate-950">Add memory</h3>
          <span aria-hidden="true" />
        </header>

        <div className="min-h-0 overflow-y-auto px-4 pb-6 pt-4">
          <p className="text-sm font-bold text-slate-500">A moment worth keeping.</p>

          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={choosePhotos} className="sr-only" />

          <section className="mt-4">
            {!photos.length ? (
              <button
                type="button"
                onClick={openPicker}
                className="grid aspect-[4/3] w-full place-items-center rounded-3xl border border-slate-200 bg-white text-center transition hover:border-slate-300"
              >
                <span className="p-4">
                  <span className="block text-base font-black text-slate-900">Add photos</span>
                  <span className="mt-1 block text-xs font-bold leading-5 text-slate-500">Pick one or more photos for this memory.</span>
                </span>
              </button>
            ) : (
              <>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-white">
                  {coverPhoto?.imageUrl ? <img src={coverPhoto.imageUrl} alt="" className="h-full w-full object-cover" /> : null}
                  {photos.length > 1 ? <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">Cover</span> : null}
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {photos.map((photo) => {
                    const selected = (coverPhotoId || photos[0]?.id) === photo.id;
                    return (
                      <div key={photo.id} className="relative h-16 w-16 shrink-0">
                        <button
                          type="button"
                          onClick={() => setCoverPhotoId(photo.id)}
                          className={`h-full w-full overflow-hidden rounded-2xl border-2 ${selected ? "border-slate-950" : "border-white"}`}
                          title="Set as cover"
                        >
                          <img src={photo.imageUrl} alt="" className="h-full w-full object-cover" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-slate-950 text-xs font-black text-white"
                          aria-label="Remove photo"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={openPicker}
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-2xl font-light text-slate-500"
                    aria-label="Add more photos"
                  >
                    +
                  </button>
                </div>
              </>
            )}
            {photoError ? <p className="mt-2 text-xs font-bold text-rose-500">{photoError}</p> : null}
            {!photos.length ? <p className="mt-2 text-xs font-bold text-slate-400">Add at least one photo to save this memory.</p> : null}
          </section>

          <section className="mt-5 grid gap-3">
            <label>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Name this moment"
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-slate-300"
              />
            </label>
            <label>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Note</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                placeholder="What do you want to remember?"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-300"
              />
            </label>
            <label>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">Date</span>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none focus:border-slate-300"
              />
            </label>
          </section>

          <section className="mt-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Tags</p>
            {Object.entries(EVENT_TAGS).map(([group, values]) => (
              <TagChooserRow key={group} group={group} values={values} selectedValues={tags[group]} onToggle={toggleTag} />
            ))}
          </section>

          <p className="mt-5 text-xs font-bold leading-5 text-slate-500">
            Memories are private by default.
            <br />
            You can make one public later from Memory Detail.
          </p>
        </div>

        <footer className="border-t border-slate-200/80 bg-white/95 px-4 py-3">
          <button
            type="submit"
            disabled={!canSave}
            className={`h-12 w-full rounded-2xl px-4 text-sm font-black shadow-lg shadow-slate-950/15 ${canSave ? "bg-slate-950 text-white" : "cursor-not-allowed bg-slate-300 text-slate-500"}`}
          >
            Save memory
          </button>
          {!title.trim() ? <p className="mt-2 text-center text-xs font-bold text-slate-400">Give this memory a title.</p> : null}
        </footer>
      </motion.form>
    </motion.div>
  );
}
