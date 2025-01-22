import React, { useEffect, useState } from 'react';
import { FaLightbulb, FaSync, FaCreditCard, FaCalendar, FaWallet } from 'react-icons/fa';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const icons = {
  lightbulb: FaLightbulb,
  refresh: FaSync,
  'credit-card': FaCreditCard,
  calendar: FaCalendar,
  wallet: FaWallet,
};

const ServiceSlide = ({ title, description, icon, image }) => {
  const Icon = icons[icon];

  return (
    <div className="h-full w-full px-2">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-black/95 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-green-600/20">
        <div className="absolute left-4 top-4 z-20">
          <span className="inline-block rounded-full bg-yellow-500 px-4 py-1 shadow-lg shadow-yellow-500/20">
            <small className="text-sm font-bold text-black">Empréstimos</small>
          </span>
        </div>

        <div className="relative h-[280px] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={400}
            height={320}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <h3 className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xl font-bold text-white transition-colors group-hover:text-yellow-500">
            {title}
            <ArrowUpRight className="h-6 w-6 transform text-green-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-yellow-500" />
          </h3>
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <p className="mb-6 text-gray-300">{description}</p>

          <button className="group relative w-full overflow-hidden rounded-lg bg-green-600 py-3 text-center font-medium text-white transition-all hover:bg-green-700">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Simular Agora
              <Icon className="h-4 w-4 transform transition-transform duration-300 group-hover:rotate-12" />
            </span>
            <div className="absolute inset-0 z-0 h-full w-0 bg-gradient-to-r from-yellow-500 to-green-600 transition-all duration-300 group-hover:w-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ServicesCarousel = ({ isServiceVisible }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  const servicesData = [
    {
      title: 'Empréstimo na Conta de Luz',
      description:
        'Sem comprovação de renda, mesmo para negativados, e liberadas em até 24 horas, tudo feito de forma digital!',
      icon: 'lightbulb',
      image: '/images/loan.jpg',
    },
    {
      title: 'Portabilidade do Consignado',
      description: 'Saia das taxas abusivas e pague até 30% mais barato.',
      icon: 'refresh',
      image: '/images/portability.jpg',
    },
    {
      title: 'Cartão Consignado',
      description: 'Desconto em medicamentos, menor taxa entre os cartões de crédito.',
      icon: 'credit-card',
      image: '/images/credit-card.jpg',
    },
    {
      title: 'Antecipação Saque-Aniversário FGTS',
      description: 'Para aposentados, beneficiários do INSS ou servidores públicos.',
      icon: 'calendar',
      image: '/images/fgts.jpg',
    },
    {
      title: 'Débito em Conta',
      description:
        'Dinheiro rápido e sem burocracia para você utilizar como quiser, tudo em até 24 horas.',
      icon: 'wallet',
      image: '/images/debit.jpg',
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(current =>
      current >= servicesData.length - slidesToShow ? 0 : current + slidesToShow
    );
  };

  const prevSlide = () => {
    setCurrentSlide(current =>
      current <= 0 ? servicesData.length - slidesToShow : current - slidesToShow
    );
  };

  return (
    <section
      id="services"
      className={`relative mx-auto max-w-7xl px-4 py-16 transition-opacity duration-1000 ${
        isServiceVisible ? 'opacity-100' : 'opacity-0'
      } scroll-mt-24`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="mb-16 text-center">
        <span className="inline-block rounded-full bg-green-600/20 px-4 py-2 text-sm font-semibold text-green-600">
          Nossas Soluções
        </span>
        <h2 className="mb-4 mt-4 text-4xl font-bold text-white">
          Serviços Financeiros
          <span className="ml-2 text-yellow-500">Personalizados</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          Conheça as melhores soluções financeiras adaptadas às suas necessidades
        </p>
      </div>

      <div className="relative">
        <button
          onClick={prevSlide}
          className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-green-600 p-2 text-white shadow-lg transition-all hover:bg-yellow-500 hover:text-black disabled:opacity-50 lg:-left-8"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-green-600 p-2 text-white shadow-lg transition-all hover:bg-yellow-500 hover:text-black disabled:opacity-50 lg:-right-8"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(currentSlide * 100) / slidesToShow}%)`,
              width: `${(servicesData.length * 100) / slidesToShow}%`,
            }}
          >
            {servicesData.map((service, index) => (
              <div key={index} style={{ width: `${100 / slidesToShow}%` }}>
                <ServiceSlide {...service} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(servicesData.length / slidesToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index * slidesToShow)}
              className={`h-2 w-8 rounded-full transition-all ${
                currentSlide === index * slidesToShow
                  ? 'bg-yellow-500'
                  : 'bg-green-600/30 hover:bg-green-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
