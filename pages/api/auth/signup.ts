import User from "@/models/User";
import { hasPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /*------------------------------------*\
    #request method
  \*------------------------------------*/
  if (req.method !== "POST") {
    res.status(500).json({ status: "failed", message: `${req.method} is not supported` });
    return;
  }
  /*------------------------------------*\
    #db connect
  \*------------------------------------*/
  try {
    await connectDB();
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Failed to connecting DB" });
  }

  /*------------------------------------*\
    #validation
  \*------------------------------------*/
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  /*------------------------------------*\
    #check if user exists
  \*------------------------------------*/
  const existingUser = await User.findOne({ email: email }, {}, { maxTimeMS: 30000 });
  if (existingUser) {
    return res.status(422).json({ status: "failed", message: "Current User has been registered" });
  }

  /*------------------------------------*\
    #creating user
  \*------------------------------------*/
  const hashedPass = await hasPassword(password);
  const newUser = await User.create({ email: email, password: hashedPass });
  res.status(201).json({ status: "success", message: "user created" });
}
