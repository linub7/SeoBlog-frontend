import '../styles/globals.css';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress height={2} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
