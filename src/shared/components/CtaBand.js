import Image from "next/image";
import Button from "./Button";
import { Container } from "./Section";

/**
 * The closing section of every page: a dark green band that says what to do
 * next. With `photo` it becomes a split band with the image on the right.
 */
export default function CtaBand({
  eyebrow = "What's next",
  title = "Start a chapter at your school.",
  text = "If there is no CARE branch near you, you can be the first. We will help you set it up.",
  primary = { label: "Start a Branch", href: "/start-a-branch" },
  secondary = { label: "Get involved", href: "/start-a-branch#join" },
  photo,
}) {
  return (
    <section className="bg-care-900 text-white">
      <Container className={photo ? "py-0" : "py-16 md:py-24"}>
        <div className={photo ? "grid items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-16 lg:py-20" : "max-w-3xl"}>
          <div>
            <p className="text-eyebrow text-care-300">{eyebrow}</p>
            <h2 className="font-display text-h1 font-semibold mt-3">{title}</h2>
            <p className="text-lead mt-4 max-w-xl text-care-100">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && (
                <Button href={primary.href} variant="inverse" size="lg" icon="arrow-right">
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button href={secondary.href} variant="inverse-ghost" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
          {photo && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-band">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" placeholder="blur" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
