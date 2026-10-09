import Image from "next/image";
import Link from "next/link";
import SiteHead from "../../src/shared/components/SiteHead";
import Button from "../../src/shared/components/Button";
import Icon from "../../src/shared/components/Icon";
import Reveal from "../../src/shared/components/Reveal";
import CtaBand from "../../src/shared/components/CtaBand";
import EventCard from "../../src/shared/components/EventCard";
import PhotoLightbox, { useLightbox } from "../../src/shared/components/PhotoLightbox";
import { Container, Section, SectionHeading } from "../../src/shared/components/Section";
import { branchSlugs, regionBySlug } from "../../src/utils/chapters";
import { eventsForBranch } from "../../src/utils/events";
import photos from "../../src/shared/photos";

export async function getStaticPaths() {
  return { paths: branchSlugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const region = regionBySlug(params.slug);
  if (!region) return { notFound: true };
  return { props: { region, events: eventsForBranch(region.region) } };
}

function NewBadge() {
  return <span className="rounded-full bg-care-200 px-2 py-0.5 text-xs font-semibold text-care-800">New</span>;
}

export default function BranchPage({ region, events }) {
  const lightbox = useLightbox();
  const name = region.region;
  const states = [...new Set(region.chapters.map((c) => c.state))];
  const headerPhoto = events[0]?.photos[0] || null;

  return (
    <>
      <SiteHead
        title={`${name} branch`}
        path={`/branches/${region.slug}`}
        description={`Curing with Care in ${name}: ${region.chapters.length} school ${region.chapters.length === 1 ? "chapter" : "chapters"}, their chapter heads, and past events.`}
      />

      <Section tone="paper" size="tight" className="pt-10 md:pt-16">
        <Container>
          <Link href="/branches" className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-care-700 hover:underline underline-offset-4">
            <Icon name="arrow-left" size={16} />
            All branches
          </Link>
          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-care-700">Branch</p>
              <h1 className="font-display text-display mt-3 font-semibold text-ink">{name}</h1>
              <p className="text-lead mt-5 max-w-2xl text-ink-2">
                {region.chapters.length} school {region.chapters.length === 1 ? "chapter" : "chapters"}
                {states.length ? ` in ${states.join(", ")}` : ""}.{region.description ? ` ${region.description}` : ""}
              </p>
            </div>
            {headerPhoto && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-band lg:col-span-5">
                <Image src={headerPhoto.src} alt={`${events[0].title}, ${name}`} fill priority fetchPriority="high" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Chapters" title={`Schools in ${name}`} lead="Each chapter is a club at one school, led by its chapter heads." />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {region.chapters.map((chapter, i) => (
              <Reveal as="li" key={chapter.id} delay={(i % 3) * 60} className="rounded-card bg-paper p-5 ring-1 ring-inset ring-line">
                <h3 className="flex flex-wrap items-center gap-2 font-display text-h3 font-semibold text-ink">
                  {chapter.school}
                  {chapter.is_new && <NewBadge />}
                </h3>
                <p className="mt-1 text-sm text-muted">{chapter.state}</p>
                {chapter.heads.length > 0 && (
                  <p className="mt-3 text-ink-2">
                    <span className="font-medium text-ink">{chapter.heads.length === 1 ? "Chapter head" : "Chapter heads"}:</span> {chapter.heads.join(", ")}
                  </p>
                )}
                {chapter.note && <p className="mt-2 text-sm text-muted">{chapter.note}</p>}
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {events.length > 0 && (
        <Section tone="paper">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="Past events" title={`What ${name} has done`} />
              <Button href="/events" variant="secondary" icon="arrow-right">
                All past events
              </Button>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li key={event.slug}>
                  <EventCard event={event} onOpen={lightbox.show} />
                </li>
              ))}
            </ul>
          </Container>
          <PhotoLightbox {...lightbox} />
        </Section>
      )}

      <CtaBand
        photo={photos.fairTable}
        eyebrow="Join in"
        title={`At a school in ${name}?`}
        text="Join the chapter at your school, or start one if it does not exist yet. The branch will help with your first event."
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
