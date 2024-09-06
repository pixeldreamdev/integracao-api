import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const body = await request.json();
    await client.connect();
    const database = client.db('crefaz_temp');
    const propostas = database.collection('propostas');

    const result = await propostas.insertOne(body);

    return NextResponse.json({
      success: true,
      message: 'Proposta salva com sucesso',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Erro ao salvar proposta:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao salvar proposta' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
