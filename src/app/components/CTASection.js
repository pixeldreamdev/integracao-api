import React from 'react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-primary text-white py-16 rounded-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Faça uma simulação agora e descubra quanto você pode emprestar com as melhores taxas do
          mercado!
        </p>
        <a
          href="/autocontratacao"
          className="bg-white text-primary font-semibold py-3 px-8 rounded-full hover:bg-yellow-500 hover:text-white transition-colors"
        >
          Simular Empréstimo
        </a>
      </div>
    </section>
  );
};

export default CTASection;
