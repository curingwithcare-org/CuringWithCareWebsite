import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import CtaBand from "../src/shared/components/CtaBand";
import EventCard from "../src/shared/components/EventCard";
import PhotoLightbox, { useLightbox } from "../src/shared/components/PhotoLightbox";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import { regionName } from "../src/utils/chapters";
import { eventDate, fetchBranches, fetchEvents } from "../src/utils/events";
import photos from "../src/shared/photos";
import { whenIdle } from "../src/utils/idle";

const byNewest = (a, b) => {
  const da = eventDate(a);
  const db = eventDate(b);
  if (da && db) return db - da;
  if (da || db) return da ? -1 : 1;
  return (b.id || 0) - (a.id || 0);
};

function Skeleton() {
  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li key={i} className="overflow-hidden rounded-card bg-white shadow-card">
          <div className="aspect-[3/2] animate-pulse bg-care-100" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-care-100" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-care-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Events() {
  const router = useRouter();
  const [branches, setBranches] = useState([]);
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const lightbox = useLightbox();

  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
      try {
        const [b, e] = await Promise.all([fetchBranches(), fetchEvents()]);
        if (cancelled) return;
        setBranches(b);
        setEvents([...e].sort(byNewest));
        setStatus("ready");
      } catch (err) {
        console.warn("Events unavailable:", err?.message || err);
        if (!cancelled) setStatus("error");
      }
    });
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, [attempt]);

  const retry = () => {
    setStatus("loading");
    setAttempt((n) => n + 1);
  };

  // /events?branch=<slug> preselects a branch until the visitor picks another.
  const queryBranch = typeof router.query.branch === "string" ? branches.find((b) => b.slug === router.query.branch) : null;
  const active = selected ?? queryBranch?.id ?? "all";

  const eventsByBranch = useMemo(() => {
    const map = new Map();
    for (const event of events) {
      if (!map.has(event.branch_id)) map.set(event.branch_id, []);
      map.get(event.branch_id).push(event);
    }
    return map;
  }, [events]);

  const branchesWithEvents = branches.filter((b) => eventsByBranch.has(b.id)).sort((a, b) => regionName(a).localeCompare(regionName(b)));
  const groups = (active === "all" ? branchesWithEvents : branchesWithEvents.filter((b) => b.id === active)).map((b) => ({
    branch: b,
    events: eventsByBranch.get(b.id) || [],
  }));

  const select = (id) => {
    setSelected(id);
    const branch = branches.find((b) => b.id === id);
    router.replace({ pathname: "/events", query: branch ? { branch: branch.slug } : {} }, undefined, { shallow: true, scroll: false });
  };

  return (
    <>
      <SiteHead
        title="Past events"
        path="/events"
        description="Photos and notes from Curing with Care chapter events: Pink Out games, Relay for Life, card drives, hospital visits, fundraisers and more, by branch."
      />

      <Section tone="paper" size="tight" className="pt-12 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-care-700">Past events</p>
              <h1 className="font-display text-display mt-4 font-semibold text-ink">What chapters have done.</h1>
              <p className="text-lead mt-6 max-w-2xl text-ink-2">
                Every event here was planned and run by students: games, drives, visits, fundraisers and talks. Pick a branch to see
                its events, or scroll through all of them.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-band lg:col-span-5">
              <Image src={photos.relaySelfie.src} alt={photos.relaySelfie.alt} fill priority fetchPriority="high" decoding="sync" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" placeholder="blur" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-8 md:pt-10">
        <Container>
          {status === "ready" && branchesWithEvents.length > 0 && (
            <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8" role="group" aria-label="Filter by branch">
              <div className="flex w-max gap-2">
                {[{ id: "all", label: "All branches" }, ...branchesWithEvents.map((b) => ({ id: b.id, label: regionName(b) }))].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    aria-pressed={active === tab.id}
                    onClick={() => select(tab.id)}
                    className={`min-h-11 whitespace-nowrap rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                      active === tab.id ? "bg-care-700 text-white" : "bg-paper text-ink ring-1 ring-inset ring-line hover:bg-care-50 hover:text-care-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {status === "loading" && (
            <>
              <p className="sr-only" aria-live="polite">Loading events</p>
              <Skeleton />
            </>
          )}

          {status === "error" && (
            <div className="rounded-card bg-paper p-8 ring-1 ring-inset ring-line">
              <h2 className="font-display text-h3 font-semibold">Events are not loading right now</h2>
              <p className="mt-2 text-ink-2">Please try again in a moment. In the meantime, our Instagram has photos from recent events.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={retry}>Try again</Button>
                <Button href="https://www.instagram.com/curingwithcare/" variant="secondary" icon="arrow-up-right">
                  Instagram
                </Button>
              </div>
            </div>
          )}

          {status === "ready" && groups.length === 0 && (
            <p className="text-lead text-ink-2">No events have been posted yet.</p>
          )}

          {status === "ready" &&
            groups.map(({ branch, events: list }, gi) => (
              <section key={branch.id} className={gi === 0 ? "mt-10" : "mt-16"} aria-labelledby={`branch-${branch.id}`}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h2 id={`branch-${branch.id}`} className="font-display text-h2 font-semibold text-ink">
                    {regionName(branch)}
                  </h2>
                  <p className="shrink-0 text-sm text-muted">
                    {list.length} {list.length === 1 ? "event" : "events"}
                  </p>
                </div>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((event) => (
                    <li key={event.id}>
                      <EventCard event={event} onOpen={lightbox.show} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </Container>
        <PhotoLightbox {...lightbox} />
      </Section>

      <CtaBand
        photo={photos.daffodils}
        eyebrow="Your turn"
        title="Plan the next one."
        text="Chapters run two or three events a semester. Join the one at your school, or start a chapter and host your first."
        secondary={{ label: "Research competition", href: "/research" }}
      />
    </>
  );
}
