'use client';

import React, { useState, useEffect } from 'react';

const ReferenceFields = ({ index, reference, updateReference }) => (
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
        <option value="familiar">Familiar</option>
        <option value="amigo">Amigo</option>
        <option value="colega">Colega de trabalho</option>
        <option value="outro">Outro</option>
      </select>
    </div>
  </div>
);

const FormStep6SubStep5 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const [referencias, setReferencias] = useState(
    values.referencias || [{ nome: '', telefone: '', tipoReferencia: '' }]
  );
  const [showExtraReference, setShowExtraReference] = useState(false);

  useEffect(() => {
    handleChange('referencias', referencias);
  }, [referencias]);

  const handleSubmit = e => {
    e.preventDefault();
    onNextStep();
  };

  const updateReference = (index, field, value) => {
    const updatedReferencias = referencias.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    );
    setReferencias(updatedReferencias);
  };

  const addExtraReference = () => {
    if (!showExtraReference) {
      setShowExtraReference(true);
      setReferencias([...referencias, { nome: '', telefone: '', tipoReferencia: '' }]);
    }
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados de Referências Pessoais</h2>
      <p className="text-text-light mb-6">
        O Crefaz não entrará em contato com nenhuma das referências adicionadas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {referencias.map((reference, index) => (
          <ReferenceFields
            key={index}
            index={index}
            reference={reference}
            updateReference={updateReference}
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
