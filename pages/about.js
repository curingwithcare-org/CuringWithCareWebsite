import Image from "next/image";
import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import { StatRow } from "../src/shared/components/Stat";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import { chapterStats } from "../src/utils/chapters";
import photos from "../src/shared/photos";

export async function getStaticProps() {
  return { props: { stats: chapterStats() } };
}

const pillars = [
  {
    eyebrow: "Awareness",
    title: "Know the signs, know where to go.",
    text: "Chapters run Pink Out games, club-fair tables and school campaigns that explain the signs, risk factors and screening options for common cancers. Where people near them lack access to treatment, chapters say so and point to the help that exists.",
    photo: photos.pinkOutGreen,
  },
  {
    eyebrow: "Research",
    title: "Students reading, writing and funding the science.",
    text: "CARE runs a review paper competition where high schoolers write about a cancer topic and get judged on it. Chapters visit cancer centers, invite researchers and clinicians to speak, and raise money that goes to the American Cancer Society.",
    photo: photos.hillmanStaff,
    link: { label: "The research competition", href: "/research" },
  },
  {
    eyebrow: "Care",
    title: "Small things, for people in treatment nearby.",
    text: "Cards, letters, bracelets, flower deliveries and holiday visits for patients and families at local hospitals. It is the part of CARE that members tend to remember most.",
    photo: photos.letters,
  },
];

const structure = [
  {
    icon: "users",
    title: "The board",
    text: "A national board of students runs the organization: chapters, events, research, finance, technology and outreach.",
    link: { label: "Meet the team", href: "/team" },
  },
  {
    icon: "map-pin",
    title: "Branches",
    text: "A branch is a city or region. It coordinates the chapters near it and hosts joint events like Relay for Life teams and hospital visits.",
    link: { label: "See every branch", href: "/branches" },
  },
  {
    icon: "graduation-cap",
    title: "Chapters",
    text: "A chapter is a club at one school, led by one or more chapter heads. Chapters pick the projects that fit their school and town.",
    link: { label: "Start one", href: "/start-a-branch" },
  },
];

export default function About({ stats }) {
  return (
    <>
      <SiteHead
        title="About"
        path="/about"
        description="Curing with Care is a student-run 501(c)(3) nonprofit. Learn what our chapters do for cancer awareness, research and patient care, and how the organization is set up."
      />

      {/* Opener: text first, then a full-width photo band. */}
      <Section tone="paper" size="tight" className="pt-12 md:pt-20">
        <Container>
          <p className="text-eyebrow text-care-700">About CARE</p>
          <h1 className="font-display text-display mt-4 max-w-4xl font-semibold text-ink">
            A nonprofit run by high schoolers, for the people around them.
          </h1>
          <p className="text-lead mt-6 max-w-2xl text-ink-2">
            Curing with Care is a 501(c)(3) nonprofit made of student chapters. Each chapter is a club at one school. Together they
            raise awareness about cancer, support the research that treats it, and look after patients in their own towns.
          </p>
        </Container>
      </Section>
      <Container size="wide" className="pb-6 md:pb-10">
        <figure>
          <div className="relative aspect-[16/9] overflow-hidden rounded-band md:aspect-[21/9]">
            <Image src={photos.hopeLetters.src} alt={photos.hopeLetters.alt} fill priority fetchPriority="high" decoding="sync" sizes="100vw" className="object-cover object-[50%_75%]" placeholder="blur" />
          </div>
          <figcaption className="mt-3 text-sm text-muted">Members under the HOPE letters at a Relay for Life.</figcaption>
        </figure>
      </Container>

      {/* Mission: CARE's own statement, carried over from the old About page. */}
      <Section tone="paper" size="tight">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionHeading eyebrow="Our mission" title="Rewriting the narrative." />
            </div>
            <div className="md:col-span-8 md:pt-2">
              <p className="text-lead text-ink">
                Rewriting the narrative to foster hope, resilience, and triumph in the face of cancer.
              </p>
              <p className="mt-4 text-ink-2">
                Cancer is a mutation-driven disease, leading to the possibility of traveling infinite different paths from start to
                finish. Originated from cells and capable of influencing the entire body, the rapid expansion leads to missed or
                complicated diagnoses that harm patients. Although cancer is essentially simple, we still misunderstand the true
                actions that get cancer going. The complexity of each individual tumor, although pushing new forms of treatment, brings
                about astonishing space to recourse and address. At CARE, we introduce and expand on the questions behind its life and
                the patients affected by it.
              </p>
              <p className="mt-4 text-ink-2">
                Today there are {stats.chapters} chapters in {stats.branches} branches across {stats.countryNames.length} countries:{" "}
                {stats.countryNames.join(", ")}. {stats.newChapters} of them started this school year.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* The three pillars as alternating split rows. */}
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Awareness, research, care" title="What the three words mean in practice." />
          <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
            {pillars.map((p, i) => (
              <Reveal key={p.eyebrow} className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-band">
                  <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" placeholder="blur" />
                </div>
                <div>
                  <p className="text-eyebrow text-care-700">{p.eyebrow}</p>
                  <h3 className="font-display text-h2 mt-3 font-semibold text-ink">{p.title}</h3>
                  <p className="mt-4 text-lg text-ink-2">{p.text}</p>
                  {p.link && (
                    <Link href={p.link.href} className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-care-700 hover:underline underline-offset-4">
                      {p.link.label}
                      <Icon name="arrow-right" size={18} />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Numbers. */}
      <Section tone="tint">
        <Container>
          <SectionHeading eyebrow="By the numbers" title="Where CARE stands today." />
          <Reveal className="mt-10">
            <StatRow
              stats={[
                { value: stats.chapters, label: "Chapters", note: `${stats.newChapters} new this year` },
                { value: stats.branches, label: "Branches" },
                { value: stats.members, label: "Members", note: "Across every chapter" },
                { value: stats.raised, label: "Raised for cancer causes" },
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      {/* How it is organized. */}
      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="How CARE is set up" title="Board, branches, chapters." lead="Three layers, all run by students." />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-band bg-line sm:grid-cols-3">
            {structure.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="flex flex-col bg-white p-6 md:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-care-100 text-care-700">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="font-display text-h3 mt-5 font-semibold">
                  <span className="mr-2 text-care-700">{i + 1}.</span>
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-ink-2">{s.text}</p>
                <Link href={s.link.href} className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-care-700 hover:underline underline-offset-4">
                  {s.link.label}
                  <Icon name="arrow-right" size={18} />
                </Link>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-ink-2">
            CARE is registered as a 501(c)(3) nonprofit. Donations are handled through Zeffy, which passes 100% of the gift to the organization.{" "}
            <Link href="/contact" className="font-semibold text-care-700 underline-offset-4 hover:underline">
              Questions? Contact us.
            </Link>
          </p>
        </Container>
      </Section>

      <CtaBand
        photo={photos.clubRushBoard}
        eyebrow="Be part of it"
        title="Start a chapter, or join the one at your school."
        text="New chapters get a starter kit and a branch to plug into. Existing chapters are always looking for members."
        secondary={{ label: "Meet the team", href: "/team" }}
      />
    </>
  );
}
