// src/middleware.js
import { NextResponse } from 'next/server';

const LIMIT = 10; // Número máximo de requisições
const WINDOW_SIZE = 60 * 1000; // Janela de tempo em milissegundos (1 minuto)

const rateLimitMap = new Map();

export function middleware(request) {
  const ip = request.ip ?? '127.0.0.1';
  const now = Date.now();

  const userRequests = rateLimitMap.get(ip) ?? [];
  const recentRequests = userRequests.filter(time => now - time < WINDOW_SIZE);

  if (recentRequests.length >= LIMIT) {
    return new NextResponse(JSON.stringify({ error: 'Too Many Requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
