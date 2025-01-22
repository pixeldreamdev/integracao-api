import './globals.css';
import Header from './components/Headers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Open_Sans } from 'next/font/google';
import Image from 'next/image';
import Footer from './components/Footer';

const font = Open_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'LWG CRED',
  description: 'Solicite seu empréstimo de forma rápida e segura',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        <Header />
        <SpeedInsights />
        <main className="flex-grow">{children} </main>
        <Footer />
      </body>
    </html>
  );
}
