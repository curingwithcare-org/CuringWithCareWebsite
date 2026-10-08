import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import { eventDate, formatEventDate, listEventImages } from "../../utils/events";

/**
 * One past event: title, optional date and description, and up to six photos
 * from Supabase storage. Clicking a photo opens the shared lightbox through
 * `onOpen(slides, index)`.
 */
export default function EventCard({ event, place, onOpen }) {
  const [images, setImages] = useState(null); // null = loading, [] = none
  const [failed, setFailed] = useState(false);
  const date = eventDate(event);

  useEffect(() => {
    let cancelled = false;
    listEventImages(event.images_folder)
      .then((list) => !cancelled && setImages(list))
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          setImages([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [event.images_folder]);

  const slides = (images || []).map((img) => ({ src: img.url, alt: `${event.title}: photo` }));
  const shown = (images || []).slice(0, 6);
  const extra = (images || []).length - shown.length;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card">
      {images === null ? (
        <div className="aspect-[3/2] animate-pulse bg-care-100" aria-hidden="true" />
      ) : shown.length > 0 ? (
        <ul className={`grid gap-0.5 ${shown.length === 1 ? "grid-cols-1" : shown.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {shown.map((img, i) => (
            <li key={img.name} className={`relative ${shown.length === 1 ? "aspect-[3/2]" : "aspect-square"}`}>
              <button
                type="button"
                onClick={() => onOpen(slides, i)}
                className="group block h-full w-full focus-visible:outline-offset-[-3px]"
                aria-label={`Open photo ${i + 1} of ${slides.length} from ${event.title}`}
              >
                <Image src={img.url} alt="" fill sizes="(min-width: 1024px) 14vw, (min-width: 640px) 20vw, 33vw" className="object-cover" />
                {i === shown.length - 1 && extra > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-care-900/60 text-lg font-semibold text-white">
                    +{extra}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex aspect-[3/2] items-center justify-center bg-care-50 text-care-600">
          <Icon name="image" size={28} label={failed ? "Photos unavailable" : "No photos"} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {(place || date) && (
          <p className="text-eyebrow flex flex-wrap gap-x-3 text-care-700">
            {place && <span>{place}</span>}
            {date && <time dateTime={date.toISOString()}>{formatEventDate(date)}</time>}
          </p>
        )}
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
