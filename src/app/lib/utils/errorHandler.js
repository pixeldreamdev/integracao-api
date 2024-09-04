export const handleApiError = error => {
  if (error.response) {
    // O servidor respondeu com um status fora do intervalo 2xx
    return {
      status: error.response.status,
      message: error.response.data.message || 'Erro na resposta do servidor',
    };
  } else if (error.request) {
    // A requisição foi feita mas não houve resposta
    return {
      status: 503,
      message: 'Serviço indisponível',
    };
  } else {
    // Algo aconteceu na configuração da requisição que causou o erro
    return {
      status: 500,
      message: 'Erro interno do servidor',
    };
  }
};
