import Image from "next/image";
import Icon from "./Icon";
import { eventSlides } from "../../utils/events";

/**
 * One past event: title, place, year, description and up to six photos.
 * Clicking a photo opens the shared lightbox through `onOpen(slides, index)`.
 */
export default function EventCard({ event, place, onOpen }) {
  const slides = eventSlides(event);
  const shown = event.photos.slice(0, 6);
  const extra = event.photos.length - shown.length;
  const meta = [place, event.year].filter(Boolean);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card">
      {shown.length > 0 ? (
        <ul className={`grid gap-0.5 ${shown.length === 1 ? "grid-cols-1" : shown.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {shown.map((photo, i) => (
            <li key={photo.src} className={`relative ${shown.length === 1 ? "aspect-[3/2]" : "aspect-square"}`}>
              <button
                type="button"
                onClick={() => onOpen(slides, i)}
                className="block h-full w-full focus-visible:outline-offset-[-3px]"
                aria-label={`Open photo ${i + 1} of ${slides.length} from ${event.title}`}
              >
                <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 14vw, (min-width: 640px) 20vw, 33vw" className="object-cover" />
                {i === shown.length - 1 && extra > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-care-900/60 text-lg font-semibold text-white">+{extra}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex aspect-[3/2] items-center justify-center bg-care-50 text-care-600">
          <Icon name="image" size={28} label="No photos" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {meta.length > 0 && <p className="text-eyebrow text-care-700">{meta.join(" · ")}</p>}
        <h3 className="font-display text-h3 mt-2 font-semibold text-ink">{event.title}</h3>
        {event.description && <p className="mt-2 text-[0.9375rem] text-ink-2">{event.description}</p>}
        {slides.length > 0 && (
          <button
            type="button"
            onClick={() => onOpen(slides, 0)}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-[0.9375rem] font-semibold text-care-700 hover:underline underline-offset-4"
          >
            View all {slides.length} {slides.length === 1 ? "photo" : "photos"}
            <Icon name="arrow-right" size={16} />
          </button>
        )}
      </div>
    </article>
  );
}
