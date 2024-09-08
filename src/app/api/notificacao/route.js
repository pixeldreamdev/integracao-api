import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Obtém o corpo da requisição
    const body = await request.json();

    // Log dos dados recebidos
    console.log('Notificação de proposta recebida:', body);

    // Aqui você pode adicionar lógica adicional se necessário
    // Por exemplo, você pode querer registrar esta notificação em um log separado
    // ou realizar alguma ação específica baseada na notificação

    // Responde com sucesso
    return NextResponse.json(
      { message: 'Notificação recebida e registrada com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar notificação:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
