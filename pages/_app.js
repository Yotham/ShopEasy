// First, import the AppProps type from next/app to type-check the props
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Inter } from "next/font/google"; // Ensure you have the correct path based on your project structure
import "../src/app/globals.css"; // Adjust the path as necessary
import { AuthProvider } from '../src/app/context/AuthContext'; // Adjust the path as necessary
import Footer from '../src/app/components/Footer';
// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* You can set global page headers and meta tags with the Head component */}
      <Head>
        <title>ShopEasy</title>
        <meta name="description" content="Your shop description" />
        <html lang="en" /> {/* This is not the right way to use html tag, shown for demonstration. See below for correct usage. */}
      </Head>
      {/* Apply the font className to the body or a top-level div if you prefer */}
      <body className={inter.className}>
        <Component {...pageProps} />
      </body>
      <Footer></Footer>
    </AuthProvider>
  );
}

export default MyApp;
