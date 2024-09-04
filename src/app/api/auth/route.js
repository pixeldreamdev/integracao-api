import { NextResponse } from 'next/server';
import { authenticate, setAuthToken } from '../../lib/services/crefazApi';

export async function GET() {
  try {
    const token = await authenticate();
    setAuthToken(token);
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Falha na autenticação' }, { status: 401 });
  }
}
