'use client';

import React from 'react';

const FormStep6SubStep2 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const handleSubmit = e => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados de Contato</h2>
      <p className="text-text-light mb-6">Por favor, forneça suas informações de contato abaixo.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email || ''}
            onChange={e => handleChange('email', e.target.value)}
            className="form-input"
            placeholder="mail@example.com"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="celular" className="form-label">
            Telefone/Celular
          </label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={values.celular || ''}
            onChange={e => handleChange('celular', e.target.value)}
            className="form-input"
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="telefone" className="form-label">
            Telefone (opcional)
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={values.telefone || ''}
            onChange={e => handleChange('telefone', e.target.value)}
            className="form-input"
            placeholder="(00) 0000-0000"
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
        <p className="font-medium">Observação:</p>
        <p className="text-sm">
          Certifique-se de fornecer um e-mail válido e um número de telefone/celular onde possamos
          entrar em contato com você.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep2;
