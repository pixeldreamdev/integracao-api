'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { makeApiCall } from '../../api/auth/crefazApi';
import profissoesId from '../../data/profissoes';

const FormStep6SubStep6 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const [showOutrasRendas, setShowOutrasRendas] = useState(!!values.outrasRendas);
  const [temposEmprego, setTemposEmprego] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTemposEmprego = useCallback(async () => {
    try {
      setLoading(true);
      const response = await makeApiCall('get', '/Contexto/proposta');
      if (response.success && response.data.tempoEmprego) {
        setTemposEmprego(response.data.tempoEmprego);
      } else {
        throw new Error('Falha ao buscar tempos de emprego');
      }
    } catch (err) {
      console.error('Erro ao buscar tempos de emprego:', err);
      setError('Não foi possível carregar os tempos de emprego. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemposEmprego();
  }, [fetchTemposEmprego]);

  const handleSubmit = e => {
    e.preventDefault();
    const processedValues = {
      ...values,
      profissaoId: parseInt(values.profissao),
      tempoEmpregoId: parseInt(values.tempoEmprego),
    };
    onNextStep(processedValues);
  };

  const handleOutrasRendasChange = e => {
    const value = e.target.value;
    handleChange('outrasRendas', value);
    setShowOutrasRendas(!!value);
  };

  if (loading) {
    return <div>Carregando dados profissionais...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados de Referências Profissionais</h2>
      <p className="text-text-light mb-6">
        Por favor, forneça informações sobre sua situação profissional atual.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="empresa" className="form-label">
            Empresa
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={values.empresa || ''}
            onChange={e => handleChange('empresa', e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="classificacaoProfissional" className="form-label">
            Classificação profissional
          </label>
          <select
            id="classificacaoProfissional"
            name="classificacaoProfissional"
            value={values.classificacaoProfissional || ''}
            onChange={e => handleChange('classificacaoProfissional', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione</option>
            <option value="assalariado">Assalariado</option>
            <option value="funcionarioPublico">Funcionário Público</option>
            <option value="Aposentado">Aposentado</option>
            <option value="Pensionista">Pensionista</option>
            <option value="autonomo">Autônomo / Sem Vínculo Empregatício</option>
            <option value="Profissional">Profissional Liberal</option>
            <option value="Empresário">Empresário / Proprietário</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="profissao" className="form-label">
            Profissão
          </label>
          <select
            id="profissao"
            name="profissao"
            value={values.profissao || ''}
            onChange={e => handleChange('profissao', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione uma profissão</option>
            {profissoesId.map(profissao => (
              <option key={profissao.id} value={profissao.id}>
                {profissao.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="tempoEmprego" className="form-label">
            Tempo no emprego atual
          </label>
          <select
            id="tempoEmprego"
            name="tempoEmprego"
            value={values.tempoEmprego || ''}
            onChange={e => handleChange('tempoEmprego', e.target.value)}
            className="form-select"
            // required
          >
            <option value="">Selecione</option>
            {temposEmprego.map(tempo => (
              <option key={tempo.id} value={tempo.id}>
                {tempo.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="telefoneRH" className="form-label">
            Telefone RH da empresa
          </label>
          <input
            type="tel"
            id="telefoneRH"
            name="telefoneRH"
            value={values.telefoneRH || ''}
            onChange={e => handleChange('telefoneRH', e.target.value)}
            className="form-input"
            placeholder="(00) 00000-0000"
            // required
          />
        </div>

        <div className="form-field">
          <label htmlFor="pisPasep" className="form-label">
            PIS/PASEP
          </label>
          <input
            type="text"
            id="pisPasep"
            name="pisPasep"
            value={values.pisPasep || ''}
            onChange={e => handleChange('pisPasep', e.target.value)}
            className="form-input"
            // required
          />
        </div>

        <div className="form-field">
          <label htmlFor="outrasRendas" className="form-label">
            Outras rendas
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              R$
            </span>
            <input
              type="number"
              id="outrasRendas"
              name="outrasRendas"
              value={values.outrasRendas || ''}
              onChange={handleOutrasRendasChange}
              className="form-input pl-8"
              placeholder="0,00"
              step="0.01"
            />
          </div>
        </div>

        {showOutrasRendas && (
          <div className="form-field">
            <label htmlFor="tipoOutrasRendas" className="form-label">
              Tipo de outras rendas
            </label>
            <input
              type="text"
              id="tipoOutrasRendas"
              name="tipoOutrasRendas"
              value={values.tipoOutrasRendas || ''}
              onChange={e => handleChange('tipoOutrasRendas', e.target.value)}
              className="form-input"
              placeholder="Ex.: Autônomo"
              required
            />
          </div>
        )}

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
        <p className="font-medium">Observação:</p>
        <p className="text-sm">
          As informações profissionais são cruciais para a análise do seu perfil de crédito.
          Certifique-se de fornecer dados precisos e atualizados.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep6;
