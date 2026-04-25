import { motion } from "framer-motion";
import Card from "./Card.jsx";
import WhisperEmptySkeleton from "./WhisperEmptySkeleton.jsx";

export default function WhispersPage({ openTodos, doneTodos, onHighlightTodo, onMarkDone, onRemoveTodo, selectedPartner }) {
  const readOnly = selectedPartner?.status && selectedPartner.status !== "active";
  const readOnlyText = selectedPartner?.status === "paused"
    ? "This relationship is paused. You can still view whispers, but new whispers are disabled."
    : "This is a past relationship. Whispers are read-only.";

  return (
    <motion.div key="whispers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {readOnly ? <Card className="mb-3 p-4 text-sm font-bold leading-6 text-slate-600">{readOnlyText}</Card> : null}
      <div className="space-y-3">
        {openTodos.length === 0 ? <WhisperEmptySkeleton /> : null}
        {openTodos.map((todo, index) => <motion.div key={todo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}><Card className="p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"><div><h3 className="font-black text-slate-950">{todo.title}</h3><p className="mt-1 text-sm text-slate-500">{todo.minutes} minutes of quality attention</p>{todo.source?.type === "public_memory" ? <p className="mt-1 text-xs font-black uppercase tracking-wide text-purple-600">{todo.source.label || "Inspired from Explore"}</p> : null}</div><div className="grid grid-cols-[1fr_1fr_auto] gap-2 sm:flex sm:flex-wrap"><button disabled={readOnly} onClick={() => onHighlightTodo(todo)} className={`min-h-11 rounded-2xl px-3 py-2 text-xs font-black ${readOnly ? "cursor-not-allowed bg-slate-300 text-slate-500" : "bg-slate-950 text-white"}`}>Highlight</button><button disabled={readOnly} onClick={() => onMarkDone(todo.id)} className={`min-h-11 rounded-2xl border px-3 py-2 text-xs font-black ${readOnly ? "cursor-not-allowed border-slate-200 bg-white/60 text-slate-400" : "border-slate-200 bg-white text-slate-700"}`}>Done</button><button disabled={readOnly} onClick={() => onRemoveTodo(todo.id)} className={`min-h-11 rounded-2xl border px-3 py-2 text-xs font-black ${readOnly ? "cursor-not-allowed border-slate-200 bg-white/60 text-slate-300" : "border-slate-200 bg-white text-slate-400"}`} aria-label={`Remove ${todo.title}`}>Remove</button></div></div></Card></motion.div>)}
      </div>
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">Completed</h3>
        <div className="space-y-2">
          {doneTodos.length === 0 ? <div className="rounded-2xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-slate-500">Nothing completed yet.</div> : null}
          {doneTodos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-slate-600">
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-700">{todo.title}</p>
                <p className="mt-0.5 text-xs font-bold text-slate-400">{todo.minutes} min · {todo.isHighlighted ? "highlighted" : "done"}</p>
                {todo.source?.type === "public_memory" ? <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-purple-600">{todo.source.label || "Inspired from Explore"}</p> : null}
              </div>
              <button
                type="button"
                disabled={readOnly}
                onClick={() => onRemoveTodo(todo.id)}
                className={`grid h-9 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white px-3 text-xs font-black transition ${readOnly ? "cursor-not-allowed text-slate-300" : "text-slate-400 hover:border-slate-300 hover:text-slate-700"}`}
                aria-label={`Delete ${todo.title}`}
                title="Delete"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
