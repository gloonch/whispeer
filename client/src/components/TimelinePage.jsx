import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatDate, slugLabel } from "../utils/appUtils.js";
import Card from "./Card.jsx";
import HighlightDetailSheet from "./HighlightDetailSheet.jsx";
import HighlightsRow from "./HighlightsRow.jsx";
import Icon from "./Icon.jsx";
import Pill from "./Pill.jsx";
import TimelineGridView from "./TimelineGridView.jsx";
import TimelineViewSwitch from "./TimelineViewSwitch.jsx";

export default function TimelinePage({ events, highlights, partners, selectedPartnerId, selectedPartner, onRemoveHighlight, onOpenMemory }) {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const visibleEvents = useMemo(() => events.filter((event) => !selectedPartnerId || event.partnerId === selectedPartnerId), [events, selectedPartnerId]);
  const sortedEvents = useMemo(() => [...visibleEvents].sort((a, b) => String(b.date).localeCompare(String(a.date))), [visibleEvents]);
  const sortedHighlights = useMemo(() => [...highlights].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))), [highlights]);
  const hasPartners = partners.length > 0;
  const readOnly = selectedPartner?.status && selectedPartner.status !== "active";
  const readOnlyText = selectedPartner?.status === "paused"
    ? "This relationship is paused. You can still view memories, but new memories are disabled."
    : selectedPartner?.status === "ended"
      ? "This is a past relationship. Memories are read-only."
      : "";

  return (
    <motion.div key="timeline" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {readOnlyText ? <Card className="mb-3 p-4 text-sm font-bold leading-6 text-slate-600">{readOnlyText}</Card> : null}
      <HighlightsRow highlights={sortedHighlights} onSelect={setSelectedHighlight} />
      {hasPartners && sortedEvents.length > 0 ? <TimelineViewSwitch viewMode={viewMode} onChange={setViewMode} /> : null}
      {!hasPartners ? <Card className="p-5 text-sm leading-6 text-slate-500">Add a partner first, then your shared timeline will appear here.</Card> : sortedEvents.length === 0 ? <Card className="p-5 text-sm leading-6 text-slate-500">No memories with this partner yet. Add the first one.</Card> : viewMode === "grid" ? <TimelineGridView events={sortedEvents} onOpenMemory={onOpenMemory} /> : (
        <div className="relative space-y-3 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200 sm:space-y-4 sm:before:left-4">
          {sortedEvents.map((event, index) => {
            const primaryTag = (event.tags?.what || [])[0] || Object.values(event.tags || {}).flat()[0] || "memory";
            return (
              <motion.article key={event.id} className="relative pl-8 sm:pl-10" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                <div className="absolute left-1 top-4 h-4 w-4 rounded-full border-4 border-[#f8f5f2] bg-slate-950 shadow sm:left-1.5 sm:h-5 sm:w-5" />
                <button type="button" onClick={() => onOpenMemory(event.id)} className="block w-full text-left">
                  <Card className="p-4 transition hover:-translate-y-0.5 hover:shadow-2xl">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black leading-tight text-slate-950">{event.title}</h3>
                        <p className="mt-1 flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate-400"><Icon label="⌖" size={12} /> {formatDate(event.date)}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Pill>{slugLabel(primaryTag)}</Pill>
                      </div>
                    </div>
                  </Card>
                </button>
              </motion.article>
            );
          })}
        </div>
      )}
      <AnimatePresence>
        {selectedHighlight ? (
          <HighlightDetailSheet
            highlight={selectedHighlight}
            readOnly={readOnly}
            onClose={() => setSelectedHighlight(null)}
            onRemove={(highlightId) => {
              onRemoveHighlight(highlightId);
              setSelectedHighlight(null);
            }}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
