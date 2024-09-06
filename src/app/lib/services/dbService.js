import axios from 'axios';

export const updateProposta = async propostaData => {
  try {
    console.log('Tentando atualizar proposta:', propostaData);
    const response = await axios.put('../../api/updateproposta', propostaData, {
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
    const response = await axios.post('../../api/saveproposta', propostaData, {
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
    const response = await axios.get('../../api/pre-analise', { params: { cpf } });
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar proposta existente:', error);
    throw error;
  }
};
