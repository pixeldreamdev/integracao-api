import axios from 'axios';
import apiConfig from '../../config/apiConfig';

let authToken = null;
let isAuthenticating = false;
let authPromise = null;

const authenticate = async () => {
  if (isAuthenticating) {
    return authPromise;
  }

  isAuthenticating = true;
  authPromise = new Promise(async (resolve, reject) => {
    try {
      console.log('Iniciando processo de autenticação...');
      const response = await axios.post('/api/auth');
      console.log('Resposta de autenticação:', response.data);
      if (response.data.token) {
        authToken = response.data.token;
        console.log('Token obtido e armazenado com sucesso');
        resolve(true);
      } else {
        reject(new Error('Falha na autenticação'));
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error.response?.data || error.message);
      reject(error);
    } finally {
      isAuthenticating = false;
    }
  });

  return authPromise;
};

const makeApiCall = async (method, endpoint, data = null) => {
  console.log(`Iniciando chamada API: ${method} ${endpoint}`);
  console.log('Dados enviados:', data);

  if (!authToken) {
    await authenticate();
  }

  try {
    const config = {
      method,
      url: `${apiConfig.getBaseUrl()}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      ...(method.toLowerCase() === 'get' ? { params: data } : { data }),
    };
    console.log('Configuração completa da chamada API:', config);
    const response = await axios(config);
    console.log(`Resposta da API (${method} ${endpoint}):`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Erro detalhado na chamada API (${method} ${endpoint}):`,
      error.response?.data || error.message
    );
    if (error.response && error.response.status === 401) {
      console.log('Token expirado, tentando reautenticar...');
      authToken = null;
      await authenticate();
      return makeApiCall(method, endpoint, data);
    }
    throw error;
  }
};

export { authenticate, makeApiCall };

const crefazApiService = { authenticate, makeApiCall };
export default crefazApiService;
