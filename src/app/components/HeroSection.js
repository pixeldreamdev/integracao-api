import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  const images = ['/images/credito1.jpg', '/images/credito.jpg', '/images/image1.jpg'];

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
        <div className="absolute -inset-1 bg-gradient-to-b from-black/55 to-black/70"></div>
      </div>

      {/* Conteúdo */}
      <div
        className={`relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6">
          <h1
            className="text-[2.7rem] md:text-5xl lg:text-6xl font-bold mb-7 
            [375px]:text-3xl [375px]:mb-2"
          >
            A Melhor Oferta de Crédito
          </h1>
          <p
            className="text-lg md:text-xl lg:text-2xl mb-12 
            [375px]:text-base [375px]:mb-14"
          >
            Rápido, sem burocracia e feito para você.
          </p>
          {/* Novo Container Personalizado */}
          <div className="main-container">
            {' '}
            <div className="headline-container">Dinheiro rápido</div>{' '}
            <div className="container-content">
              {' '}
              <hr className=" border-green-500 mb-4" />{' '}
              <p
                className=" text-green-600 text-[1.4rem] md:text-1xl font-extrabold mb-3 mt-10 leading-tight
               [375px]:text-[1.2rem]"
              >
                Empréstimo na Conta de Luz
              </p>{' '}
              <p
                className="text-lg mb-6
              [375px]:text-[0.95rem]"
              >
                Até R$ 1.500,00 sem comprovação de renda e liberado em até 24 horas.
              </p>{' '}
              {''}
              <div className="mt-4">
                {' '}
                <span className="block w-full h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 animate-pulse"></span>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
          <div className="space-y-4 md:space-x-4 md:space-y-0 flex flex-col md:flex-row items-center justify-center">
            <a
              href="/autocontratacao"
              className="bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer inline-block rounded-full font-bold py-4 px-8 shadow-lg transition-all duration-300"
              onClick={e => handleClick(e, '/autocontratacao')}
            >
              <span className="relative z-10">Fazer Simulação</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
