import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import '@styles/prism-dracula-theme.css';

const Providers = dynamic(() => import('@components/Providers'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default App;
