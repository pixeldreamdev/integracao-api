'use client';
import CountUp from 'react-countup';
import { AnimatedSection } from '../components/AnimatedSection';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GiOnTarget } from 'react-icons/gi';
import { MdOutlineEmojiObjects } from 'react-icons/md';
import { FcIdea } from 'react-icons/fc';
import { FaUserFriends } from 'react-icons/fa';

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const quemSomosData = {
  // Seção Hero
  hero: {
    titulo: 'Nossa História',
    subtitulo: 'Transformando sonhos em realidade desde 2022',
    imagem: '/images/image1.jpg',
  },

  // Apresentação da Empresa
  apresentacao: {
    titulo: 'LWG Cred',
    descricao:
      'Somos especialistas em soluções financeiras, focados em transformar a vida das pessoas através de crédito consciente e orientação financeira personalizada.',
    estatisticas: [
      { numero: '3+', texto: 'Anos no Mercado' },
      { numero: '10k+', texto: 'Clientes Atendidos' },
      { numero: '500M+', texto: 'em Créditos Liberados' },
    ],
  },

  // Missão, Visão e Valores
  institucional: {
    missao: {
      titulo: 'Nossa Missão',
      descricao:
        'Democratizar o acesso ao crédito de forma transparente e humanizada, contribuindo para o desenvolvimento financeiro dos nossos clientes.',
    },
    visao: {
      titulo: 'Nossa Visão',
      descricao:
        'Ser referência nacional em soluções financeiras, reconhecida pela excelência no atendimento e compromisso com o sucesso dos clientes.',
    },
    valores: [
      {
        titulo: 'Transparência',
        descricao: 'Clareza em todas as nossas relações',
        icone: <FaUserFriends size={40} />,
      },
      {
        titulo: 'Inovação',
        descricao: 'Buscando sempre as melhores soluções',
        icone: <FcIdea size={40} />,
      },
      {
        titulo: 'Empatia',
        descricao: 'Compreendendo as necessidades individuais',
        icone: '❤️',
      },
    ],
  },

  // Time e Liderança
  equipe: {
    titulo: 'Nossa Equipe',
    descricao: 'Conheça as pessoas que fazem a diferença',
    membros: [
      {
        nome: 'Gilma Araújo',
        cargo: 'CEO',
        foto: '/images/ceo.png',
      },
    ],
  },

  // Depoimentos
  depoimentos: [
    {
      texto: 'A LWG Cred mudou minha vida financeira completamente. O atendimento foi excepcional!',
      autor: 'Maria Santos',
      cargo: 'Empresária',
      foto: '/images/cartaoconsignado.jpeg',
    },
    {
      texto: 'A LWG Cred mudou minha vida financeira completamente. O atendimento foi excepcional!',
      autor: 'Maria Santos',
      cargo: 'Empresária',
      foto: '/images/fgts.jpg',
    },
    {
      texto: 'A LWG Cred mudou minha vida financeira completamente. O atendimento foi excepcional!',
      autor: 'Maria Santos',
      cargo: 'Empresária',
      foto: '/images/bolsafamilia.jpg',
    },
    {
      texto: 'A LWG Cred mudou minha vida financeira completamente. O atendimento foi excepcional!',
      autor: 'Maria Santos',
      cargo: 'Empresária',
      foto: '/images/pote.png',
    },
  ],
};

