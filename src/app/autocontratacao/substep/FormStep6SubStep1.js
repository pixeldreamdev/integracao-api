'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [grausInstrucao, setGrausInstrucao] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [cidadesNaturalidade, setCidadesNaturalidade] = useState([]);
  const [cidadesEmissao, setCidadesEmissao] = useState([]);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    // Carregar UFs
    const fetchUFs = async () => {
      try {
        const response = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        );
        const ufsData = response.data.map(uf => ({
          value: uf.sigla,
          label: uf.nome,
        }));
        setUfs(ufsData);
      } catch (error) {
        console.error('Erro ao carregar UFs:', error);
      }
    };

    fetchUFs();

    // Simulando chamadas de API para outros dados
    setGrausInstrucao([
      { value: 1, label: 'Ensino Fundamental' },
      { value: 2, label: 'Ensino Médio' },
      { value: 3, label: 'Ensino Superior' },
    ]);

    setNacionalidades([
      { value: 1, label: 'Brasileira' },
      { value: 2, label: 'Estrangeira' },
    ]);
  }, []);

  useEffect(() => {
    const fetchCidades = async (uf, setCidades) => {
      if (!uf) return;
      setLoadingCidades(true);
      try {
        const response = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
        );
        const cidadesData = response.data.map(cidade => ({
          value: cidade.id,
          label: cidade.nome,
        }));
        setCidades(cidadesData);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      } finally {
        setLoadingCidades(false);
      }
    };

    if (values.ufNaturalidade) {
      fetchCidades(values.ufNaturalidade, setCidadesNaturalidade);
    }

    if (values.ufEmissao) {
      fetchCidades(values.ufEmissao, setCidadesEmissao);
    }
  }, [values.ufNaturalidade, values.ufEmissao]);

  const handleSubmit = e => {
    e.preventDefault();
    onNextStep();
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
        value={values.nomeCompleto}
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
        label="Sexo"
        name="sexo"
        type="select"
        value={values.sexo}
        onChange={handleChange}
        options={[
          { value: 'masculino', label: 'Masculino' },
          { value: 'feminino', label: 'Feminino' },
        ]}
      />

      <FormField
        label="Estado Civil"
        name="estadoCivil"
        type="select"
        value={values.estadoCivil}
        onChange={handleChange}
        options={[
          { value: 'solteiro', label: 'Solteiro(a)' },
          { value: 'casado', label: 'Casado(a)' },
          { value: 'divorciado', label: 'Divorciado(a)' },
          { value: 'viuvo', label: 'Viúvo(a)' },
          { value: 'uniaoEstavel', label: 'União Estável' },
        ]}
      />

      {(values.estadoCivil === 'casado' || values.estadoCivil === 'uniaoEstavel') && (
        <FormField
          label="Nome do(a) Cônjuge"
          name="nomeConjuge"
          type="text"
          value={values.nomeConjuge}
          onChange={handleChange}
          placeholder="Nome completo do(a) cônjuge"
        />
      )}

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
        onChange={handleChange}
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
