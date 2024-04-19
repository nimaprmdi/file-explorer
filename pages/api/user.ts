import { verifyToken } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ status: "failed", message: "Method not allowed" });
  }

  const secretKey = process.env.SECRET_KEY;

  const token = req.cookies.token;

  if (!token || token === undefined) {
    res.status(401).json({ status: "failed", message: "You are unauthorized" });
  }

  const result = await verifyToken(token!, secretKey!);

  if (result) {
    res.status(200).json({ status: "success", data: result });
  } else {
    res.status(401).json({ status: "failed", message: "You are unauthorized" });
  }
}
