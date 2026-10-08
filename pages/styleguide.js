// Temporary: shows the shared pieces for the Phase 2 check-in. Deleted before Phase 3.
import Image from "next/image";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import Reveal from "../src/shared/components/Reveal";
import CtaBand from "../src/shared/components/CtaBand";
import Quote from "../src/shared/components/Quote";
import { StatRow } from "../src/shared/components/Stat";
import { Container, Section, SectionHeading } from "../src/shared/components/Section";
import photos from "../src/shared/photos";

const swatches = [
  ["care-50", "#f3f8ef"], ["care-100", "#e0f2de"], ["care-200", "#c7edc3"], ["care-300", "#a0da95"], ["care-400", "#8ac779"],
  ["care-500", "#73ac5a"], ["care-600", "#5d893c"], ["care-700", "#466222"], ["care-800", "#35491a"], ["care-900", "#2b370e"],
  ["lime", "#c8e888"], ["ink", "#171a14"], ["ink-2", "#3f453a"], ["muted", "#656b5e"], ["line", "#e3e6dc"], ["paper", "#fbfbf8"], ["paper-2", "#f3f4ee"],
];

export default function Styleguide() {
  return (
    <>
      <SiteHead title="Style guide" />
      <Section>
        <Container>
          <SectionHeading eyebrow="Design system" title="Shared pieces" lead="Tokens, type, buttons, cards and bands that every page is built from." />
          <h3 className="text-h3 font-display mt-12 font-semibold">Colors</h3>
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-9">
            {swatches.map(([name, hex]) => (
              <li key={name} className="text-sm">
                <div className="aspect-square rounded-card ring-1 ring-inset ring-black/5" style={{ background: hex }} />
                <p className="mt-1.5 font-medium">{name}</p>
                <p className="text-muted">{hex}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-h3 font-display mt-12 font-semibold">Type scale</h3>
          <div className="mt-4 space-y-4">
            <p className="font-display text-display font-semibold">Display: Fraunces</p>
            <p className="font-display text-h1 font-semibold">H1: Students starting chapters</p>
            <p className="font-display text-h2 font-semibold">H2: What a chapter does</p>
            <p className="text-h3 font-semibold">H3: Figtree for subheads</p>
            <p className="text-lead text-ink-2">Lead: A student-run nonprofit with chapters in four countries.</p>
            <p>Body: Figtree at 17px with 1.6 line height for long paragraphs.</p>
            <p className="text-eyebrow text-care-700">Eyebrow label</p>
          </div>

          <h3 className="text-h3 font-display mt-12 font-semibold">Buttons</h3>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button href="/start-a-branch" icon="arrow-right">Primary</Button>
            <Button href="/about" variant="secondary">Secondary</Button>
            <Button href="/about" variant="ghost">Ghost</Button>
            <Button size="lg">Large button</Button>
          </div>

          <h3 className="text-h3 font-display mt-12 font-semibold">Icons</h3>
          <div className="mt-4 flex flex-wrap gap-4 text-care-700">
            {["arrow-right", "arrow-up-right", "map-pin", "calendar", "users", "mail", "megaphone", "microscope", "hand-heart", "graduation-cap", "download", "file-text", "instagram", "linkedin", "facebook"].map((n) => (
              <Icon key={n} name={n} size={24} label={n} />
            ))}
          </div>

          <h3 className="text-h3 font-display mt-12 font-semibold">Cards</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[photos.cardMaking, photos.pinkOut, photos.relaySelfie].map((p, i) => (
              <Reveal key={i} delay={i * 80} className="overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-card-hover">
                <div className="relative aspect-[4/3]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" placeholder="blur" />
                </div>
                <div className="p-5">
                  <p className="text-eyebrow text-care-700">Pittsburgh, PA</p>
                  <h4 className="font-display text-h3 mt-2 font-semibold">Card title</h4>
                  <p className="mt-2 text-ink-2">Two lines of supporting text that explain what this card links to.</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container>
          <StatRow stats={[{ value: "28", label: "Chapters" }, { value: "17", label: "Branches" }, { value: "4", label: "Countries" }, { value: "900+", label: "Members", note: "[TODO: confirm]" }]} />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <Quote text="[TODO: real quote from a chapter head]" name="[TODO: name]" role="Chapter head, [TODO: school]" />
        </Container>
      </Section>

      <CtaBand photo={photos.careLetters} />
    </>
  );
}
