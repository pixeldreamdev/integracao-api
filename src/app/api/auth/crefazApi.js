import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let authToken = null;

const authenticate = async () => {
  console.log('Iniciando processo de autenticação...');
  try {
    const response = await axios.post(`${API_URL}/Usuario/login`, {
      login: process.env.CREFAZ_LOGIN,
      senha: process.env.CREFAZ_SENHA,
      apiKey: process.env.CREFAZ_API_KEY,
    });
    console.log('Resposta de autenticação:', response.data);
    if (response.data.success) {
      authToken = response.data.data.token;
      console.log('Token obtido e armazenado com sucesso');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    return false;
  }
};

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async config => {
  console.log('Verificando autenticação...');
  if (!authToken) {
    console.log('Token ausente, iniciando nova autenticação');
    await authenticate();
  }
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      console.log('Token expirado ou inválido, tentando reautenticar...');
      const authenticated = await authenticate();
      if (authenticated) {
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${authToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export const makeApiCall = async (method, endpoint, data = null) => {
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
    if (error.response && error.response.status === 401) {
      console.log('Token expirado, tentando reautenticar...');
      await authenticate();
      return makeApiCall(method, endpoint, data);
    }
    throw error;
  }
};

export default api;
