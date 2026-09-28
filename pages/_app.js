import "../src/shared/globals.css";
import "../src/shared/typekit.css";
import "../src/shared/components/navbar.css";
import Link from "next/link";
import Navbar from "../src/shared/components/Navbar";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const metadata = {
  title: "curingwithCARE",
  description: "Dedicated to Cancer Awareness, Research and Education",
};

function CareApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <footer className="bg-white text-center flex flex-col md:flex-row justify-between px-6 py-10 md:px-12 md:py-8 gap-y-8 md:gap-y-12">
        <p className="text-gray-600 italic">
          © {new Date().getFullYear()} curingwithCARE - A 501(c)(3) Nonprofit
        </p>

        <div className="flex justify-center gap-10 md:gap-12">
          <div className="flex flex-col text-center md:text-right">
            <a href="https://www.zeffy.com/en-US/donation-form/donate-to-curingwithcare" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0">Donate</a>
            <Link href="/events" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0">Past Events</Link>
            <Link href="/branches" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0">Branches</Link>
            <Link href="/team" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0">Team</Link>
          </div>

          <div className="flex flex-col text-center md:text-right">
            <Link href="/about" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0">About</Link>
            <a href="https://www.instagram.com/curingwithcare/" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com/company/curingwithcare" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0" target="_blank">LinkedIn</a>
            <a href="https://www.facebook.com/people/curingwithcare/61551833566559/" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0" target="_blank">Facebook</a>
            <a href="mailto:curingwithcare@gmail.com" className="text-gray-600 hover:text-gray-800 py-2.5 md:py-0">curingwithcare@gmail.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default CareApp;
