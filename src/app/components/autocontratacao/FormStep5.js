'use client';

import React from 'react';

const FormStep5 = ({ nextStep, prevStep, handleChange, values }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Pré-Análise (Etapa 5)</h2>
      <p className="text-text-light mb-6">
        Nesta etapa, precisamos que você informe sua renda estimada para prosseguirmos com a análise.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Cliente</label>
            <p className="text-lg font-semibold text-primary">{values.nome}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <p className="text-lg text-primary">{values.cpf}</p>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="rendaEstimada" className="form-label">
            Renda estimada
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              R$
            </span>
            <input
              type="number"
              id="rendaEstimada"
              name="rendaEstimada"
              value={values.rendaEstimada || ''}
              onChange={(e) => handleChange('rendaEstimada', e.target.value)}
              className="form-input pl-8"
              placeholder="0,00"
              required
              min="0"
              step="0.01"
            />
          </div>
          <p className="form-helper-text">A renda estimada pode ser alterada posteriormente, se necessário.</p>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="form-button form-button-secondary"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="form-button form-button-primary"
          >
            Continuar
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
        <p className="font-medium">Dica:</p>
        <p className="text-sm">Forneça uma estimativa precisa da sua renda mensal. Isso nos ajudará a oferecer as melhores opções de empréstimo para você.</p>
      </div>
    </div>
  );
};

export default FormStep5;