// pages/api/notificacao.js

import rateLimit from 'express-rate-limit';
import Joi from 'joi';

// Middleware de limitação de taxa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 requisições por IP a cada 15 minutos
  message: 'Muitas requisições feitas a partir deste IP, tente novamente mais tarde',
});

// Esquema de validação usando Joi
const schema = Joi.object({
  loanId: Joi.string().required(),
  status: Joi.string().valid('approved', 'rejected', 'pending').required(),
  amount: Joi.number().positive().optional(),
  // Adicione mais campos conforme necessário
});

export default async function handler(req, res) {
  // Aplica o rate limiter
  await new Promise((resolve, reject) => {
    limiter(req, res, result => (result instanceof Error ? reject(result) : resolve(result)));
  });

  // Verifica o método da requisição
  if (req.method === 'POST') {
    // Obtém o token da requisição
    const token = req.headers['authorization'];

    // Verifica se o token é válido
    if (token !== `Bearer ${process.env.SECRET_TOKEN}`) {
      return res.status(401).json({ message: 'Token inválido ou ausente' });
    }

    // Valida o corpo da requisição
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Dados inválidos', details: error.details });
    }

    // Processa a notificação válida
    console.log('Notificação recebida:', value);

    // Aqui você pode processar os dados recebidos, salvar no banco de dados, etc.

    return res.status(200).json({ message: 'Notificação recebida com sucesso' });
  } else {
    // Responda com método não permitido para outros tipos de requisições
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
