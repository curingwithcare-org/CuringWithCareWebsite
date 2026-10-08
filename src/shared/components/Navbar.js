import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "./Button";
import Icon from "./Icon";
import { navItems, site } from "../site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Shadow once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  // Escape closes; lock page scroll while open; move focus into the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) => router.pathname === href || router.pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
        scrolled || open ? "shadow-[0_1px_0_0_var(--color-line),0_6px_20px_-12px_rgb(23_26_20/0.25)]" : "shadow-[0_1px_0_0_var(--color-line)]"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 md:h-[4.5rem]">
        <Link href="/" className="flex min-h-11 items-center gap-3 rounded-md" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={40} height={40} priority className="h-10 w-10 rounded-md" />
          <span className="font-display text-xl font-semibold tracking-tight text-care-900">{site.wordmark}</span>
          <span className="sr-only">Home</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                isActive(item.href) ? "bg-care-50 text-care-800" : "text-ink-2 hover:bg-paper-2 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {site.blogEnabled && (
            <a href={site.blogUrl} className="rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-ink-2 hover:bg-paper-2 hover:text-ink">
              Blog
            </a>
          )}
          <Button href="/start-a-branch" className="ml-3">
            Start a Branch
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-paper-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "x" : "menu"} size={24} />
        </button>
      </nav>

      {/* Mobile menu: a solid panel under the bar. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-white md:hidden"
      >
        <ul className="px-3 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex min-h-12 items-center rounded-md px-3 text-lg font-medium ${
                  isActive(item.href) ? "bg-care-50 text-care-800" : "text-ink hover:bg-paper-2"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {site.blogEnabled && (
            <li>
              <a href={site.blogUrl} className="flex min-h-12 items-center rounded-md px-3 text-lg font-medium text-ink hover:bg-paper-2">
                Blog
              </a>
            </li>
          )}
        </ul>
        <div className="flex flex-col gap-3 border-t border-line px-6 py-5">
          <Button href="/start-a-branch" size="lg" onClick={() => setOpen(false)}>
            Start a Branch
          </Button>
          <Button href={site.donateUrl} variant="secondary" size="lg">
            Donate
          </Button>
        </div>
      </div>
    </header>
  );
}
