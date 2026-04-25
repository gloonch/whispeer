export default function TimelineViewSwitch({ viewMode, onChange }) {
  return (
    <div className="mb-4 grid grid-cols-2 rounded-2xl border border-slate-200 bg-white/65 p-1 shadow-inner">
      {[["grid", "Grid"], ["timeline", "Timeline"]].map(([key, label]) => {
        const active = viewMode === key;
        return <button key={key} type="button" onClick={() => onChange(key)} className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${active ? "bg-slate-950 text-white shadow" : "text-slate-500 hover:text-slate-900"}`}>{label}</button>;
      })}
    </div>
  );
}
