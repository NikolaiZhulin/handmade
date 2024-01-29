import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const gtmScript = (
  <Script id="gtm" strategy="afterInteractive">
    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PNKDKTFF');`}
  </Script>
);

const gtmNoScript = (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PNKDKTFF"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    }}
  ></noscript>
);

export default function Document() {
  return (
    <Html lang="en">
      <Head>{gtmScript}</Head>
      <body>
        {gtmNoScript}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
