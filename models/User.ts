import { Schema, model, models } from "mongoose";

const initialStructure = [
  {
    name: "root",
    type: "folder",
    deleteable: false,
    children: [
      { name: "file1.txt", type: "file", deleteable: true },
      { name: "file2.docx", type: "file", deleteable: true },
    ],
  },
];

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  files: { type: Object, default: () => initialStructure },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

const User = models.User || model("User", userSchema);

export default User;
