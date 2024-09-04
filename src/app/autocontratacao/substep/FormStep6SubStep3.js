'use client';

import React, { useState } from 'react';
import axios from 'axios';

const FormStep6SubStep3 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const [loading, setLoading] = useState(false);
  const [cepError, setCepError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onNextStep();
  };

  const handleCepChange = async e => {
    const cep = e.target.value.replace(/\D/g, '');
    handleChange('cep', cep.replace(/(\d{5})(\d)/, '$1-$2'));

    if (cep.length === 8) {
      setLoading(true);
      setCepError('');
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
          setCepError('CEP não encontrado');
        } else {
          handleChange('logradouro', response.data.logradouro);
          handleChange('bairro', response.data.bairro);
          handleChange('cidade', response.data.localidade);
          handleChange('uf', response.data.uf);
        }
      } catch (error) {
        setCepError('Erro ao buscar CEP');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados de Endereço</h2>
      <p className="text-text-light mb-6">Por favor, forneça os detalhes do seu endereço abaixo.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="cep" className="form-label">
            CEP
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
          {loading && <p className="text-sm text-yellow-600">Buscando endereço...</p>}
          {cepError && <p className="text-sm text-red-600">{cepError}</p>}
        </div>

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
          />
        </div>

        <div className="form-field">
          <label htmlFor="numero" className="form-label">
            Número
          </label>
          <input
            type="text"
            id="numero"
            name="numero"
            value={values.numero || ''}
            onChange={e => handleChange('numero', e.target.value)}
            className="form-input"
            required
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
            maxLength="2"
            required
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
          />
        </div>

        <div className="form-field">
          <label htmlFor="complemento" className="form-label">
            Complemento
          </label>
          <input
            type="text"
            id="complemento"
            name="complemento"
            value={values.complemento || ''}
            onChange={e => handleChange('complemento', e.target.value)}
            className="form-input"
            placeholder="Ex.: Apto, Bloco, Casa..."
          />
        </div>

        <div className="flex justify-between mt-8">
          <button type="button" onClick={onPrevStep} className="form-button form-button-secondary">
            Voltar
          </button>
          <button type="submit" className="form-button form-button-primary">
            Próximo
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
        <p className="font-medium">Dica:</p>
        <p className="text-sm">
          Digite seu CEP e os campos de endereço serão preenchidos automaticamente. Caso necessário,
          você pode editar as informações manualmente.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep3;
