import { useState } from "react";
import Image from "next/image";

// A region's photo under the site's green overlay. When there is no photo, or it
// fails to load, it shows the branded fallback: the same gradient with the CARE logo.
export default function RegionImage({ src, alt, hoverZoom = false, logo = "center" }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {showPhoto ? (
        <>
          {/* Region photos are hotlinked from many outside hosts, so next/image can't optimize them. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${hoverZoom ? "transform scale-100 group-hover:scale-110 transition-transform duration-700" : ""}`}
            onError={() => setFailed(true)}
          />
          <div className={`absolute inset-0 bg-linear-to-br from-green-600 to-emerald-500 opacity-70 ${hoverZoom ? "group-hover:opacity-80 transition-opacity duration-500" : ""}`}></div>
        </>
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-green-600 to-emerald-500">
          <div className={`absolute bg-white rounded-full shadow-md p-1.5 ${logo === "corner" ? "top-8 right-8 w-20 h-20" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16"}`}>
            <div className="relative w-full h-full">
              <Image src="/logo.png" alt="" fill sizes="80px" className="object-contain rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Decorative circles, as on the original branch cards */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-6 -right-6 w-20 h-20 border-2 border-white/20 rounded-full"></div>
        <div className="absolute -bottom-8 -left-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
      </div>
    </div>
  );
}
