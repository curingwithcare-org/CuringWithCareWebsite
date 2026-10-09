import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Reveal from "./Reveal";
import { Container, Section, SectionHeading } from "./Section";

/** The latest events from data/events.js, passed in from getStaticProps. */
export default function RecentEvents({ events }) {
  if (!events?.length) return null;
  return (
    <Section tone="paper">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Recent events" title="What chapters have been up to" />
          <Button href="/events" variant="secondary" icon="arrow-right">
            All past events
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => {
            const photo = event.photos[0];
            const meta = [event.branch, event.year].filter(Boolean).join(" · ");
            return (
              <Reveal as="li" key={event.slug} delay={i * 80} className="group overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-card-hover">
                <Link href={`/events?branch=${encodeURIComponent(event.branchSlug || "all-chapters")}#${event.slug}`} className="block">
                  <div className="relative aspect-[4/3] bg-care-100">
                    {photo && <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />}
                  </div>
                  <div className="p-5">
                    {meta && <p className="text-eyebrow text-care-700">{meta}</p>}
                    <h3 className="font-display text-h3 mt-2 font-semibold text-ink group-hover:underline underline-offset-4">{event.title}</h3>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
