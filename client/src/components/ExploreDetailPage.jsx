import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { getEventCover, getEventCoverImage, slugLabel } from "../utils/appUtils.js";

function couplesText(count) {
  return `Inspired ${count} ${count === 1 ? "couple" : "couples"}`;
}

export default function ExploreDetailPage({ publicMemories, activeRelationshipId, inspirationRecords, onAddToWhispers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const memory = publicMemories.find((item) => item.id === id);

  if (!memory) {
    return (
      <div className="-mx-3 -my-4 grid min-h-[calc(100vh-5rem)] place-items-center px-6 text-center">
        <div>
          <p className="text-sm font-bold text-slate-500">Public memory not found.</p>
          <button type="button" onClick={() => navigate("/explore")} className="mt-4 h-11 rounded-2xl bg-slate-950 px-5 text-xs font-black text-white">Back to Explore</button>
        </div>
      </div>
    );
  }

  const imageUrl = getEventCoverImage(memory);
  const tags = Object.values(memory.tags || {}).flat().slice(0, 5).map(slugLabel);
  const inspiredCount = memory.inspiredCount || 0;
  const alreadyInspired = Boolean(activeRelationshipId && inspirationRecords.some((record) => record.publicMemoryId === memory.id && record.relationshipId === activeRelationshipId));
  const actionText = alreadyInspired ? "Added to Whispers" : activeRelationshipId ? "Try this together" : "No active relationship";

  return (
    <motion.div key="explore-detail" className="-mx-3 -my-4 min-h-[calc(100vh-5rem)] bg-[#f8f5f2] pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header className="sticky top-0 z-30 grid h-16 grid-cols-[44px_1fr_44px] items-center border-b border-slate-200/80 bg-white/95 px-3 backdrop-blur-xl">
        <button type="button" onClick={() => navigate(-1)} className="grid h-10 w-10 place-items-center rounded-full text-2xl font-light text-slate-950" aria-label="Back">‹</button>
        <div className="min-w-0 text-center">
          <p className="truncate text-sm font-black text-slate-950">Public memory</p>
          <p className="mt-0.5 text-xs font-black uppercase tracking-wide text-purple-600">{couplesText(inspiredCount)}</p>
        </div>
        <span aria-hidden="true" />
      </header>

      <section className="aspect-square bg-white">
        {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : <div className={`h-full w-full ${memory.coverClass || getEventCover(memory)}`} />}
      </section>

      <section className="px-4 py-4">
        {tags.length > 0 ? <p className="text-sm font-bold leading-6 text-slate-700">{tags.join(" · ")}</p> : null}
        {alreadyInspired ? <p className="mt-3 text-xs font-bold text-slate-500">Added to Whispers</p> : null}
        <button
          type="button"
          disabled={alreadyInspired || !activeRelationshipId}
          onClick={() => onAddToWhispers(memory)}
          className={`mt-4 h-12 w-full rounded-2xl px-3 text-sm font-black ${alreadyInspired || !activeRelationshipId ? "cursor-not-allowed border border-slate-200 bg-white text-slate-400" : "bg-slate-950 text-white shadow-lg shadow-slate-950/15"}`}
        >
          {actionText}
        </button>
      </section>
    </motion.div>
  );
}
