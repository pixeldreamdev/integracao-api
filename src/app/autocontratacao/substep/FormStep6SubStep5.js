'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeApiCall } from '../../api/auth/crefazApi';

const ReferenceFields = ({ index, reference, updateReference, tiposReferencia }) => (
  <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="form-field">
      <label htmlFor={`nome${index}`} className="form-label">
        Nome
      </label>
      <input
        type="text"
        id={`nome${index}`}
        name={`nome${index}`}
        value={reference.nome || ''}
        onChange={e => updateReference(index, 'nome', e.target.value)}
        className="form-input"
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor={`telefone${index}`} className="form-label">
        Telefone/Celular
      </label>
      <input
        type="tel"
        id={`telefone${index}`}
        name={`telefone${index}`}
        value={reference.telefone || ''}
        onChange={e => updateReference(index, 'telefone', e.target.value)}
        className="form-input"
        placeholder="(00) 00000-0000"
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor={`tipoReferencia${index}`} className="form-label">
        Tipo referência
      </label>
      <select
        id={`tipoReferencia${index}`}
        name={`tipoReferencia${index}`}
        value={reference.tipoReferencia || ''}
        onChange={e => updateReference(index, 'tipoReferencia', e.target.value)}
        className="form-select"
        required
      >
        <option value="">Selecione o tipo</option>
        {tiposReferencia.map(tipo => (
          <option key={tipo.id} value={tipo.id.toString()}>
            {tipo.nome}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const FormStep6SubStep5 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const [referencias, setReferencias] = useState(
    values.referencias || [{ nome: '', telefone: '', tipoReferencia: '' }]
  );
  const [showExtraReference, setShowExtraReference] = useState(false);
  const [tiposReferencia, setTiposReferencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataFetchedRef = useRef(false);

  const fetchTiposReferencia = useCallback(async () => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    try {
      setLoading(true);
      const response = await makeApiCall('get', '/Contexto/proposta');
      if (response.success && response.data.tipoReferencia) {
        setTiposReferencia(response.data.tipoReferencia);
      } else {
        throw new Error('Falha ao buscar tipos de referência');
      }
    } catch (err) {
      console.error('Erro ao buscar tipos de referência:', err);
      setError('Não foi possível carregar os tipos de referência. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTiposReferencia();
  }, [fetchTiposReferencia]);

  const updateReference = useCallback((index, field, value) => {
    setReferencias(prevReferencias =>
      prevReferencias.map((ref, i) => (i === index ? { ...ref, [field]: value } : ref))
    );
  }, []);

  useEffect(() => {
    handleChange('referencias', referencias);
  }, [referencias]);

  const handleSubmit = e => {
    e.preventDefault();
    const processedReferencias = referencias.map(ref => ({
      ...ref,
      tipoReferencia: parseInt(ref.tipoReferencia, 10),
    }));
    handleChange('referencias', processedReferencias);
    onNextStep();
  };

  const addExtraReference = () => {
    if (!showExtraReference) {
      setShowExtraReference(true);
      setReferencias(prevReferencias => [
        ...prevReferencias,
        { nome: '', telefone: '', tipoReferencia: '' },
      ]);
    }
  };

  if (loading) {
    return <div>Carregando tipos de referência...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados de Referências Pessoais</h2>
      <p className="text-text-light mb-6">
        A Crefaz não entrará em contato com nenhuma das referências adicionadas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {referencias.map((reference, index) => (
          <ReferenceFields
            key={index}
            index={index}
            reference={reference}
            updateReference={updateReference}
            tiposReferencia={tiposReferencia}
          />
        ))}

        {!showExtraReference && (
          <button
            type="button"
            onClick={addExtraReference}
            className="form-button form-button-secondary w-full"
          >
            + Adicionar Referência
          </button>
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
          As referências pessoais são importantes para o processo de avaliação do empréstimo, mas
          não serão contatadas diretamente. Certifique-se de fornecer informações precisas.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep5;
