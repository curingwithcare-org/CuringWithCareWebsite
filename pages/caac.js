import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import photos from "../src/shared/photos";

const eligibility = [
  "Full-time high school students (grades 9 to 12) at a public, private or home school at the time of application.",
  "U.S. citizenship is not required.",
  "International students, and students living outside the U.S., may submit.",
];

export default function CAAC() {
  return (
    <>
      <SiteHead
        title="2025 Cancer Awareness & Action Challenge"
        path="/caac"
        description="The 2025 Cancer Awareness & Action Challenge, hosted by Curing with Care and the High School Health Research Forum: a solutions challenge for high school students on cancer prevention, access to care, education and policy."
      />

      <Section tone="paper" size="tight" className="pt-10 md:pt-16">
        <Container>
          <Link href="/research" className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-care-700 hover:underline underline-offset-4">
            <Icon name="arrow-left" size={16} />
            Research
          </Link>
          <p className="text-eyebrow mt-4 text-care-700">Archive · 2025 · Hosted with the High School Health Research Forum</p>
          <h1 className="font-display text-display mt-3 max-w-4xl font-semibold text-ink">Cancer Awareness &amp; Action Challenge</h1>
          <p className="text-lead mt-6 max-w-2xl text-ink-2">
            A challenge for high school students to propose one creative, evidence-based, workable solution to a problem in cancer prevention,
            access to care, public education or health policy. Semifinalists were recognized and the winner received a cash award.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-care-100 px-4 py-2 text-sm font-semibold text-care-800">
            <Icon name="calendar" size={16} />
            Submissions for 2025 are closed. [TODO: 2026 dates, if the challenge runs again]
          </p>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SectionHeading eyebrow="The 2025 prompt" title="Pick one pressing problem. Propose what teenagers could actually do about it." />
              <p className="mt-5 text-ink-2">
                Select a specific, pressing problem of cancer prevention, access to treatment, awareness, or policy and propose an innovative,
                practical solution that can be created, campaigned for, and enacted by adolescents to address the issue. No research experience
                is needed; the submission is judged on passion, feasibility and impact.
              </p>
              <Button href="https://hshrf.org/caac" variant="secondary" className="mt-6" icon="arrow-up-right">
                Full guidelines at hshrf.org
              </Button>
            </div>
            <div>
              <h2 className="text-eyebrow text-care-700">Who could enter</h2>
              <ul className="mt-4 space-y-3">
                {eligibility.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-2">
                    <Icon name="check" size={20} className="mt-0.5 text-care-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <h2 className="text-eyebrow mt-10 text-care-700">Results</h2>
              <p className="mt-3 text-ink-2">[TODO: 2025 semifinalists and winner, once the team confirms they may be published.]</p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        photo={photos.speakerEvent}
        eyebrow="Still open"
        title="The review paper competition runs every year."
        text="If you missed the challenge, the research competition is the other way to write about cancer with CARE."
        primary={{ label: "Research competition", href: "/research" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
