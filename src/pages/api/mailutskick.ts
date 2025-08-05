import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { namn, email } = req.body;
    try {
      const utskick = await prisma.mailUtskick.create({
        data: {
          namn,
          email,
        },
      });
      res.status(201).json(utskick);
    } catch {
      res.status(500).json({ error: 'Något gick fel vid sparandet av anmälan till mailutskick.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
