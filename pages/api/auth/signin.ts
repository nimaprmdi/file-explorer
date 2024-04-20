import User from "@/models/User";
import connectDB from "@/utils/connectDb";
import { verifyPassword } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(500).json({ status: "failed", message: `${req.method} is not supported` });
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Failed to connecting DB" });
  }

  const { email, password } = req.body;
  const secret_key = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!email || !password) {
    res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const user = await User.findOne({ email: email }, {}, { maxTimeMS: 30000 });
  if (!user) {
    res.status(404).json({ status: "failed", message: "User doesnt Exist" });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    res.status(422).json({ status: "failed", message: "username or password is incorrect" });
  }

  const token = sign({ email }, secret_key!, {
    expiresIn: expiration,
  });

  const serialized = serialize("token", token, { httpOnly: true, maxAge: expiration, path: "/" });

  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({ status: "success", message: "User logged in", data: { email: user.email } });
}
