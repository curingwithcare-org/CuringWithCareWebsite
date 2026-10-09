import CountUp from "./CountUp";

/**
 * Big honest numbers with room around them. `note` is small print under the
 * label, for sources or "[TODO: confirm]" flags.
 */
export function Stat({ value, label, note, dark = false, className = "" }) {
  return (
    <div className={className}>
      <p className={`font-display font-semibold text-stat ${dark ? "text-white" : "text-care-800"}`}>
        <CountUp value={value} />
      </p>
      <p className={`mt-2 text-base font-medium sm:mt-3 sm:text-lg ${dark ? "text-care-100" : "text-ink"}`}>{label}</p>
      {note && <p className={`mt-1 text-xs sm:text-sm ${dark ? "text-care-300" : "text-muted"}`}>{note}</p>}
    </div>
  );
}

export function StatRow({ stats, dark = false, columns = 4 }) {
  const cols = { 2: "grid-cols-2", 3: "grid-cols-2 sm:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }[columns] || "grid-cols-2 lg:grid-cols-4";
  return (
    <ul className={`grid gap-x-5 gap-y-8 ${cols} md:gap-8`}>
      {stats.map((s) => (
        <li key={s.label} className={`border-t pt-4 sm:pt-6 ${dark ? "border-care-700" : "border-care-200"}`}>
          <Stat value={s.value} label={s.label} note={s.note} dark={dark} />
        </li>
      ))}
    </ul>
  );
}
