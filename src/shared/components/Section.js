// Page containers. Every section on the site uses these so spacing stays on
// one scale: 16/24/28 of vertical rhythm, a 72rem content column, 20px gutters
// on phones and 32px from the sm breakpoint up.

export function Container({ children, className = "", size = "default" }) {
  const width = size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return <div className={`mx-auto w-full ${width} px-5 sm:px-8 ${className}`}>{children}</div>;
}

const tones = {
  paper: "bg-paper",
  white: "bg-white",
  tint: "bg-care-50",
  dark: "bg-care-900 text-white",
};

export function Section({ children, tone = "paper", className = "", size = "default", id, as = "section", ...rest }) {
  const Tag = as;
  const padding = size === "tight" ? "py-12 md:py-16" : size === "loose" ? "py-20 md:py-28 lg:py-32" : "py-16 md:py-24";
  return (
    <Tag id={id} className={`${tones[tone] || tones.paper} ${padding} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Eyebrow + heading + optional lead. `level` sets the heading element.
 */
export function SectionHeading({ eyebrow, title, lead, level = 2, align = "left", className = "", dark = false }) {
  const Tag = `h${level}`;
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className={`text-eyebrow mb-3 ${dark ? "text-care-300" : "text-care-700"}`}>{eyebrow}</p>
      )}
      <Tag className={`font-display font-semibold text-h2 ${dark ? "text-white" : "text-ink"}`}>{title}</Tag>
      {lead && <p className={`text-lead mt-4 ${dark ? "text-care-100" : "text-ink-2"}`}>{lead}</p>}
    </div>
  );
}
