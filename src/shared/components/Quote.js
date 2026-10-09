/**
 * A pull quote from a student. Until the team sends a real one, `text` is a
 * visible [TODO] placeholder; never invent a quote.
 */
export default function Quote({ text, name, role, className = "" }) {
  return (
    <figure className={`max-w-3xl ${className}`}>
      <blockquote className="font-display text-h2 font-medium leading-tight text-care-900">
        <span aria-hidden="true" className="text-care-400">“</span>
        {text}
        <span aria-hidden="true" className="text-care-400">”</span>
      </blockquote>
      {(name || role) && (
        <figcaption className="mt-6 text-base text-ink-2">
          {name && <span className="font-semibold text-ink">{name}</span>}
          {name && role && <span aria-hidden="true">, </span>}
          {role}
        </figcaption>
      )}
    </figure>
  );
}
