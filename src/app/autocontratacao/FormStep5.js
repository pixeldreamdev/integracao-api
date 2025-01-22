import React, { useState, useEffect, useCallback } from 'react';
import { makeApiCall } from '../api/auth/crefazApi';
import { FaInfoCircle, FaSpinner } from 'react-icons/fa';

const FormStep5 = ({ nextStep, prevStep, handleChange, values }) => {
  const [vencimento, setVencimento] = useState(null);
  const [valorMinimo, setValorMinimo] = useState(null);
  const [valorMaximo, setValorMaximo] = useState(null);
  const [valorSelecionado, setValorSelecionado] = useState(null);
  const [simulacoes, setSimulacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [propostaProcessada, setPropostaProcessada] = useState(false);

  const calcularVencimento = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dadosVencimento = {
        propostaId: values.propostaId,
        produtoId: values.produtoId,
        convenioId: values.convenioId,
        tabelaJurosId: values.tabelaJurosId,
        diaRecebimentoId: Number(values.diaRecebimento),
        rota: process.env.NEXT_PUBLIC_ENV === 'homolog' ? null : values.numeroInstalacaoReal,
        leitura: process.env.NEXT_PUBLIC_ENV === 'homolog' ? null : values.dataLeituraReal,
        vencimento: null,
      };

      const response = await makeApiCall('POST', '/Proposta/calculo-vencimento', dadosVencimento);

      if (response.success && response.data.length > 0) {
        setVencimento(response.data[0].vencimento);
        return response.data[0].vencimento;
      } else {
        throw new Error('Falha ao calcular vencimento');
      }
    } catch (err) {
      console.error('Erro ao calcular vencimento:', err);
      setError('Erro ao calcular vencimento: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [values]);

  const consultarValorLimite = useCallback(
    async vencimentoCalculado => {
      setLoading(true);
      setError(null);
      try {
        const response = await makeApiCall(
          'POST',
          `/Proposta/consulta-valor-limite/${values.propostaId}`,
          {
            produtoId: values.produtoId,
            convenioId: values.convenioId,
            tabelaJurosId: values.tabelaJurosId,
            vencimento: vencimentoCalculado,
            renda: values.valorRendaPresumida,
            recalculo: null,
          }
        );

        if (response.success) {
          setValorMinimo(response.data.valorMinimoSolicitado);
          setValorMaximo(response.data.valorLimiteSolicitado);
          setValorSelecionado(response.data.valorMinimoSolicitado);
        } else {
          throw new Error('Falha ao consultar valor limite');
        }
      } catch (err) {
        console.error('Erro ao consultar valor limite:', err);
        setError('Erro ao consultar valor limite: ' + err.message);
      } finally {
        setLoading(false);
      }
    },
    [values]
  );

  const simularOferta = async () => {
    if (!valorSelecionado) {
      setError('Por favor, selecione um valor para o empréstimo.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await makeApiCall('POST', `/Proposta/simulacao-valor/${values.propostaId}`, {
        produtoId: values.produtoId,
        convenioId: values.convenioId,
        tabelaJurosId: values.tabelaJurosId,
        valor: valorSelecionado,
        tipoCalculo: 0,
        vencimento: vencimento,
        renda: values.valorRendaPresumida,
        recalculo: vencimento,
        valorDebitoConcorrente: null,
        diaRecebimento: Number(values.diaRecebimento),
      });

      if (response.success) {
        setSimulacoes(response.data.prazoValor);
      } else {
        throw new Error('Falha ao simular oferta');
      }
    } catch (err) {
      console.error('Erro ao simular oferta:', err);
      setError('Erro ao simular oferta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const processarProposta = async () => {
    if (!planoSelecionado || !valorSelecionado) {
      setError('Por favor, selecione um plano de parcelamento e um valor para o empréstimo.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dadosOferta = {
        id: values.propostaId,
        convenioId: values.convenioId,
        tabelaJurosId: values.tabelaJurosId,
        produtoId: values.produtoId,
        plano: planoSelecionado.prazo,
        prestacao: planoSelecionado.valor,
        renda: values.valorRendaPresumida,
        diaRecebimento: Number(values.diaRecebimento),
        tipoRenda: 0,
        vencimento: vencimento,
        valor: valorSelecionado,
        tipoCalculo: 0,
        adicionais: [
          {
            convenioDadosId: values.convenioDadosId1,
            valor: values.numeroInstalacaoReal,
            convenioId: values.convenioId,
          },
          {
            convenioDadosId: values.convenioDadosId2,
            valor: values.dataLeituraReal,
            convenioId: values.convenioId,
          },
        ],
        contratosRefin: [],
        orgaoId: null,
        valorDebitoConcorrente: null,
      };

      const response = await makeApiCall(
        'PUT',
        `/Proposta/oferta-produto/${values.propostaId}`,
        dadosOferta
      );

      if (response.success) {
        // Armazenar os valores selecionados no estado global do formulário
        handleChange('valorContratado', valorSelecionado);
        handleChange('prazoSelecionado', planoSelecionado.prazo);
        handleChange('prestacaoSelecionada', planoSelecionado.valor);
        handleChange('ofertaProcessada', response.data);
        handleChange('vencimentoSelecionado', vencimento);
        setPropostaProcessada(true);
        nextStep();
      } else {
        throw new Error(response.message || 'Falha ao processar a oferta');
      }
    } catch (err) {
      console.error('Erro ao processar a oferta:', err);
      setError('Erro ao processar a oferta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeForm = async () => {
      const vencimentoCalculado = await calcularVencimento();
      if (vencimentoCalculado) {
        await consultarValorLimite(vencimentoCalculado);
      }
    };

    initializeForm();
  }, [calcularVencimento, consultarValorLimite]);

  const handleSubmit = e => {
    e.preventDefault();
    simularOferta();
  };

  const formatCurrency = value => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="form-section fade-in bg-white p-6 rounded-lg shadow-md">
      <h2 className="form-section-title text-2xl font-bold text-primary mb-6">
        Simulação e Processamento de Empréstimo
      </h2>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}
      {propostaProcessada && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Sucesso</p>
          <p>A proposta foi processada com sucesso!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="valorSolicitado" className="block text-sm font-medium text-gray-700 mb-1">
            Valor Solicitado
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">R$</span>
            </div>
            <input
              type="number"
              id="valorSolicitado"
              value={valorSelecionado || ''}
              onChange={e => setValorSelecionado(Number(e.target.value))}
              min={valorMinimo}
              max={valorMaximo}
              step="0.01"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              required
            />
          </div>
          <input
            type="range"
            min={valorMinimo}
            max={valorMaximo}
            value={valorSelecionado || valorMinimo || 0}
            onChange={e => setValorSelecionado(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>Min: {formatCurrency(valorMinimo || 0)}</span>
            <span>Max: {formatCurrency(valorMaximo || 0)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading || !valorSelecionado}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Simulando...
            </>
          ) : (
            'Simular'
          )}
        </button>
      </form>

      {simulacoes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Opções de Parcelamento</h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {simulacoes.map((simulacao, index) => (
                <li key={index}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <input
                        type="radio"
                        id={`plano-${index}`}
                        name="planoParcelamento"
                        value={index}
                        onChange={() => setPlanoSelecionado(simulacao)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        required
                      />
                      <label
                        htmlFor={`plano-${index}`}
                        className="ml-3 flex-1 block text-sm font-medium text-gray-700"
                      >
                        {simulacao.prazo} parcelas de {formatCurrency(simulacao.valor)}
                      </label>
                      <div className="ml-4 flex-shrink-0">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Total: {formatCurrency(simulacao.prazo * simulacao.valor)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Voltar
        </button>
        <button
          onClick={processarProposta}
          disabled={!planoSelecionado || !valorSelecionado || loading || propostaProcessada}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2 inline" /> Processando...
            </>
          ) : propostaProcessada ? (
            'Proposta Processada'
          ) : (
            'Processar Proposta'
          )}
        </button>
      </div>
    </div>
  );
};

export default FormStep5;
