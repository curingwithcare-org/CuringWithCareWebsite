import Link from "next/link";
import SiteHead from "../src/shared/components/SiteHead";
import Button from "../src/shared/components/Button";
import Icon from "../src/shared/components/Icon";
import { Container, Section } from "../src/shared/components/Section";

const places = [
  { label: "Branches and chapters", href: "/branches" },
  { label: "Past events", href: "/events" },
  { label: "Research competition", href: "/research" },
  { label: "Start a Branch", href: "/start-a-branch" },
];

export default function NotFound() {
  return (
    <>
      <SiteHead title="Page not found" description="That page does not exist on the Curing with Care site." />
      <Section tone="paper" className="min-h-[70vh]">
        <Container size="narrow">
          <p className="text-eyebrow text-care-700">404</p>
          <h1 className="font-display text-display mt-4 font-semibold text-ink">That page is not here.</h1>
          <p className="text-lead mt-6 text-ink-2">
            The link may be old, or the page moved. Branch pages, for example, use the branch name, like <code className="rounded bg-care-50 px-1.5 py-0.5 text-base">/branches/pittsburgh</code>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" icon="arrow-right">
              Go home
            </Button>
            <Button href="/contact" variant="secondary">
              Report a broken link
            </Button>
          </div>
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {places.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="flex min-h-12 items-center justify-between gap-4 py-2 font-medium text-ink hover:text-care-800">
                  {p.label}
                  <Icon name="arrow-right" size={18} className="text-care-700" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
