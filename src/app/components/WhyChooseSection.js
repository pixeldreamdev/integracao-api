import { useState } from 'react';
import Image from 'next/image';

export default function WhyChooseSection() {
  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    {
      id: 1,
      title: '',
      description: 'Processo 100% online, sem burocracia e com aprovação em minutos.',
      image: '/images/image1.jpg',
      tag: 'Rápido e Fácil',
    },
    {
      id: 2,
      title: '',
      description: 'Oferecemos as melhores taxas do mercado para todos os nossos serviços.',
      image: '/images/fgts.jpg',
      tag: 'Taxas Competitivas',
    },
    {
      id: 3,
      title: '',
      description: 'Nossa equipe está pronta para atender suas necessidades específicas.',
      image: '/images/credito.jpg',
      tag: 'Atendimento Personalizado',
    },
  ];

  return (
    <section id="whyChoose" className="my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map(card => (
          <div
            key={card.id}
            className="relative group h-[400px] rounded-xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Tag superior */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-green-500/90 px-4 py-1 rounded-full text-sm">{card.tag}</span>
            </div>

            {/* Imagem e overlay */}
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

            {/* Conteúdo */}
            <div className="relative h-full p-6 flex flex-col justify-between z-10">
              {/* Título sempre visível */}
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">{card.title}</h3>

              {/* Descrição e botão que aparecem no hover */}
              <div
                className={`flex flex-col gap-4 transform transition-all duration-500
                  ${
                    activeCard === card.id ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
              >
                <p className="text-white text-lg leading-relaxed shadow-text">{card.description}</p>
                <button
                  className="bg-[#96F92C] text-black font-semibold py-3 px-6 rounded-lg 
                                 w-full hover:bg-[#7ed821] transition-colors"
                >
                  Simular
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
