'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const response = await axios.get('https://brasilapi.com.br/api/banks/v1');
        setBancos([...BANCOS_PRINCIPAIS, { codigo: '999', nome: 'OUTROS' }, ...response.data]);
      } catch (error) {
        console.error('Erro ao buscar lista de bancos:', error);
      }
    };

    fetchBancos();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onNextStep();
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
          <label className="form-label">Possui dígito?</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="possuiDigito"
                value="sim"
                checked={values.possuiDigito === 'sim'}
                onChange={e => handleChange('possuiDigito', e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Sim</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="possuiDigito"
                value="nao"
                checked={values.possuiDigito === 'nao'}
                onChange={e => handleChange('possuiDigito', e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Não</span>
            </label>
          </div>
        </div>

        {values.possuiDigito === 'sim' && (
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
        )}

        <div className="form-field">
          <label htmlFor="conta" className="form-label">
            Nº da conta + dígito
          </label>
          <input
            type="text"
            id="conta"
            name="conta"
            value={values.conta || ''}
            onChange={e => handleChange('conta', e.target.value)}
            className="form-input"
            placeholder="00000-1"
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
            <option value="corrente">Conta Corrente</option>
            <option value="poupanca">Conta Poupança</option>
            <option value="salario">Conta Salário</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="tipoOperacao" className="form-label">
            Tipo Operação
          </label>
          <input
            type="text"
            id="tipoOperacao"
            name="tipoOperacao"
            value={values.tipoOperacao || ''}
            onChange={e => handleChange('tipoOperacao', e.target.value)}
            className="form-input"
            placeholder="Ex: 001, 013, etc."
          />
        </div>

        <div className="form-field">
          <label htmlFor="tempoConta" className="form-label">
            Tempo de conta
          </label>
          <select
            id="tempoConta"
            name="tempoConta"
            value={values.tempoConta || ''}
            onChange={e => handleChange('tempoConta', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione o tempo de conta</option>
            <option value="menos6meses">Menos de 6 meses</option>
            <option value="6a12meses">6 a 12 meses</option>
            <option value="1a2anos">1 a 2 anos</option>
            <option value="2a5anos">2 a 5 anos</option>
            <option value="mais5anos">Mais de 5 anos</option>
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

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
        <p className="font-medium">Dica:</p>
        <p className="text-sm">
          Selecione o seu banco na lista. Se não encontrar, escolha a opção "OUTROS". Certifique-se
          de fornecer as informações bancárias corretamente para evitar problemas no processamento
          do seu empréstimo.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep4;
