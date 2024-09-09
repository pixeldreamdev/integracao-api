import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      const response = await axios.post('/api/auth', {});
      console.log('Resposta de autenticação:', response.data);
      if (response.data.success) {
        authToken = response.data.token;
        console.log('Token obtido e armazenado com sucesso');
        resolve(true);
      } else {
        reject(new Error('Falha na autenticação'));
      }
    } catch (error) {
      console.error('Erro durante a autenticação:', error);
      reject(error);
    } finally {
      isAuthenticating = false;
    }
  });

  return authPromise;
};

export const makeApiCall = async (method, endpoint, data = null, retryCount = 0) => {
  console.log(`Iniciando chamada API: ${method} ${endpoint}`);

  if (!authToken) {
    await authenticate();
  }

  try {
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      ...(method.toLowerCase() === 'get' ? { params: data } : { data }),
    };
    console.log('Configuração da chamada API:', config);
    const response = await axios(config);
    console.log(`Resposta da API (${method} ${endpoint}):`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro detalhado na chamada API (${method} ${endpoint}):`, error);
    if (error.response && error.response.status === 401 && retryCount < 3) {
      console.log('Token expirado, tentando reautenticar...');
      await authenticate();
      return makeApiCall(method, endpoint, data, retryCount + 1);
    }
    throw error;
  }
};

const crefazApiService = { authenticate, makeApiCall };
export default crefazApiService;
