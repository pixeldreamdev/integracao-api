import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Pronto para realizar seus objetivos?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Faça sua simulação agora mesmo e descubra as melhores condições para seu empréstimo.
        </p>
        <Link
          href="/autocontratacao"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
        >
          Simular Agora
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
