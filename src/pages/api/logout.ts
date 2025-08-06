import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  // Ta bort cookien
  res.setHeader(
    "Set-Cookie",
    serialize("isLoggedIn", "", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(0),
    })
  );
  return res.status(200).json({ success: true });
}
