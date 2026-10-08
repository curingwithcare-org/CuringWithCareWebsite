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
import { chapterStats, regionsByCountry } from "../src/utils/chapters";
import photos from "../src/shared/photos";
import { site } from "../src/shared/site";

export async function getStaticProps() {
  return { props: { stats: chapterStats(), countries: regionsByCountry() } };
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

export default function Home({ stats, countries }) {
  const branches = countries.flatMap((group) => group.regions.map((r) => ({ ...r, country: group.country })));

  return (
    <>
      <SiteHead path="/" />

      {/* 1. Hero: a split band so the photo stays whole. Photo first on phones. */}
      <section className="bg-care-900 text-white">
        <div className="mx-auto grid max-w-[96rem] lg:grid-cols-12">
          <div className="relative order-1 aspect-[4/3] lg:order-2 lg:col-span-7 lg:aspect-auto lg:min-h-[30rem]">
            <Image
              src={photos.hopeLetters.src}
              alt={photos.hopeLetters.alt}
              fill
              priority
              fetchPriority="high"
              decoding="async"
              quality={55}
              sizes="(min-width: 1024px) 58vw, 100vw"
              placeholder="blur"
              className="object-cover object-[50%_60%]"
            />
          </div>
          <div className="order-2 flex items-center px-5 py-12 sm:px-8 md:py-16 lg:order-1 lg:col-span-5 lg:py-10 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pr-12">
            <div className="max-w-xl">
              <p className="text-eyebrow text-care-300">A student-run 501(c)(3) nonprofit</p>
              <h1 className="font-display text-h1 mt-4 font-semibold">Cancer awareness, run by the students next door.</h1>
              <p className="text-lead mt-5 text-care-100">
                High schoolers start CARE chapters at their own schools, then raise awareness, support research and look after patients
                where they live. {stats.chapters} chapters so far, in {stats.countries} countries.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/start-a-branch" variant="inverse" size="lg" icon="arrow-right">
                  Start a Branch
                </Button>
                <Button href="/start-a-branch#join" variant="inverse-ghost" size="lg">
                  Get involved
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact numbers. */}
      <Section tone="white">
        <Container>
          <Reveal>
            <StatRow
              stats={[
                { value: stats.chapters, label: "Chapters", note: "Counted from our chapter list" },
                { value: stats.countries, label: "Countries", note: stats.countryNames.join(", ") },
                { value: "900+", label: "Members", note: "[TODO: confirm current count]" },
                { value: "$30k+", label: "Raised for cancer causes", note: "[TODO: confirm current total]" },
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
              <div className="lg:sticky lg:top-28">
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
      <RecentEvents />

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
