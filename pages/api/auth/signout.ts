import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  const serialized = serialize("token", "", { maxAge: 0, path: "/" });
  res.status(200).setHeader("Set-Cookie", serialized).json({ status: "success", message: "Sign out successfully" });
}
