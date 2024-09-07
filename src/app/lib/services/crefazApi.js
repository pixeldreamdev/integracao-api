import axios from 'axios';

const crefazApi = axios.create({
  baseURL: process.env.CREFAZ_API_URL,
});

export const authenticate = async () => {
  const response = await crefazApi.post('/Usuario/login', {
    login: process.env.CREFAZ_LOGIN,
    senha: process.env.CREFAZ_SENHA,
    apiKey: process.env.CREFAZ_API_KEY,
  });
  return response.data.token;
};

export const setAuthToken = token => {
  crefazApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Implemente funções para cada endpoint da API Crefaz
export const cadastrarProposta = async data => {
  const response = await crefazApi.post('/Proposta', data);
  return response.data;
};

// ... outras funções para diferentes endpoints

export default crefazApi;
