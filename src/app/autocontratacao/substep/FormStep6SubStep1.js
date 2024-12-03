'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { makeApiCall } from '../../api/auth/crefazApi';

const FormField = ({ label, name, type, value, onChange, options, placeholder, disabled }) => {
  const baseClasses = 'form-input w-full';
  const enabledClasses = 'focus:border-primary focus:ring-primary';
  const disabledClasses = 'bg-gray-100 cursor-not-allowed';

  if (type === 'select') {
    return (
      <div className="form-field">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={e => onChange(name, e.target.value)}
          className={`form-select ${disabled ? disabledClasses : enabledClasses}`}
          disabled={disabled}
        >
          <option value="">Selecione</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value || ''}
        onChange={e => onChange(name, e.target.value)}
        className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

const FormStep6SubStep1 = ({ onNextStep, values, handleChange }) => {
  const [contextoProposta, setContextoProposta] = useState(null);
  const [grausInstrucao, setGrausInstrucao] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [cidadesNaturalidade, setCidadesNaturalidade] = useState([]);
  const [cidadesEmissao, setCidadesEmissao] = useState([]);
  const [loadingCidades, setLoadingCidades] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [contextoPropostaResponse, grauInstrucaoResponse, nacionalidadeResponse, ufsResponse] =
        await Promise.all([
          makeApiCall('get', '/Contexto/proposta'),
          makeApiCall('get', '/Contexto/grau-instrucao'),
          makeApiCall('get', '/Endereco/Pais'),
          axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados'),
        ]);

      setContextoProposta(contextoPropostaResponse.data);
      setGrausInstrucao(
        grauInstrucaoResponse.data.map(item => ({ value: item.id, label: item.nome }))
      );
      setNacionalidades(
        nacionalidadeResponse.data.map(item => ({ value: item.id, label: item.nome }))
      );
      setUfs(ufsResponse.data.map(uf => ({ value: uf.id, label: uf.nome, sigla: uf.sigla })));
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchCidades = useCallback(async (ufId, setCidades) => {
    if (!ufId) return;
    setLoadingCidades(true);
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`
      );
      const cidadesData = response.data.map(cidade => ({
        value: cidade.id.toString(),
        label: cidade.nome,
        mesorregiao: cidade.microrregiao?.mesorregiao?.id,
        regiaoIntermediaria: cidade['regiao-intermediaria']?.id,
      }));
      setCidades(cidadesData);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
    } finally {
      setLoadingCidades(false);
    }
  }, []);

  useEffect(() => {
    if (values.ufNaturalidade) {
      fetchCidades(values.ufNaturalidade, setCidadesNaturalidade);
    }
    if (values.ufEmissao) {
      fetchCidades(values.ufEmissao, setCidadesEmissao);
    }
  }, [values.ufNaturalidade, values.ufEmissao, fetchCidades]);

  const handleSubmit = e => {
    e.preventDefault();

    const selectedUf = ufs.find(uf => uf.value === values.ufNaturalidade);
    const selectedCidade = cidadesNaturalidade.find(
      cidade => cidade.value === values.cidadeNaturalidade
    );

    const processedValues = {
      ...values,
      sexoId: contextoProposta?.sexo.find(item => item.id.toString() === values.sexo)?.id,
      estadoCivilId: contextoProposta?.estadoCivil.find(
        item => item.id.toString() === values.estadoCivil
      )?.id,
      grauInstrucaoId: parseInt(values.grauInstrucao),
      nacionalidadeId: parseInt(values.nacionalidade),
      ufEmissaoId: parseInt(values.ufEmissao),
      naturalidadeUfId: selectedUf ? parseInt(selectedUf.value) : null,
      naturalidadeCidadeId: selectedCidade ? parseInt(selectedCidade.value) : null,
      naturalidadeMesorregiaoId: selectedCidade ? selectedCidade.mesorregiao : null,
      naturalidadeRegiaoIntermediariaId: selectedCidade ? selectedCidade.regiaoIntermediaria : null,
      nomeUfNaturalidade: selectedUf ? selectedUf.label : '',
      nomeCidadeNaturalidade: selectedCidade ? selectedCidade.label : '',
      siglaUfNaturalidade: selectedUf ? selectedUf.sigla : '',
      pep: values.pep === 'sim',
      nomeConjuge: values.nomeConjuge.trim() || null, // Trata o campo como opcional
    };

    if (
      processedValues.naturalidadeMesorregiaoId &&
      !processedValues.naturalidadeRegiaoIntermediariaId
    ) {
      processedValues.naturalidadeId = processedValues.naturalidadeMesorregiaoId;
      processedValues.tipoNaturalidade = 'mesorregiao';
    } else if (
      !processedValues.naturalidadeMesorregiaoId &&
      processedValues.naturalidadeRegiaoIntermediariaId
    ) {
      processedValues.naturalidadeId = processedValues.naturalidadeRegiaoIntermediariaId;
      processedValues.tipoNaturalidade = 'regiaoIntermediaria';
    } else if (
      processedValues.naturalidadeMesorregiaoId &&
      processedValues.naturalidadeRegiaoIntermediariaId
    ) {
      processedValues.naturalidadeId = processedValues.naturalidadeRegiaoIntermediariaId;
      processedValues.tipoNaturalidade = 'regiaoIntermediaria';
    } else {
      processedValues.naturalidadeId = processedValues.naturalidadeCidadeId;
      processedValues.tipoNaturalidade = 'cidade';
    }

    delete processedValues.naturalidadeMesorregiaoId;
    delete processedValues.naturalidadeRegiaoIntermediariaId;

    console.log('Dados processados:', processedValues);
    onNextStep(processedValues);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="CPF"
        name="cpf"
        type="text"
        value={values.cpf}
        onChange={handleChange}
        disabled={true}
      />
      <FormField
        label="Data de Nascimento"
        name="dataNascimento"
        type="date"
        value={values.dataNascimento}
        onChange={handleChange}
        disabled={true}
      />
      <FormField
        label="Nome Completo"
        name="nomeCompleto"
        type="text"
        value={values.nome}
        onChange={handleChange}
        disabled={true}
      />
      <FormField
        label="Nome da Mãe"
        name="nomeMae"
        type="text"
        value={values.nomeMae}
        onChange={handleChange}
        placeholder="Nome completo da mãe"
      />

      <FormField
        label="Nome do Pai"
        name="nomeConjuge"
        type="text"
        value={values.nomeConjuge || ''}
        onChange={handleChange}
        placeholder="Nome completo do Pai"
      />

      <FormField
        label="Sexo"
        name="sexo"
        type="select"
        value={values.sexo}
        onChange={handleChange}
        options={
          contextoProposta?.sexo.map(item => ({ value: item.id.toString(), label: item.nome })) ||
          []
        }
      />

      <FormField
        label="Estado Civil"
        name="estadoCivil"
        type="select"
        value={values.estadoCivil}
        onChange={handleChange}
        options={
          contextoProposta?.estadoCivil.map(item => ({
            value: item.id.toString(),
            label: item.nome,
          })) || []
        }
      />

      <FormField
        label="Número do RG/CNH"
        name="numeroRgCnh"
        type="text"
        value={values.numeroRgCnh}
        onChange={handleChange}
        placeholder="Número do documento"
      />
      <FormField
        label="Órgão Emissor"
        name="orgaoEmissor"
        type="text"
        value={values.orgaoEmissor}
        onChange={handleChange}
        placeholder="Ex: SSP"
      />

      <FormField
        label="UF de Emissão"
        name="ufEmissao"
        type="select"
        value={values.ufEmissao}
        onChange={handleChange}
        options={ufs}
      />

      <FormField
        label="Cidade de Emissão"
        name="cidadeEmissao"
        type="select"
        value={values.cidadeEmissao}
        onChange={handleChange}
        options={cidadesEmissao}
        disabled={loadingCidades || !values.ufEmissao}
      />

      <FormField
        label="Data de Emissão"
        name="dataEmissao"
        type="date"
        value={values.dataEmissao}
        onChange={handleChange}
      />

      <FormField
        label="PEP (Pessoa Politicamente Exposta)"
        name="pep"
        type="select"
        value={values.pep}
        onChange={handleChange}
        options={[
          { value: 'sim', label: 'Sim' },
          { value: 'nao', label: 'Não' },
        ]}
      />

      <FormField
        label="Grau de Instrução"
        name="grauInstrucao"
        type="select"
        value={values.grauInstrucao}
        onChange={handleChange}
        options={grausInstrucao}
      />

      <FormField
        label="Nacionalidade"
        name="nacionalidade"
        type="select"
        value={values.nacionalidade}
        onChange={handleChange}
        options={nacionalidades}
      />

      <FormField
        label="UF Naturalidade"
        name="ufNaturalidade"
        type="select"
        value={values.ufNaturalidade}
        onChange={handleChange}
        options={ufs}
      />

      <FormField
        label="Cidade Naturalidade"
        name="cidadeNaturalidade"
        type="select"
        value={values.cidadeNaturalidade}
        onChange={(name, value) => {
          handleChange(name, value);
          const selectedCity = cidadesNaturalidade.find(cidade => cidade.value === value);
          if (selectedCity) {
            handleChange('naturalidadeMesorregiaoId', selectedCity.mesorregiao);
            handleChange('naturalidadeRegiaoIntermediariaId', selectedCity.regiaoIntermediaria);
          }
        }}
        options={cidadesNaturalidade}
        disabled={loadingCidades || !values.ufNaturalidade}
      />

      <button type="submit" className="form-button form-button-primary w-full">
        Próximo
      </button>
    </form>
  );
};

export default FormStep6SubStep1;
