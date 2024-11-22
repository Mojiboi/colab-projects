import "@/styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>Pumiceter - Best Pumice Powder and Stone Website</title>
        <meta
          name="description"
          content="Pumiceter.com is the ultimate destination for pumice, pumice powder, pumice stone, and meshed pumice products. Discover the best pumice powder websites and explore a range of premium pumice products."
        />
        <meta
          name="keywords"
          content="Pumiceter, pumice, pumice powder, pumice stone, pumice mesh powder, pumice meshed 200mg, pumice meshed 300mg, best pumice website, pumice powder websites"
        />
        <meta name="author" content="Pumiceter Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Pumiceter - Best Pumice Powder and Stone Website"
        />
        <meta
          property="og:description"
          content="Find premium pumice products, including pumice powder and pumice stone, at Pumiceter.com. The best pumice powder website for quality and reliability."
        />
        <meta
          property="og:image"
          content="https://pumiceter.com/assets/og-image.jpg"
        />
        <meta property="og:url" content="https://pumiceter.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pumiceter - Best Pumice Powder and Stone Website"
        />
        <meta
          name="twitter:description"
          content="Discover the best pumice powder, pumice stone, and meshed pumice products on Pumiceter.com."
        />
        <meta
          name="twitter:image"
          content="https://pumiceter.com/assets/og-image.jpg"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
