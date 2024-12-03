'use client';

import React, { useState } from 'react';
import { checkExistingProposta } from '../lib/services/dbService';
import Swal from 'sweetalert2';

const FormStep1 = ({ nextStep, handleChange, values, setValues, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatCPF = cpf => {
    return cpf.replace(/\D/g, '');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formattedCPF = formatCPF(values.cpf);

    try {
      console.log('Enviando CPF formatado para verificação:', formattedCPF);
      const result = await checkExistingProposta(formattedCPF);

      console.log('Resultado da verificação:', result);

      if (result && result.exists) {
        console.log('Proposta existente encontrada:', result);

        // Criar o objeto com os valores atualizados
        const updatedValues = {
          ...values,
          propostaId: result.propostaId,
          nome: result.nome,
          dataNascimento: result.nascimento,
          telefone: result.telefone,
          cidadeId: result.cidadeId,
          cep: result.cep,
          bairro: result.bairro,
          logradouro: result.logradouro,
          ocupacaoId: result.ocupacaoId,
        };

        // Verificar se setValues é uma função antes de chamá-la
        if (typeof setValues === 'function') {
          setValues(updatedValues);
        } else {
          console.error('setValues não é uma função. Valores atualizados:', updatedValues);
          // Aqui você pode adicionar uma lógica alternativa, se necessário
        }

        const { isConfirmed } = await Swal.fire({
          title: 'Proposta Existente',
          text: 'Encontramos uma proposta existente para este CPF. Deseja continuar com esta proposta?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, continuar',
          cancelButtonText: 'Não, iniciar nova proposta',
        });

        if (isConfirmed) {
          console.log(
            'Usuário optou por continuar com a proposta existente. Redirecionando para o Step 4.'
          );
          if (typeof setStep === 'function') {
            setStep(4);
          } else {
            console.error('setStep não é uma função. Tentando usar nextStep.');
            nextStep();
          }
        } else {
          console.log(
            'Usuário optou por iniciar uma nova proposta. Limpando dados e indo para o Step 2.'
          );
          if (typeof setValues === 'function') {
            setValues({
              ...values,
              propostaId: null,
              nome: '',
              dataNascimento: '',
              telefone: '',
              cidadeId: '',
              cep: '',
              bairro: '',
              logradouro: '',
              ocupacaoId: '',
            });
          }
          nextStep();
        }
      } else {
        console.log('Nenhuma proposta existente encontrada. Prosseguindo para o Step 2.');
        nextStep();
      }
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError('Ocorreu um erro ao verificar o CPF. Por favor, tente novamente.');

      await Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao verificar o CPF. Por favor, tente novamente.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCPFForDisplay = cpf => {
    const cleanedCPF = cpf.replace(/\D/g, '');
    return cleanedCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = e => {
    const formattedCPF = formatCPFForDisplay(e.target.value);
    handleChange('cpf', formattedCPF);
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Consulta de Proposta</h2>
      <p className="text-text-light mb-6">
        Para iniciar sua simulação de empréstimo, por favor, informe seu CPF abaixo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={values.cpf || ''}
            onChange={handleCPFChange}
            className="form-input"
            placeholder="000.000.000-00"
            required
            maxLength="14"
          />
          <p className="form-helper-text">Digite o CPF no formato: 000.000.000-00</p>
        </div>

        <div className="form-field">
          <button
            type="submit"
            className={`form-button form-button-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Consultando...' : 'Consultar Proposta'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FormStep1;
