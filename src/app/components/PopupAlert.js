'use client';

import React, { useState, useEffect } from 'react';

const PopupAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasSeenAlert = localStorage.getItem('seenAlert');
    if (!hasSeenAlert) {
      setIsVisible(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsVisible(false);
            localStorage.setItem('seenAlert', 'true');
            return prev;
          }
          return prev + 1;
        });
      }, 100); // Aumenta o progresso em 1% a cada 50ms.
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('seenAlert', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-lg text-center max-w-sm w-full relative">
        <h2 className="text-lg font-bold text-red-600 mb-4">Atenção</h2>
        <p className="mb-6 text-success">
          Não exigimos nenhum depósito ou pagamento para análise ou liberação de crédito.
        </p>
        <button
          onClick={handleClose}
          className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition-colors absolute top-2 right-2"
        >
          ✕
        </button>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;
