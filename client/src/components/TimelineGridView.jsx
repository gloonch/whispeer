import { motion } from "framer-motion";
import { formatDate, getEventCover, getEventCoverImage } from "../utils/appUtils.js";

export default function TimelineGridView({ events, onOpenMemory }) {
  return (
    <div className="-mx-3 grid grid-cols-3 gap-px bg-[#f8f5f2]">
      {events.map((event, index) => {
        const imageUrl = getEventCoverImage(event);

        return (
          <motion.button
            key={event.id}
            type="button"
            onClick={() => onOpenMemory(event.id)}
            className="group relative aspect-square overflow-hidden bg-white"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.025 }}
            title={`${event.title} · ${formatDate(event.date)}`}
          >
            {imageUrl ? <img src={imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" /> : <div className={`absolute inset-0 ${getEventCover(event)}`} />}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/0 to-white/10 opacity-80 transition group-hover:opacity-95" />
            {event.visibility === "public" && event.inspiredCount > 0 ? <span className="absolute bottom-2 right-2 text-[11px] font-black text-white drop-shadow-[0_1px_3px_rgba(15,23,42,0.85)]">{event.inspiredCount}</span> : null}
          </motion.button>
        );
      })}
    </div>
  );
}
