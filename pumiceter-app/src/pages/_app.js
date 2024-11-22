import "@/styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>Pumiceter - Innovative Solutions for a Better Future</title>
        <meta
          name="description"
          content="Pumiceter.com offers innovative solutions tailored to your needs. Discover a future of possibilities with our cutting-edge services and products."
        />
        <meta
          name="keywords"
          content="Pumiceter, innovative solutions, technology, cutting-edge services, future, smart tools, innovation"
        />
        <meta name="author" content="Pumiceter Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Social Media */}
        <meta
          property="og:title"
          content="Pumiceter - Innovative Solutions for a Better Future"
        />
        <meta
          property="og:description"
          content="Discover Pumiceter.com, where innovation meets excellence. Explore our advanced services and tools designed to shape a smarter tomorrow."
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
          content="Pumiceter - Innovative Solutions for a Better Future"
        />
        <meta
          name="twitter:description"
          content="Step into the future with Pumiceter.com. Experience innovation and excellence like never before."
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
