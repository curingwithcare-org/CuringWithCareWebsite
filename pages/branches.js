import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import { chapterStats, regionName, fetchRegions, staticRegions } from "../src/utils/chapters";
import photos from "../src/shared/photos";
import { whenIdle } from "../src/utils/idle";

const countryOf = (name) =>
  /\bUAE\b/.test(name) ? "United Arab Emirates" : /\bIndia\b/.test(name) ? "India" : /\bCanada\b/.test(name) ? "Canada" : "United States";
const countryOrder = ["United States", "Canada", "India", "United Arab Emirates"];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// The chapter list is in the repo, so the page is static. Branch photos come
// from Supabase after load and fill in when they arrive.
export async function getStaticProps() {
  return { props: { regions: staticRegions(), stats: chapterStats() } };
}

function NewBadge() {
  return <span className="rounded-full bg-care-200 px-2 py-0.5 text-xs font-semibold text-care-800">New</span>;
}

function RegionCard({ region, delay }) {
  const name = regionName(region);
  const heading = (
    <h3 className="font-display text-h3 font-semibold text-ink">
      {name}
    </h3>
  );
  return (
    <Reveal as="li" delay={delay} className="mb-6 flex break-inside-avoid flex-col overflow-hidden rounded-card bg-white shadow-card">
      {region.image && (
        <div className="relative aspect-[5/2] bg-care-100">
          <Image src={region.image} alt="" fill unoptimized sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          {region.slug ? (
            <Link href={`/branches/${region.slug}`} className="rounded-sm hover:text-care-800 hover:underline underline-offset-4">
              {heading}
            </Link>
          ) : (
            heading
          )}
          <span className="shrink-0 rounded-full bg-care-50 px-2.5 py-1 text-xs font-semibold text-care-800">
            {region.chapters.length} {region.chapters.length === 1 ? "chapter" : "chapters"}
          </span>
        </div>
        <ul className="mt-4 flex flex-1 flex-col divide-y divide-line">
          {region.chapters.map((chapter) => (
            <li key={chapter.id} className="py-3 first:pt-0 last:pb-0">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-ink">
                {chapter.school}
                {chapter.is_new && <NewBadge />}
              </p>
              <p className="text-sm text-muted">
                {chapter.state}
                {chapter.heads?.length > 0 && (
                  <>
                    <span aria-hidden="true"> · </span>
                    {chapter.heads.length === 1 ? "Chapter head" : "Chapter heads"}: {chapter.heads.join(", ")}
                  </>
                )}
                {chapter.note && <span className="block">{chapter.note}</span>}
              </p>
            </li>
          ))}
        </ul>
        {region.slug && (
          <Link href={`/branches/${region.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-[0.9375rem] font-semibold text-care-700 hover:underline underline-offset-4">
            Branch page
            <Icon name="arrow-right" size={16} />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

export default function Branches({ regions: initialRegions, stats }) {
  const [regions, setRegions] = useState(initialRegions);

  useEffect(() => {
    let cancelled = false;
    const cancelIdle = whenIdle(() => {
      fetchRegions()
        .then((rows) => !cancelled && rows.length && setRegions(rows))
        .catch((e) => console.warn("Branch photos unavailable:", e?.message || e));
    });
    return () => {
      cancelled = true;
      cancelIdle();
    };
  }, []);

  const groups = countryOrder
    .map((country) => ({ country, regions: regions.filter((r) => countryOf(regionName(r)) === country) }))
    .filter((g) => g.regions.length);

  return (
    <>
      <SiteHead
        title="Branches"
        path="/branches"
        description={`Every Curing with Care branch and school chapter: ${stats.chapters} chapters in ${stats.branches} branches across ${stats.countries} countries, with chapter heads for each school.`}
      />

      <Section tone="paper" size="tight" className="pt-12 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-care-700">Branches</p>
              <h1 className="font-display text-display mt-4 font-semibold text-ink">
                {stats.chapters} chapters. {stats.branches} branches. {stats.countries} countries.
              </h1>
              <p className="text-lead mt-6 max-w-2xl text-ink-2">
                A branch is a city or region. Each one has one or more school chapters, run by the chapter heads listed below. If
                your school is not here yet, you can start it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/start-a-branch" icon="arrow-right">
                  Start a Branch
                </Button>
                <Button href="/start-a-branch#join" variant="secondary">
                  Join a chapter
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-band lg:col-span-5">
              <Image src={photos.booth.src} alt={photos.booth.alt} fill priority fetchPriority="high" decoding="sync" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" placeholder="blur" />
            </div>
          </div>

          <nav aria-label="Countries" className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
            {groups.map((g) => (
              <a
                key={g.country}
                href={`#${slugify(g.country)}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-[0.9375rem] font-medium text-ink ring-1 ring-inset ring-line hover:bg-care-50 hover:text-care-800"
              >
                {g.country}
                <span className="text-sm text-muted">{g.regions.length}</span>
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {groups.map((g, gi) => (
        <Section key={g.country} tone={gi % 2 ? "white" : "paper"} id={slugify(g.country)} size={g.regions.length > 3 ? "default" : "tight"} className="scroll-mt-20">
          <Container>
            <SectionHeading
              eyebrow={`${g.regions.length} ${g.regions.length === 1 ? "branch" : "branches"}`}
              title={g.country}
            />
            <ul className="mt-8 gap-6 sm:columns-2 lg:columns-3">
              {g.regions.map((region, i) => (
                <RegionCard key={region.id ?? regionName(region)} region={region} delay={(i % 3) * 60} />
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <CtaBand
        photo={photos.careSign}
        title="No branch near you? Start one."
        text="Most branches began with one student and one school. We will help you find a faculty advisor, set up the club and plan your first event."
      />
    </>
  );
}
