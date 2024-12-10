export function getNotificationUrl() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  console.log('Ambiente:', process.env.NEXT_PUBLIC_ENV || 'prod');
  return `${baseUrl}/api/notificacao`;
}
