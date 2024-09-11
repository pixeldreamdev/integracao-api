import { NextResponse } from 'next/server';
import axios from 'axios';
import apiConfig from '../../config/apiConfig';

export async function POST() {
  try {
    const response = await axios.post(`${apiConfig.getBaseUrl()}Usuario/login`, {
      login: process.env.CREFAZ_LOGIN,
      senha: process.env.CREFAZ_SENHA,
      apiKey: process.env.CREFAZ_API_KEY,
    });

    if (response.data.success) {
      return NextResponse.json({ token: response.data.data.token });
    } else {
      return NextResponse.json({ message: 'Falha na autenticação' }, { status: 401 });
    }
  } catch (error) {
    console.error('Erro na autenticação:', error.response?.data || error.message);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
