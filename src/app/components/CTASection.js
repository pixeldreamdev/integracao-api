import React from 'react';
import Image from 'next/image';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-black py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
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

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Aprovação em até 24h
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Parcelas que cabem no seu bolso
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Melhores Taxas
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="image-container">
              <Image
                src="/images/casal.jpg"
                alt="Imagem de exemplo"
                width={400}
                height={400}
                className="object-cover rounded-lg image"
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
