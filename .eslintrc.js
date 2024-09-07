module.exports = {
  parser: 'babel-eslint', // Mova o parser para fora das regras
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended', // Adiciona o Prettier à configuração do ESLint
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/no-unescaped-entities': 'off', // Desativa a regra que estava causando o erro anterior
    singleQuote: [2, 'always'],
  },
};
