import { NextResponse } from 'next/server';
import { authenticate, setAuthToken } from './crefazApi';

export async function middleware(request) {
  // Verifique se o token está presente e válido
  // Se não estiver, obtenha um novo token
  try {
    const token = await authenticate();
    setAuthToken(token);
  } catch (error) {
    return NextResponse.json({ error: 'Falha na autenticação' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
