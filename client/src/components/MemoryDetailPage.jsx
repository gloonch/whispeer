import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate, getEventCover, getEventCoverImage, slugLabel } from "../utils/appUtils.js";
import MemoryVisibilityModal from "./MemoryVisibilityModal.jsx";

function PhotoFrame({ photo, memory }) {
  if (photo?.imageUrl) return <img src={photo.imageUrl} alt="" className="h-full w-full object-cover" />;
  return <div className={`h-full w-full ${photo?.coverClass || getEventCover(memory)}`} />;
}

export default function MemoryDetailPage({ memories, onToggleVisibility, onSetCover, onDeleteMemory }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const memory = memories.find((item) => item.id === id);
  const [slideIndex, setSlideIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [visibilityMemory, setVisibilityMemory] = useState(null);

  const photos = useMemo(() => {
    const list = Array.isArray(memory?.photos) ? memory.photos : [];
    return list.length > 0 ? list : [{ id: "fallback", coverClass: getEventCover(memory) }];
  }, [memory]);
  const tags = useMemo(() => Object.values(memory?.tags || {}).flat().map(slugLabel), [memory]);

  if (!memory) {
    return (
      <div className="-mx-3 -my-4 grid min-h-[calc(100vh-5rem)] place-items-center px-6 text-center">
        <div>
          <p className="text-sm font-bold text-slate-500">Memory not found.</p>
          <button type="button" onClick={() => navigate("/timeline")} className="mt-4 h-11 rounded-2xl bg-slate-950 px-5 text-xs font-black text-white">Back to Timeline</button>
        </div>
      </div>
    );
  }

  function updateSlide(event) {
    const width = event.currentTarget.clientWidth || 1;
    setSlideIndex(Math.round(event.currentTarget.scrollLeft / width));
  }

  function deleteMemory() {
    onDeleteMemory(memory.id);
    navigate("/timeline");
  }

  return (
    <motion.div key="memory-detail" className="-mx-3 -my-4 min-h-[calc(100vh-5rem)] bg-[#f8f5f2] pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="sticky top-0 z-30 grid min-h-16 grid-cols-[44px_minmax(0,1fr)_auto_44px] items-center gap-2 border-b border-slate-200/80 bg-white/95 px-3 py-2 backdrop-blur-xl">
        <button type="button" onClick={() => navigate(-1)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-2xl font-light text-slate-950" aria-label="Back">‹</button>
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-slate-950">{memory.title}</p>
          <p className="mt-0.5 text-xs font-bold text-slate-500">{formatDate(memory.date)}</p>
        </div>
        <div className="shrink-0 text-center leading-none">
          <p className={`text-[10px] font-black uppercase tracking-wide ${memory.visibility === "public" ? "text-purple-600" : "text-slate-500"}`}>
            {memory.visibility === "public" ? "Public" : "Private"}
          </p>
          {memory.visibility === "public" && memory.inspiredCount > 0 ? <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-purple-600">Inspired {memory.inspiredCount}</p> : null}
        </div>
        <div className="relative">
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full text-xl font-black text-slate-950" aria-label="Memory menu">...</button>
          {menuOpen ? (
            <div className="absolute right-0 top-11 w-44 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-purple-900/10">
              <button type="button" onClick={() => { setVisibilityMemory(memory); setMenuOpen(false); }} className="block h-11 w-full px-4 text-left text-xs font-black text-slate-700">{memory.visibility === "public" ? "Make private" : "Make public"}</button>
              <button type="button" onClick={() => { setEditOpen(true); setMenuOpen(false); }} className="block h-11 w-full border-t border-slate-100 px-4 text-left text-xs font-black text-slate-700">Edit memory</button>
            </div>
          ) : null}
        </div>
      </header>

      <section
        className="flex aspect-square snap-x snap-mandatory overflow-x-auto bg-white [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={updateSlide}
      >
        {photos.map((photo) => (
          <div key={photo.id} className="h-full w-full shrink-0 snap-start">
            <PhotoFrame photo={photo} memory={memory} />
          </div>
        ))}
      </section>

      {photos.length > 1 ? (
        <div className="mt-3 flex justify-center gap-1.5">
          {photos.map((photo, index) => <span key={photo.id} className={`h-1.5 w-1.5 rounded-full ${index === slideIndex ? "bg-slate-950" : "bg-slate-300"}`} />)}
        </div>
      ) : null}

      <section className="px-4 py-4">
        <div>
          {memory.note ? <p className="text-sm leading-6 text-slate-700">{memory.note}</p> : null}
        </div>

        {tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
            {tags.map((tag) => <span key={tag} className="text-sm font-bold text-purple-600">#{tag.split(" ").join("")}</span>)}
          </div>
        ) : null}
      </section>

      <AnimatePresence>
        {editOpen ? (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-purple-950/25 p-3 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditOpen(false)}>
            <motion.div className="w-full max-w-[406px] rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 shadow-2xl shadow-purple-900/20" initial={{ opacity: 0, y: 16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} onClick={(event) => event.stopPropagation()}>
              <div className="rounded-2xl border border-white/80 bg-white/85 p-4">
                <h3 className="text-lg font-black text-slate-950">Edit memory</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">Choose which photo should appear as the cover.</p>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {photos.map((photo) => {
                    const selected = memory.coverPhotoId ? photo.id === memory.coverPhotoId : photo.id === photos[photos.length - 1]?.id;
                    return (
                      <button key={photo.id} type="button" onClick={() => onSetCover(memory.id, photo.id)} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 ${selected ? "border-slate-950" : "border-white"}`}>
                        <PhotoFrame photo={photo} memory={memory} />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setEditOpen(false)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Done</button>
                  <button type="button" onClick={deleteMemory} className="h-11 rounded-2xl bg-slate-950 px-3 text-xs font-black text-white">Delete memory</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {visibilityMemory ? (
          <MemoryVisibilityModal
            memory={visibilityMemory}
            onClose={() => setVisibilityMemory(null)}
            onConfirm={(item) => {
              onToggleVisibility(item);
              setVisibilityMemory(null);
            }}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
