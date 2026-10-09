import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import SiteHead from "../src/shared/components/SiteHead";
import CtaBand from "../src/shared/components/CtaBand";
import EventCard from "../src/shared/components/EventCard";
import PhotoLightbox, { useLightbox } from "../src/shared/components/PhotoLightbox";
import { Container, Section } from "../src/shared/components/Section";
import { allEvents, eventFilters } from "../src/utils/events";
import photos from "../src/shared/photos";

export async function getStaticProps() {
  return { props: { events: allEvents(), filters: eventFilters() } };
}

export default function Events({ events, filters }) {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const lightbox = useLightbox();

  // /events?branch=<slug> preselects a filter until the visitor picks another.
  const fromQuery = typeof router.query.branch === "string" ? filters.find((f) => f.slug === router.query.branch) : null;
  const active = selected ?? fromQuery?.slug ?? "all";

  // Jump to a specific event when the URL has its slug as the hash.
  useEffect(() => {
    if (!router.isReady || !window.location.hash) return;
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" });
  }, [router.isReady, active]);

  const groups = filters
    .filter((f) => active === "all" || f.slug === active)
    .map((f) => ({ filter: f, events: events.filter((e) => e.branch === f.name) }))
    .filter((g) => g.events.length);

  const select = (slug) => {
    setSelected(slug);
    router.replace({ pathname: "/events", query: slug === "all" ? {} : { branch: slug } }, undefined, { shallow: true, scroll: false });
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
              <Image src={photos.relaySelfie.src} alt={photos.relaySelfie.alt} fill priority fetchPriority="high" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" placeholder="blur" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pt-8 md:pt-10">
        <Container>
          <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8" role="group" aria-label="Filter by branch">
            <div className="flex w-max gap-2">
              {[{ slug: "all", label: "All branches" }, ...filters].map((tab) => (
                <button
                  key={tab.slug}
                  type="button"
                  aria-pressed={active === tab.slug}
                  onClick={() => select(tab.slug)}
                  className={`min-h-11 whitespace-nowrap rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                    active === tab.slug ? "bg-care-700 text-white" : "bg-paper text-ink ring-1 ring-inset ring-line hover:bg-care-50 hover:text-care-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {groups.length === 0 && <p className="mt-10 text-lead text-ink-2">No events have been posted for this branch yet.</p>}

          {groups.map(({ filter, events: list }, gi) => (
            <section key={filter.slug} className={gi === 0 ? "mt-10" : "mt-16"} aria-labelledby={`branch-${filter.slug}`}>
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 id={`branch-${filter.slug}`} className="font-display text-h2 font-semibold text-ink">
                  {filter.label}
                </h2>
                <p className="shrink-0 text-sm text-muted">
                  {list.length} {list.length === 1 ? "event" : "events"}
                </p>
              </div>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((event) => (
                  <li key={event.slug} id={event.slug} className="scroll-mt-24">
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
