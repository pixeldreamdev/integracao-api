'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll(); // Verifica a posição inicial do scroll
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Adiciona margin-top na seção de serviços para evitar sobreposição pelo header fixo
    const section = document.getElementById('services');
    if (section) {
      section.style.scrollMarginTop = '120px'; // Ajuste conforme a altura do header
    }
  }, []);

  const handleNavigation = (e, path) => {
    e.preventDefault();

    if (path === '#services') {
      const section = document.getElementById('services');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
      setMenuOpen(false);
      return;
    }

    if (path === '/') {
      window.location.href = '/';
      return;
    }

    if (pathname !== path) {
      router.push(path);
    }
    setMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const menuItems = [
    { path: 'quem-somos', label: 'Quem Somos' },
    { path: '#services', label: 'Serviços' },
    { path: 'https://wa.me/5511958255717', label: 'Contato' },
    { path: '/autocontratacao', label: 'Simular Empréstimo' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'water-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <a
          href="/"
          onClick={e => handleNavigation(e, '/')}
          className={`text-2xl font-bold rounded-full py-2 px-4 transition-colors duration-300 ${
            isScrolled ? 'text-white' : 'text-lime-600'
          }`}
        >
          <strong>Lwg Cred</strong>
        </a>

        <nav className="hidden lg:flex lg:items-center lg:space-x-6">
          <ul className="flex flex-row space-x-6 text-center">
            {menuItems.slice(0, 3).map(item => (
              <li key={item.path}>
                <a
                  href={item.path}
                  onClick={e => handleNavigation(e, item.path)}
                  className={`relative text-1xl font-bold overflow-hidden rounded-full py-2 px-4 transition-colors duration-300 group ${
                    isScrolled ? 'text-white' : 'text-lime-600'
                  }`}
                >
                  <span className="absolute inset-0 bg-lime-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></span>
                  <span className="relative z-10 hover:text-black">
                    <strong>{item.label}</strong>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <a
            href="/autocontratacao"
            onClick={e => handleNavigation(e, '/autocontratacao')}
            className={`text-xl font-bold rounded-full py-2 px-4 transition-colors duration-300 relative overflow-hidden group ${
              isScrolled ? 'text-white' : 'text-lime-600'
            }`}
          >
            <span className="absolute inset-0 bg-lime-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></span>
            <span className="relative z-10 hover:text-black">
              <strong>Simular Empréstimo</strong>
            </span>
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden relative z-50 p-2 rounded-lg bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-colors duration-200"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute h-0.5 w-6 bg-yellow-600 transform transition-all duration-300 ease-in-out ${
                menuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-yellow-600 transform transition-all duration-300 ease-in-out translate-y-2 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out translate-y-4 ${
                menuOpen ? '-rotate-45 -translate-y-0' : 'translate-y-4'
              }`}
            />
          </div>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute top-0 left-0 right-0 min-h-screen water-effect shadow-xl lg:hidden z-40"
            >
              <div className="pt-20 px-30 pb-8 space-y-2">
                {menuItems.map(item => (
                  <motion.a
                    key={item.path}
                    href={item.path}
                    onClick={e => handleNavigation(e, item.path)}
                    className="relative block py-3 px-4 text-lg font-medium text-lime-600 hover:text-yellow-500 overflow-hidden rounded-lg group"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-lime-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 rounded-lg"></span>
                    <span className="relative z-10">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
