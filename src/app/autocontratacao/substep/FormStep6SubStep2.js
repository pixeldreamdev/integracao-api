'use client';

import React, { useState, useEffect } from 'react';
import { makeApiCall } from '../../api/auth/crefazApi';

const FormField = ({ label, name, type, value, onChange, placeholder, required }) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        onChange={e => onChange(name, e.target.value)}
        className="form-input"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

const FormStep6SubStep2 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const [tiposTelefone, setTiposTelefone] = useState([]);
  const [telefones, setTelefones] = useState([{ tipo: '', numero: '' }]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTiposTelefone = async () => {
      try {
        const response = await makeApiCall('get', '/Contexto/proposta');
        if (response.success && response.data.tipoTelefoneExtra) {
          setTiposTelefone(response.data.tipoTelefoneExtra);
          // Inicializar com um telefone do primeiro tipo
          if (response.data.tipoTelefoneExtra.length > 0) {
            setTelefones([{ tipo: response.data.tipoTelefoneExtra[0].id.toString(), numero: '' }]);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar tipos de telefone:', error);
        setError('Não foi possível carregar os tipos de telefone. Por favor, tente novamente.');
      }
    };

    fetchTiposTelefone();
  }, []);

  const handleTelefoneChange = (index, field, value) => {
    const newTelefones = [...telefones];
    newTelefones[index][field] = value;
    setTelefones(newTelefones);
    handleChange('telefonesExtras', newTelefones);
  };

  const addTelefone = () => {
    if (tiposTelefone.length > telefones.length) {
      const novoTipo = tiposTelefone.find(
        tipo => !telefones.some(tel => tel.tipo === tipo.id.toString())
      );
      if (novoTipo) {
        const novosTelefones = [...telefones, { tipo: novoTipo.id.toString(), numero: '' }];
        setTelefones(novosTelefones);
        handleChange('telefonesExtras', novosTelefones);
      }
    }
  };

  const removeTelefone = index => {
    if (telefones.length > 1) {
      const novosTelefones = telefones.filter((_, i) => i !== index);
      setTelefones(novosTelefones);
      handleChange('telefonesExtras', novosTelefones);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (telefones.some(tel => !tel.numero)) {
      setError('Por favor, preencha todos os números de telefone.');
      return;
    }

    const processedValues = {
      ...values,
      contatos: {
        contato: {
          email: values.email,
          telefone: values.celular,
          telefoneExtra: telefones.map(tel => ({
            tipoTelefone: parseInt(tel.tipo),
            telefone: tel.numero,
          })),
        },
      },
    };

    console.log('Dados de contato processados:', processedValues);
    onNextStep(processedValues);
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados de Contato</h2>
      <p className="text-text-light mb-6">Por favor, forneça suas informações de contato abaixo.</p>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="E-mail"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="mail@example.com"
          required
        />

        <FormField
          label="Telefone/Celular Principal"
          name="celular"
          type="tel"
          value={values.celular}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
          required
        />

        {telefones.map((telefone, index) => (
          <div key={index} className="flex space-x-2">
            <select
              value={telefone.tipo}
              onChange={e => handleTelefoneChange(index, 'tipo', e.target.value)}
              className="form-select"
              required
            >
              {tiposTelefone.map(tipo => (
                <option key={tipo.id} value={tipo.id.toString()}>
                  {tipo.nome}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={telefone.numero}
              onChange={e => handleTelefoneChange(index, 'numero', e.target.value)}
              placeholder="(00) 00000-0000"
              className="form-input"
              required
            />
            {telefones.length > 1 && (
              <button
                type="button"
                onClick={() => removeTelefone(index)}
                className="form-button form-button-secondary"
              >
                Remover
              </button>
            )}
          </div>
        ))}

        {telefones.length < tiposTelefone.length && (
          <button type="button" onClick={addTelefone} className="form-button form-button-secondary">
            Adicionar Telefone
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
          É obrigatório fornecer um e-mail válido e todos os números de telefone solicitados.
          Certifique-se de preencher corretamente todos os campos antes de prosseguir.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep2;
