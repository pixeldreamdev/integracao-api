'use client';

import React, { useState, useEffect } from 'react';
import { makeApiCall } from '../api/auth/crefazApi';

const FormStep4 = ({ nextStep, prevStep, handleChange, values }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [produtosOfertas, setProdutosOfertas] = useState([]);
  const [empresasConveniadas, setEmpresasConveniadas] = useState([]);

  useEffect(() => {
    const fetchOfertas = async () => {
      if (!values.propostaId) {
        setError('ID da proposta não encontrado');
        setLoading(false);
        return;
      }

      try {
        const response = await makeApiCall('get', `/Proposta/oferta-produto/${values.propostaId}`);
        if (response.success && response.data.produtos) {
          setProdutosOfertas(response.data.produtos);
          // Assumindo que o primeiro produto tem as empresas conveniadas
          if (response.data.produtos[0] && response.data.produtos[0].convenio) {
            setEmpresasConveniadas(response.data.produtos[0].convenio);
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
    };

    fetchOfertas();
  }, [values.propostaId]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!values.empresaConveniada) {
      setError('Por favor, selecione uma empresa conveniada.');
      return;
    }

    if (!values.rendaEstimada) {
      setError('Por favor, insira a renda estimada.');
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

    // Armazene os dados no state para serem passados para o próximo passo
    handleChange('produtoId', produtosOfertas[0].id);
    handleChange('convenioId', selectedConvenio.id);
    handleChange('tabelaJurosId', selectedConvenio.tabelaJuros[0]?.id || '');
    handleChange('rota', values.numeroInstalacao);
    handleChange('leitura', values.dataLeitura);

    if (!values.numeroInstalacao) {
      setError('Por favor, insira o número da instalação.');
      return;
    }

    if (!values.dataLeitura) {
      setError('Por favor, selecione a data de leitura.');
      return;
    }

    nextStep();
  };

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
          <label htmlFor="rendaEstimada" className="form-label">
            Renda
          </label>
          <input
            type="number"
            id="rendaEstimada"
            name="rendaEstimada"
            value={values.rendaEstimada || ''}
            onChange={e => handleChange('rendaEstimada', e.target.value)}
            className="form-input"
            required
            placeholder="Digite a renda estimada"
            step="0.01"
          />
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
