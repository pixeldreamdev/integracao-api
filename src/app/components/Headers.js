'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a
          href="/"
          onClick={e => handleNavigation(e, '/')}
          className="text-2xl font-bold text-primary"
        >
          <strong> Lwg Cred</strong>
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/sobre"
                onClick={e => handleNavigation(e, '/quem-somos')}
                className="text-gray-600 hover:text-primary"
              >
                Quem Somos
              </a>
            </li>
            <li>
              <a
                href="/servicos"
                onClick={e => handleNavigation(e, '/servicos')}
                className="text-gray-600 hover:text-primary"
              >
                Serviços
              </a>
            </li>
            <li>
              <a
                href="/contato"
                onClick={e => handleNavigation(e, '/contato')}
                className="text-gray-600 hover:text-primary"
              >
                Contato
              </a>
            </li>
            <li>
              <a
                href="/autocontratacao"
                onClick={e => handleNavigation(e, '/autocontratacao')}
                className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-secondary-dark transition-colors"
              >
                Simular Empréstimo
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
