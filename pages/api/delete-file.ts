import User from "@/models/User";
import { UserPayload, verifyPassword, verifyToken } from "@/utils/auth";
import connectDB from "@/utils/connectDb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /*------------------------------------*/
  /* #check req method */
  /*------------------------------------*/
  if (req.method !== "POST") return;

  /*------------------------------------*/
  /* #connect DB */
  /*------------------------------------*/
  try {
    await connectDB();
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
    res.status(500).json({ status: "failed", message: "Failed to connecting DB" });
  }

  /*------------------------------------*\
    # user data
  \*------------------------------------*/
  const id = req.body;
  const { token } = req.cookies;
  const privateKey = process.env.SECRET_KEY;

  /*------------------------------------*/
  /* # token validation */
  /*------------------------------------*/
  if (!token) {
    res.status(401).json({ status: "failed", message: "You are not authorized" });
  }
  const result = (await verifyToken(token!, privateKey!)) as UserPayload;
  if (!result) res.status(401).json({ status: "failed", message: "unauthorized" });

  /*------------------------------------*/
  /* # User check existance */
  /*------------------------------------*/
  const user = await User.findOne({ email: result?.email }, {}, { maxTimeMS: 30000 });
  if (!user) res.status(404).json({ status: "failed", message: "user not found" });

  /*------------------------------------*/
  /* # Delete item from database */
  /*------------------------------------*/

  // Helper function to delete the file recursively
  const deleteFile = (files: any[]): boolean => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file._id === id) {
        files.splice(i, 1); // Remove the file from the array
        return true;
      } else if (file.children && file.children.length > 0) {
        const found = deleteFile(file.children);
        if (found) {
          return true;
        }
      }
    }
    return false;
  };
  // Delete the file recursively
  const deleted = deleteFile(user.files);

  if (deleted) {
    await user.save();
    res.status(200).json({
      status: "success",
      message: "File deleted successfully",
      data: user,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "File not found",
    });
  }
}
