import { useState } from "react";
import { TODO_PRESETS } from "../data/appData.js";
import Icon from "./Icon.jsx";

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState(TODO_PRESETS[0]);
  const [minutes, setMinutes] = useState(10);
  function submit(e) {
    e.preventDefault();
    if (!title) return;
    onAdd({ id: `t_${Date.now()}`, title, minutes, status: "open" });
  }
  return (
    <form onSubmit={submit} className="grid gap-3 rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 sm:rounded-3xl sm:p-4 sm:grid-cols-[1fr_120px_auto]">
      <div className="relative"><select value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 w-full appearance-none rounded-2xl border border-white/80 bg-white/85 px-4 pr-10 text-sm font-bold text-slate-800 outline-none">{TODO_PRESETS.map((item) => <option key={item}>{item}</option>)}</select><Icon label="⌄" size={18} className="pointer-events-none absolute right-3 top-3.5 text-slate-400" /></div>
      <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="h-12 rounded-2xl border border-white/80 bg-white/85 px-4 text-sm font-bold text-slate-800 outline-none">{[10, 20, 30, 45, 60].map((m) => <option key={m} value={m}>{m} min</option>)}</select>
      <button className="h-12 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-950/15"><Icon label="+" size={17} className="mr-1 inline-flex" /> Add</button>
    </form>
  );
}
