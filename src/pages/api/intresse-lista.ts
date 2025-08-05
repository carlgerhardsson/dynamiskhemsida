import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const anmalningar = await prisma.intresseAnmalan.findMany({ orderBy: { createdAt: 'desc' } });
      res.status(200).json(anmalningar);
    } catch {
      res.status(500).json({ error: 'Kunde inte hämta anmälningar.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
