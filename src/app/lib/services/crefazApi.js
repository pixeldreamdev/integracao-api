import axios from 'axios';

const crefazApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CREFAZ_API_URL,
});

let authToken = null;

export const authenticate = async () => {
  try {
    const response = await crefazApi.post('/Usuario/login', {
      login: process.env.NEXT_PUBLIC_CREFAZ_LOGIN,
      senha: process.env.NEXT_PUBLIC_CREFAZ_SENHA,
      apiKey: process.env.NEXT_PUBLIC_CREFAZ_API_KEY,
    });
    authToken = response.data.token;
    crefazApi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    return authToken;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    throw error;
  }
};

export const getOcupacoes = async () => {
  try {
    if (!authToken) await authenticate();
    const response = await crefazApi.get('/Contexto/Ocupacao');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter ocupações:', error);
    throw error;
  }
};

export const getCidadeId = async (uf, cidade) => {
  try {
    if (!authToken) await authenticate();
    const response = await crefazApi.post('/Endereco/Cidade', { uf, nomeCidade: cidade });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter ID da cidade:', error);
    throw error;
  }
};

export const cadastrarProposta = async dados => {
  try {
    if (!authToken) await authenticate();
    const response = await crefazApi.post('/Proposta', dados);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar proposta:', error);
    throw error;
  }
};

export default crefazApi;
