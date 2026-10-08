/**
 * Runs `fn` once the browser is idle (or after `timeout` ms at the latest),
 * so client-side data fetching never competes with the first paint.
 * Returns a cancel function for effect cleanup.
 */
export function whenIdle(fn, { timeout = 1200 } = {}) {
  if (typeof window === "undefined") return () => {};
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(fn, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 150);
  return () => window.clearTimeout(id);
}
