import ModalChildren from '@/components/codeComponents/ModalChildren';
import Container from '@/components/container/Container';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Container>{params => <Component {...pageProps} />}</Container>;
}
