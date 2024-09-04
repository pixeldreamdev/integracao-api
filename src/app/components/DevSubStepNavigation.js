'use client';

import React from 'react';

const DevSubStepNavigation = ({ setCurrentSubStep, totalSubSteps }) => {
  // Verifica se estamos em modo de desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="mt-8 p-4 bg-purple-100 border-l-4 border-purple-500 text-purple-700">
      <p className="font-bold mb-2">Navegação de Desenvolvimento (SubSteps)</p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalSubSteps }, (_, i) => i + 1).map(stepNumber => (
          <button
            key={stepNumber}
            onClick={() => setCurrentSubStep(stepNumber)}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            SubStep {stepNumber}
          </button>
        ))}
      </div>
      <p className="text-xs mt-2">
        Atenção: Esta navegação é apenas para desenvolvimento e testes dos substeps.
      </p>
    </div>
  );
};

export default DevSubStepNavigation;
