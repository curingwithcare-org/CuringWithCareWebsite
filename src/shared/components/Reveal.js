import { useEffect, useRef } from "react";

// One IntersectionObserver for every Reveal on the page. Elements start
// hidden only when the inline script in _document has added `js` to <html>,
// so nothing is ever hidden without JavaScript, and the callback only writes
// classes (no layout reads), so it stays cheap during hydration.
let observer = null;
function observe(el) {
  if (typeof IntersectionObserver === "undefined") {
    el.classList.add("is-visible");
    return () => {};
  }
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );
  }
  observer.observe(el);
  return () => observer.unobserve(el);
}

/**
 * Fades content up once as it scrolls into view. The only scroll effect on
 * the site. Off under prefers-reduced-motion (see .reveal in globals.css).
 */
export default function Reveal({ children, as = "div", delay = 0, className = "", ...rest }) {
  const ref = useRef(null);
  const Tag = as;

  useEffect(() => observe(ref.current), []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
