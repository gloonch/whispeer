import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getEventCover, getEventCoverImage } from "../utils/appUtils.js";

function PublicMemoryTile({ memory, index, onSelect }) {
  const imageUrl = getEventCoverImage(memory);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(memory)}
      className="relative aspect-square overflow-hidden bg-white"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.018 }}
      aria-label="Open public memory"
    >
      {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : <div className={`h-full w-full ${memory.coverClass || getEventCover(memory)}`} />}
      {memory.inspiredCount > 0 ? <span className="absolute bottom-2 right-2 text-[11px] font-black text-white drop-shadow-[0_1px_3px_rgba(15,23,42,0.85)]">{memory.inspiredCount}</span> : null}
    </motion.button>
  );
}

export default function ExplorePage({ publicMemories }) {
  const navigate = useNavigate();

  return (
    <motion.div key="explore" className="-mx-3 -my-4 h-[calc(100vh-8rem)] overflow-y-auto bg-[#f8f5f2] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {publicMemories.length === 0 ? (
        <div className="grid h-full place-items-center px-6 text-center text-sm font-bold leading-6 text-slate-500">Public memories from other couples, shared for inspiration.</div>
      ) : (
        <div className="grid grid-cols-3 gap-px">
          {publicMemories.map((memory, index) => <PublicMemoryTile key={memory.id} memory={memory} index={index} onSelect={(item) => navigate(`/explore/${item.id}`)} />)}
        </div>
      )}
    </motion.div>
  );
}
