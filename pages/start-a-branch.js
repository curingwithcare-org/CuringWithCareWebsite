import Image from "next/image";
import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import { chapterStats } from "../src/utils/chapters";
import photos from "../src/shared/photos";
import { site } from "../src/shared/site";

export async function getStaticProps() {
  return { props: { stats: chapterStats() } };
}

const steps = [
  {
    title: "Tell us about your school",
    text: "Fill in the short form: your name, school, city and why you want a chapter. One person is enough to start.",
  },
  {
    title: "Talk with the chapters team",
    text: "A board member gets back to you, answers questions and connects you with the nearest branch, or helps you start a new one.",
  },
  {
    title: "Set up the club",
    text: "Register the club with your school and find a faculty advisor. [TODO: confirm what CARE provides here, such as a starter kit, templates or a constitution.]",
  },
  {
    title: "Run your first event",
    text: "Most chapters start with something simple: a card drive for a local hospital, a club-fair table or a Pink Out game.",
  },
];

const ideas = [
  { title: "Pink Out game", text: "Partner with a sports team for one home game: ribbons, a banner and a short message at halftime.", photo: photos.pinkOut },
  { title: "Cards and letters", text: "A lunch-period table where people write cards for patients at a nearby cancer center.", photo: photos.letters },
  { title: "Flower or bracelet sale", text: "A small fundraiser whose proceeds go to the American Cancer Society.", photo: photos.daffodils },
  { title: "Relay for Life team", text: "Join your area's Relay with a CARE team, with the branch's other chapters.", photo: photos.relayCouch },
];

const faqs = [
  {
    q: "Do I need research or medical experience?",
    a: "No. Chapters are about awareness and care first. If you want to go deeper, the research competition is there for you.",
  },
  {
    q: "My school already has a chapter. What do I do?",
    a: "Join it. Every chapter and its chapter heads are listed on the Branches page.",
    link: { label: "Find your school", href: "/branches" },
  },
  {
    q: "Can I start a chapter outside the United States?",
    a: "Yes. There are chapters in Canada, India and the United Arab Emirates, and we are glad to add more.",
  },
  {
    q: "Does it cost anything?",
    a: "[TODO: confirm whether there are any dues or costs for a new chapter.]",
  },
  {
    q: "Who do I talk to?",
    a: `Email ${site.email} or use the form above. A board member will reply.`,
  },
];

export default function StartABranch({ stats }) {
  return (
    <>
      <SiteHead
        title="Start a Branch"
        path="/start-a-branch"
        description={`Start a Curing with Care chapter at your high school. ${stats.chapters} students have already done it in ${stats.countries} countries. Here is what it takes and how to apply.`}
      />

      <section className="bg-paper">
        <Container className="grid gap-10 pb-16 pt-12 lg:grid-cols-12 lg:items-center md:pt-20 md:pb-24">
          <div className="lg:col-span-6">
            <p className="text-eyebrow text-care-700">Start a Branch</p>
            <h1 className="font-display text-display mt-4 font-semibold text-ink">Start a CARE chapter at your school.</h1>
            <p className="text-lead mt-6 max-w-xl text-ink-2">
              {stats.chapters} chapters began the same way: one student who wanted to do something about cancer where they live. You need
              a school, a faculty advisor and a couple of friends. We handle the rest with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.startBranchFormUrl} size="lg" icon="arrow-up-right">
                Apply to start a chapter
              </Button>
              <Button href="#join" variant="secondary" size="lg">
                Join an existing one
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">The application is a short Google Form. No commitment yet.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-band lg:col-span-6">
            <Image src={photos.clubRushBoard.src} alt={photos.clubRushBoard.alt} fill priority fetchPriority="high" decoding="sync" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" placeholder="blur" />
          </div>
        </Container>
      </section>

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <SectionHeading eyebrow="How it works" title="Four steps, usually a few weeks." />
              </div>
            </div>
            <ol className="lg:col-span-8 divide-y divide-line">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 60} className="grid gap-4 py-7 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_1fr]">
                  <span className="font-display text-stat font-semibold leading-none text-care-600" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-h3 font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-ink-2">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container>
          <SectionHeading eyebrow="What you'd actually do" title="A year in a chapter looks like this." lead="Real events chapters have run. Pick two or three for your first year." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ideas.map((idea, i) => (
              <Reveal as="li" key={idea.title} delay={i * 60} className="overflow-hidden rounded-card bg-white shadow-card">
                <div className="relative aspect-[4/3]">
                  <Image src={idea.photo.src} alt={idea.photo.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" placeholder="blur" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-h3 font-semibold text-ink">{idea.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-ink-2">{idea.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/events" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-care-700 hover:underline underline-offset-4">
              See what every branch has done
              <Icon name="arrow-right" size={18} />
            </Link>
          </p>
        </Container>
      </Section>

      <Section tone="paper" id="join" className="scroll-mt-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "graduation-cap",
                title: "Join your school's chapter",
                text: "If your school is on the Branches page, find the chapter heads and ask to join. Chapters are always looking for members.",
                cta: { label: "Find your school", href: "/branches" },
              },
              {
                icon: "map-pin",
                title: "Start a new chapter",
                text: "No chapter at your school? Apply and we will connect you with the nearest branch.",
                cta: { label: "Apply", href: site.startBranchFormUrl, external: true },
              },
              {
                icon: "heart",
                title: "Support the work",
                text: "Not a student? Donations go through Zeffy, which passes on 100% of each gift. Teachers and parents can also help a chapter get started.",
                cta: { label: "Donate", href: site.donateUrl, external: true },
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="flex flex-col rounded-card bg-white p-6 shadow-card md:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-care-100 text-care-700">
                  <Icon name={item.icon} size={22} />
                </span>
                <h2 className="font-display text-h3 mt-5 font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 flex-1 text-ink-2">{item.text}</p>
                <Button href={item.cta.href} variant={i === 1 ? "primary" : "secondary"} className="mt-6 self-start" icon={item.cta.external ? "arrow-up-right" : "arrow-right"}>
                  {item.cta.label}
                </Button>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="narrow">
          <SectionHeading eyebrow="Questions" title="Things people ask before they start." />
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold">{f.q}</h3>
                  <Icon name="chevron-down" size={20} className="shrink-0 text-care-700 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pb-4 text-ink-2">
                  {f.a}
                  {f.link && (
                    <>
                      {" "}
                      <Link href={f.link.href} className="font-semibold text-care-700 underline-offset-4 hover:underline">
                        {f.link.label}
                      </Link>
                      .
                    </>
                  )}
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-care-900 text-white">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-eyebrow text-care-300">Ready?</p>
            <h2 className="font-display text-h1 mt-3 font-semibold">Be chapter number {stats.chapters + 1}.</h2>
            <p className="text-lead mt-4 max-w-xl text-care-100">The form takes about five minutes. We reply within [TODO: typical reply time].</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.startBranchFormUrl} variant="inverse" size="lg" icon="arrow-up-right">
                Apply to start a chapter
              </Button>
              <Button href="/contact" variant="inverse-ghost" size="lg">
                Ask a question first
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
