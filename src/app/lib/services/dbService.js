import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Por favor, adicione sua URI do MongoDB às variáveis de ambiente.');
}

const client = new MongoClient(uri);

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Evita recriar a conexão durante o desenvolvimento
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, usa uma única promessa
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('crefaz_temp');
    console.log('Conexão com o MongoDB estabelecida com sucesso');
    return { db, client };
  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    throw error;
  }
}

export async function salvarPropostaTemporaria(dados) {
  const { db } = await connectToDatabase();
  const collection = db.collection('propostas_temporarias');

  const resultado = await collection.insertOne({
    ...dados,
    createdAt: new Date(),
    expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
  });

  return resultado.insertedId;
}

export async function buscarPropostaTemporaria(cpf) {
  const { db } = await connectToDatabase();
  const collection = db.collection('propostas_temporarias');

  return await collection.findOne({ cpf });
}

export async function atualizarPropostaTemporaria(id, dados) {
  const { db } = await connectToDatabase();
  const collection = db.collection('propostas_temporarias');

  await collection.updateOne({ _id: id }, { $set: dados });
}

export async function deletarPropostaTemporaria(id) {
  const { db } = await connectToDatabase();
  const collection = db.collection('propostas_temporarias');

  await collection.deleteOne({ _id: id });
}
