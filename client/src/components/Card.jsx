export default function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-white/60 bg-white/75 shadow-xl shadow-purple-900/5 backdrop-blur ${className}`}>{children}</div>;
}
