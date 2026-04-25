export default function Icon({ label, size = 18, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-black leading-none ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(11, Math.floor(size * 0.72)) }}
    >
      {label}
    </span>
  );
}
