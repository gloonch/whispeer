import { NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function NavBar() {
  const location = useLocation();
  const items = [
    { to: "/whispers", label: "Whispers", icon: "✦" },
    { to: "/timeline", label: "Timeline", icon: "◷" },
    { to: "/explore", label: "Explore", icon: "⌕" },
    { to: "/account", label: "Account", icon: "•" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-slate-200/80 bg-white shadow-[0_-10px_24px_rgba(15,23,42,0.08)]" aria-label="Primary navigation">
      <div className="grid grid-cols-4">
        {items.map((item, index) => {
          const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`) || (location.pathname === "/" && item.to === "/whispers");

          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={item.label}
              aria-label={item.label}
              className="relative flex h-16 items-center justify-center text-slate-600 transition hover:bg-slate-950/5"
            >
              {index > 0 ? <span className="absolute left-0 top-1/2 h-8 -translate-y-1/2 border-l border-slate-300/80" /> : null}
              <span className={`grid h-11 w-11 place-items-center rounded-2xl transition ${active ? "border border-purple-200 bg-purple-100 text-slate-950 shadow-lg shadow-purple-900/10" : "bg-white/55 text-slate-600"}`}>
                <Icon label={item.icon} size={26} />
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
