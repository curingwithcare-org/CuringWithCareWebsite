import { useEffect, useRef, useState } from "react";

// Splits "$30k+" into { prefix: "$", number: 30, suffix: "k+" } and "28" into
// { prefix: "", number: 28, suffix: "" }. Anything without a number is left alone.
function parse(value) {
  const match = String(value).match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], number: parseFloat(match[2].replace(/,/g, "")), suffix: match[3], decimals: (match[2].split(".")[1] || "").length };
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a number up from zero the first time it scrolls into view. Keeps any
 * prefix or suffix ("$", "k+") still. Shows the final value at once under
 * prefers-reduced-motion, and screen readers always get the final value.
 */
export default function CountUp({ value, duration = 1400, className = "" }) {
  const parsed = parse(value);
  const ref = useRef(null);
  const [shown, setShown] = useState(parsed ? 0 : null);
  const [done, setDone] = useState(!parsed);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    const finish = () => {
      setShown(parsed.number);
      setDone(true);
    };
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return finish();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          setShown(parsed.number * easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
          else setDone(true);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [String(value), duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  const text = `${parsed.prefix}${(done ? parsed.number : shown).toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  })}${parsed.suffix}`;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{String(value)}</span>
    </span>
  );
}
