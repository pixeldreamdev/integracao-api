// // pages/api/test-auth.js

// import { authenticate } from '../../lib/services/crefazApi';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const token = await authenticate();
//       res.status(200).json({ message: 'Autenticação bem-sucedida', token });
//     } catch (error) {
//       res.status(500).json({ message: 'Erro na autenticação', error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
