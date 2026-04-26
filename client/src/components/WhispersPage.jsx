import { useState } from "react";
import { motion } from "framer-motion";
import Card from "./Card.jsx";
import WhisperEmptySkeleton from "./WhisperEmptySkeleton.jsx";

function todoTimeLabel(todo) {
  if (Number.isFinite(todo?.minutes)) return `${todo.minutes} min`;
  if (todo?.timeLabel) return todo.timeLabel;
  return "Time optional";
}

export default function WhispersPage({ openTodos, doneTodos, onHighlightTodo, onMarkDone, onRemoveTodo, selectedPartner }) {
  const [menuTodoId, setMenuTodoId] = useState("");
  const readOnly = selectedPartner?.status && selectedPartner.status !== "active";
  const readOnlyText = selectedPartner?.status === "paused"
    ? "This relationship is paused. You can still view whispers, but new whispers are disabled."
    : "This is a past relationship. Whispers are read-only.";

  return (
    <motion.div key="whispers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {readOnly ? <Card className="mb-3 p-4 text-sm font-bold leading-6 text-slate-600">{readOnlyText}</Card> : null}
      <div className="space-y-3">
        {openTodos.length === 0 ? <WhisperEmptySkeleton /> : null}
        {openTodos.map((todo, index) => (
          <motion.div key={todo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
            <Card className="relative p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-slate-950">{todo.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{todoTimeLabel(todo)} · quality attention</p>
                  {todo.source?.type === "public_memory" ? (
                    <p className="mt-1 text-[11px] font-semibold text-purple-700">{todo.source.label || "Inspired from Explore"}</p>
                  ) : null}
                </div>

                <div className="relative flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    disabled={readOnly}
                    onClick={() => setMenuTodoId((current) => (current === todo.id ? "" : todo.id))}
                    className={`grid h-9 w-9 place-items-center rounded-full text-base font-black transition ${readOnly ? "cursor-not-allowed text-slate-300" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`}
                    aria-label={`More actions for ${todo.title}`}
                    title="More actions"
                  >
                    ...
                  </button>
                  <button
                    type="button"
                    disabled={readOnly}
                    onClick={() => {
                      setMenuTodoId("");
                      onMarkDone(todo.id);
                    }}
                    className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-black transition ${readOnly ? "cursor-not-allowed border-slate-200 bg-white text-slate-300" : "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:opacity-90"}`}
                    aria-label={`Mark ${todo.title} done`}
                    title="Mark done"
                  >
                    ✓
                  </button>
                  {menuTodoId === todo.id ? (
                    <div className="absolute right-11 top-10 z-20 w-36 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-slate-950/10">
                      <button
                        type="button"
                        disabled={readOnly}
                        onClick={() => {
                          setMenuTodoId("");
                          onRemoveTodo(todo.id);
                        }}
                        className={`block h-11 w-full px-4 text-left text-xs font-black ${readOnly ? "cursor-not-allowed text-slate-300" : "text-slate-700 hover:bg-slate-50"}`}
                      >
                        Remove whisper
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                disabled={readOnly}
                onClick={() => {
                  setMenuTodoId("");
                  onHighlightTodo(todo);
                }}
                className={`mt-3 h-10 rounded-2xl border px-3 text-xs font-black transition ${readOnly ? "cursor-not-allowed border-slate-200 bg-white/60 text-slate-400" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"}`}
              >
                Keep as highlight
              </button>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-slate-500">Completed</h3>
        <div className="space-y-2">
          {doneTodos.length === 0 ? <div className="rounded-2xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-slate-500">Nothing completed yet.</div> : null}
          {doneTodos.map((todo) => (
            <div key={todo.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/50 px-4 py-3 text-sm text-slate-600">
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-700">{todo.title}</p>
                <p className="mt-0.5 text-xs font-bold text-slate-400">{todoTimeLabel(todo)} · {todo.isHighlighted ? "highlighted" : "done"}</p>
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
