import Icon from "./Icon.jsx";

export default function SectionTitle({ iconLabel, title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <Icon label={iconLabel} size={23} className="text-slate-950" />
          <h2 className="text-xl font-black tracking-tight text-slate-950">{title}</h2>
        </div>
        {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
