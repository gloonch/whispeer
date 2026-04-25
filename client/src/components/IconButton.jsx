import Icon from "./Icon.jsx";

export default function IconButton({ label, selected = false, onClick, className = "", title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title || label}
      className={`inline-flex items-center justify-center rounded-2xl border transition ${selected
          ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/10"
          : "border-slate-300/80 bg-transparent text-slate-600 hover:border-slate-500 hover:text-slate-950"
        } ${className}`}
    >
      <Icon label={label} size={28} />
    </button>
  );
}
