import Image from "next/image";
import SiteHead from "../src/shared/components/SiteHead";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import team from "../data/team";
import photos from "../src/shared/photos";

export async function getStaticProps() {
  const byName = (a, b) => a.name.localeCompare(b.name);
  const pick = (category, sort) => team.filter((m) => m.category === category).sort(sort || (() => 0));
  return {
    props: {
      board: pick("board"),
      research: pick("research", byName),
      journalism: pick("journalism", byName),
      interns: pick("intern", byName),
    },
  };
}

function Portrait({ member, sizes, className = "" }) {
  if (!member.photo) {
    return (
      <div className={`flex items-center justify-center bg-care-100 ${className}`} aria-hidden="true">
        <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full opacity-70" />
      </div>
    );
  }
  return <Image src={member.photo} alt={member.name} fill sizes={sizes} className={`object-cover ${className}`} />;
}

function BoardCard({ member, delay }) {
  const first = member.name.split(" ")[0];
  return (
    <Reveal as="li" delay={delay} className="flex flex-col overflow-hidden rounded-card bg-white shadow-card">
      <div className="relative aspect-[4/3] bg-care-100">
        <Portrait member={member} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-h3 font-semibold text-ink">{member.name}</h3>
        {member.position && <p className="mt-1 text-eyebrow text-care-700">{member.position}</p>}
        {member.bio && (
          <details className="group mt-4 text-[0.9375rem] text-ink-2">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-semibold text-care-700 hover:underline underline-offset-4 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">About {first}</span>
              <span className="hidden group-open:inline">Show less</span>
            </summary>
            <p className="mt-2">{member.bio}</p>
          </details>
        )}
        {(member.linkedin || member.instagram) && (
          <p className="mt-auto flex gap-4 pt-4 text-sm">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-care-700 hover:underline underline-offset-4">
                LinkedIn
              </a>
            )}
            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-care-700 hover:underline underline-offset-4">
                Instagram
              </a>
            )}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function NameList({ members }) {
  return (
    <ul className="mt-6 columns-2 gap-x-8 sm:columns-3 lg:columns-4">
      {members.map((m) => (
        <li key={m.name} className="break-inside-avoid py-1.5 text-ink">
          {m.name}
          {m.school && <span className="block text-sm text-muted">{m.school}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function Team({ board, research, journalism, interns }) {
  return (
    <>
      <SiteHead
        title="Team"
        path="/team"
        description="The students on Curing with Care's national board, research and design team, journalism team and intern program."
      />

      <Section tone="paper" size="tight" className="pt-12 md:pt-20">
        <Container>
          <p className="text-eyebrow text-care-700">Team</p>
          <h1 className="font-display text-display mt-4 max-w-4xl font-semibold text-ink">The students who run it.</h1>
          <p className="text-lead mt-6 max-w-2xl text-ink-2">
            CARE has no paid staff. A national board of high school and college students runs chapters, events, research, finance,
            technology and outreach, with research, design and journalism teams and an intern program behind them.
          </p>
        </Container>
      </Section>
      <Container size="wide" className="pb-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-band md:aspect-[21/9]">
          <Image src={photos.careLetters.src} alt={photos.careLetters.alt} fill priority fetchPriority="high" sizes="100vw" className="object-cover" placeholder="blur" />
        </div>
      </Container>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="National board" title="The board" lead="Each board member owns one part of the organization." />
          {board.length === 0 ? (
            <p className="mt-10 text-lead text-ink-2">Board members will be listed here soon.</p>
          ) : (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {board.map((m, i) => (
                <BoardCard key={m.name} member={m} delay={(i % 3) * 60} />
              ))}
            </ul>
          )}
        </Container>
      </Section>

      {(research.length > 0 || journalism.length > 0) && (
        <Section tone="white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {research.length > 0 && (
                <div>
                  <SectionHeading eyebrow={`${research.length} members`} title="Research and design" />
                  <NameList members={research} />
                </div>
              )}
              {journalism.length > 0 && (
                <div>
                  <SectionHeading eyebrow={`${journalism.length} members`} title="Journalism" />
                  <NameList members={journalism} />
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {interns.length > 0 && (
        <Section tone="tint">
          <Container>
            <SectionHeading eyebrow={`${interns.length} interns`} title="Interns" lead="Students working with a board member on one project for a term." />
            <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {interns.map((m, i) => (
                <Reveal as="li" key={m.name} delay={(i % 5) * 40} className="text-center">
                  <div className="relative mx-auto aspect-square w-28 overflow-hidden rounded-full bg-care-100 ring-4 ring-white">
                    <Portrait member={m} sizes="112px" className="rounded-full" />
                  </div>
                  <p className="mt-3 font-medium text-ink">{m.name}</p>
                  {m.school && <p className="text-sm text-muted">{m.school}</p>}
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaBand
        photo={photos.hillmanTour}
        eyebrow="Join the team"
        title="Board, team and intern spots open every year."
        text="[TODO: when applications open and where to apply.] Until then, the fastest way in is through your school's chapter."
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
