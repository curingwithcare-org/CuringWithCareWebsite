import { Html, Head, Main, NextScript } from "next/document";
import { fontClassName } from "../src/shared/fonts";

export default function Document() {
  return (
    <Html lang="en" className={fontClassName}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
