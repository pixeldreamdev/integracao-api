const apiConfig = {
  ambiente: process.env.NEXT_PUBLIC_ENV || 'prod', // Define o ambiente explicitamente usando uma variável de ambiente

  ambientes: {
    homolog: {
      baseUrl: 'https://app2-crefaz-api-external-stag.azurewebsites.net/api/',
    },
    prod: {
      baseUrl: 'https://api-externo.crefazon.com.br/api/',
    },
  },

  getBaseUrl: function () {
    const ambienteConfig = this.ambientes[this.ambiente] || this.ambientes.homolog;
    console.log('Ambiente atual:', this.ambiente);
    console.log('URL base:', ambienteConfig.baseUrl);
    return ambienteConfig.baseUrl;
  },
};

export default apiConfig;
