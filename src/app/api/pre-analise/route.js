import { NextResponse } from 'next/server';
import {
  connectToDatabase,
  buscarPropostaTemporaria,
  salvarPropostaTemporaria,
} from '../../lib/services/dbService';

export async function POST(request) {
  console.log('Requisição recebida na rota ../api/pre-analise');
  try {
    const { cpf } = await request.json();
    console.log('CPF recebido:', cpf);

    const { db } = await connectToDatabase();
    console.log('Conexão com o banco de dados estabelecida');

    const propostaTemp = await buscarPropostaTemporaria(cpf);
    console.log('Resultado da busca por proposta temporária:', propostaTemp);

    if (propostaTemp) {
      console.log('Proposta existente encontrada');
      return NextResponse.json({
        status: 'existente',
        proposta: propostaTemp,
        propostaId: propostaTemp._id.toString(),
      });
    } else {
      console.log('Criando nova proposta temporária');
      const novaPropostaId = await salvarPropostaTemporaria({ cpf });
      console.log('Nova proposta criada com ID:', novaPropostaId);
      return NextResponse.json({ status: 'nova', propostaId: novaPropostaId.toString() });
    }
  } catch (error) {
    console.error('Erro detalhado:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar pré-análise', details: error.message },
      { status: 500 }
    );
  }
}
