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

export default function Home({ stats, countries }) {
  return (
    <>
      <SiteHead path="/" />

      {/* 1. Hero: one real photo, one headline, one primary action. */}
      <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-care-900 text-white md:min-h-[84svh]">
        <Image
          src={photos.clubRushTable.src}
          alt={photos.clubRushTable.alt}
          fill
          priority fetchPriority="high" decoding="sync"
          quality={65}
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-[55%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-care-900/95 via-care-900/55 via-35% to-transparent to-70%" aria-hidden="true" />
        <Container className="relative pb-12 pt-32 md:pb-20 md:pt-56">
          <p className="text-eyebrow text-care-200">A student-run 501(c)(3) nonprofit</p>
          <h1 className="font-display text-h1 mt-4 max-w-2xl font-semibold">
            Cancer awareness, run by the students next door.
          </h1>
          <p className="text-lead mt-5 max-w-xl text-care-100">
            High schoolers start CARE chapters at their own schools, then raise awareness, support research and look after
            patients where they live. {stats.chapters} chapters so far, in {stats.countries} countries.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
                <Reveal as="li" key={p.title} delay={i * 60} className="grid grid-cols-[5.5rem_1fr] gap-4 py-7 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-7 sm:py-8">
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

      {/* 4. Chapters by region. */}
      <Section tone="tint">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Where we are"
              title={`${stats.chapters} chapters, ${stats.branches} branches, ${stats.countries} countries.`}
              lead="Each branch is a city or region with one or more school chapters. Pick one to see its schools and chapter heads."
            />
            <Button href="/branches" variant="secondary" icon="arrow-right">
              All branches
            </Button>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {countries.map((group, gi) => (
                <Reveal key={group.country} delay={gi * 60} className={group.regions.length > 4 ? "sm:col-span-2 lg:col-span-2" : ""}>
                  <h3 className="flex items-center gap-2 text-eyebrow text-care-700">
                    <Icon name="map-pin" size={16} />
                    {group.country}
                  </h3>
                  <ul className={`mt-3 flex flex-col gap-1.5 ${group.regions.length > 4 ? "sm:grid sm:grid-cols-2 sm:gap-x-6" : ""}`}>
                    {group.regions.map((r) => {
                      const label = (
                        <>
                          <span className="font-medium">{r.region}</span>
                          <span className="shrink-0 whitespace-nowrap text-sm text-muted">
                            {r.chapterCount} {r.chapterCount === 1 ? "chapter" : "chapters"}
                            {r.isNew && <span className="ml-2 rounded-full bg-care-200 px-2 py-0.5 text-xs font-semibold text-care-800">New</span>}
                          </span>
                        </>
                      );
                      const rowClass = "flex min-h-11 flex-wrap items-baseline gap-x-2 px-2 -mx-2 text-ink";
                      return (
                        <li key={r.region}>
                          {r.slug ? (
                            <Link href={`/branches/${r.slug}`} className={`${rowClass} rounded-md hover:bg-white hover:text-care-800`}>
                              {label}
                            </Link>
                          ) : (
                            <span className={rowClass}>{label}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200} className="relative aspect-[4/5] overflow-hidden rounded-band lg:col-span-3 lg:aspect-auto">
              <Image src={photos.careSign.src} alt={photos.careSign.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" placeholder="blur" />
            </Reveal>
          </div>
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
