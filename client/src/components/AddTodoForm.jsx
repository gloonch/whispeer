import { useMemo, useState } from "react";
import { TODO_PRESETS } from "../data/appData.js";

const TIME_OPTIONS = [
  { id: "10m", label: "10 min", minutes: 10 },
  { id: "20m", label: "20 min", minutes: 20 },
  { id: "30m", label: "30 min", minutes: 30 },
  { id: "1h", label: "1 hour", minutes: 60 },
  { id: "tonight", label: "Tonight" },
  { id: "weekend", label: "This weekend" },
];

export default function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [selectedTimeId, setSelectedTimeId] = useState("");
  const cleanedTitle = title.trim();
  const titleReady = Boolean(cleanedTitle);

  const selectedTime = useMemo(() => TIME_OPTIONS.find((item) => item.id === selectedTimeId), [selectedTimeId]);

  function submit(event) {
    event.preventDefault();
    if (!titleReady) return;
    onAdd({
      id: `t_${Date.now()}`,
      title: cleanedTitle,
      minutes: selectedTime?.minutes,
      timeLabel: selectedTime?.label,
      status: "open",
    });
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-white/70 bg-[#fbf7ef]/95 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
      <h3 className="text-lg font-black text-slate-950">Add a whisper</h3>
      <p className="mt-1 text-sm font-bold text-slate-500">A tiny plan for you two.</p>

      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-500">What do you want to do together?</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Write something small..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none transition focus:border-slate-300"
        />
      </label>

      <div className="mt-3">
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">Suggestions</p>
        <div className="flex flex-wrap gap-2">
          {TODO_PRESETS.map((item) => {
            const active = cleanedTitle.toLowerCase() === item.toLowerCase();
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTitle(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-1 text-xs font-black uppercase tracking-wide text-slate-500">Time, optional</p>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((option) => {
            const active = selectedTimeId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedTimeId((current) => (current === option.id ? "" : option.id))}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${active ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs font-bold text-slate-400">Small things count. Add something you'd actually do.</p>
      <button
        type="submit"
        disabled={!titleReady}
        className={`mt-3 h-12 w-full rounded-2xl px-4 text-sm font-black shadow-lg shadow-slate-950/15 ${titleReady ? "bg-slate-950 text-white" : "cursor-not-allowed bg-slate-300 text-slate-500"}`}
      >
        Add whisper
      </button>
    </form>
  );
}
