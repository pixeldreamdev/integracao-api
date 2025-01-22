import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-bg.jpg"
        alt="Background"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 animate-fade-down">
          Crédito Inteligente para Realizar Seus Sonhos
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-up">
          Soluções financeiras personalizadas com as melhores taxas do mercado
        </p>
        <Link
          href="/autocontratacao"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 animate-fade-up"
        >
          Simular Agora
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
