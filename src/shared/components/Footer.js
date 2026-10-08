import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import { Container } from "./Section";
import { site } from "../site";

const explore = [
  { label: "About", href: "/about" },
  { label: "Branches", href: "/branches" },
  { label: "Past events", href: "/events" },
  { label: "Research", href: "/research" },
  { label: "Team", href: "/team" },
];

const involved = [
  { label: "Start a branch", href: "/start-a-branch" },
  { label: "Join a chapter", href: "/start-a-branch#join" },
  { label: "Donate", href: site.donateUrl, external: true },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Instagram", href: site.instagram, icon: "instagram" },
  { label: "LinkedIn", href: site.linkedin, icon: "linkedin" },
  { label: "Facebook", href: site.facebook, icon: "facebook" },
];

function FooterLink({ item }) {
  const classes = "inline-flex min-h-11 items-center text-care-100 hover:text-white hover:underline underline-offset-4";
  if (item.external) {
    return (
      <a href={item.href} className={classes} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={classes}>
      {item.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-care-900 text-care-100">
      <Container className="py-14 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 rounded-md">
              <Image src="/logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-md" />
              <span className="font-display text-xl font-semibold text-white">{site.wordmark}</span>
              <span className="sr-only">Home</span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-care-200">
              A student-run 501(c)(3) nonprofit. High school students start chapters at their schools to raise cancer
              awareness, support research, and care for patients near them.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-white hover:underline underline-offset-4"
            >
              <Icon name="mail" size={18} />
              {site.email}
            </a>
          </div>

          <nav aria-label="Explore" className="md:col-span-3">
            <h2 className="text-eyebrow text-care-300">Explore</h2>
            <ul className="mt-3 flex flex-col">
              {explore.map((item) => (
                <li key={item.href}>
                  <FooterLink item={item} />
                </li>
              ))}
              {site.blogEnabled && (
                <li>
                  <FooterLink item={{ label: "Blog", href: site.blogUrl, external: true }} />
                </li>
              )}
            </ul>
          </nav>

          <nav aria-label="Get involved" className="md:col-span-2">
            <h2 className="text-eyebrow text-care-300">Get involved</h2>
            <ul className="mt-3 flex flex-col">
              {involved.map((item) => (
                <li key={item.href}>
                  <FooterLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-2">
            <h2 className="text-eyebrow text-care-300">Follow</h2>
            <ul className="mt-3 flex gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-care-700 text-care-100 hover:bg-care-800 hover:text-white"
                  >
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-care-800 pt-6 text-sm text-care-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. A 501(c)(3) nonprofit.
          </p>
          <p>Run by students, for the people around them.</p>
        </div>
      </Container>
    </footer>
  );
}
