import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  const images = ['/images/image1.jpg', '/images/image2.jpg'];

  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768; // Define como mobile dispositivos com largura ≤ 768px
    }
    return false;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const sectionElement = document.getElementById('heroSection');
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prevImage => (prevImage + 1) % images.length);
    }, 5000); // Troca a imagem a cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const handleClick = async (e, path) => {
    e.preventDefault();
    if (isMobile()) {
      const button = e.currentTarget;
      button.classList.add('animate-loading'); // Adiciona uma classe para animação

      await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda 1 segundo
    }
    router.push(path);
  };

  return (
    <section
      id="heroSection"
      className="relative flex items-center justify-center w-full h-screen overflow-hidden text-center text-white"
    >
      {/* Imagem de Fundo */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={images[currentImage]}
          alt="Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          className="animate-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>
      </div>

      {/* Conteúdo */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeIn">
          A Melhor Oferta de Crédito
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-medium mb-6 animate-slideIn">
          Rápido, sem burocracia e feito para você.
        </p>
        <div className="space-y-4 md:space-x-4 md:space-y-0 flex flex-col md:flex-row items-center justify-center">
          <a
            href="/autocontratacao"
            className="button relative bg-yellow-600 text-black font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 hover:bg-yellow-600 transition-all duration-300"
            onClick={e => handleClick(e, '/autocontratacao')}
          >
            <span className="absolute inset-0 bg-yellow-600 opacity-0 transition-opacity duration-300 rounded-full"></span>
            <span className="relative z-10">Fazer Simulação</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
