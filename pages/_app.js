import "../src/app/globals.css";
import "../src/app/typekit.css";
import Navbar from "../src/app/components/Navbar";

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
      <footer className="bg-white text-center py-8 flex flex-col md:flex-row justify-between px-12 p-12 gap-y-12">
        <p className="text-gray-600 italic">
          © {new Date().getFullYear()} curingwithCARE - A 501(c)(3) Nonprofit
        </p>

        <div className="flex gap-12">
          <div className="flex flex-col text-right">
            <a href="https://www.zeffy.com/en-US/donation-form/donate-to-curingwithcare" className="text-gray-600 hover:text-gray-800">Donate</a>
            <a href="/about" className="text-gray-600 hover:text-gray-800">Past Events</a>
            <a href="/branches" className="text-gray-600 hover:text-gray-800">Branches</a>
            <a href="/team" className="text-gray-600 hover:text-gray-800">Team</a>
          </div>

          <div className="flex flex-col text-right">
            <a href="/about" className="text-gray-600 hover:text-gray-800">About</a>
            <a href="https://www.instagram.com/curingwithcare/" className="text-gray-600 hover:text-gray-800" target="_blank">Instagram</a>
            <a href="https://www.linkedin.com/company/curingwithcare" className="text-gray-600 hover:text-gray-800" target="_blank">LinkedIn</a>
            <a href="https://www.facebook.com/people/curingwithcare/61551833566559/" className="text-gray-600 hover:text-gray-800" target="_blank">Facebook</a>
            <a href="mailto:curingwithcare@gmail.com" className="text-gray-600 hover:text-gray-800">curingwithcare@gmail.com</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default CareApp;
