// app/api/updateproposta/route.js
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function PUT(request) {
  try {
    const body = await request.json();
    await client.connect();
    const database = client.db('crefaz_temp');
    const propostas = database.collection('propostas');

    const result = await propostas.updateOne(
      { propostaId: body.propostaId },
      { $set: body },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Proposta atualizada com sucesso',
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Erro ao atualizar proposta:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao atualizar proposta' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
