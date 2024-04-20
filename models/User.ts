import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const initialStructure = [
  {
    name: "root",
    type: "folder",
    deleteable: false,
    id: uuidv4(),
    children: [
      { name: "file1.txt", type: "file", deleteable: true, id: uuidv4() },
      { name: "file2.docx", type: "file", deleteable: true, id: uuidv4() },
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