const QuemSomos = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-observe]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <section
        id="hero"
        data-observe
        className={`relative min-h-[80vh] flex items-center overflow-hidden transition-opacity duration-1000 ${
          isVisible['hero'] ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Suspense fallback={<LoadingFallback />}>
          <div className="absolute inset-0">
            <Image
              src={quemSomosData.hero.imagem}
              alt="LWG Cred Background"
              fill
              className="object-cover opacity-45 transform scale-105 hover:scale-100 transition-transform duration-1000"
              priority
            />
          </div>
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fadeIn" className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-primary to-secondary">
              {quemSomosData.hero.titulo}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {quemSomosData.hero.subtitulo}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="container mx-auto px-4 -mt-32 relative z-20">
        {/* Apresentação */}
        <div
          id="apresentacao"
          data-observe
          className={`bg-black/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 mb-16 transition-all duration-1000 ${
            isVisible['apresentacao'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {quemSomosData.apresentacao.titulo}
              </h2>
              <p className="text-gray-300 text-lg">{quemSomosData.apresentacao.descricao}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quemSomosData.apresentacao.estatisticas.map((stat, index) => {
                let suffix = '';

                // Definindo o sufixo com base no texto
                if (stat.texto.includes('Anos no Mercado')) {
                  suffix = '+';
                } else if (stat.texto.includes('Clientes Atendidos')) {
                  suffix = 'M+';
                } else if (stat.texto.includes('em Créditos Liberados')) {
                  suffix = 'M+';
                }

                return (
                  <div
                    key={index}
                    className="text-center p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary">
                      <CountUp
                        end={parseFloat(stat.numero.replace(/[^0-9.]/g, ''))}
                        duration={9.5}
                        separator=","
                        suffix={suffix} // Adiciona o sufixo apropriado
                      />
                    </div>
                    <div className="text-sm text-white">{stat.texto}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Missão e Visão */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatedSection animation="slideIn" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500">
              <span className="text-4xl mb-4 block transform group-hover:scale-105 transition-transform duration-300 text-yellow-500">
                <GiOnTarget size={40} />
              </span>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {quemSomosData.institucional.missao.titulo}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {quemSomosData.institucional.missao.descricao}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideIn" delay={0.2} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500">
              <span className="text-4xl mb-4 block transform group-hover:scale-105 transition-transform duration-300 text-yellow-500">
                <MdOutlineEmojiObjects size={40} />
              </span>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {quemSomosData.institucional.visao.titulo}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {quemSomosData.institucional.visao.descricao}
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Valores */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {quemSomosData.institucional.valores.map((valor, index) => (
            <AnimatedSection
              key={valor.titulo}
              animation="slideIn"
              delay={index * 0.2}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-500">
                <span className="text-4xl mb-4 block transform group-hover:scale-105 transition-transform duration-300 text-yellow-500">
                  {valor.icone}
                </span>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                  {valor.titulo}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {valor.descricao}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Equipe */}
        {/* <AnimatedSection animation="fadeIn" className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {quemSomosData.equipe.titulo}
          </h2>
          <p className="text-center text-gray-300 mb-8">{quemSomosData.equipe.descricao}</p>
          <div className="flex justify-center">
            <div className="relative w-40 h-40 mb-4 rounded-3xl overflow-hidden group">
              <Image
                src={quemSomosData.equipe.membros[0].foto}
                alt={`Foto de ${quemSomosData.equipe.membros[0].nome}, ${quemSomosData.equipe.membros[0].cargo}`}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white text-center">
            {quemSomosData.equipe.membros[0].nome}
          </h3>
          <p className="text-gray-400 text-center">{quemSomosData.equipe.membros[0].cargo}</p>
        </AnimatedSection> */}

        {/* Depoimentos */}
        {/* <div className="mb-16">
          <AnimatedSection animation="fadeIn" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              O que dizem nossos clientes
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="fadeIn" className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{
                clickable: true,
                el: '.swiper-pagination',
              }}
              className="py-8 px-4"
            >
              {quemSomosData.depoimentos.map((depoimento, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 h-full flex flex-col hover:border-primary/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={depoimento.foto}
                          alt={depoimento.autor}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="text-center md:text-left">
                        <p className="font-bold text-xl text-white mb-1">{depoimento.autor}</p>
                        <p className="text-sm text-gray-400">{depoimento.cargo}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute -top-4 left-0 text-5xl text-primary">"</span>
                      <p className="text-gray-300 italic text-lg leading-relaxed pt-2">
                        {depoimento.texto}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))} */}

        {/* Controles de navegação customizados */}
        {/* <div className="swiper-button-prev !text-primary after:!text-2xl"></div>
              <div className="swiper-button-next !text-primary after:!text-2xl"></div>
              <div className="swiper-pagination !bottom-0"></div>
            </Swiper>
          </AnimatedSection>
        </div> */}
      </section>
    </div>
  );
};

export default QuemSomos;
