const notifications = [
  {
    id: "n1",
    title: "Neda added a whisper",
    body: "Tea & Talk was added to today's shared rituals.",
  },
  {
    id: "n2",
    title: "Partner request",
    body: "@luna.carter wants to become your partner.",
  },
];

export default function NotificationsList() {
  return (
    <div className="grid gap-3 rounded-[1.75rem] border border-dashed border-purple-300 bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 p-3 sm:rounded-3xl sm:p-4 sm:grid-cols-[1fr_120px_auto]">
      <div className="divide-y divide-slate-200/70 overflow-hidden rounded-2xl border border-white/80 bg-white/85 sm:col-span-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="px-4 py-3">
            <p className="text-sm font-black text-slate-950">{notification.title}</p>
            <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{notification.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
