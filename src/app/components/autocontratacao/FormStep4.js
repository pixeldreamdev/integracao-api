'use client';

import React, { useState, useEffect } from 'react';

const FormStep4 = ({ nextStep, prevStep, handleChange, values }) => {
  const [empresasConveniadas, setEmpresasConveniadas] = useState([]);

  useEffect(() => {
    // Simulação de chamada à API para buscar as empresas conveniadas
    const mockEmpresas = [
      { id: 1, nome: 'Empresa A' },
      { id: 2, nome: 'Empresa B' },
      { id: 3, nome: 'Empresa C' },
    ];
    setEmpresasConveniadas(mockEmpresas);
    // Aqui você faria uma chamada real à API:
    // const fetchEmpresas = async () => {
    //   const response = await fetch('/api/empresas-conveniadas');
    //   const data = await response.json();
    //   setEmpresasConveniadas(data);
    // };
    // fetchEmpresas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Ofertas de Produtos</h2>
      <p className="text-text-light mb-6">
        Selecione a empresa conveniada e forneça os detalhes da instalação para prosseguirmos com as ofertas de produtos.
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
            onChange={(e) => handleChange('empresaConveniada', e.target.value)}
            className="form-select"
            required
          >
            <option value="">Selecione a empresa</option>
            {empresasConveniadas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nome}
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
            onChange={(e) => handleChange('numeroInstalacao', e.target.value)}
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
            onChange={(e) => handleChange('dataLeitura', e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="form-button form-button-secondary"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="form-button form-button-primary"
          >
            Continuar
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <p className="font-medium">Importante:</p>
        <p className="text-sm">Certifique-se de selecionar a empresa conveniada correta e fornecer os detalhes precisos da instalação para garantir a precisão das ofertas de produtos.</p>
      </div>
    </div>
  );
};

export default FormStep4;