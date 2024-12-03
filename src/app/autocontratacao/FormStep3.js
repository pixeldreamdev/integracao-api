'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { makeApiCall } from '../api/auth/crefazApi';
import { saveProposta, checkExistingProposta } from '../lib/services/dbService';
import { getNotificationUrl } from '../utils/urlHelpers';
import Swal from 'sweetalert2';

const FormStep3 = ({ nextStep, prevStep, handleChange, values, setStep }) => {
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

          // Buscar cidadeId e ufId da API
          const cidadeResponse = await makeApiCall('post', '/Endereco/Cidade', {
            nomeCidade: response.data.localidade,
            uf: response.data.uf,
          });

          if (cidadeResponse.success && cidadeResponse.data.length > 0) {
            handleChange('cidadeId', cidadeResponse.data[0].cidadeId);
            handleChange('ufId', cidadeResponse.data[0].ufId); // Salvar o ufId
          } else {
            throw new Error('Não foi possível obter o ID da cidade ou UF');
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
      // Verificar se já existe uma proposta para este CPF
      const existingProposta = await checkExistingProposta(values.cpf);

      if (existingProposta && existingProposta.exists) {
        const result = await Swal.fire({
          title: 'Proposta Existente',
          text: 'Já existe uma proposta para este CPF. Deseja continuar com o processo?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
          handleChange('propostaId', existingProposta.propostaId);
          nextStep();
          return;
        } else {
          setStep(1);
          return;
        }
      }

      // Formatar dados da proposta
      const propostaData = {
        nome: values.nome,
        cpf: values.cpf.replace(/\D/g, ''),
        nascimento: new Date(values.dataNascimento).toISOString().split('T')[0],
        telefone: values.telefone.replace(/\D/g, ''),
        ocupacaoId: Number(values.ocupacao),
        cidadeId: values.cidadeId,
        ufId: values.ufId, // Adicionar o ufId aqui
        cep: values.cep.replace(/\D/g, ''),
        bairro: values.bairro,
        logradouro: values.logradouro,
        urlNotificacaoParceiro: getNotificationUrl(),
      };

      console.log('Dados da proposta a serem enviados:', propostaData);

      // Cadastrar proposta na API externa
      const propostaResponse = await makeApiCall('post', '/Proposta', propostaData);

      if (propostaResponse.success && propostaResponse.data.aprovado) {
        const result = await Swal.fire({
          title: 'Proposta Aprovada!',
          text: 'Sua proposta foi aprovada. Deseja continuar?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar',
          timer: 10000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
          willClose: () => {
            if (Swal.getTimerLeft() === 0) {
              setStep(1);
            }
          },
        });

        if (result.isConfirmed) {
          const mongoDbData = {
            ...propostaData,
            propostaId: propostaResponse.data.propostaId,
            aprovado: propostaResponse.data.aprovado,
          };
          await saveProposta(mongoDbData);
          handleChange('propostaId', propostaResponse.data.propostaId);
          nextStep();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setStep(1);
        }
      } else {
        await Swal.fire({
          title: 'Proposta Não Aprovada',
          text: 'Infelizmente, sua proposta não foi aprovada neste momento.',
          icon: 'error',
          confirmButtonText: 'Entendi',
        });
        setStep(1);
      }
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
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
