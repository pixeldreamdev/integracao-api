'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeApiCall } from '../../api/auth/crefazApi';

const BANCOS_PRINCIPAIS = [
  { codigo: '001', nome: 'BANCO DO BRASIL S.A.' },
  { codigo: '033', nome: 'BANCO SANTANDER (BRASIL) S.A.' },
  { codigo: '341', nome: 'ITAÚ UNIBANCO S.A.' },
  { codigo: '104', nome: 'CAIXA ECONÔMICA FEDERAL' },
  { codigo: '237', nome: 'BANCO BRADESCO S.A.' },
];

const FormStep6SubStep4 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const [bancos, setBancos] = useState(BANCOS_PRINCIPAIS);
  const [loading, setLoading] = useState(false);
  const [bancoError, setBancoError] = useState('');
  const [contextoProposta, setContextoProposta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bancosResponse, contextoResponse] = await Promise.all([
          axios.get('https://brasilapi.com.br/api/banks/v1'),
          makeApiCall('get', '/Contexto/proposta'),
        ]);

        setBancos([
          ...BANCOS_PRINCIPAIS,
          { codigo: '999', nome: 'OUTROS' },
          ...bancosResponse.data,
        ]);
        setContextoProposta(contextoResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const formatAccountNumber = value => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1,5})(\d{0,1})$/);
    if (match) {
      return match[2] ? `${match[1]}-${match[2]}` : match[1];
    }
    return cleaned;
  };

  const handleAccountNumberChange = e => {
    const formatted = formatAccountNumber(e.target.value);
    handleChange('conta', formatted);
  };

  const sanitizeValues = values => {
    const sanitized = {};
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        sanitized[key] =
          typeof values[key] === 'string' ? values[key].replace(/[^\w\s]/gi, '') : values[key];
      }
    }
    return sanitized;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const sanitizedValues = {
      ...values,
      conta: values.conta.replace(/-/g, ''), // Remove apenas o "-"
    };

    const processedValues = {
      ...sanitizedValues,
      bancoId: sanitizedValues.banco,
      contaId: parseInt(sanitizedValues.tipoConta, 10),
      tipoContaId: parseInt(sanitizedValues.tipoContaId, 10),
      tempoContaId: parseInt(sanitizedValues.tempoContaId, 10),
    };

    console.log('Dados bancários processados:', processedValues);
    onNextStep(processedValues);
  };

  const handleBancoChange = async e => {
    const codigoBanco = e.target.value;
    handleChange('banco', codigoBanco);

    if (codigoBanco && codigoBanco !== '999') {
      setLoading(true);
      setBancoError('');
      try {
        const response = await axios.get(`https://brasilapi.com.br/api/banks/v1/${codigoBanco}`);
        handleChange('nomeBanco', response.data.name);
      } catch (error) {
        setBancoError('Banco não encontrado');
        handleChange('nomeBanco', '');
      } finally {
        setLoading(false);
      }
    } else if (codigoBanco === '999') {
      handleChange('nomeBanco', 'OUTROS');
    }
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados Bancários</h2>
      <p className="text-text-light mb-6">
        Por favor, forneça os detalhes da sua conta bancária abaixo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="banco" className="form-label">
            Banco
          </label>
          <select
            id="banco"
            name="banco"
            value={values.banco || ''}
            onChange={handleBancoChange}
            className="form-select"
            required
          >
            <option value="">Selecione o banco</option>
            {bancos.map(banco => (
              <option key={banco.codigo} value={banco.codigo}>
                {banco.nome}
              </option>
            ))}
          </select>
          {loading && <p className="text-sm text-yellow-600">Buscando informações do banco...</p>}
          {bancoError && <p className="text-sm text-red-600">{bancoError}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="agencia" className="form-label">
            Agência
          </label>
          <input
            type="text"
            id="agencia"
            name="agencia"
            value={values.agencia || ''}
            onChange={e => handleChange('agencia', e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="digitoAgencia" className="form-label">
            Dígito da Agência
          </label>
          <input
            type="text"
            id="digitoAgencia"
            name="digitoAgencia"
            value={values.digitoAgencia || ''}
            onChange={e => handleChange('digitoAgencia', e.target.value)}
            className="form-input"
            maxLength="1"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="numero-conta" className="form-label required">
            Nº da conta + dígito
          </label>
          <input
            className="form-input accountNumber"
            type="text"
            placeholder="00000-1"
            name="numeroContaBanco"
            id="numero-conta"
            value={values.conta || ''}
            onChange={handleAccountNumberChange}
            maxLength="14"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="tipoConta" className="form-label">
            Tipo de conta
          </label>
          <select
            id="tipoConta"
            name="tipoConta"
            value={values.tipoConta || ''}
            onChange={e => handleChange('tipoConta', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione o tipo de conta</option>
            {contextoProposta?.conta.map(tipo => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="tipoContaId" className="form-label">
            Tipo de Conta (Detalhado)
          </label>
          <select
            id="tipoContaId"
            name="tipoContaId"
            value={values.tipoContaId || ''}
            onChange={e => handleChange('tipoContaId', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione o tipo de conta detalhado</option>
            {contextoProposta?.tipoConta.map(tipo => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="tempoContaId" className="form-label">
            Tempo de conta
          </label>
          <select
            id="tempoContaId"
            name="tempoContaId"
            value={values.tempoContaId || ''}
            onChange={e => handleChange('tempoContaId', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione o tempo de conta</option>
            {contextoProposta?.tempoConta.map(tempo => (
              <option key={tempo.id} value={tempo.id}>
                {tempo.nome}
              </option>
            ))}
          </select>
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

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500">
        <p className="text-sm text-gray-700">
          Para sua segurança, todos os dados informados serão verificados.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep4;
