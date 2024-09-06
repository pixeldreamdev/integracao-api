import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cpf = searchParams.get('cpf');

  if (!cpf) {
    return NextResponse.json({ error: 'CPF é obrigatório' }, { status: 400 });
  }

  try {
    await client.connect();
    const database = client.db('crefaz_temp');
    const propostas = database.collection('propostas');

    const existingProposta = await propostas.findOne({ cpf });

    if (existingProposta) {
      return NextResponse.json({
        exists: true,
        propostaId: existingProposta.propostaId,
      });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error('Erro ao verificar proposta:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  } finally {
    await client.close();
  }
}
