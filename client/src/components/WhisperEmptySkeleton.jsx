export default function WhisperEmptySkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/55 p-4 shadow-xl shadow-purple-900/5 backdrop-blur-xl">
      <div className="space-y-3 opacity-70">
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-300/50" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-300/50" />
        <div className="grid grid-cols-[1fr_1fr_auto] gap-2 pt-2">
          <div className="h-10 animate-pulse rounded-2xl bg-slate-300/50" />
          <div className="h-10 animate-pulse rounded-2xl bg-slate-300/50" />
          <div className="h-10 w-11 animate-pulse rounded-2xl bg-slate-300/40" />
        </div>
      </div>

      <div className="absolute inset-0 grid place-items-center bg-white/15 px-6 text-center">
        <p className="text-sm font-black leading-6 text-slate-700">
          No whispers have been added yet.
        </p>
      </div>
    </div>
  );
}
