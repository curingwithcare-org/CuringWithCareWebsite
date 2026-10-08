import Head from "next/head";
import { site } from "../site";

/** Title, description and social preview tags for one page. */
export default function SiteHead({ title, description = site.description, image = "/og.jpg", path = "" }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} (CARE): student-run cancer awareness, research, and care`;
  const url = `${site.domain}${path}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${site.domain}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
