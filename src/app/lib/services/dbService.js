import axios from 'axios';

const Url = process.env.NEXT_PUBLIC_URL || ''; // Você pode definir isso como '' para caminhos relativos

export const updateProposta = async propostaData => {
  try {
    console.log('Tentando atualizar proposta:', propostaData);
    const response = await axios.put(`${Url}/api/updateproposta`, propostaData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Resposta do servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Erro detalhado ao atualizar proposta:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const saveProposta = async propostaData => {
  try {
    console.log('Tentando salvar proposta:', propostaData);
    const response = await axios.post(`${Url}/api/saveproposta`, propostaData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Resposta do servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Erro detalhado ao salvar proposta:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const checkExistingProposta = async cpf => {
  try {
    const response = await axios.get(`${Url}/api/pre-analise`, { params: { cpf } });
    return response.data;
  } catch (error) {
    console.error(
      'Erro ao verificar proposta existente:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
