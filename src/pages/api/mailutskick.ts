
//
import { PrismaClient } from '../../generated/prisma';
import rateLimit from 'express-rate-limit';
import type { Request, Response } from 'express';
import { nextCsrf } from 'next-csrf';

const prisma = new PrismaClient();
const { csrf } = nextCsrf({ secret: process.env.CSRF_SECRET || 'supersecret' });

// Skapa en limiter-instans (max 5 POST per IP per timme)
const limiter = rateLimit({
  windowMs: 1 * 1000, // 1 sekund (för test)
  max: 5,
  message: { error: 'För många förfrågningar, försök igen senare.' },
  keyGenerator: (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    if (Array.isArray(forwarded)) return forwarded[0] || '';
    return (forwarded as string) || req.socket.remoteAddress || '';
  },
});

const handler: import('next').NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    // Kör rate limiting manuellt
    let limited = false;
    await new Promise((resolve) => {
      limiter(req as unknown as Request, res as unknown as Response, () => {
        limited = true;
        resolve(null);
      });
      if (res.headersSent) resolve(null);
    });
    if (!limited) return; // Rate limit har skickat svar

    const { namn, email } = req.body;
    try {
      const utskick = await prisma.mailUtskick.create({
        data: { namn, email },
      });
      res.status(201).json(utskick);
    } catch {
      res.status(500).json({ error: 'Något gick fel vid sparandet av anmälan till mailutskick.' });
    }
  } else if (req.method === 'GET') {
    // Skicka CSRF-token till klienten
    const token = (req as { csrfToken?: string }).csrfToken;
    res.status(200).json({ csrfToken: token });
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default csrf(handler);
