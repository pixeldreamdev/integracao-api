'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { makeApiCall } from '../api/auth/crefazApi';

const FormStep5 = ({ nextStep, prevStep, handleChange, values }) => {
  const [vencimento, setVencimento] = useState(null);
  const [valorLimite, setValorLimite] = useState(null);
  const [valorLimiteParcela, setValorLimiteParcela] = useState(null);
  const [simulacoes, setSimulacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const consultarValorLimite = useCallback(
    async vencimentoCalculado => {
      setLoading(true);
      setError(null);
      try {
        console.log('Iniciando consulta de valor limite...');
        const dadosConsulta = {
          produtoId: parseInt(values.produtoId),
          convenioId: parseInt(values.convenioId),
          tabelaJurosId: parseInt(values.tabelaJurosId),
          vencimento: vencimentoCalculado,
          renda: parseFloat(values.rendaEstimada),
          recalculo: null,
          valorDebitoConcorrente: 0,
          diaRecebimento: 0,
        };
        console.log('Dados enviados para consulta de valor limite:', dadosConsulta);
        const response = await makeApiCall(
          'POST',
          `/Proposta/consulta-valor-limite/${values.propostaId}`,
          dadosConsulta
        );
        console.log('Resposta da consulta de valor limite:', response);
        if (response.success) {
          setValorLimite(response.data.valorLimiteSolicitado);
          setValorLimiteParcela(response.data.valorLimiteParcela);
        } else {
          setError('Falha ao consultar valor limite: ' + (response.message || 'Erro desconhecido'));
        }
      } catch (err) {
        console.error('Erro ao consultar valor limite:', err);
        setError('Erro ao consultar valor limite: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    },
    [
      values.produtoId,
      values.convenioId,
      values.tabelaJurosId,
      values.propostaId,
      values.rendaEstimada,
    ]
  );

  const calcularVencimento = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Iniciando cálculo de vencimento...');
      const dadosVencimento = {
        propostaId: values.propostaId,
        produtoId: values.produtoId,
        convenioId: values.convenioId,
        tabelaJurosId: parseInt(values.tabelaJurosId),
        rota: values.numeroInstalacao,
        leitura: values.dataLeitura,
        vencimento: null,
      };
      console.log('Dados enviados para cálculo de vencimento:', dadosVencimento);
      const response = await makeApiCall('POST', '/Proposta/calculo-vencimento', dadosVencimento);
      console.log('Resposta do cálculo de vencimento:', response);

      if (response.success && response.data.length > 0 && response.data[0].vencimento) {
        setVencimento(response.data[0].vencimento);
        consultarValorLimite(response.data[0].vencimento);
      } else {
        throw new Error('A resposta não contém o campo "vencimento".');
      }
    } catch (err) {
      console.error('Erro ao calcular vencimento:', err);
      setError('Erro ao calcular vencimento: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, [
    values.propostaId,
    values.produtoId,
    values.convenioId,
    values.tabelaJurosId,
    values.numeroInstalacao,
    values.dataLeitura,
    consultarValorLimite,
  ]);

  useEffect(() => {
    console.log('Valores recebidos:', values);
    if (values.propostaId && values.produtoId && values.convenioId && values.tabelaJurosId) {
      calcularVencimento();
    }
  }, [calcularVencimento, values]);

  const simularOferta = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Iniciando simulação de oferta...');
      const dadosSimulacao = {
        produtoId: parseInt(values.produtoId),
        convenioId: parseInt(values.convenioId),
        tabelaJurosId: parseInt(values.tabelaJurosId),
        valor: parseFloat(values.valorSolicitado),
        tipoCalculo: 0,
        vencimento: vencimento,
        renda: parseFloat(values.rendaEstimada),
        recalculo: null,
        valorDebitoConcorrente: 0,
        diaRecebimento: 0,
        contrato: null,
      };
      console.log('Dados enviados para simulação de oferta:', dadosSimulacao);
      const response = await makeApiCall(
        'POST',
        `/Proposta/simulacao-valor/${values.propostaId}`,
        dadosSimulacao
      );
      console.log('Resposta da simulação de oferta:', response);
      if (response.success) {
        setSimulacoes(response.data.prazoValor);
      } else {
        setError('Falha ao simular oferta: ' + (response.message || 'Erro desconhecido'));
      }
    } catch (err) {
      console.error('Erro ao simular oferta:', err);
      setError('Erro ao simular oferta: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      simularOferta();
    }
  };

  const validateForm = () => {
    if (!values.rendaEstimada || !values.valorSolicitado) {
      setError('Por favor, preencha todos os campos.');
      return false;
    }
    if (valorLimite && parseFloat(values.valorSolicitado) > valorLimite) {
      setError(`O valor solicitado não pode ser maior que R$ ${valorLimite.toFixed(2)}`);
      return false;
    }
    return true;
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Simulação de Empréstimo</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="valorSolicitado">Valor Solicitado</label>
          <input
            type="number"
            id="valorSolicitado"
            value={values.valorSolicitado || ''}
            onChange={e => handleChange('valorSolicitado', e.target.value)}
            max={valorLimite}
            required
            step="0.01"
          />
          {valorLimite && <p>Valor máximo: R$ {valorLimite.toFixed(2)}</p>}
          {valorLimiteParcela && <p>Valor máximo da parcela: R$ {valorLimiteParcela.toFixed(2)}</p>}
        </div>

        <button type="submit">Simular</button>
      </form>

      {simulacoes.length > 0 && (
        <div className="simulacoes">
          <h3>Opções de Parcelamento</h3>
          <ul>
            {simulacoes.map((simulacao, index) => (
              <li key={index}>
                {simulacao.prazo} parcelas de R$ {simulacao.valor.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="nav-buttons">
        <button onClick={prevStep}>Voltar</button>
        <button onClick={nextStep} disabled={simulacoes.length === 0}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default FormStep5;
