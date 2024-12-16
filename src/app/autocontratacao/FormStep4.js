'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeApiCall } from '../api/auth/crefazApi';

const FormStep4 = ({ nextStep, prevStep, handleChange, values }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [produtosOfertas, setProdutosOfertas] = useState([]);
  const [diaRecebimento, setDiaRecebimento] = useState('5');
  const [empresasConveniadas, setEmpresasConveniadas] = useState([]);
  const fetchedRef = useRef(false);

  const fetchOfertas = useCallback(async () => {
    if (!values.propostaId || fetchedRef.current) {
      return;
    }

    setLoading(true);
    setError('');
    fetchedRef.current = true;

    try {
      const response = await makeApiCall('get', `Proposta/oferta-produto/${values.propostaId}`);
      console.log('API Response:', response);

      if (response.success && response.data) {
        setProdutosOfertas(response.data.produtos || []);
        if (response.data.produtos?.[0]?.convenio) {
          setEmpresasConveniadas(response.data.produtos[0].convenio);
        }

        const valorRendaPresumida = response.data.proposta?.valorRendaPresumida;
        if (valorRendaPresumida !== undefined) {
          handleChange('valorRendaPresumida', valorRendaPresumida);
          console.log('Valor Renda Presumida armazenado:', valorRendaPresumida);
        } else {
          console.warn('valorRendaPresumida não encontrado na resposta da API');
        }
      } else {
        throw new Error('Falha ao buscar ofertas de produtos');
      }
    } catch (err) {
      console.error('Erro ao buscar ofertas:', err);
      setError('Não foi possível carregar as ofertas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [values.propostaId, handleChange]);

  useEffect(() => {
    if (values.propostaId && !fetchedRef.current) {
      fetchOfertas();
    }
  }, [fetchOfertas, values.propostaId]);

  const handleSubmit = e => {
    e.preventDefault();

    if (values.valorRendaPresumida === undefined) {
      console.warn('valorRendaPresumida não definido ao avançar para o próximo passo');
    }

    if (!values.empresaConveniada) {
      setError('Por favor, selecione uma empresa conveniada.');
      return;
    }

    const selectedConvenio = empresasConveniadas.find(
      conv => conv.id.toString() === values.empresaConveniada
    );

    if (!selectedConvenio) {
      setError('Empresa conveniada selecionada não encontrada.');
      return;
    }

    if (produtosOfertas.length === 0) {
      setError('Nenhum produto ofertado encontrado.');
      return;
    }

    if (!values.numeroInstalacao) {
      setError('Por favor, insira o número da instalação.');
      return;
    }

    if (!values.dataLeitura) {
      setError('Por favor, selecione a data de leitura.');
      return;
    }

    // Armazenar dados
    handleChange('numeroInstalacaoReal', values.numeroInstalacao);
    handleChange('dataLeituraReal', values.dataLeitura);
    handleChange('diaRecebimento', diaRecebimento);

    // Em homologação, definir valores vazios para rota e leitura
    if (process.env.NEXT_PUBLIC_ENV === 'homologacao') {
      handleChange('numeroInstalacao', '');
      handleChange('dataLeitura', '');
    }

    // Armazenar outros dados necessários
    handleChange('produtoId', produtosOfertas[0]?.id);
    handleChange('convenioId', selectedConvenio.id);
    handleChange('tabelaJurosId', selectedConvenio.tabelaJuros?.[0]?.id || '');

    // Armazenar IDs dos dados do convênio
    const convenioDados = selectedConvenio.convenioDados;
    if (convenioDados?.length >= 2) {
      handleChange('convenioDadosId1', convenioDados[0].convenioDadosId);
      handleChange('convenioDadosId2', convenioDados[1].convenioDadosId);
    }

    nextStep();
  };

  if (loading) {
    return <div>Carregando ofertas de produtos...</div>;
  }

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Ofertas de Produtos</h2>
      <p className="text-text-light mb-6">
        Selecione a empresa conveniada e forneça os detalhes da instalação para prosseguirmos com as
        ofertas de produtos.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">Cliente</label>
            <p className="text-lg font-semibold text-primary">{values.nome}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <p className="text-lg text-primary">{values.cpf}</p>
          </div>
          {values.valorRendaPresumida !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Renda Presumida</label>
              <p className="text-lg text-primary">
                R$ {Number(values.valorRendaPresumida).toFixed(2)}
              </p>
            </div>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="empresaConveniada" className="form-label">
            Empresa conveniada
          </label>
          <select
            id="empresaConveniada"
            name="empresaConveniada"
            value={values.empresaConveniada || ''}
            onChange={e => handleChange('empresaConveniada', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione a empresa</option>
            {empresasConveniadas.map(empresa => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nome || `Convênio ${empresa.id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="numeroInstalacao" className="form-label">
            Nº da Instalação
          </label>
          <input
            type="text"
            id="numeroInstalacao"
            name="numeroInstalacao"
            value={values.numeroInstalacao || ''}
            onChange={e => handleChange('numeroInstalacao', e.target.value)}
            className="form-input"
            required
            placeholder="Digite o número da instalação"
          />
        </div>

        <div className="form-field">
          <label htmlFor="dataLeitura" className="form-label">
            Data de Leitura
          </label>
          <input
            type="date"
            id="dataLeitura"
            name="dataLeitura"
            value={values.dataLeitura || ''}
            onChange={e => handleChange('dataLeitura', e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="diaRecebimento" className="form-label">
            Dia de Recebimento
          </label>
          <select
            id="diaRecebimento"
            name="diaRecebimento"
            value={diaRecebimento}
            onChange={e => setDiaRecebimento(e.target.value)}
            className="form-select"
            required
          >
            {[...Array(28)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-8">
          <button type="button" onClick={prevStep} className="form-button form-button-secondary">
            Voltar
          </button>
          <button type="submit" className="form-button form-button-primary">
            Continuar
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <p className="font-medium">Importante:</p>
        <p className="text-sm">
          Certifique-se de selecionar a empresa conveniada correta e fornecer os detalhes precisos
          da instalação para garantir a precisão das ofertas de produtos.
        </p>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FormStep4;
