/**
 * A big honest number with room around it. `note` is small print under the
 * label, for sources or "[TODO: confirm]" flags.
 */
export function Stat({ value, label, note, dark = false, className = "" }) {
  return (
    <div className={className}>
      <p className={`font-display font-semibold text-stat ${dark ? "text-white" : "text-care-800"}`}>{value}</p>
      <p className={`mt-3 text-lg font-medium ${dark ? "text-care-100" : "text-ink"}`}>{label}</p>
      {note && <p className={`mt-1 text-sm ${dark ? "text-care-300" : "text-muted"}`}>{note}</p>}
    </div>
  );
}

export function StatRow({ stats, dark = false, columns = 4 }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns] || "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <dl className={`grid grid-cols-1 gap-10 ${cols} md:gap-8`}>
      {stats.map((s) => (
        <div key={s.label} className={`border-t pt-6 ${dark ? "border-care-700" : "border-care-200"}`}>
          <dd className={`font-display font-semibold text-stat ${dark ? "text-white" : "text-care-800"}`}>{s.value}</dd>
          <dt className={`mt-3 text-lg font-medium ${dark ? "text-care-100" : "text-ink"}`}>{s.label}</dt>
          {s.note && <p className={`mt-1 text-sm ${dark ? "text-care-300" : "text-muted"}`}>{s.note}</p>}
        </div>
      ))}
    </dl>
  );
}
