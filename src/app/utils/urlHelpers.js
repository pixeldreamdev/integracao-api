export function getNotificationUrl() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (!baseUrl) {
    throw new Error('Base URL não está configurada corretamente.');
  }

  console.log('Ambiente atual:', process.env.NEXT_PUBLIC_ENV || 'homolog');
  return `${baseUrl}/api/notificacao`;
}
