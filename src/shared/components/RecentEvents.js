import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Reveal from "./Reveal";
import { Container, Section, SectionHeading } from "./Section";
import { fetchBranches, fetchEvents, listEventImages } from "../../utils/events";
import { regionName } from "../../utils/chapters";
import photos from "../photos";
import { whenIdle } from "../../utils/idle";

// Shown while Supabase answers, and if it never does. These are real CARE
// events from the photo library, so the section is never empty.
const fallback = [
  { title: "Pink Out game", place: "Pittsburgh, PA", photo: photos.pinkOut },
  { title: "Cards for patients", place: "Pittsburgh, PA", photo: photos.cardMaking },
  { title: "Relay for Life", place: "Pittsburgh, PA", photo: photos.relayCouch },
];

function EventCard({ title, place, photo, image, delay }) {
  return (
    <Reveal as="li" delay={delay} className="group overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link href="/events" className="block">
        <div className="relative aspect-[4/3] bg-care-100">
          {photo ? (
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" placeholder="blur" />
          ) : image ? (
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          ) : null}
        </div>
        <div className="p-5">
          {place && <p className="text-eyebrow text-care-700">{place}</p>}
          <h3 className="font-display text-h3 mt-2 font-semibold text-ink group-hover:underline underline-offset-4">{title}</h3>
        </div>
      </Link>
    </Reveal>
  );
}

/**
 * The latest three events from Supabase (newest rows first), each with its
 * first photo. Falls back to three real events from the photo library.
 */
export default function RecentEvents() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
      try {
        const [rows, branches] = await Promise.all([fetchEvents({ limit: 3 }), fetchBranches()]);
        const byId = new Map(branches.map((b) => [b.id, b]));
        const withImages = await Promise.all(
          rows.map(async (row) => {
            let image = null;
            try {
              image = (await listEventImages(row.images_folder, { limit: 1 }))[0]?.url || null;
            } catch {
              image = null;
            }
            const branch = byId.get(row.branch_id);
            return { id: row.id, title: row.title, place: branch ? regionName(branch) : null, image };
          })
        );
        if (!cancelled && withImages.length) setEvents(withImages);
      } catch (e) {
        console.warn("Recent events unavailable:", e?.message || e);
      }
    });
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  const items = events || fallback;

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
          {items.map((item, i) => (
            <EventCard key={item.id || item.title} {...item} delay={i * 80} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
