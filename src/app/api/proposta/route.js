import { NextResponse } from 'next/server';
import { cadastrarProposta } from '../../lib/services/crefazApi';

export async function POST(request) {
  try {
    const data = await request.json();
    const proposta = await cadastrarProposta(data);
    return NextResponse.json(proposta);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao cadastrar proposta' }, { status: 400 });
  }
}

// Implemente outras funções para diferentes métodos HTTP
