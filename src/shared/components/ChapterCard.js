import Link from "next/link";
import { motion } from "motion/react";
import RegionImage from "./RegionImage";
import { regionName } from "../../utils/chapters";

// Entrance animation, staggered by the parent section (see pages/branches.js).
export const chapterCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Same pill as the award badges on the research competition page, in the accent green.
const NewBadge = () => (
  <span className="inline-block bg-green-500 text-white px-3 py-0.5 rounded-full text-sm font-bold shadow-md">
    New
  </span>
);

// One chapter (school). With `region` it shows the region's photo strip and links
// to the region's page; without it, it's a plain card for the region page itself.
export default function ChapterCard({ chapter, region }) {
  const heads = chapter.heads || [];

  const details = (
    <div className="p-6">
      {!region && chapter.is_new && (
        <div className="mb-3">
          <NewBadge />
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{chapter.school}</h3>
      <p className="text-green-600 font-medium mb-1">{chapter.state}</p>
      {heads.length > 0 && (
        <p className="text-gray-600">
          {heads.length === 1 ? "Chapter Head" : "Chapter Heads"}: {heads.join(", ")}
        </p>
      )}
      {chapter.note && <p className="text-sm text-gray-500 mt-2">{chapter.note}</p>}
    </div>
  );

  return (
    <motion.div
      variants={chapterCardVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="h-full"
    >
      {region ? (
        <Link
          href={`/branches/${region.slug}`}
          className="group block h-full bg-white rounded-xl overflow-hidden shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
        >
          <div className="relative h-28">
            <RegionImage src={region.image} alt={`${regionName(region)} Branch`} hoverZoom />
            {chapter.is_new && (
              <div className="absolute top-4 left-4">
                <NewBadge />
              </div>
            )}
          </div>
          {details}
        </Link>
      ) : (
        <div className="h-full bg-white rounded-xl overflow-hidden shadow-lg">{details}</div>
      )}
    </motion.div>
  );
}
