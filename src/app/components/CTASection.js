import React from 'react';
import Image from 'next/image';

const CTASection = () => {
  return (
    <section className="w-full h-full bg-gradient-to-b from-black via-transparent to-white/10 py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-white/20" />
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/20" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row-reverse items-center">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 lg:pl-12 mt-8 lg:mt-0 text-center lg:text-left">
            <h2 className="font-custom text-[2.40rem] md:text-[3.1rem] font-bold text-white mb-6 leading-tight">
              Realize seus sonhos com as melhores taxas do mercado
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Faça uma simulação gratuita e descubra quanto você pode emprestar com condições
              especiais personalizadas para você
            </p>

            <div className="mt-12 flex flex-col items-center space-y-4 text-green-500 text-sm lg:text-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Parcelas que cabem no seu bolso
              </div>
              <div className="flex items-center gap-2 ml-[-4.5rem] lg:ml-[-5.8rem]">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Aprovação em até 24h
              </div>
              <div className="flex items-center gap-2 ml-[-7.5rem] lg:ml-[-9.5rem]">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Melhores Taxas
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start xl:-ml-20">
            <div className="image-container">
              <Image
                src="/images/casal.jpg"
                alt="Imagem de exemplo"
                width={400}
                height={400}
                className="object-cover rounded-lg image xl:w-[500px] xl:h-[500px]"
              />
              <div className="info-overlay">
                <button onClick={() => (window.location.href = '/autocontratacao')}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a
                      href="/autocontratacao"
                      className="button relative bg-black text-primary font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 hover:bg-black transition-all duration-300"
                      onClick={e => handleClick(e, '/autocontratacao')}
                    >
                      <span className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 rounded-full"></span>
                      <span className="relative z-10">Fazer Simulação</span>
                    </a>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
