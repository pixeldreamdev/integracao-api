import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function WhyChooseSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
      }
    );

    const currentElement = contentRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const cards = [
    {
      id: 1,
      title: '',
      description: 'Processo 100% online, sem burocracia e com aprovação em minutos.',
      image: '/images/image1.jpg',
      tag: 'Rápido e Fácil',
      buttonText: 'Contratar Agora',
      buttonLink: '/autocontratacao',
    },
    {
      id: 2,
      title: '',
      description: 'Oferecemos as melhores taxas do mercado para todos os nossos serviços.',
      image: '/images/fgts.jpg',
      tag: 'Taxas Competitivas',
      buttonText: 'Fale Conosco',
      buttonLink: 'https://wa.me/5511958255717',
    },
    {
      id: 3,
      title: '',
      description: 'Nossa equipe está pronta para atender suas necessidades específicas.',
      image: '/images/credito.jpg',
      tag: 'Atendimento Personalizado',
      buttonText: 'Falar com Consultor',
      buttonLink: 'https://wa.me/5511958255717',
    },
  ];

  return (
    <section
      id="whyChoose"
      className="w-full h-full bg-gradient-to-b from-gray-900 via-transparent to-gray-900 py-24"
    >
      <div ref={contentRef}>
        <div
          className={`text-center mb-12 transform transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-[2.5rem] text-center md:text-[2.3rem] font-bold text-primary mb-4">
            Por que escolher a Lwg Cred ?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`relative group h-[400px] rounded-xl overflow-hidden cursor-pointer
                  transition-all duration-1000 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveCard(card.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-green-500/90 px-4 py-1 rounded-full text-sm">{card.tag}</span>
                </div>

                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-500
                      ${activeCard === card.id ? 'bg-black/40' : 'bg-black/50 backdrop-blur-[2px]'}`}
                  />
                </div>

                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">{card.title}</h3>

                  <div
                    className={`flex flex-col gap-4 transform transition-all duration-500
                      ${
                        activeCard === card.id
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-8 opacity-0'
                      }`}
                  >
                    <p className="text-white text-lg leading-relaxed shadow-text">
                      {card.description}
                    </p>
                    <button
                      onClick={() => (window.location.href = card.buttonLink)}
                      className="bg-[#96F92C] text-black font-semibold py-3 px-6 rounded-lg 
                               w-full hover:bg-[#7ed821] transition-colors"
                    >
                      {card.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
