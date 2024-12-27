export function getNotificationUrl() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

  if (!baseUrl) {
    throw new Error('Base URL não está configurada corretamente.');
  }

<<<<<<< HEAD
  console.log('Ambiente:', process.env.NEXT_PUBLIC_ENV || 'prod');
=======
  console.log('Ambiente atual:', process.env.NEXT_PUBLIC_ENV || 'homolog');
>>>>>>> ec6e0d62d7dc5a1db9041a507703c6100656b5a7
  return `${baseUrl}/api/notificacao`;
}
