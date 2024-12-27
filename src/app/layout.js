import './globals.css';
import Header from './components/Headers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Open_Sans } from 'next/font/google';
import Image from 'next/image';

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

        <footer className="bg-gray-100 py-4 text-center">
          <p>&copy; 2024 Lwg Cred. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
