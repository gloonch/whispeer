export default function Pill({ children, tone = "default" }) {
  const tones = {
    default: "bg-white/70 text-slate-700 border-white/70",
    what: "bg-pink-100/80 text-pink-700 border-pink-200/80",
    where: "bg-blue-100/80 text-blue-700 border-blue-200/80",
    how: "bg-purple-100/80 text-purple-700 border-purple-200/80",
    with: "bg-emerald-100/80 text-emerald-700 border-emerald-200/80",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone] || tones.default}`}>{children}</span>;
}
