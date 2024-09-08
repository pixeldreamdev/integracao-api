'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { makeApiCall } from '../api/auth/crefazApi';
import { saveProposta } from '../lib/services/dbService';
import { getNotificationUrl } from '../utils/urlHelpers';

const FormStep3 = ({ nextStep, prevStep, handleChange, values }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCepChange = async e => {
    const cep = e.target.value.replace(/\D/g, '');
    handleChange('cep', cep);

    if (cep.length === 8) {
      setLoading(true);
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.data.erro) {
          handleChange('logradouro', response.data.logradouro);
          handleChange('bairro', response.data.bairro);
          handleChange('cidade', response.data.localidade);
          handleChange('uf', response.data.uf);

          // Buscar cidadeId da API
          const cidadeResponse = await makeApiCall('post', '/Endereco/Cidade', {
            nomeCidade: response.data.localidade,
            uf: response.data.uf,
          });

          if (cidadeResponse.success && cidadeResponse.data.length > 0) {
            handleChange('cidadeId', cidadeResponse.data[0].cidadeId);
          } else {
            throw new Error('Não foi possível obter o ID da cidade');
          }
        } else {
          setError('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP ou cidade:', error);
        setError('Erro ao buscar informações do CEP ou cidade');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Formatar dados da proposta
      const propostaData = {
        nome: values.nome,
        cpf: values.cpf.replace(/\D/g, ''),
        nascimento: new Date(values.dataNascimento).toISOString().split('T')[0],
        telefone: values.telefone.replace(/\D/g, ''),
        ocupacaoId: Number(values.ocupacao),
        cidadeId: values.cidadeId,
        cep: values.cep.replace(/\D/g, ''),
        bairro: values.bairro,
        logradouro: values.logradouro,
        urlNotificacaoParceiro: getNotificationUrl(),
      };

      console.log('Dados da proposta a serem enviados:', propostaData);

      // Cadastrar proposta na API externa
      console.log('Cadastrando proposta na API externa...');
      const propostaResponse = await makeApiCall('post', '/Proposta', propostaData);

      console.log('Resposta do cadastro de proposta:', propostaResponse);

      if (!propostaResponse.success) {
        throw new Error(
          propostaResponse.errors
            ? propostaResponse.errors.join(', ')
            : 'Falha ao cadastrar proposta'
        );
      }

      // Salvar proposta no MongoDB
      console.log('Salvando proposta no MongoDB...');
      const mongoDbData = {
        ...propostaData,
        propostaId: propostaResponse.data.propostaId,
        aprovado: propostaResponse.data.aprovado,
      };
      try {
        await saveProposta(mongoDbData);
        console.log('Proposta salva com sucesso no MongoDB');
      } catch (mongoError) {
        console.error('Erro ao salvar no MongoDB:', mongoError);
        // Aqui você pode decidir se quer continuar ou não
        // Por exemplo, você pode exibir um aviso ao usuário, mas ainda permitir que ele continue
        setError(
          'Aviso: Proposta cadastrada, mas houve um erro ao salvar localmente. Isto não afeta seu empréstimo.'
        );
      }

      handleChange('propostaId', propostaResponse.data.propostaId);
      nextStep();
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      setError(
        error.message || 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
          required
        />
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
        <button
          type="button"
          onClick={prevStep}
          className="form-button form-button-secondary"
          disabled={loading}
        >
          Voltar
        </button>
        <button type="submit" className="form-button form-button-primary" disabled={loading}>
          {loading ? 'Processando...' : 'Enviar Proposta'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default FormStep3;
