import { useEffect, useState } from "react";
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
import { branchSlugs, fetchRegion, regionName, staticRegion } from "../../src/utils/chapters";
import { fetchEvents } from "../../src/utils/events";
import photos from "../../src/shared/photos";
import { whenIdle } from "../../src/utils/idle";

// Known branches are prerendered from data/chapters.js. Any other slug is
// looked up in Supabase on the client, so old links behave as before.
export async function getStaticPaths() {
  return { paths: branchSlugs.map((slug) => ({ params: { slug } })), fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const region = staticRegion(params.slug);
  return {
    props: {
      slug: params.slug,
      region: region ? { region: region.region, slug: region.slug, chapters: region.chapters } : null,
    },
  };
}

function NewBadge() {
  return <span className="rounded-full bg-care-200 px-2 py-0.5 text-xs font-semibold text-care-800">New</span>;
}

export default function BranchPage({ slug, region: staticData }) {
  const [branch, setBranch] = useState(null); // Supabase row + chapters
  const [status, setStatus] = useState(staticData ? "ready" : "loading"); // loading | ready | missing | retired | error
  const [events, setEvents] = useState([]);
  const lightbox = useLightbox();

  useEffect(() => {
    let cancelled = false;
    const cancelIdle = whenIdle(async () => {
      try {
        const row = await fetchRegion(slug);
        if (cancelled) return;
        if (!row) {
          if (!staticData) setStatus("missing");
          return;
        }
        if (!row.active) {
          setStatus("retired");
          return;
        }
        setBranch(row);
        setStatus("ready");
        try {
          const all = await fetchEvents();
          if (!cancelled) setEvents(all.filter((e) => e.branch_id === row.id));
        } catch (e) {
          console.error("Branch events unavailable:", e?.message || e);
        }
      } catch (e) {
        console.error("Branch details unavailable:", e?.message || e);
        if (!cancelled && !staticData) setStatus("error");
      }
    });
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, [slug, staticData]);

  const name = branch ? regionName(branch) : staticData?.region || slug;
  const chapters = staticData?.chapters || branch?.chapters || [];
  const states = [...new Set(chapters.map((c) => c.state))];

  if (status === "loading" || status === "missing" || status === "retired" || status === "error") {
    const message = {
      loading: { title: "Loading branch", text: "One moment." },
      missing: { title: "We could not find that branch", text: "It may have moved or changed its name. Every current branch is listed on the Branches page." },
      retired: { title: `${name} is not an active branch right now`, text: "Its past events are still on the Events page. If you are at a school in this area and want to restart it, we would love to hear from you." },
      error: { title: "Branch details are unavailable", text: "Please try again in a moment, or find the branch on the Branches page." },
    }[status];
    return (
      <>
        <SiteHead title={status === "loading" ? "Branch" : "Branch not found"} path={`/branches/${slug}`} />
        <Section tone="paper" className="min-h-[60vh]">
          <Container size="narrow">
            <p className="text-eyebrow text-care-700">Branch</p>
            <h1 className="font-display text-h1 mt-4 font-semibold text-ink" aria-live="polite">{message.title}</h1>
            <p className="text-lead mt-4 text-ink-2">{message.text}</p>
            {status !== "loading" && (
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/branches" icon="arrow-right">All branches</Button>
                {status === "retired" && <Button href="/start-a-branch" variant="secondary">Start a branch</Button>}
              </div>
            )}
          </Container>
        </Section>
      </>
    );
  }

  return (
    <>
      <SiteHead
        title={`${name} branch`}
        path={`/branches/${slug}`}
        description={`Curing with Care in ${name}: ${chapters.length} school ${chapters.length === 1 ? "chapter" : "chapters"}, their chapter heads, and past events.`}
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
                {chapters.length} school {chapters.length === 1 ? "chapter" : "chapters"}
                {states.length ? ` in ${states.join(", ")}` : ""}.
                {branch?.description ? ` ${branch.description}` : ""}
              </p>
            </div>
            {branch?.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-band lg:col-span-5">
                <Image src={branch.image} alt={`${name} branch`} fill unoptimized sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Chapters" title={`Schools in ${name}`} lead="Each chapter is a club at one school, led by its chapter heads." />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter, i) => (
              <Reveal as="li" key={chapter.id} delay={(i % 3) * 60} className="rounded-card bg-paper p-5 ring-1 ring-inset ring-line">
                <h3 className="flex flex-wrap items-center gap-2 font-display text-h3 font-semibold text-ink">
                  {chapter.school}
                  {chapter.is_new && <NewBadge />}
                </h3>
                <p className="mt-1 text-sm text-muted">{chapter.state}</p>
                {chapter.heads?.length > 0 && (
                  <p className="mt-3 text-ink-2">
                    <span className="font-medium text-ink">{chapter.heads.length === 1 ? "Chapter head" : "Chapter heads"}:</span>{" "}
                    {chapter.heads.join(", ")}
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
              <Button href="/events" variant="secondary" icon="arrow-right">All past events</Button>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <li key={event.id}>
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
