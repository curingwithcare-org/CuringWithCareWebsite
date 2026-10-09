import Image from "next/image";
import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import CtaBand from "../src/shared/components/CtaBand";
import { Container, Section } from "../src/shared/components/Section";
import photos from "../src/shared/photos";
import { site } from "../src/shared/site";

const reasons = [
  { title: "Starting or joining a chapter", text: "Use the Start a Branch page; it goes straight to the chapters team.", link: { label: "Start a Branch", href: "/start-a-branch" } },
  { title: "Research competition", text: "Questions about prompts, eligibility or deadlines.", link: { label: "Research", href: "/research" } },
  { title: "Donations and partnerships", text: "Sponsorships, matching gifts, hospital partnerships and press.", link: { label: "Email us", href: `mailto:${site.email}`, external: true } },
  { title: "The website", text: "Something broken or out of date? Tell the technology team.", link: { label: "Email us", href: `mailto:${site.email}?subject=Website`, external: true } },
];

export default function Contact() {
  return (
    <>
      <SiteHead title="Contact" path="/contact" description="How to reach Curing with Care: email, social media, and where to go for chapter, research and donation questions." />

      <Section tone="paper" size="tight" className="pt-12 md:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-eyebrow text-care-700">Contact</p>
              <h1 className="font-display text-display mt-4 font-semibold text-ink">Talk to a student who runs this.</h1>
              <p className="text-lead mt-6 max-w-xl text-ink-2">One inbox, read by the board. Tell us which chapter or team you are asking about and we will route it.</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-care-700 px-6 text-lg font-semibold text-white hover:bg-care-800"
              >
                <Icon name="mail" size={20} />
                {site.email}
              </a>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  { label: "Instagram", href: site.instagram, icon: "instagram" },
                  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
                  { label: "Facebook", href: site.facebook, icon: "facebook" },
                ].map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-[0.9375rem] font-medium text-ink ring-1 ring-inset ring-line hover:bg-care-50 hover:text-care-800"
                    >
                      <Icon name={s.icon} size={18} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-band lg:col-span-6">
              <Image src={photos.holiday.src} alt={photos.holiday.alt} fill priority fetchPriority="high" decoding="sync" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" placeholder="blur" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <h2 className="text-eyebrow text-care-700">Where to go for what</h2>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-band bg-line sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.title} className="bg-white p-6 md:p-8">
                <h3 className="font-display text-h3 font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-ink-2">{r.text}</p>
                {r.link.external ? (
                  <a href={r.link.href} className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-care-700 hover:underline underline-offset-4">
                    {r.link.label}
                    <Icon name="arrow-up-right" size={18} />
                  </a>
                ) : (
                  <Link href={r.link.href} className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-semibold text-care-700 hover:underline underline-offset-4">
                    {r.link.label}
                    <Icon name="arrow-right" size={18} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Curing with Care is a registered 501(c)(3) nonprofit. [TODO: mailing address and EIN, if the board wants them published.]
          </p>
        </Container>
      </Section>

      <CtaBand
        photo={photos.bracelets}
        eyebrow="Or skip the email"
        title="Most questions start with a chapter."
        text="If you are a student, the fastest answer is on the Start a Branch page."
        secondary={{ label: "Donate", href: site.donateUrl }}
      />
    </>
  );
}
