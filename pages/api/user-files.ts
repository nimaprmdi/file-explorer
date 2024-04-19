import User from "@/models/User";
import connectDB from "@/utils/connectDb";
import { UserPayload, verifyToken } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(500).json({ status: "failed", message: `${req.method} is not supported` });
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Failed to connecting DB" });
  }

  /*------------------------------------*\
    # user data
  \*------------------------------------*/
  const { token } = req.cookies;
  const privateKey = process.env.SECRET_KEY;

  /*------------------------------------*\
    # token validation
  \*------------------------------------*/
  if (!token) {
    res.status(401).json({ status: "failed", message: "You are not authorized" });
  }

  const result = (await verifyToken(token!, privateKey!)) as UserPayload;
  if (!result) res.status(401).json({ status: "failed", message: "unauthorized" });

  /*------------------------------------*\
    # User check existance 
  \*------------------------------------*/
  const user = await User.findOne({ email: result?.email });
  if (!user) res.status(404).json({ status: "failed", message: "user not found" });

  // status 200 here
  res.status(200).json({ status: "success", message: "OK", data: user.files });
}
