'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e, path) => {
    e.preventDefault();
    if (pathname !== path) {
      router.push(path);
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={e => handleNavigation(e, '/')}
          className={`text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-primary' : 'text-secondary-dark'
          }`}
        >
          <strong>Lwg Cred</strong>
        </a>

        {/* Botão de menu hambúrguer */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-gray-600 focus:outline-none ml-auto"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-colors duration-300 ${
              isScrolled ? 'text-gray-600' : 'text-white'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navegação */}
        <nav
          className={`absolute lg:static bg-white lg:bg-transparent top-16 left-0 right-0 p-4 lg:p-0 transition-transform transform lg:transform-none ${
            menuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-6 shadow-md lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-6 w-full lg:w-auto space-y-4 lg:space-y-0 text-center">
            <li>
              <a
                href="/quem-somos"
                onClick={e => handleNavigation(e, '/quem-somos')}
                className={`text-lime-600 ${
                  isScrolled ? 'hover:text-black' : 'hover:text-yellow-500'
                } transition-colors duration-300`}
              >
                Quem Somos
              </a>
            </li>
            <li>
              <a
                href="/servicos"
                onClick={e => handleNavigation(e, '/servicos')}
                className={`text-lime-600 ${
                  isScrolled ? 'hover:text-black' : 'hover:text-yellow-500'
                } transition-colors duration-300`}
              >
                Serviços
              </a>
            </li>
            <li>
              <a
                href="/contato"
                onClick={e => handleNavigation(e, '/contato')}
                className={`text-lime-600 ${
                  isScrolled ? 'hover:text-black' : 'hover:text-yellow-500'
                } transition-colors duration-300`}
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>

        {/* Botão "Simular Empréstimo" */}
        <div className="hidden lg:block">
          <a
            href="/autocontratacao"
            onClick={e => handleNavigation(e, '/autocontratacao')}
            className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-secondary-dark transition-colors"
          >
            Simular Empréstimo
          </a>
        </div>
      </div>

      {/* Botão "Simular Empréstimo" em telas pequenas */}
      <div className={`lg:hidden w-full text-center mt-4 ${menuOpen ? 'block' : 'hidden'}`}>
        <a
          href="/autocontratacao"
          onClick={e => handleNavigation(e, '/autocontratacao')}
          className="bg-secondary text-primary font-semibold py-2 px-4 rounded hover:bg-secondary-dark transition-colors inline-block"
        >
          Simular Empréstimo
        </a>
      </div>
    </header>
  );
};

export default Header;
