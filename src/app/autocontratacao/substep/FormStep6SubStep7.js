import React, { useState, useEffect, useCallback } from 'react';
import { makeApiCall } from '../../api/auth/crefazApi';
import Swal from 'sweetalert2';

const FileUploadField = ({ label, name, acceptedFileTypes, onChange, fileName, onRemove }) => {
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
                onChange={onChange}
              />
            </label>
            <p className="pl-1">ou arraste e solte</p>
          </div>
          {fileName && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">{fileName}</p>
              <button
                type="button"
                onClick={onRemove}
                className="mt-1 text-sm text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FormStep6SubStep7 = ({ onPrevStep, onNextStep, values, handleChange }) => {
  const [documentIds, setDocumentIds] = useState({ identidade: null, contaLuz: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const listarTiposAnexos = useCallback(async () => {
    console.log('Iniciando listarTiposAnexos');
    console.log('values.propostaId:', values.propostaId);

    if (!values.propostaId) {
      console.error('propostaId não definido');
      Swal.fire({
        title: 'Erro',
        text: 'ID da proposta não encontrado. Por favor, reinicie o processo.',
        icon: 'error',
      });
      return;
    }

    try {
      const params = {
        propostaId: values.propostaId,
        tipoModalidade: 2,
        tipoRenda: 0,
      };
      console.log('Parâmetros da requisição:', params);

      const response = await makeApiCall('POST', 'Proposta/tipo-anexos', params);
      console.log('Resposta da API:', response);

      if (response.success && response.data) {
        const newDocumentIds = {};
        response.data.forEach(anexo => {
          if (anexo.nome === 'DOCUMENTO DE IDENTIFICAÇÃO') {
            newDocumentIds.identidade = anexo.id;
          } else if (anexo.nome === 'FATURA DE ENERGIA') {
            newDocumentIds.contaLuz = anexo.id;
          }
        });
        console.log('Novos IDs de documentos:', newDocumentIds);
        setDocumentIds(newDocumentIds);
      } else if (response.errors && response.errors.includes('Nenhum registro encontrado!')) {
        console.warn('Nenhum registro de anexo encontrado para esta proposta');
        Swal.fire({
          title: 'Atenção',
          text: 'Não foram encontrados tipos de anexos para esta proposta. Verifique se todos os passos anteriores foram concluídos corretamente.',
          icon: 'warning',
        });
      } else {
        console.error('Resposta da API não contém dados de sucesso');
        throw new Error('Resposta da API inválida');
      }
    } catch (error) {
      console.error('Erro detalhado ao listar tipos de anexos:', error);
      console.error('Mensagem de erro:', error.message);
      if (error.response) {
        console.error('Dados da resposta de erro:', error.response.data);
      }
      Swal.fire({
        title: 'Erro',
        text: 'Ocorreu um erro ao processar sua proposta. Tente novamente mais tarde.',
        icon: 'error',
      });
    }
  }, [values.propostaId]);

  useEffect(() => {
    if (values.propostaId) {
      listarTiposAnexos();
    }
  }, [values.propostaId, listarTiposAnexos]);

  const handleFileChange = useCallback(
    (name, file) => {
      if (!file) {
        handleChange(name, null);
        return;
      }

      if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
        Swal.fire({
          title: 'Arquivo Inválido!',
          text: 'Por favor, envie arquivos apenas nos formatos PNG, JPEG ou PDF.',
          icon: 'warning',
          confirmButtonColor: '#e47816',
          confirmButtonText: 'Entendi',
        });
        return;
      }

      handleChange(name, file);
    },
    [handleChange]
  );

  const handleRemoveFile = useCallback(
    name => {
      handleChange(name, null);
    },
    [handleChange]
  );

  const fileToBase64WithHeader = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64WithoutHeader = reader.result.split(',')[1];
        const mimeType = file.type;
        const base64WithHeader = `data:${mimeType};base64,${base64WithoutHeader}`;
        resolve(base64WithHeader);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const efetuarUploadArquivo = useCallback(
    async (documentoId, file) => {
      try {
        const base64WithHeader = await fileToBase64WithHeader(file);
        const response = await makeApiCall('PUT', `Proposta/${values.propostaId}/imagem`, {
          documentoId: documentoId,
          conteudo: base64WithHeader,
        });
        console.log('Resposta do upload:', response); // Log adicional
        if (response.success) {
          return true;
        } else {
          throw new Error(
            response.errors ? response.errors.join(', ') : 'Falha no upload do arquivo'
          );
        }
      } catch (error) {
        console.error('Erro no upload:', error);
        throw error;
      }
    },
    [values.propostaId]
  );

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadComplete(false);

    try {
      if (!values.docIdentificacao || !values.faturaEnergia) {
        throw new Error('Por favor, selecione todos os arquivos necessários.');
      }

      console.log('Iniciando uploads...'); // Log adicional

      const results = await Promise.all([
        efetuarUploadArquivo(documentIds.identidade, values.docIdentificacao),
        efetuarUploadArquivo(documentIds.contaLuz, values.faturaEnergia),
      ]);

      console.log('Resultados dos uploads:', results); // Log adicional

      if (results.every(result => result === true)) {
        console.log('Todos os uploads foram bem-sucedidos'); // Log adicional
        setUploadComplete(true);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Arquivos enviados com sucesso!',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showCancelButton: false,
          showConfirmButton: false,
        }).then(() => {
          console.log('Swal fechado, chamando onNextStep'); // Log adicional
          onNextStep();
        });
      } else {
        throw new Error('Falha no upload de um ou mais arquivos');
      }
    } catch (error) {
      console.error('Erro no upload:', error);
      Swal.fire({
        title: 'Erro',
        text: error.message || 'Ocorreu um erro ao enviar os arquivos. Tente novamente.',
        icon: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (uploadComplete) {
      console.log('Upload completo, chamando onNextStep'); // Log adicional
      onNextStep();
    }
  }, [uploadComplete, onNextStep]);

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
          onChange={e => handleFileChange('docIdentificacao', e.target.files[0])}
          fileName={values.docIdentificacao?.name}
          onRemove={() => handleRemoveFile('docIdentificacao')}
        />

        <FileUploadField
          label="Fatura de energia"
          name="faturaEnergia"
          acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
          onChange={e => handleFileChange('faturaEnergia', e.target.files[0])}
          fileName={values.faturaEnergia?.name}
          onRemove={() => handleRemoveFile('faturaEnergia')}
        />

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onPrevStep}
            className="form-button form-button-secondary"
            disabled={isSubmitting}
          >
            Voltar
          </button>
          <button
            type="submit"
            className="form-button form-button-primary"
            disabled={isSubmitting || !values.docIdentificacao || !values.faturaEnergia}
            onClick={() => console.log('Botão Próximo clicado')} // Log adicional
          >
            {isSubmitting ? 'Enviando...' : 'Próximo'}
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
