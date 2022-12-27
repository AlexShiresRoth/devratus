import mongoose, { Document } from "mongoose";

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    maxLength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  avatar: {
    type: String,
    required: false,
  },
  groups: {
    type: Array<{ _id: String; ref: "Grouping" }>,
  },
  resources: {
    type: Array<{ _id: String; ref: "Resource" }>,
  },
  authProvider: {
    type: String,
  },
});

export type AccountType = typeof AccountSchema & Document;

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
