'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import ServiceBox from './components/ServiceBox';
import CTASection from './components/CTASection';
import PopupAlert from './components/PopupAlert';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      <PopupAlert />

      <main className="container mx-auto px-4 py-8">
        <HeroSection />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceBox
              title="Empréstimo na Conta de Luz"
              description="Sem comprovação de renda, mesmo para negativados, e liberadas em até 24 horas, tudo feito de forma digital!"
              icon="lightbulb"
            />
            <ServiceBox
              title="Portabilidade do Consignado"
              description="Saia das taxas abusivas e pague até 30% mais barato."
              icon="refresh"
            />
            <ServiceBox
              title="Cartão Consignado"
              description="Desconto em medicamentos, menor taxa entre os cartões de crédito."
              icon="credit-card"
            />
            <ServiceBox
              title="Antecipação Saque-Aniversário FGTS"
              description="Para aposentados, beneficiários do INSS ou servidores públicos."
              icon="calendar"
            />
            <ServiceBox
              title="Débito em Conta"
              description="Dinheiro rápido e sem burocracia para você utilizar como quiser, tudo em até 24 horas."
              icon="wallet"
            />
          </div>
        </section>

        <CTASection />

        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8  text-primary">
            Por que escolher a Lwg Cred ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Rápido e Fácil</h3>
              <p>Processo 100% online, sem burocracia e com aprovação em minutos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Taxas Competitivas</h3>
              <p>Oferecemos as melhores taxas do mercado para todos os nossos serviços.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Atendimento Personalizado</h3>
              <p>Nossa equipe está pronta para atender suas necessidades específicas.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sobre a LwgCred</h3>
              <p>
                Somos uma empresa comprometida em oferecer as melhores soluções financeiras para
                nossos clientes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
              <ul>
                <li>
                  <a href="/sobre" className="hover:underline">
                    Quem Somos
                  </a>
                </li>
                <li>
                  <a href="/servicos" className="hover:underline">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="/contato" className="hover:underline">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="/autocontratacao" className="hover:underline">
                    Simular Empréstimo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contato</h3>
              <p>Email: contato@crefaz.com</p>
              <p>Telefone: (11) 1234-5678</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
