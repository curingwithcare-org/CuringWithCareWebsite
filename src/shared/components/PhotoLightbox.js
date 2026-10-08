import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// The lightbox and its plugins only load once someone opens a photo.
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

let plugins = null;
async function loadPlugins() {
  if (!plugins) {
    const [zoom, thumbs] = await Promise.all([
      import("yet-another-react-lightbox/plugins/zoom"),
      import("yet-another-react-lightbox/plugins/thumbnails"),
    ]);
    plugins = [zoom.default, thumbs.default];
  }
  return plugins;
}

import { useEffect, useState } from "react";

export function useLightbox() {
  const [state, setState] = useState({ open: false, index: 0, slides: [] });
  const show = (slides, index = 0) => setState({ open: true, index, slides });
  const close = () => setState((s) => ({ ...s, open: false }));
  return { ...state, show, close };
}

export default function PhotoLightbox({ open, close, index, slides }) {
  const [loaded, setLoaded] = useState(null);
  useEffect(() => {
    if (open && !loaded) loadPlugins().then(setLoaded);
  }, [open, loaded]);
  if (!open) return null;
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={loaded || []}
      carousel={{ padding: "16px", spacing: "16px" }}
      thumbnails={{ position: "bottom", width: 96, height: 64, border: 0, borderRadius: 6, padding: 2, gap: 8 }}
      styles={{ container: { backgroundColor: "rgba(23, 26, 20, 0.95)" } }}
    />
  );
}
