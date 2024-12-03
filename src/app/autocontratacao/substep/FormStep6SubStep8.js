import React, { useState, useMemo } from 'react';
import { makeApiCall } from '../../api/auth/crefazApi';
import PropostaSuccess from './PropostaSuccess';
import profissoesId from '../../data/profissoes';

const FormStep6SubStep8 = ({ onPrevStep, values }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const preparePropostaData = () => {
    const toNumber = (value, defaultValue = 0) => {
      const num = Number(value);
      return isNaN(num) ? defaultValue : num;
    };

    const sanitizeString = str => {
      return str ? str.trim().replace(/[^\w@.-\s]/g, '') : '';
    };

    const formatRequiredDate = (dateString, fieldName) => {
      if (!dateString) {
        throw new Error(`O campo ${fieldName} é obrigatório.`);
      }
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error(`O campo ${fieldName} deve ser uma data válida.`);
      }
      return date.toISOString().split('T')[0];
    };

    return {
      id: toNumber(values.propostaId),
      cliente: {
        nome: sanitizeString(values.nome),
        rg: sanitizeString(values.numeroRgCnh),
        rgEmissor: sanitizeString(values.orgaoEmissor),
        rgUfId: values.ufId,
        rgEmissao: values.dataEmissao,
        sexo: toNumber(values.sexoId),
        estadoCivil: toNumber(values.estadoCivilId),
        nacionalidadeId: toNumber(values.nacionalidade, 1),
        naturalidadeUfId: toNumber(values.ufNaturalidade),
        naturalidadeCidadeId: toNumber(values.naturalidadeMesorregiaoId),
        grauInstrucaoId: toNumber(values.grauInstrucao),
        nomeMae: sanitizeString(values.nomeMae),
        nomeConjuge: sanitizeString(values.nomeConjuge) || null,
        pep: Boolean(values.pep === 'sim'),
      },
      contatos: {
        contato: {
          email: sanitizeString(values.email),
          telefone: sanitizeString(values.celular),
          telefoneExtra: (values.telefonesExtras || []).map(tel => ({
            id: toNumber(tel.tipo),
            telefone: sanitizeString(tel.numero),
          })),
        },
        referencia: (values.referencias || []).map((ref, index) => ({
          id: index + 1,
          nome: sanitizeString(ref.nome),
          telefone: sanitizeString(ref.telefone),
          grau: toNumber(ref.tipoReferencia),
        })),
      },
      endereco: {
        cep: sanitizeString(values.cep),
        logradouro: sanitizeString(values.logradouro),
        numero: toNumber(values.numero),
        bairro: sanitizeString(values.bairro),
        complemento: sanitizeString(values.complemento) || null,
        cidadeId: toNumber(values.cidadeId),
      },
      bancario: {
        bancoId: sanitizeString(values.banco),
        agencia: sanitizeString(values.agencia),
        digito: sanitizeString(values.digitoAgencia),
        numero: sanitizeString(values.conta),
        conta: toNumber(values.tipoConta),
        tipoConta: toNumber(values.tipoContaId),
        tempoConta: toNumber(values.tempoContaId),
      },
      profissional: {
        empresa: sanitizeString(values.empresa),
        profissaoId: toNumber(values.profissao),
        tempoEmpregoAtual: toNumber(values.tempoEmpregoId),
        telefoneRH: sanitizeString(values.telefoneRH) || null,
        pisPasep: sanitizeString(values.pisPasep) || null,
        renda: toNumber(values.valorRendaPresumida),
        tipoRenda: 1,
        outrasRendas: toNumber(values.outrasRendas) || null,
        tipoOutrasRendas: sanitizeString(values.tipoOutrasRendas) || null,
        orgaoDados: [],
      },
      unidade: {
        nomeVendedor: sanitizeString('Rafael Monteiro'),
        cpfVendedor: sanitizeString('09056755846'),
        celularVendedor: sanitizeString('11954552255'),
      },
      operacao: {
        produtoId: toNumber(values.produtoId),
        diaRecebimento: toNumber(values.diaRecebimento),
        tipoModalidade: 2,
        convenioId: toNumber(values.convenioId),
        vencimento: values.vencimentoSelecionado,
        tabelaJurosId: toNumber(values.tabelaJurosId),
        valorContratado: toNumber(values.valorContratado),
        prazo: toNumber(values.prazoSelecionado),
        prestacao: toNumber(values.prestacaoSelecionada),
        renda: toNumber(values.valorRendaPresumida),
        tipoRenda: 1,
        tipoCalculo: 0,
        valorDebitoConcorrente: 0,
      },
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const propostaData = preparePropostaData();
      console.log('Dados da proposta a serem enviados:', JSON.stringify(propostaData, null, 2));

      const response = await makeApiCall('PUT', `/Proposta/${values.propostaId}`, propostaData);

      if (response.success) {
        setIsSuccess(true);
      } else {
        throw new Error(response.message || 'Falha ao atualizar a proposta');
      }
    } catch (err) {
      console.error('Erro ao atualizar proposta:', err);
      setError('Ocorreu um erro ao atualizar a proposta. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = value => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const profissaoNome = useMemo(() => {
    const profissao = profissoesId.find(p => p.id === parseInt(values.profissao));
    return profissao ? profissao.nome : 'Não especificada';
  }, [values.profissao]);

  if (isSuccess) {
    return <PropostaSuccess propostaId={values.propostaId} />;
  }

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Revisão e Envio da Proposta</h2>
      <p className="text-text-light mb-6">
        Por favor, revise todas as informações antes de enviar sua proposta.
      </p>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Resumo das Informações</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Dados Pessoais</h4>
              <p>Nome: {values.nome}</p>
              <p>CPF: {values.cpf}</p>
              <p>RG: {values.numeroRgCnh}</p>
              <p>Data de Nascimento: {formatDate(values.dataNascimento)}</p>
            </div>

            <div>
              <h4 className="font-medium">Contato</h4>
              <p>Email: {values.email}</p>
              <p>Telefone: {values.celular}</p>
            </div>

            <div>
              <h4 className="font-medium">Endereço</h4>
              <p>
                {values.logradouro}, {values.numero}
              </p>
              <p>
                {values.bairro}, {values.cidade} - {values.uf}
              </p>
              <p>CEP: {values.cep}</p>
            </div>

            <div>
              <h4 className="font-medium">Dados Bancários</h4>
              <p>Banco: {values.nomeBanco}</p>
              <p>Agência: {values.agencia}</p>
              <p>Conta: {values.conta}</p>
            </div>

            <div>
              <h4 className="font-medium">Dados Profissionais</h4>
              <p>Empresa: {values.empresa || 'Não informada'}</p>
              <p>Profissão: {profissaoNome}</p>
              <p>Renda: {formatCurrency(values.valorRendaPresumida || 0)}</p>
            </div>

            <div>
              <h4 className="font-medium">Detalhes do Empréstimo</h4>
              <p>Valor Contratado: {formatCurrency(values.valorContratado || 0)}</p>
              <p>Prazo: {values.prazoSelecionado} meses</p>
              <p>Prestação: {formatCurrency(values.prestacaoSelecionada || 0)}</p>
            </div>
          </div>
        </div>

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
            {isSubmitting ? 'Enviando...' : 'Finalizar e Enviar Proposta'}
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
        <p className="font-medium">Observação:</p>
        <p className="text-sm">
          Ao clicar em "Finalizar e Enviar Proposta", todas as informações acima serão enviadas para
          análise. Certifique-se de que todos os dados estão corretos antes de prosseguir.
        </p>
      </div>
    </div>
  );
};

export default FormStep6SubStep8;
