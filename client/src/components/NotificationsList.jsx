function iconFor(type) {
  if (type === "partner_request") return "♡";
  if (type === "whisper_added") return "✦";
  if (type === "whisper_done") return "✓";
  if (type === "highlight_added") return "✶";
  if (type === "visibility") return "◎";
  if (type === "inspired") return "↗";
  return "•";
}

function bucketed(notifications) {
  return {
    Today: notifications.filter((item) => item.bucket === "Today"),
    Earlier: notifications.filter((item) => item.bucket === "Earlier"),
  };
}

function NotificationRow({ item, onRespond }) {
  return (
    <article className="rounded-2xl border border-slate-200/70 bg-white p-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-[13px] font-black text-slate-700" aria-hidden="true">
          {iconFor(item.type)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-black text-slate-950">{item.title}</p>
            {item.timeLabel ? <span className="shrink-0 pt-0.5 text-[11px] font-bold text-slate-400">{item.timeLabel}</span> : null}
          </div>
          <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{item.body}</p>

          {item.type === "partner_request" && !item.resolved ? (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onRespond(item.id, "decline")}
                className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => onRespond(item.id, "accept")}
                className="h-9 rounded-xl bg-slate-950 px-3 text-xs font-black text-white"
              >
                Accept
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function NotificationsList({ notifications, onRespondToRequest, onMarkAllRead }) {
  const grouped = bucketed(notifications);
  const hasItems = notifications.length > 0;
  const hasUnread = notifications.some((item) => item.unread);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-2xl shadow-slate-950/10">
      <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
        <h3 className="text-sm font-black text-slate-950">Notifications</h3>
        {hasUnread ? (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-xs font-black text-slate-600 transition hover:text-slate-950"
          >
            Mark read
          </button>
        ) : null}
      </div>

      <div className="max-h-[62vh] overflow-y-auto px-3 py-3">
        {!hasItems ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-5 text-center">
            <p className="text-sm font-black text-slate-700">Nothing new yet</p>
            <p className="mt-1 text-xs font-bold leading-5 text-slate-500">When something changes between you two, it'll show up here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {grouped.Today.length > 0 ? (
              <section>
                <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wide text-slate-500">Today</p>
                <div className="space-y-2">
                  {grouped.Today.map((item) => <NotificationRow key={item.id} item={item} onRespond={onRespondToRequest} />)}
                </div>
              </section>
            ) : null}
            {grouped.Earlier.length > 0 ? (
              <section>
                <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wide text-slate-500">Earlier</p>
                <div className="space-y-2">
                  {grouped.Earlier.map((item) => <NotificationRow key={item.id} item={item} onRespond={onRespondToRequest} />)}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
