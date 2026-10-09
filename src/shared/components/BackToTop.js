import { useEffect, useState } from "react";
import Icon from "./Icon";

/**
 * Round "back to top" button, bottom-right, that appears once the page has
 * scrolled past the first screen. Hidden (and unfocusable) near the top.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus?.();
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      hidden={!visible}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-care-700 text-white shadow-card-hover transition-colors hover:bg-care-800 focus-visible:outline-white md:bottom-8 md:right-8"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <Icon name="arrow-up" size={22} strokeWidth={2} />
    </button>
  );
}
