// import { Html, Head, Main, NextScript } from "next/document";
// import Script from "next/script";

// export default function Document() {

//   return (
//     <Html lang="en">
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
//           rel="stylesheet"
//         />
//         <Script
//           id="Adsense-id"
//           data-ad-client="ca-pub-7562191749444029"
//           async="true"
//           strategy="beforeInteractive"
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
//         />
//          <script
//             src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
//             async
//           />

//       </Head>
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }

import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <Script
            id="Adsense-id"
            data-ad-client="ca-pub-7562191749444029"
            async={true}
            strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
