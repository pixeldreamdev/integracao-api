'use client';

import React, { useState } from 'react';
import axios from 'axios';

const FormStep3 = ({ nextStep, prevStep, handleChange, values }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    nextStep();
  };

  const handleCepChange = async e => {
    const value = e.target.value.replace(/\D/g, '');
    const cepFormatted = value.replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
    handleChange('cep', cepFormatted);

    if (value.length === 8) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        if (response.data.erro) {
          setError('CEP não encontrado');
        } else {
          handleChange('logradouro', response.data.logradouro);
          handleChange('bairro', response.data.bairro);
          handleChange('cidade', response.data.localidade);
          handleChange('uf', response.data.uf);
        }
      } catch (error) {
        setError('Erro ao buscar CEP');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Pré-Análise (Etapa 3)</h2>
      <p className="text-text-light mb-6">
        Vamos precisar do seu endereço. Digite seu CEP e preencheremos os dados automaticamente.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="cep" className="form-label">
            CEP*
          </label>
          <input
            type="text"
            id="cep"
            name="cep"
            value={values.cep || ''}
            onChange={handleCepChange}
            className="form-input"
            placeholder="00000-000"
            maxLength="9"
            required
          />
          <p className="form-helper-text">Digite apenas números</p>
        </div>

        {loading && (
          <div className="text-yellow-600 flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Buscando endereço...
          </div>
        )}
        {error && <p className="text-error">{error}</p>}

        <div className="form-field">
          <label htmlFor="logradouro" className="form-label">
            Logradouro
          </label>
          <input
            type="text"
            id="logradouro"
            name="logradouro"
            value={values.logradouro || ''}
            onChange={e => handleChange('logradouro', e.target.value)}
            className="form-input"
            required
            readOnly
          />
        </div>

        <div className="form-field">
          <label htmlFor="bairro" className="form-label">
            Bairro
          </label>
          <input
            type="text"
            id="bairro"
            name="bairro"
            value={values.bairro || ''}
            onChange={e => handleChange('bairro', e.target.value)}
            className="form-input"
            required
            readOnly
          />
        </div>

        <div className="form-field">
          <label htmlFor="cidade" className="form-label">
            Cidade
          </label>
          <input
            type="text"
            id="cidade"
            name="cidade"
            value={values.cidade || ''}
            onChange={e => handleChange('cidade', e.target.value)}
            className="form-input"
            required
            readOnly
          />
        </div>

        <div className="form-field">
          <label htmlFor="uf" className="form-label">
            UF
          </label>
          <input
            type="text"
            id="uf"
            name="uf"
            value={values.uf || ''}
            onChange={e => handleChange('uf', e.target.value)}
            className="form-input"
            required
            readOnly
          />
        </div>

        <div className="flex justify-between mt-8">
          <button type="button" onClick={prevStep} className="form-button form-button-secondary">
            Voltar
          </button>
          <button type="submit" className="form-button form-button-primary">
            Iniciar
          </button>
        </div>
      </form>

      {/* <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
        <p className="font-medium">Nota:</p>
        <p className="text-sm">O preenchimento automático do endereço é baseado no CEP fornecido. Se necessário, você poderá ajustar os detalhes do endereço na próxima etapa.</p>
      </div> */}
    </div>
  );
};

export default FormStep3;
