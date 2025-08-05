import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { namn, text } = req.body;
    if (!namn || !text || text.length > 300) {
      return res.status(400).json({ error: "Namn och text krävs, max 300 tecken." });
    }
    // Spara ny kommentar
    await prisma.comment.create({ data: { namn, text } });
    // Hämta de tre senaste kommentarerna
    const latest = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    // Ta bort äldre kommentarer om det finns fler än 3
    const allIds = (await prisma.comment.findMany({ orderBy: { createdAt: "desc" }, select: { id: true } })).map(c => c.id);
    if (allIds.length > 3) {
      await prisma.comment.deleteMany({ where: { id: { in: allIds.slice(3) } } });
    }
    return res.status(200).json(latest);
  }
  if (req.method === "GET") {
    // Hämta de tre senaste kommentarerna
    const latest = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    return res.status(200).json(latest);
  }
  res.status(405).end();
}
