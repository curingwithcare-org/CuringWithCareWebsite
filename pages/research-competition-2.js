import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import photos from "../src/shared/photos";

const prompts = [
  "The moral issues surrounding the availability of treatment and the new technologies developed.",
  "The present treatment modalities, their effectiveness, and their drawbacks.",
  "The future of research that can enhance detection, prevention, and treatment.",
  "The risk factors, the disparities in the affected population, and the impact on society.",
];

const placements = [
  { place: "1st", authors: "Anna Chen and Sanai Purkait" },
  { place: "2nd", authors: "Rishabh Patel, Akshajan Nadanasaran, Prithvi Damodhar" },
  { place: "3rd", authors: "Jimin Yoo and Hyowon Jo" },
  { place: "4th", authors: "Nirmal Vasanth, Rithvik Chintakuntla, Naomika Reddy" },
  { place: "5th", authors: "Grace Yang, Riya Piwar, Srinika Dasari" },
  { place: "6th", authors: "Clarissa Gunawan, Puja Raut, Lily Fabella" },
  { place: "7th", authors: "Dharshenee Kasiviswanathan" },
  { place: "8th", authors: "Vivian Zheng" },
  { place: "9th", authors: "Emy Reetoo and Khloe Martinez" },
  { place: "10th", authors: "Sophia Hesseling and Sanvi Jain" },
];

export default function ResearchCompetitionSecondEdition() {
  const [first, ...rest] = placements;
  return (
    <>
      <SiteHead
        title="Review Paper Competition, second edition"
        path="/research-competition-2"
        description="The second CARE Review Paper Competition: four prompts on cancer treatment, ethics, research and risk, and the ten teams that placed."
      />

      <Section tone="paper" size="tight" className="pt-10 md:pt-16">
        <Container>
          <Link href="/research" className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-care-700 hover:underline underline-offset-4">
            <Icon name="arrow-left" size={16} />
            Research
          </Link>
          <p className="text-eyebrow mt-4 text-care-700">Review paper competition · Second edition</p>
          <h1 className="font-display text-display mt-3 max-w-4xl font-semibold text-ink">Four prompts on treatment, ethics, research and risk.</h1>
          <p className="text-lead mt-6 max-w-2xl text-ink-2">
            Teams of up to three students picked one prompt. Ten teams placed. Paper titles and the first-place PDF will be added when the
            team sends them.
          </p>
        </Container>
      </Section>

      <Section tone="white" size="tight">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="text-eyebrow text-care-700">The prompts</h2>
            </div>
            <ol className="md:col-span-9 space-y-5">
              {prompts.map((p, i) => (
                <li key={p} className="flex gap-4">
                  <span className="font-display text-h3 font-semibold text-care-700">{i + 1}</span>
                  <p className="text-lg leading-relaxed text-ink-2">{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container>
          <Reveal className="rounded-band bg-white p-6 shadow-card md:p-10">
            <p className="text-eyebrow text-care-700">First place</p>
            <h2 className="font-display text-h1 mt-3 font-semibold text-ink">{first.authors}</h2>
            <p className="mt-4 text-lg text-ink-2">[TODO: paper title]</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-care-50 px-4 py-2 text-sm font-medium text-care-800">
              <Icon name="file-text" size={16} />
              [TODO: first-place PDF]
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="Placements" title="Second through tenth." />
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {rest.map((p) => (
              <li key={p.place} className="grid gap-1 py-4 sm:grid-cols-12 sm:items-baseline">
                <span className="font-display text-h3 font-semibold text-care-700 sm:col-span-2">{p.place}</span>
                <span className="font-medium text-ink sm:col-span-6">{p.authors}</span>
                <span className="text-sm text-muted sm:col-span-4">[TODO: paper title]</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        photo={photos.hillmanStaff}
        eyebrow="Start at the beginning"
        title="Read the first edition's winning paper."
        text="A systematic review of the social, ethical and scientific challenges of cervical cancer, by Angela Choi."
        primary={{ label: "First edition", href: "/research-competition" }}
        secondary={{ label: "All research", href: "/research" }}
      />
    </>
  );
}
