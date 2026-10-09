import { Html, Head, Main, NextScript } from "next/document";
import { fontClassName } from "../src/shared/fonts";

export default function Document() {
  return (
    <Html lang="en" className={fontClassName}>
      <Head>
        {/* Marks JS as available before first paint so scroll reveals can start hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
