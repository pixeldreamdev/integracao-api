'use client';

import React from 'react';

const FormStep2 = ({ nextStep, prevStep, handleChange, values }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Pré-Análise (Etapa 2)</h2>
      <p className="text-text-light mb-6">
        Por favor, preencha os dados abaixo para continuarmos com a sua simulação de empréstimo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="cpf" className="form-label">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={values.cpf || ''}
            onChange={(e) => handleChange('cpf', e.target.value)}
            className="form-input"
            placeholder="000.000.000-00"
            required
            disabled
          />
          <p className="form-helper-text">CPF não pode ser alterado nesta etapa.</p>
        </div>

        <div className="form-field">
          <label htmlFor="nome" className="form-label">Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={values.nome || ''}
            onChange={(e) => handleChange('nome', e.target.value)}
            className="form-input"
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="dataNascimento" className="form-label">Data de nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={values.dataNascimento || ''}
            onChange={(e) => handleChange('dataNascimento', e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="telefone" className="form-label">Telefone/Celular</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={values.telefone || ''}
            onChange={(e) => handleChange('telefone', e.target.value)}
            className="form-input"
            placeholder="(00) 00000-0000"
            required
          />
          <p className="form-helper-text">Formato: (00) 00000-0000</p>
        </div>

        <div className="form-field">
          <label htmlFor="fonteRenda" className="form-label">Fonte de Renda</label>
          <select
            id="fonteRenda"
            name="fonteRenda"
            value={values.fonteRenda || ''}
            onChange={(e) => handleChange('fonteRenda', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione</option>
            <option value="1">Assalariado</option>
            <option value="2">Autônomo</option>
            <option value="3">Aposentado</option>
          </select>
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

      <div className="mt-8 p-4 bg-green-50 border-l-4 border-green-400 text-green-700">
        <p className="font-medium">Dica:</p>
        <p className="text-sm">Certifique-se de que todos os dados estão corretos antes de prosseguir. Isso ajudará a agilizar o processo de análise do seu empréstimo.</p>
      </div>
    </div>
  );
};

export default FormStep2;