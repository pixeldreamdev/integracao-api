import React, { useEffect, useState } from 'react';
import { FaGooglePlay, FaApple, FaWhatsapp } from 'react-icons/fa';
import { updateProposta } from '../../lib/services/dbService';

const PropostaSuccess = ({ propostaId }) => {
  const [updateError, setUpdateError] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const updatePropostaStatus = async () => {
      if (!propostaId || isUpdated) return;

      try {
        await updateProposta({
          propostaId,
          status: 'ENVIADA',
          dataEnvio: new Date().toISOString(),
        });
        setIsUpdated(true); // Marcar como atualizado
        console.log('Status da proposta atualizado com sucesso.');
      } catch (error) {
        console.error('Erro ao atualizar status da proposta:', error);
        setUpdateError('Não foi possível atualizar o status da proposta no momento.');
      }
    };

    updatePropostaStatus();
  }, [propostaId, isUpdated]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Olá! Gostaria de saber mais sobre o status da minha proposta.'
    );
    window.open(`https://wa.me/5511954552255?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        Sua proposta foi cadastrada com sucesso!
      </h1>

      {/* {updateError && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
          role="alert"
        >
          <p>{updateError}</p>
        </div>
      )} */}

      <p className="mb-6 text-center">
        Agora você pode acompanhar sua proposta em nosso aplicativo:
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <a
          href="https://play.google.com/store/apps/details?id=com.crefaz.meu_crefaz&hl=pt_BR&gl=US&pli=1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
        >
          <FaGooglePlay className="mr-2" />
          Google Play
        </a>
        <a
          href="https://apps.apple.com/br/app/meu-crefaz/id1590148812"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
        >
          <FaApple className="mr-2" />
          App Store
        </a>
      </div>

      <div className="duvidas text-center">
        <p>Para dúvidas:</p>
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center mx-auto mt-4"
        >
          <FaWhatsapp className="mr-2" />
          Clique Aqui
        </button>

        <p className="mt-8 text-gray-600">
          Número da proposta: <span className="font-bold ">{propostaId}</span>
        </p>
      </div>
    </div>
  );
};

export default PropostaSuccess;
