import axios from 'axios';

const Url = process.env.NEXT_PUBLIC_URL || ''; // Fallback para caminhos relativos

/**
 * Função para verificar se uma proposta existente está cadastrada no sistema.
 * @param {string} cpf - CPF do cliente.
 * @returns {Promise<Object>} Dados da proposta existente.
 */
export const checkExistingProposta = async cpf => {
  try {
    console.log('🔍 Verificando proposta existente para CPF:', cpf);
    const response = await axios.get(`${Url}/api/check-existing-proposta`, {
      params: { cpf },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ Resposta recebida (checkExistingProposta):', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    console.error('❌ Erro ao verificar proposta existente:', errorMessage);
    throw error;
  }
};

/**
 * Função para atualizar uma proposta no sistema.
 * @param {Object} propostaData - Dados da proposta para atualizar.
 * @returns {Promise<Object>} Resposta do servidor após atualização.
 */
export const updateProposta = async propostaData => {
  try {
    console.log('✏️ Tentando atualizar proposta:', propostaData);
    const response = await axios.put(`${Url}/api/updateproposta`, propostaData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ Resposta recebida (updateProposta):', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    console.error('❌ Erro ao atualizar proposta:', errorMessage);
    throw error;
  }
};

/**
 * Função para salvar uma nova proposta no sistema.
 * @param {Object} propostaData - Dados da proposta para salvar.
 * @returns {Promise<Object>} Resposta do servidor após salvar.
 */
export const saveProposta = async propostaData => {
  try {
    console.log('💾 Tentando salvar proposta:', propostaData);
    const response = await axios.post(`${Url}/api/saveproposta`, propostaData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('✅ Resposta recebida (saveProposta):', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    console.error('❌ Erro ao salvar proposta:', errorMessage);
    throw error;
  }
};

/**
 * Função auxiliar para fazer chamadas a endpoints externos genéricos.
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE).
 * @param {string} endpoint - Endpoint do serviço.
 * @param {Object|null} data - Dados enviados no corpo ou como parâmetros.
 * @returns {Promise<Object>} Resposta do servidor.
 */
export const makeExternalApiCall = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${Url}/api/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(method.toLowerCase() === 'get' ? { params: data } : { data }),
    };
    console.log(`🌐 Fazendo chamada externa para ${endpoint}:`, config);
    const response = await axios(config);
    console.log(`✅ Resposta recebida (${endpoint}):`, response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    console.error(`❌ Erro na chamada externa (${endpoint}):`, errorMessage);
    throw error;
  }
};

// Exportando todas as funções como módulo padrão
export default {
  checkExistingProposta,
  updateProposta,
  saveProposta,
  makeExternalApiCall,
};
