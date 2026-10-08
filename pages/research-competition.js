import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import photos from "../src/shared/photos";

const prompt =
  "Cervical cancer remains a major public health problem in the world despite the increase in prevention and management methods. The introduction of HPV vaccination and improvement of screening methods have reduced its incidence in many regions, though accessibility and awareness remain problems in most underprivileged areas. Discuss the current obstacles to the eradication of cervical cancer, the ethical considerations in the improvement of access to prevention and care, and new research directions that will contribute to the early detection, prevention, and treatment of cervical cancer.";

const firstPlace = {
  title: "The Global Burden of Cervical Cancer: A Systematic Review of Social Implications, Ethical Considerations, and Scientific Challenges",
  author: "Angela Choi",
  pdfUrl: "/research/angela-choi-cervical-cancer-research.pdf",
};

const runnersUp = [
  {
    place: "Second place",
    title: "From Prevention to Cure: Ethical, Social, and Scientific Perspectives on Cervical Cancer Management and Innovations in Treatment",
    author: "Sanvi Jain and Sophie Hesseling",
  },
  { place: "Third place", title: "Cervical Cancer: A Needed Urgent Reform", author: "Medhansh Garadala and Junseo Lee" },
];

const honorableMentions = [
  { title: "Cervical Cancer: Knowledge is the Cure", author: "Neerajana Chatterjee and Harshini Rajmohan" },
  { title: "Towards the Elimination of Cervical Cancer: Challenges, Ethics, and Directions for the Future", author: "Vaanya Agarwal" },
  { title: "Breaking the Silence: A Global Fight Against Cervical Cancer", author: "Riya Amara and Diya Kumar" },
  { title: "Cervical Cancer: A Newfound Hope", author: "Shruthi Karri and Ananti Burman" },
  { title: "Cervical Cancer: Global Challenges and a Path to Eradication", author: "Angela Zeng" },
  { title: "An Analysis Of Cervical Cancer: Overcoming a Bridge in Women's Health", author: "Obuthanusre Obulisundar and Anvi Mathur" },
  { title: "An Overview of Cervical Cancer", author: "Nikhil Amalraj and Rohan Paranjpe" },
];

export default function ResearchCompetition() {
  return (
    <>
      <SiteHead
        title="Review Paper Competition, first edition"
        path="/research-competition"
        description="The first CARE Review Paper Competition asked high school students about the obstacles, ethics and research directions in eliminating cervical cancer. Read the winning paper and see every placement."
      />

      <Section tone="paper" size="tight" className="pt-10 md:pt-16">
        <Container>
          <Link href="/research" className="inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] font-medium text-care-700 hover:underline underline-offset-4">
            <Icon name="arrow-left" size={16} />
            Research
          </Link>
          <p className="text-eyebrow mt-4 text-care-700">Review paper competition · First edition</p>
          <h1 className="font-display text-display mt-3 max-w-4xl font-semibold text-ink">Cervical cancer: obstacles, ethics and new research.</h1>
          <p className="text-lead mt-6 max-w-2xl text-ink-2">
            Ten papers from high school students across CARE chapters. The first-place paper is published in full below.
          </p>
        </Container>
      </Section>

      <Section tone="white" size="tight">
        <Container>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <h2 className="text-eyebrow text-care-700">The prompt</h2>
            </div>
            <blockquote className="md:col-span-9 border-l-4 border-care-300 pl-5 text-lg leading-relaxed text-ink-2 md:pl-7">{prompt}</blockquote>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container>
          <Reveal className="rounded-band bg-white p-6 shadow-card md:p-10">
            <p className="text-eyebrow text-care-700">First place</p>
            <h2 className="font-display text-h1 mt-3 max-w-3xl font-semibold text-ink">{firstPlace.title}</h2>
            <p className="mt-4 text-lg text-ink-2">
              by <span className="font-semibold text-ink">{firstPlace.author}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={firstPlace.pdfUrl} icon="arrow-up-right">
                Read the paper (PDF)
              </Button>
              <Button href={firstPlace.pdfUrl} download="Angela_Choi_Cervical_Cancer_Research.pdf" variant="secondary" icon="download">
                Download
              </Button>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {runnersUp.map((p, i) => (
              <Reveal key={p.place} delay={i * 80} className="rounded-card bg-white p-6 ring-1 ring-inset ring-line md:p-8">
                <p className="text-eyebrow text-care-700">{p.place}</p>
                <h3 className="font-display text-h3 mt-3 font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 text-ink-2">{p.author}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="Honorable mentions" title="Every other paper that placed." />
          <div className="mt-8 overflow-x-auto rounded-sm" tabIndex={0} role="region" aria-label="Honorable mentions, scrollable table">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-care-200 text-eyebrow text-care-700">
                  <th scope="col" className="py-3 pr-4 font-semibold">Paper</th>
                  <th scope="col" className="py-3 font-semibold">Authors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {honorableMentions.map((p) => (
                  <tr key={p.title}>
                    <td className="py-4 pr-4 font-medium text-ink">{p.title}</td>
                    <td className="py-4 text-ink-2">{p.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <CtaBand
        photo={photos.letters}
        eyebrow="Keep reading"
        title="The second edition added four new prompts."
        text="Treatment ethics, current modalities, future research and risk disparities. See who placed."
        primary={{ label: "Second edition", href: "/research-competition-2" }}
        secondary={{ label: "All research", href: "/research" }}
      />
    </>
  );
}
