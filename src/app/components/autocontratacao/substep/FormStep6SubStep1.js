"use client";
import React, { useState, useEffect } from "react";

const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}) => {
  const baseClasses = "form-input w-full";
  const enabledClasses = "focus:border-primary focus:ring-primary";
  const disabledClasses = "bg-gray-100 cursor-not-allowed";

  if (type === "select") {
    return (
      <div className="form-field">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className={`form-select ${
            disabled ? disabledClasses : enabledClasses
          }`}
          disabled={disabled}
        >
          <option value="">Selecione</option>
          {options.map((option) => (
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
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`${baseClasses} ${
          disabled ? disabledClasses : enabledClasses
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

const FormStep6SubStep1 = ({ onNextStep, values, handleChange }) => {
  const [grausInstrucao, setGrausInstrucao] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    // Simulando chamadas de API
    setGrausInstrucao([
      { value: 1, label: "Ensino Fundamental" },
      { value: 2, label: "Ensino Médio" },
      { value: 3, label: "Ensino Superior" },
    ]);

    setNacionalidades([
      { value: 1, label: "Brasileira" },
      { value: 2, label: "Estrangeira" },
    ]);
  }, []);

  useEffect(() => {
    if (values.ufNaturalidade) {
      // Simulando chamada de API para buscar cidades
      setCidades([
        { value: 1, label: "São Paulo" },
        { value: 2, label: "Campinas" },
        { value: 3, label: "Santos" },
      ]);
    }
  }, [values.ufNaturalidade]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">
          Dados Pessoais
        </h3>
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
      </div>

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
          { value: "masculino", label: "Masculino" },
          { value: "feminino", label: "Feminino" },
        ]}
      />

      <FormField
        label="Estado Civil"
        name="estadoCivil"
        type="select"
        value={values.estadoCivil}
        onChange={handleChange}
        options={[
          { value: "solteiro", label: "Solteiro(a)" },
          { value: "casado", label: "Casado(a)" },
          { value: "divorciado", label: "Divorciado(a)" },
          { value: "viuvo", label: "Viúvo(a)" },
          { value: "uniaoEstavel", label: "União Estável" },
        ]}
      />

      {(values.estadoCivil === "casado" ||
        values.estadoCivil === "uniaoEstavel") && (
        <FormField
          label="Nome do(a) Cônjuge"
          name="nomeConjuge"
          type="text"
          value={values.nomeConjuge}
          onChange={handleChange}
          placeholder="Nome completo do(a) cônjuge"
        />
      )}

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">
          Documento de Identificação
        </h3>
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
          options={[
            { value: "35", label: "SP" },
            { value: "12", label: "AC" },
            // Adicione mais opções conforme necessário
          ]}
        />
        <FormField
          label="Data de Emissão"
          name="dataEmissao"
          type="date"
          value={values.dataEmissao}
          onChange={handleChange}
        />
      </div>

      <FormField
        label="PEP (Pessoa Politicamente Exposta)"
        name="pep"
        type="select"
        value={values.pep}
        onChange={handleChange}
        options={[
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
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
        options={[
          { value: "35", label: "SP" },
          { value: "12", label: "AC" },
          // Adicione mais opções conforme necessário
        ]}
      />

      <FormField
        label="Cidade Naturalidade"
        name="cidadeNaturalidade"
        type="select"
        value={values.cidadeNaturalidade}
        onChange={handleChange}
        options={cidades}
      />

      <button type="submit" className="form-button form-button-primary w-full">
        Próximo
      </button>

      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <p className="font-medium">Importante:</p>
        <p className="text-sm">
          Certifique-se de que todas as informações estão corretas antes de
          prosseguir. Informações precisas ajudam a agilizar o processo de
          análise.
        </p>
      </div>
    </form>
  );
};

export default FormStep6SubStep1;
