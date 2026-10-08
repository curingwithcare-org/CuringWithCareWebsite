import Image from "next/image";
import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import photos from "../src/shared/photos";

const editions = [
  {
    eyebrow: "First edition",
    title: "Cervical cancer: obstacles, ethics and new research.",
    text: "Ten papers on the barriers to eliminating cervical cancer, the ethics of access to prevention and care, and the research that could change early detection and treatment. First place went to Angela Choi.",
    href: "/research-competition",
    cta: "Read the winning paper",
    photo: photos.hillmanStaff,
  },
  {
    eyebrow: "Second edition",
    title: "Four prompts on treatment, ethics, research and risk.",
    text: "Teams of one to three students chose one of four prompts, from the ethics of treatment availability to the risk factors and disparities behind who gets cancer. Ten placements were awarded; first place went to Anna Chen and Sanai Purkait.",
    href: "/research-competition-2",
    cta: "See the placements",
    photo: photos.speakerEvent,
  },
];

export default function Research() {
  return (
    <>
      <SiteHead
        title="Research"
        path="/research"
        description="CARE's review paper competition asks high school students to research and write about cancer. Read the winning papers and see what the next edition looks like."
      />

      <Section tone="paper" size="tight" className="pt-12 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-care-700">Research</p>
              <h1 className="font-display text-display mt-4 font-semibold text-ink">Students writing about cancer, and being judged on it.</h1>
              <p className="text-lead mt-6 max-w-2xl text-ink-2">
                The CARE Review Paper Competition gives high schoolers a real prompt, a deadline and a panel. Two editions so far, with the
                winning papers published here.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-band lg:col-span-5">
              <Image src={photos.hillmanTour.src} alt={photos.hillmanTour.alt} fill priority fetchPriority="high" decoding="sync" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" placeholder="blur" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="Review paper competition" title="Two editions, published in full." />
          <div className="mt-10 space-y-10">
            {editions.map((e, i) => (
              <Reveal key={e.href} className={`grid items-center gap-8 rounded-band bg-paper p-6 ring-1 ring-inset ring-line md:grid-cols-12 md:p-8 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-card md:col-span-5">
                  <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" placeholder="blur" />
                </div>
                <div className="md:col-span-7">
                  <p className="text-eyebrow text-care-700">{e.eyebrow}</p>
                  <h3 className="font-display text-h2 mt-3 font-semibold text-ink">{e.title}</h3>
                  <p className="mt-4 text-ink-2">{e.text}</p>
                  <Button href={e.href} className="mt-6" icon="arrow-right">
                    {e.cta}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionHeading eyebrow="How it works" title="Pick a prompt. Write. Submit." lead="Open to high school students anywhere. No prior research experience needed." />
            </div>
            <ol className="md:col-span-7 space-y-6">
              {[
                ["Choose a prompt", "Each edition publishes two to four prompts on a cancer topic. You pick one."],
                ["Write a review paper", "A review paper summarizes and weighs existing research. Teams of up to three are welcome."],
                ["Get judged and placed", "Papers are read by a CARE panel. Winners are announced on this site and the first-place paper is published."],
              ].map(([title, text], i) => (
                <Reveal as="li" key={title} delay={i * 80} className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white font-display text-xl font-semibold text-care-700 ring-1 ring-inset ring-care-200">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-h3 font-semibold">{title}</h3>
                    <p className="mt-1 text-ink-2">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="mt-10 rounded-card bg-white p-6 ring-1 ring-inset ring-care-200 md:p-8">
            <p className="text-eyebrow text-care-700">Next edition</p>
            <p className="mt-2 text-lg text-ink">[TODO: dates, prompts and submission link for the third edition.]</p>
            <p className="mt-2 text-ink-2">
              Until then, questions about the competition go to{" "}
              <Link href="/contact" className="font-semibold text-care-700 underline-offset-4 hover:underline">
                the contact page
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" size="tight">
        <Container>
          <Link
            href="/caac"
            className="group flex flex-col gap-4 rounded-card bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between md:p-8"
          >
            <div>
              <p className="text-eyebrow text-care-700">Archive · 2025</p>
              <h2 className="font-display text-h3 mt-2 font-semibold text-ink group-hover:underline underline-offset-4">
                Cancer Awareness &amp; Action Challenge, with the High School Health Research Forum
              </h2>
              <p className="mt-2 text-ink-2">A solutions challenge for high schoolers on cancer prevention, access to care, education and policy.</p>
            </div>
            <Icon name="arrow-right" size={24} className="shrink-0 text-care-700 transition-transform group-hover:translate-x-1" />
          </Link>
        </Container>
      </Section>

      <CtaBand
        photo={photos.cardMaking}
        eyebrow="Beyond the paper"
        title="Research is one of three things a chapter does."
        text="Chapters also visit cancer centers, host researchers and clinicians, and raise money for the American Cancer Society."
        secondary={{ label: "What chapters do", href: "/about" }}
      />
    </>
  );
}
