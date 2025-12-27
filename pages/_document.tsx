import { Html, Head, Main, NextScript } from "next/document";

const title = "BFashion";
const desc =
  "BFashion";
const keywords = "BFashion, Loja Online, E-commerce, Moda";

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />

        <meta content={desc} name="description" key="description" />
        <meta content={keywords} name="keywords" key="keywords" />

        <meta content="follow, index" name="robots" />
        <meta content="#282828" name="theme-color" />
        <meta content="#282828" name="msapplication-TileColor" />

        <link
          href="/logo.jpg"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/logo.jpg"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/logo.jpg"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/logo.jpg" rel="shortcut icon" />
        <link href="/logo.jpg" rel="manifest" />

        <meta property="og:url" content="https://bfashion.sale" />
        <link rel="canonical" href="https://bfashion.sale" />
        <meta property="og:site_name" content="BFashion" />
        <meta property="og:description" content={desc} key="og_description" />
        <meta property="og:title" content={title} key="og_title" />
        <meta
          property="og:image"
          content="/logo.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bfashion" />
        <meta name="twitter:title" content={title} key="twitter_title" />
        <meta
          name="twitter:description"
          content={desc}
          key="twitter_description"
        />
        <meta
          name="twitter:image"
          content="/logo.jpg"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
