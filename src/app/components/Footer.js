import Link from 'next/link';
import { FaEnvelope, FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const footerLinks = [
    {
      title: 'Institucional',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Quem Somos', href: '/quem-somos' },
        { label: 'Serviços', href: '/#services' },
        // ... outros links existentes
      ],
    },
    // ... outras seções do footer
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Grade principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Coluna 1 - Sobre */}
          <div className="space-y-4 transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-primary">LwgCred</h3>
            <p className="text-gray-300 leading-relaxed">
              Transformando vidas através de soluções financeiras inteligentes e personalizadas para
              cada cliente.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="https://www.facebook.com/lwgcred"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/lwgcred/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              {/* <a
                href="https://www.linkedin.com/company/lwgcred"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <FaLinkedin size={24} />
              </a> */}
            </div>
          </div>

          {/* Coluna 2 - Serviços */}
          <div className="transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-6 text-primary">Nossos Serviços</h3>
            <ul className="space-y-3">
              <li className="relative group">
                <Link
                  href="/autocontratacao"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Empréstimo na Conta de Luz
                </Link>
              </li>
              <li className="relative group">
                <a
                  href="https://wa.me/5511958255717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Débito em Conta
                </a>
              </li>
              <li className="relative group">
                <a
                  href="https://wa.me/5511958255717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Cartão Consignado
                </a>
              </li>
              <li className="relative group">
                <a
                  href="https://wa.me/5511958255717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Portabilidade do Consignado
                </a>
              </li>
              <li className="relative group">
                <a
                  href="https://wa.me/5511958255717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Antecipação Saque-Aniversário FGTS
                </a>
              </li>
              <li className="relative group">
                <a
                  href="https://wa.me/5511958255717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Empréstimo pessoal bolsa família
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Links Rápidos */}
          <div className="transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-6 text-primary">Links Rápidos</h3>
            <ul className="space-y-3">
              <li className="relative group">
                <Link
                  href="#services"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Quem Somos
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href="#services"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Serviços
                </Link>
              </li>
              <li className="relative group">
                <a
                  href="https://wa.me/5511958255717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Contato
                </a>
              </li>
              <li className="relative group">
                <Link
                  href="/autocontratacao"
                  className="text-gray-300 transition-colors cursor-pointer inline-block p-1 rounded-lg relative overflow-hidden hover:bg-gradient-to-r hover:from-primary hover:to-primary/50 group-hover:text-black w-fit"
                >
                  Simular Empréstimo
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div className="transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-6 text-primary">Fale Conosco</h3>
            <div className="space-y-4">
              <a
                href="mailto:lwgcred@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-primary transition-colors group"
              >
                <FaEnvelope className="mr-3 text-primary" />
                <span>lwgcred@gmail.com</span>
              </a>
              <a
                href="https://wa.me/5511958255717"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-primary transition-colors group"
              >
                <FaWhatsapp className="mr-3 text-green-500" />
                <span>(11) 95825-5717</span>
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} LwgCred. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
