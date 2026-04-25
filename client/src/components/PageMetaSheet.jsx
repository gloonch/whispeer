export default function PageMetaSheet({ text }) {
  return (
    <div className="grid gap-3 rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 sm:rounded-3xl sm:p-4 sm:grid-cols-[1fr_120px_auto]">
      <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-center sm:col-span-3">
        <p className=" text-xs font-bold leading-5 text-slate-700">{text}</p>
      </div>
    </div>
  );
}
