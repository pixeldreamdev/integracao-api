import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
        A melhor oferta de crédito está aqui
        <p>Rápido e sem burocracia.</p>
        <p className="text-4xl md:text-2xl font-bold mb-4 text-secondary">
          Realizar seus sonhos nunca foi tão simples
        </p>
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-secondary">Dinheiro Rápido</h2>
        <p className="mb-6 text-gray-600">
          As parcelas vêm junto com o boleto da sua conta de luz. Até R$1.500,00, sem comprovação de
          renda, mesmo para negativados, e liberadas em até 24 horas, tudo feito de forma digital!
        </p>
        <div className="space-x-4">
          <a
            href="/autocontratacao"
            className="bg-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-dark transition-colors"
          >
            Fazer Simulação
          </a>
          {/* <a
            href="#servicos"
            className="bg-secondary text-primary font-semibold py-3 px-6 rounded-full hover:bg-secondary-dark transition-colors"
          >
            Saber Mais
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
