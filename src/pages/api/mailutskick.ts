
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma';

import rateLimit from 'express-rate-limit';

const prisma = new PrismaClient();

// Skapa en limiter-instans (max 5 POST per IP per timme)
const limiter = rateLimit({
  windowMs: 1 * 1000, // 1 sekund (för test)
  max: 5,
  message: { error: 'För många förfrågningar, försök igen senare.' },
  keyGenerator: (req) => req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Kör rate limiting manuellt (eftersom Next.js API routes inte har Express middleware)
    let limited = false;
    await new Promise((resolve) => {
      limiter(req as any, res as any, () => {
        limited = true;
        resolve(null);
      });
      if (res.headersSent) resolve(null);
    });
    if (!limited) return; // Rate limit har skickat svar

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
