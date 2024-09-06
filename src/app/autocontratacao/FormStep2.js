'use client';

import React, { useState, useEffect } from 'react';
import { makeApiCall } from '../api/auth/crefazApi';

const FormStep2 = ({ nextStep, prevStep, handleChange, values }) => {
  const [ocupacoes, setOcupacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOcupacoes = async () => {
      console.log('Iniciando busca de ocupações...');
      try {
        const response = await makeApiCall('get', '/Contexto/ocupacao');
        console.log('Resposta completa da API:', response);

        if (response.success && Array.isArray(response.data)) {
          setOcupacoes(response.data);
        } else {
          console.error('Formato de resposta inválido:', response);
          setError('Formato de dados de ocupações inválido.');
        }
      } catch (err) {
        console.error('Erro ao carregar ocupações:', err);
        setError('Falha ao carregar ocupações. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchOcupacoes();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    nextStep();
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Pré-Análise (Etapa 2)</h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <p className="text-text-light mb-6">
        Por favor, preencha os dados abaixo para continuarmos com a sua simulação de empréstimo.
      </p>

      <div className="form-field">
        <label htmlFor="nome" className="form-label">
          Nome completo
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={values.nome || ''}
          onChange={e => handleChange('nome', e.target.value)}
          className="form-input"
          required
        />
      </div>

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
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="dataNascimento" className="form-label">
          Data de nascimento
        </label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          value={values.dataNascimento || ''}
          onChange={e => handleChange('dataNascimento', e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="telefone" className="form-label">
          Telefone
        </label>
        <input
          type="tel"
          id="telefone"
          name="telefone"
          value={values.telefone || ''}
          onChange={e => handleChange('telefone', e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="ocupacao" className="form-label">
          Ocupação
        </label>
        <select
          id="ocupacao"
          name="ocupacao"
          value={values.ocupacao || ''}
          onChange={e => handleChange('ocupacao', e.target.value)}
          className="form-select"
          required
        >
          <option value="">Selecione a ocupação</option>
          {ocupacoes.length > 0 ? (
            ocupacoes.map(ocupacao => (
              <option key={ocupacao.id} value={ocupacao.id}>
                {ocupacao.nome}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Nenhuma ocupação disponível
            </option>
          )}
        </select>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="form-button form-button-secondary">
          Voltar
        </button>
        <button type="submit" className="form-button form-button-primary">
          Continuar
        </button>
      </div>
    </form>
  );
};

export default FormStep2;
