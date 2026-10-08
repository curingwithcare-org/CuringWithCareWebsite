import { useEffect, useRef } from "react";

/**
 * Fades content up once when it scrolls into view. The only scroll effect on
 * the site. Without JavaScript, or with prefers-reduced-motion, content is
 * simply visible (see .reveal in globals.css).
 */
export default function Reveal({ children, as = "div", delay = 0, className = "", ...rest }) {
  const ref = useRef(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    // Already on screen (or above it) when mounted: show at once.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
