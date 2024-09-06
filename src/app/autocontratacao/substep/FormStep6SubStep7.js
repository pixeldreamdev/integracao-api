import React, { useState } from 'react';
import { makeApiCall } from '../../api/auth/crefazApi';
import { updateProposta } from '../../lib/services/dbService';

const FileUploadField = ({ label, name, acceptedFileTypes, value, onChange, error }) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Upload um arquivo</span>
              <input
                id={name}
                name={name}
                type="file"
                className="sr-only"
                accept={acceptedFileTypes}
                onChange={e => onChange(name, e.target.files[0])}
              />
            </label>
            <p className="pl-1">ou arraste e solte</p>
          </div>
          <p className="text-xs text-gray-500">{value ? value.name : 'Nenhum arquivo escolhido'}</p>
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

const FormStep6SubStep7 = ({ onPrevStep, values, handleChange, onFormSubmit }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = {};

    if (!values.docIdentificacao) {
      newErrors.docIdentificacao = 'Obrigatório selecionar um arquivo.';
    }

    if (!values.faturaEnergia) {
      newErrors.faturaEnergia = 'Obrigatório selecionar um arquivo.';
    }

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Atualizar proposta na API Crefaz
        const responseApi = await makeApiCall('PUT', `/Proposta/${values.propostaId}`, values);

        // Atualizar proposta no MongoDB local
        await updateProposta(values);

        // Upload dos arquivos (você precisará implementar esta funcionalidade)
        // await uploadFiles(values.docIdentificacao, values.faturaEnergia);

        onFormSubmit(responseApi);
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        setErrors({
          submit: 'Erro ao enviar o formulário. Por favor, tente novamente.',
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleFileChange = (name, file) => {
    handleChange(name, file);
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Importações</h2>
      <p className="text-text-light mb-6">Os documentos obrigatórios são:</p>
      <ul className="list-disc list-inside mb-6 text-text-light">
        <li>Documento de identificação;</li>
        <li>Fatura de energia.</li>
      </ul>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FileUploadField
          label="Documento de identificação"
          name="docIdentificacao"
          acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
          value={values.docIdentificacao}
          onChange={handleFileChange}
          error={errors.docIdentificacao}
        />

        <FileUploadField
          label="Fatura de energia"
          name="faturaEnergia"
          acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
          value={values.faturaEnergia}
          onChange={handleFileChange}
          error={errors.faturaEnergia}
        />

        {errors.submit && <p className="text-red-600 text-sm">{errors.submit}</p>}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onPrevStep}
            className="form-button form-button-secondary"
            disabled={isSubmitting}
          >
            Voltar
          </button>
          <button type="submit" className="form-button form-button-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Concluir'}
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
        <p className="font-medium">Observação:</p>
        <p className="text-sm">
          Certifique-se de que os documentos estão legíveis e atualizados. Aceitamos arquivos nos
          formatos PDF, JPG, JPEG e PNG.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep7;
