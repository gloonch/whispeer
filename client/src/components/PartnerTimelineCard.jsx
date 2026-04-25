import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { knownPartnerUsernames } from "../data/appData.js";
import { daysSince, formatDate, todayISO } from "../utils/appUtils.js";
import IconButton from "./IconButton.jsx";

function statusLabel(status) {
  if (status === "paused") return "Paused";
  if (status === "ended") return "Past";
  return "Active";
}

export default function PartnerTimelineCard({
  partners,
  selectedPartnerId,
  inspiredCountByPartner = {},
  onSelectPartner,
  onAddPartner,
  onUpdatePartnerStatus,
}) {
  const [expanded, setExpanded] = useState(false);
  const [partnerUsername, setPartnerUsername] = useState("");
  const [relationshipStart, setRelationshipStart] = useState(todayISO());
  const [breakupPartner, setBreakupPartner] = useState(null);
  const activePartner = partners.find((partner) => partner.status === "active");
  const selectedPartner = partners.find((partner) => partner.id === selectedPartnerId);
  const pausedPartners = partners.filter((partner) => partner.status === "paused");
  const pastPartners = partners.filter((partner) => partner.status === "ended");
  const hasActivePartner = Boolean(activePartner);
  const viewingPausedRelationship = selectedPartner?.status === "paused";
  const viewingPastRelationship = selectedPartner?.status === "ended";
  const scrollListClass = "max-h-[168px] space-y-2 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

  function addPartner(e) {
    e.preventDefault();
    if (hasActivePartner) return;

    const cleanUsername = partnerUsername.trim().toLowerCase();
    if (!cleanUsername || !relationshipStart) return;

    const displayName = knownPartnerUsernames[cleanUsername] || cleanUsername.split(/[._-]/).filter(Boolean).map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ") || "New Partner";
    onAddPartner({ id: `p_${Date.now()}`, name: displayName, username: cleanUsername, since: relationshipStart });
    setPartnerUsername("");
    setRelationshipStart(todayISO());
    setExpanded(false);
  }

  return (
    <motion.div layout className="mb-5 overflow-hidden rounded-3xl border border-white/70 bg-white/75 shadow-xl shadow-purple-900/5 backdrop-blur">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
            {viewingPastRelationship ? "Viewing past relationship" : viewingPausedRelationship ? "Viewing paused relationship" : "Current relationship"}
          </p>
          <h3 className="mt-1 text-lg font-black tracking-tight text-slate-950">
            {viewingPastRelationship || viewingPausedRelationship ? selectedPartner.name : activePartner ? `${daysSince(activePartner.since)} days with ${activePartner.name}` : "No active relationship"}
          </h3>
          <p className="mt-1 text-xs font-bold text-slate-500">
            {viewingPastRelationship
              ? "Timeline and whispers are showing this past relationship."
              : viewingPausedRelationship
                ? "This relationship is paused. Memories are still visible."
                : activePartner
                  ? "Active relationship"
                  : "Add a partner to start a new relationship, or resume a paused one."}
          </p>
        </div>
        <IconButton label={expanded ? "-" : "+"} selected={expanded} onClick={() => setExpanded((value) => !value)} className="h-11 w-11 shrink-0" title={expanded ? "Collapse relationship card" : "Expand relationship card"} />
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div key="relationship-card-body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden">
            <div className="space-y-4 border-t border-slate-200/70 p-4 pt-3">
              {activePartner ? (
                <div className={`rounded-[1.35rem] border p-3 ${selectedPartnerId === activePartner.id ? "border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100" : "border-white/80 bg-white/75"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black text-slate-950">{activePartner.name}</p>
                      {inspiredCountByPartner[activePartner.id] > 0 ? <p className="mt-1 text-xs font-black uppercase tracking-wide text-purple-600">Inspired {inspiredCountByPartner[activePartner.id]}</p> : null}
                      <p className="mt-1 text-xs font-bold text-slate-500">@{activePartner.username}</p>
                      <p className="mt-1 text-xs font-bold text-slate-400">Started {formatDate(activePartner.since)}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">{statusLabel(activePartner.status)}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => onUpdatePartnerStatus(activePartner.id, "paused")} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Pause relationship</button>
                    <button type="button" onClick={() => setBreakupPartner(activePartner)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Break up</button>
                  </div>
                  {selectedPartnerId !== activePartner.id ? (
                    <button type="button" onClick={() => onSelectPartner(activePartner.id)} className="mt-2 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">View current relationship</button>
                  ) : (
                    <div className="mt-2 grid h-11 place-items-center rounded-2xl bg-slate-950 px-3 text-xs font-black text-white">Viewing current relationship</div>
                  )}
                </div>
              ) : (
                <form onSubmit={addPartner} className="rounded-[1.35rem] border border-dashed border-slate-950 bg-slate-100/80 p-3 shadow-inner shadow-slate-950/5">
                  <p className="mb-3 text-sm font-black text-slate-950">Add partner</p>
                  <div className="grid gap-2">
                    <input value={partnerUsername} onChange={(e) => setPartnerUsername(e.target.value)} placeholder="Username, e.g. luna.carter" className="h-12 rounded-2xl border border-slate-300 bg-white px-4 text-sm font-bold lowercase tracking-wide text-slate-800 shadow-sm outline-none focus:border-purple-300" />
                    <div className="grid grid-cols-[1fr_auto] gap-2">
                      <input type="date" value={relationshipStart} onChange={(e) => setRelationshipStart(e.target.value)} className="h-12 rounded-2xl border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 shadow-sm outline-none focus:border-purple-300" />
                      <button className="h-12 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-950/15">Add</button>
                    </div>
                  </div>
                </form>
              )}

              {pausedPartners.length > 0 ? (
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Paused relationships</p>
                  <div className={scrollListClass}>
                    {pausedPartners.map((partner) => {
                      const selected = partner.id === selectedPartnerId;
                      return (
                        <div key={partner.id} className={`rounded-[1.35rem] border p-3 ${selected ? "border-slate-950 bg-white" : "border-white/80 bg-white/75"}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-black text-slate-950">{partner.name}</p>
                              {inspiredCountByPartner[partner.id] > 0 ? <p className="mt-1 text-xs font-black uppercase tracking-wide text-purple-600">Inspired {inspiredCountByPartner[partner.id]}</p> : null}
                              <p className="mt-1 text-xs font-bold text-slate-500">@{partner.username}</p>
                              <p className="mt-1 text-xs font-bold text-slate-400">Started {formatDate(partner.since)}</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">{statusLabel(partner.status)}</span>
                          </div>
                          {hasActivePartner ? (
                            selected ? (
                              <div className="mt-3 grid h-11 place-items-center rounded-2xl bg-slate-950 px-3 text-xs font-black text-white">Viewing paused relationship</div>
                            ) : (
                              <button type="button" onClick={() => onSelectPartner(partner.id)} className="mt-3 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">View relationship</button>
                            )
                          ) : (
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <button type="button" onClick={() => onUpdatePartnerStatus(partner.id, "active")} className="h-11 rounded-2xl bg-slate-950 px-3 text-xs font-black text-white">Resume relationship</button>
                              <button type="button" onClick={() => setBreakupPartner(partner)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Break up</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {pastPartners.length > 0 ? (
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Past relationships</p>
                  <div className={scrollListClass}>
                    {pastPartners.map((partner) => {
                      const selected = partner.id === selectedPartnerId;
                      return (
                        <div key={partner.id} className={`rounded-[1.35rem] border p-3 ${selected ? "border-slate-950 bg-white" : "border-white/80 bg-white/75"}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-black text-slate-950">{partner.name}</p>
                              {inspiredCountByPartner[partner.id] > 0 ? <p className="mt-1 text-xs font-black uppercase tracking-wide text-purple-600">Inspired {inspiredCountByPartner[partner.id]}</p> : null}
                              <p className="mt-1 text-xs font-bold text-slate-500">@{partner.username}</p>
                              <p className="mt-1 text-xs font-bold text-slate-400">{formatDate(partner.since)} - {formatDate(partner.endedAt)}</p>
                            </div>
                            <span className="shrink-0 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">{statusLabel(partner.status)}</span>
                          </div>
                          {selected ? (
                            <div className="mt-3 grid h-11 place-items-center rounded-2xl bg-slate-950 px-3 text-xs font-black text-white">Viewing past relationship</div>
                          ) : (
                            <button type="button" onClick={() => onSelectPartner(partner.id)} className="mt-3 h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">View memories</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {breakupPartner ? (
          <motion.div className="fixed inset-0 z-50 grid place-items-center bg-purple-950/25 p-3 backdrop-blur-[1px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBreakupPartner(null)}>
            <motion.div
              className="w-full max-w-[406px] rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 shadow-2xl shadow-purple-900/20"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="rounded-2xl border border-white/80 bg-white/85 p-4">
                <h3 className="text-lg font-black text-slate-950">Move this relationship to past?</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">This will move your relationship with {breakupPartner.name} to Past relationships. Memories and highlights will stay visible, but you won't be able to add new whispers or memories to it.</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setBreakupPartner(null)} className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700">Cancel</button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdatePartnerStatus(breakupPartner.id, "ended");
                      setBreakupPartner(null);
                    }}
                    className="h-11 rounded-2xl bg-slate-950 px-3 text-xs font-black text-white shadow-lg shadow-slate-950/15"
                  >
                    Move to past
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
