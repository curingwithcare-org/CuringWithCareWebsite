import "../src/shared/globals.css";
import Head from "next/head";
import Navbar from "../src/shared/components/Navbar";
import Footer from "../src/shared/components/Footer";
import BackToTop from "../src/shared/components/BackToTop";
import { fontClassName } from "../src/shared/fonts";

export default function CareApp({ Component, pageProps }) {
  return (
    <div className={`${fontClassName} flex min-h-screen flex-col font-sans`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#466222" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-care-700 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Component {...pageProps} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
