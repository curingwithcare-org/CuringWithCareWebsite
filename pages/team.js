import { useEffect, useState } from "react";
import Image from "next/image";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import { supabase, supabaseUrl } from "../src/utils/supabase";
import photos from "../src/shared/photos";

// next/image can optimize our own files and Supabase storage; anything else
// is shown as-is.
const canOptimize = (src) => src.startsWith("/") || (supabaseUrl && src.startsWith(supabaseUrl));

function Portrait({ src, alt, sizes, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-care-100 ${className}`} aria-hidden="true">
        <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full opacity-70" />
      </div>
    );
  }
  return <Image src={src} alt={alt} fill sizes={sizes} unoptimized={!canOptimize(src)} className={`object-cover ${className}`} onError={() => setFailed(true)} />;
}

function BoardCard({ member, delay }) {
  return (
    <Reveal as="li" delay={delay} className="flex flex-col overflow-hidden rounded-card bg-white shadow-card">
      <div className="relative aspect-[4/3] bg-care-100">
        <Portrait src={member.image} alt={member.name} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-h3 font-semibold text-ink">{member.name}</h3>
        {member.position && <p className="mt-1 text-eyebrow text-care-700">{member.position}</p>}
        {member.description && (
          <details className="group mt-4 text-[0.9375rem] text-ink-2">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-semibold text-care-700 hover:underline underline-offset-4 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">About {member.name.split(" ")[0]}</span>
              <span className="hidden group-open:inline">Show less</span>
            </summary>
            <p className="mt-2">{member.description}</p>
          </details>
        )}
        {(member.social?.linkedin || member.social?.instagram) && (
          <p className="mt-auto flex gap-4 pt-4 text-sm">
            {member.social.linkedin && (
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-care-700 hover:underline underline-offset-4">
                LinkedIn
              </a>
            )}
            {member.social.instagram && (
              <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="font-medium text-care-700 hover:underline underline-offset-4">
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
        <li key={m.id} className="break-inside-avoid py-1.5 text-ink">
          {m.name}
          {m.university && <span className="block text-sm text-muted">{m.university}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function Team() {
  const [groups, setGroups] = useState(null); // { board, research, journalism, intern }
  const [status, setStatus] = useState("loading");

  const load = async () => {
    setStatus("loading");
    try {
      const { data, error } = await supabase.from("team_members").select("*").order("order_rank", { ascending: true, nullsFirst: false });
      if (error) throw error;
      const byName = (a, b) => (a.name || "").localeCompare(b.name || "");
      const pick = (category, sort) => (data || []).filter((m) => m.category === category).sort(sort || (() => 0));
      setGroups({
        board: pick("board"),
        research: pick("research", byName),
        journalism: pick("journalism", byName),
        intern: pick("intern", byName),
      });
      setStatus("ready");
    } catch (e) {
      console.error("Team unavailable:", e?.message || e);
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

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
          <Image src={photos.careLetters.src} alt={photos.careLetters.alt} fill priority sizes="100vw" className="object-cover" placeholder="blur" />
        </div>
      </Container>

      <Section tone="paper">
        <Container>
          <SectionHeading eyebrow="National board" title="The board" lead="Each board member owns one part of the organization." />

          {status === "loading" && (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading team">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="overflow-hidden rounded-card bg-white shadow-card" aria-hidden="true">
                  <div className="aspect-[4/3] animate-pulse bg-care-100" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-1/2 animate-pulse rounded bg-care-100" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-care-100" />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {status === "error" && (
            <div className="mt-10 rounded-card bg-white p-8 ring-1 ring-inset ring-line">
              <h3 className="font-display text-h3 font-semibold">The team list is not loading right now</h3>
              <p className="mt-2 text-ink-2">Please try again in a moment, or email us and we will point you to the right person.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={load}>Try again</Button>
                <Button href="/contact" variant="secondary">Contact</Button>
              </div>
            </div>
          )}

          {status === "ready" && groups.board.length === 0 && <p className="mt-10 text-lead text-ink-2">Board members will be listed here soon.</p>}

          {status === "ready" && groups.board.length > 0 && (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.board.map((m, i) => (
                <BoardCard key={m.id} member={m} delay={(i % 3) * 60} />
              ))}
            </ul>
          )}
        </Container>
      </Section>

      {status === "ready" && (groups.research.length > 0 || groups.journalism.length > 0) && (
        <Section tone="white">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {groups.research.length > 0 && (
                <div>
                  <SectionHeading eyebrow={`${groups.research.length} members`} title="Research and design" />
                  <NameList members={groups.research} />
                </div>
              )}
              {groups.journalism.length > 0 && (
                <div>
                  <SectionHeading eyebrow={`${groups.journalism.length} members`} title="Journalism" />
                  <NameList members={groups.journalism} />
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {status === "ready" && groups.intern.length > 0 && (
        <Section tone="tint">
          <Container>
            <SectionHeading eyebrow={`${groups.intern.length} interns`} title="Interns" lead="Students working with a board member on one project for a term." />
            <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {groups.intern.map((m, i) => (
                <Reveal as="li" key={m.id} delay={(i % 5) * 40} className="text-center">
                  <div className="relative mx-auto aspect-square w-28 overflow-hidden rounded-full bg-care-100 ring-4 ring-white">
                    <Portrait src={m.image} alt={m.name} sizes="112px" className="rounded-full" />
                  </div>
                  <p className="mt-3 font-medium text-ink">{m.name}</p>
                  {m.university && <p className="text-sm text-muted">{m.university}</p>}
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
