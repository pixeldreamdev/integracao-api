import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    // '/images/image3.jpg', // Adicione mais URLs de imagens conforme necessário
  ];

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

  const handleClick = (e, path) => {
    e.preventDefault();
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
    <section className="text-center py-16 mt-40">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
        A melhor oferta de crédito
        <p>Rápido e sem burocracia.</p>
        <p className="text-4xl md:text-2xl font-bold mb-4 text-secondary mt-5">
          Realizar seus sonhos nunca foi tão simples
        </p>
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-secondary">Dinheiro Rápido</h2>
        <p className="mb-6 text-gray-600">
          As parcelas vêm junto com o boleto da sua conta de luz. Até R$1.500,00, sem comprovação de
          renda, mesmo para negativados, e liberadas em até 24 horas, tudo feito de forma digital!
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
