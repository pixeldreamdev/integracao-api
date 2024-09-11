const apiConfig = {
  ambiente: process.env.NODE_ENV === 'production' ? 'prod' : 'homolog',

  ambientes: {
    homolog: {
      baseUrl: 'https://app2-crefaz-api-external-stag.azurewebsites.net/api/',
    },
    prod: {
      baseUrl: 'https://api-externo.crefazon.com.br/api/',
    },
  },

  getBaseUrl: function () {
    console.log('Ambiente atual:', this.ambiente);
    console.log('URL base:', this.ambientes[this.ambiente].baseUrl);
    return this.ambientes[this.ambiente].baseUrl;
  },
};

export default apiConfig;
