'use client';

import React from 'react';

const DevNavigation = ({ setStep }) => {
  // Verifica se estamos em modo de desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="mt-8 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
      <p className="font-bold mb-2">Navegação de Desenvolvimento</p>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map(stepNumber => (
          <button
            key={stepNumber}
            onClick={() => setStep(stepNumber)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Etapa {stepNumber}
          </button>
        ))}
      </div>
      <p className="text-xs mt-2">
        Atenção: Esta navegação é apenas para desenvolvimento e testes.
      </p>
    </div>
  );
};

export default DevNavigation;
