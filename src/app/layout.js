import './globals.css';
import Header from './components/Headers';

export const metadata = {
  title: 'LWG CRED',
  description: 'Solicite seu empréstimo de forma rápida e segura',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100 py-4 text-center">
          <p>&copy; 2024 Lwg Cred. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
