import { NextResponse } from 'next/server';
import { login, getCidades } from '@/lib/crefazApi';

export async function POST(request) {
  const body = await request.json();
  try {
    const data = await login(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao fazer login' }, { status: 500 });
  }
}

export async function GET(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
  }
  try {
    const data = await getCidades(token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter cidades' }, { status: 500 });
  }
}
