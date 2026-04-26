export default function AppHeader({ pageMeta, onAddClick, onNotificationsClick, onTitleClick, showActions = true, hasUnread = false }) {
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
            className="relative grid h-10 w-10 place-items-center rounded-full text-slate-950"
            aria-label="Notifications"
            title="Notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" className="h-[22px] w-[22px]" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 17.25h5.269c.616 0 .989-.685.655-1.204a5.97 5.97 0 0 1-.77-2.985V11.25a7.5 7.5 0 0 0-15 0v1.811c0 1.063-.27 2.109-.77 2.985-.334.519.039 1.204.655 1.204h5.269m4.692 0a2.25 2.25 0 1 1-4.5 0m4.5 0h-4.5" />
            </svg>
            {hasUnread ? <span className="absolute right-[7px] top-[8px] h-2 w-2 rounded-full bg-rose-500" aria-hidden="true" /> : null}
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
    </header>
  );
}
