import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/Usuario/login`, {
      login: process.env.CREFAZ_LOGIN,
      senha: process.env.CREFAZ_SENHA,
      apiKey: process.env.CREFAZ_API_KEY,
    });

    if (response.data.success) {
      return NextResponse.json({ success: true, token: response.data.data.token });
    } else {
      return NextResponse.json(
        { success: false, message: 'Falha na autenticação' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
