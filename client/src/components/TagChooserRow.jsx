import Icon from "./Icon.jsx";
import { slugLabel } from "../utils/appUtils.js";

export default function TagChooserRow({ group, values, selectedValues, onToggle }) {
  return (
    <div className="grid grid-cols-[58px_minmax(0,1fr)] items-center gap-2">
      <div className="flex items-center gap-1 text-xs font-black uppercase tracking-wide text-slate-700">
        <Icon label="#" size={13} /> {group}
      </div>
      <div className="relative overflow-hidden">
        <div className="flex gap-2 overflow-x-auto pb-1 pr-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {values.map((value) => {
            const active = (selectedValues || []).includes(value);
            return (
              <button key={value} type="button" onClick={() => onToggle(group, value)} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition ${active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white/85 text-slate-600 hover:border-slate-300"}`}>
                {slugLabel(value)}
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#fbf8f5] via-[#fbf8f5]/85 to-transparent" />
      </div>
    </div>
  );
}
