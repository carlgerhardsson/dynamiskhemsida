import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    // Sätt en httpOnly-cookie
    res.setHeader(
      "Set-Cookie",
      serialize("isLoggedIn", "true", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 8, // 8 timmar
      })
    );
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ error: "Fel användarnamn eller lösenord" });
}
