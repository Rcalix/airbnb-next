import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // 
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';

const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'Z-50',
  delay: 100,
});
Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
