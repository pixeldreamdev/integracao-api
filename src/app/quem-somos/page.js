import Image from 'next/image';

// Dados da seção
const quemSomosData = {
  titulo: 'Nossa História',
  subtitulo: 'Transformando sonhos em realidade através de soluções financeiras personalizadas',
  descricao: [
    'Desde 2018, a LWG Cred tem se dedicado a transformar a vida das pessoas através de soluções financeiras inteligentes e acessíveis. Nascemos com um propósito claro: democratizar o acesso ao crédito de forma transparente e humanizada.',
    'Nossa equipe é formada por profissionais apaixonados por fazer a diferença na vida das pessoas, sempre buscando as melhores condições e taxas do mercado para nossos clientes.',
  ],
  missao: {
    titulo: 'Propósito & Missão',
    texto:
      'Capacitar pessoas e empresas a realizarem seus objetivos financeiros, oferecendo soluções personalizadas e educação financeira que transformam vidas.',
  },
  diferenciais: [
    {
      titulo: 'Atendimento Humanizado',
      descricao:
        'Cada cliente é único, e nossa equipe está preparada para entender suas necessidades específicas',
    },
    {
      titulo: 'Transparência Total',
      descricao: 'Todas as informações são apresentadas de forma clara e objetiva, sem surpresas',
    },
    {
      titulo: 'Melhores Condições',
      descricao:
        'Parceria com as principais instituições financeiras para oferecer as taxas mais competitivas',
    },
  ],
  valores: [
    {
      titulo: 'Integridade',
      descricao: 'Compromisso inabalável com a ética e transparência em todas as nossas relações',
      icone: '🤝',
    },
    {
      titulo: 'Inovação',
      descricao:
        'Busca constante por soluções criativas e tecnológicas para melhor atender nossos clientes',
      icone: '💡',
    },
    {
      titulo: 'Empatia',
      descricao: 'Compreensão profunda das necessidades e sonhos de cada cliente',
      icone: '❤️',
    },
  ],
  imagem: '/images/image1.jpg',
};

export default function QuemSomos() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={quemSomosData.imagem}
          alt="LWG Cred Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 space-y-6">
            <h1 className="text-5xl md:text-7xl font-black text-white animate-fade-down">
              {quemSomosData.titulo}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-up">
              {quemSomosData.subtitulo}
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="container mx-auto px-4 py-20">
        {/* Nossa História */}
        <div className="max-w-4xl mx-auto space-y-6 mb-20">
          {quemSomosData.descricao.map((paragrafo, index) => (
            <p key={index} className="text-gray-300 text-lg leading-relaxed animate-fade-up">
              {paragrafo}
            </p>
          ))}
        </div>

        {/* Propósito & Missão */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 mb-20 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            {quemSomosData.missao.titulo}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">{quemSomosData.missao.texto}</p>
        </div>

        {/* Diferenciais */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {quemSomosData.diferenciais.map((diferencial, index) => (
            <div
              key={diferencial.titulo}
              className="bg-black/50 rounded-xl p-6 backdrop-blur-sm hover:bg-black/60 transition-all animate-fade-up"
            >
              <h3 className="text-primary text-xl font-bold mb-4">{diferencial.titulo}</h3>
              <p className="text-gray-300">{diferencial.descricao}</p>
            </div>
          ))}
        </div>

        {/* Valores */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 animate-fade-down">
          Nossos Valores
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {quemSomosData.valores.map(valor => (
            <div
              key={valor.titulo}
              className="group bg-gradient-to-b from-black/50 to-black/30 p-8 rounded-xl backdrop-blur-sm
                hover:from-primary/10 hover:to-primary/5 transition-all duration-300 animate-fade-up"
            >
              <span className="text-4xl mb-4 block">{valor.icone}</span>
              <h3 className="text-primary text-xl font-bold mb-4 group-hover:scale-105 transition-transform">
                {valor.titulo}
              </h3>
              <p className="text-gray-300">{valor.descricao}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
