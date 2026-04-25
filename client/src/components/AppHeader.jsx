export default function AppHeader({ pageMeta, onAddClick, onNotificationsClick, onTitleClick, showActions = true }) {
  return (
    <header className="relative z-40 border-b border-slate-200/80 bg-white/95 px-4 pb-2 pt-4 backdrop-blur-xl">
      <div className="grid h-10 grid-cols-[40px_1fr_40px] items-center">
        {showActions ? (
          <button
            type="button"
            onClick={onAddClick}
            className="grid h-10 w-10 place-items-center rounded-full text-3xl font-light leading-none text-slate-950"
            aria-label="Add whisper"
            title="Add whisper"
          >
            +
          </button>
        ) : (
          <span aria-hidden="true" />
        )}

        <button
          type="button"
          onClick={onTitleClick}
          className="min-w-0 text-center text-2xl font-black tracking-normal text-slate-950"
          aria-label="Show page summary"
          title="Show page summary"
        >
          {pageMeta.title}
        </button>

        {showActions ? (
          <button
            type="button"
            onClick={onNotificationsClick}
            className="grid h-10 w-10 place-items-center rounded-full text-xl font-light leading-none text-slate-950"
            aria-label="Notifications"
            title="Notifications"
          >
            ♡
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
