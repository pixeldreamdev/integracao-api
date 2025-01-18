'use client';

import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import CTASection from './components/CTASection';
import PopupAlert from './components/PopupAlert';
import { FaEnvelope, FaWhatsapp, FaArrowUp } from 'react-icons/fa';
import SwiperComponent from './components/SwiperComponent';
import WhyChooseSection from './components/WhyChooseSection';
import Link from 'next/link';

export default function Home() {
  const [isWhyVisible, setIsWhyVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Smooth Scroll para links internos
    const handleSmoothScroll = e => {
      const targetId = e.target.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Observer para a seção "Por que escolher"
    const observeVisibility = (targetId, setVisible) => {
      const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
        rootMargin: '0px',
        threshold: 0.3,
      });

      const element = document.getElementById(targetId);
      if (element) observer.observe(element);

      return () => {
        if (element) observer.unobserve(element);
      };
    };

    const cleanupWhyObserver = observeVisibility('whyChoose', setIsWhyVisible);

    // Adicionar controle de visibilidade do botão de scroll
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
      cleanupWhyObserver();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10 min-h-screen">
        <PopupAlert />
        <HeroSection />
        <SwiperComponent />
        {/* <span className="block w-full h-1 bg-gradient-to-r from-primary via-black to-primary animate-pulse"></span> */}
        <CTASection />
        <main className="container mx-auto px-4 py-8 -mt-8">
          <WhyChooseSection />
        </main>

        {/* Botão flutuante para voltar ao topo */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-primary/80 z-50 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          aria-label="Voltar ao topo"
        >
          <FaArrowUp className="text-xl" />
        </button>

        <footer className="bg-black text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Sobre a LwgCred</h3>
                <p>
                  Somos uma empresa comprometida em oferecer as melhores soluções financeiras para
                  nossos clientes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/sobre"
                      className="hover:underline cursor-pointer transition-colors"
                    >
                      Quem Somos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#services"
                      className="hover:underline cursor-pointer transition-colors"
                    >
                      Serviços
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contato"
                      className="hover:underline cursor-pointer transition-colors"
                    >
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/autocontratacao"
                      className="hover:underline cursor-pointer transition-colors"
                    >
                      Simular Empréstimo
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contato</h3>
                <p className="flex items-center mb-2 hover:text-primary transition-colors">
                  <FaEnvelope className="mr-2" />
                  <a href="mailto:lwgcred@gmail.com" className="hover:underline cursor-pointer">
                    lwgcred@gmail.com
                  </a>
                </p>
                <p className="flex items-center hover:text-primary transition-colors">
                  <FaWhatsapp className="mr-2 text-green-500" />
                  <a
                    href="https://wa.me/5511958255717"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline cursor-pointer"
                  >
                    (11) 95825-5717
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
