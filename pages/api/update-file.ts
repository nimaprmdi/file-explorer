import User from "@/models/User";
import { UserPayload, verifyPassword, verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /*------------------------------------*\
    #check req method
  \*------------------------------------*/
  if (req.method !== "POST") return;

  /*------------------------------------*\
    #connect DB
  \*------------------------------------*/
  try {
    await connectDB();
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    res.status(500).json({ status: "failed", message: "Failed to connecting DB" });
  }

  /*------------------------------------*\
    # user data
  \*------------------------------------*/
  const files = req.body;
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

  /*------------------------------------*\
    # Update database
  \*------------------------------------*/

  user.files = JSON.parse(files);
  await user.save();

  res.status(200).json({ status: "success", message: "data updated" });
}
