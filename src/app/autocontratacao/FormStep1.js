'use client';

import React, { useState } from 'react';
import { checkExistingProposta } from '../lib/services/dbService';

const FormStep1 = ({ nextStep, handleChange, values }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Enviando CPF:', values.cpf);
      const result = await checkExistingProposta(values.cpf);

      if (result && result.exists) {
        handleChange('propostaId', result.propostaId);
        // Adicione aqui qualquer lógica adicional para lidar com propostas existentes
        console.log('Proposta existente encontrada:', result.propostaId);
      } else {
        console.log('Nenhuma proposta existente encontrada');
      }

      nextStep();
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError('Ocorreu um erro ao verificar o CPF. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Consulta de Proposta</h2>
      <p className="text-text-light mb-6">
        Para iniciar sua simulação de empréstimo, por favor, informe seu CPF abaixo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={values.cpf || ''}
            onChange={e => handleChange('cpf', e.target.value)}
            className="form-input"
            placeholder="000.000.000-00"
            required
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            title="Digite um CPF válido no formato: 000.000.000-00"
          />
          <p className="form-helper-text">Digite apenas números ou use o formato: 000.000.000-00</p>
        </div>

        <div className="form-field">
          <button
            type="submit"
            className={`form-button form-button-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Consultando...' : 'Consultar Proposta'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FormStep1;
