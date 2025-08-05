import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { namn, email, telefon, meddelande, dates } = req.body;
    try {
      const anmalan = await prisma.intresseAnmalan.create({
        data: {
          namn,
          email,
          telefon,
          meddelande,
          dates,
        },
      });
      res.status(201).json(anmalan);
    } catch {
      res.status(500).json({ error: 'Något gick fel vid sparandet av anmälan.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
