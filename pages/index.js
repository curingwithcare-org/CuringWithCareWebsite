import Image from "next/image";
import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import Quote from "../src/shared/components/Quote";
import CtaBand from "../src/shared/components/CtaBand";
import RecentEvents from "../src/shared/components/RecentEvents";
import { StatRow } from "../src/shared/components/Stat";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import { chapterStats, regionSlug, regionsByCountry } from "../src/utils/chapters";
import { latestEvents } from "../src/utils/events";
import photos from "../src/shared/photos";
import { site } from "../src/shared/site";

export async function getStaticProps() {
  const recent = latestEvents(3).map((e) => ({ slug: e.slug, title: e.title, branch: e.branch, branchSlug: e.branch ? regionSlug(e.branch) : null, year: e.year, photos: e.photos.slice(0, 1) }));
  return { props: { stats: chapterStats(), countries: regionsByCountry(), recent } };
}

const pillars = [
  {
    icon: "megaphone",
    title: "Awareness",
    text: "Pink Out games, club fairs and campaigns at school, so students know the signs, the risks and where to get screened.",
    photo: photos.pinkOut,
  },
  {
    icon: "microscope",
    title: "Research",
    text: "A review paper competition, hospital visits and guest speakers, plus fundraising that goes to the American Cancer Society.",
    photo: photos.hillmanTour,
  },
  {
    icon: "hand-heart",
    title: "Care",
    text: "Cards, letters, bracelets and holiday visits for patients and families being treated in the chapter's own community.",
    photo: photos.cardMaking,
  },
];

const countryShort = {
  "United States": "USA",
  Canada: "Canada",
  India: "India",
  "United Arab Emirates": "UAE",
};

export default function Home({ stats, countries, recent }) {
  const branches = countries.flatMap((group) => group.regions.map((r) => ({ ...r, country: group.country })));

  return (
    <>
      <SiteHead path="/" />

      {/* 1. Hero: full-bleed photo with the headline over it on large screens;
          photo on top, text below on phones and tablets so the letters stay whole. */}
      <section className="relative bg-care-900 text-white lg:flex lg:min-h-[max(46rem,calc(100svh-4.5rem))] lg:max-h-[54rem] lg:items-end">
        <div className="relative aspect-[4/3] lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            src={photos.hopeLetters.src}
            alt={photos.hopeLetters.alt}
            fill
            priority
            fetchPriority="high"
            quality={55}
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[50%_60%] lg:object-[50%_90%]"
          />
          <div className="absolute inset-0 hidden bg-gradient-to-t from-care-900/90 via-care-900/35 via-45% to-transparent to-80% lg:block" aria-hidden="true" />
        </div>
        <Container className="relative py-12 md:py-16 lg:pb-14 lg:pt-72">
          <p className="text-eyebrow text-care-300 lg:text-care-200">A student-run 501(c)(3) nonprofit</p>
          <h1 className="font-display text-h1 mt-4 max-w-2xl font-semibold">Cancer awareness, run by the students next door.</h1>
          <p className="text-lead mt-4 max-w-lg text-care-100 lg:text-lg">
            High schoolers start CARE chapters at their own schools, then raise awareness, support research and look after patients
            where they live. {stats.chapters} chapters so far, in {stats.countries} countries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-7">
            <Button href="/start-a-branch" variant="inverse" size="lg" icon="arrow-right">
              Start a Branch
            </Button>
            <Button href="/start-a-branch#join" variant="inverse-ghost" size="lg">
              Get involved
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Impact numbers. */}
      <Section tone="white">
        <Container>
          <Reveal>
            <StatRow
              stats={[
                { value: stats.chapters, label: "Chapters", note: "Counted from our chapter list" },
                { value: stats.countries, label: "Countries", note: stats.countryNames.join(", ") },
                { value: "900+", label: "Members", note: "Across every chapter" },
                { value: "$30k+", label: "Raised for cancer causes" },
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* 3. What we do: a split layout, not three identical cards. */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div>
                <SectionHeading
                  eyebrow="What a chapter does"
                  title="Three things, done locally."
                  lead="Every chapter picks projects that fit its school and town. They all come back to the same three ideas."
                />
                <Button href="/about" variant="secondary" className="mt-8" icon="arrow-right">
                  More about CARE
                </Button>
              </div>
            </div>
            <ul className="divide-y divide-line lg:col-span-7">
              {pillars.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 60}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 py-7 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-7 sm:py-8"
                >
                  <div className="relative aspect-square w-22 overflow-hidden rounded-card sm:w-28">
                    <Image src={p.photo.src} alt={p.photo.alt} fill sizes="112px" className="object-cover" placeholder="blur" />
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2.5 font-display text-h3 font-semibold">
                      <Icon name={p.icon} size={22} className="text-care-600" />
                      {p.title}
                    </h3>
                    <p className="mt-2 text-ink-2">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* 4. Branches: one tile per branch, equal size, grouped by country order. */}
      <Section tone="tint">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Where we are"
              title={`${stats.chapters} chapters, ${stats.branches} branches, ${stats.countries} countries.`}
              lead="Each branch is a city or region with one or more school chapters. Pick one to see its schools and chapter heads."
            />
            <Button href="/branches" variant="secondary" icon="arrow-right" className="shrink-0">
              All branches
            </Button>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {branches.map((b, i) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-eyebrow text-care-700">{countryShort[b.country] || b.country}</span>
                    {b.isNew && <span className="rounded-full bg-care-200 px-2 py-0.5 text-xs font-semibold text-care-800">New</span>}
                  </div>
                  <div className="mt-4">
                    <p className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">{b.region}</p>
                    <p className="mt-1 text-sm text-muted">
                      {b.chapterCount} {b.chapterCount === 1 ? "chapter" : "chapters"}
                    </p>
                  </div>
                </>
              );
              const tile = "flex h-full min-h-[8.5rem] flex-col justify-between rounded-card bg-white p-4 ring-1 ring-inset ring-line sm:p-5";
              return (
                <Reveal as="li" key={b.region} delay={(i % 4) * 40} className="h-full">
                  {b.slug ? (
                    <Link href={`/branches/${b.slug}`} className={`${tile} transition hover:-translate-y-0.5 hover:shadow-card hover:ring-care-400`}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={tile}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* 5. Recent events, from Supabase. */}
      <RecentEvents events={recent} />

      {/* 6. A student voice. */}
      <Section tone="white">
        <Container>
          <Reveal className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <Quote text="[TODO: real quote from a chapter head]" name="[TODO: name]" role="Chapter head, [TODO: school]" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-band md:col-span-4">
              <Image src={photos.clubFairFrame.src} alt={photos.clubFairFrame.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" placeholder="blur" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 7. What to do next. */}
      <CtaBand
        photo={photos.careLetters}
        text={`No branch near you? You can be the first. Or support the ${stats.chapters} chapters already running with a donation.`}
        secondary={{ label: "Donate", href: site.donateUrl }}
      />
    </>
  );
}
