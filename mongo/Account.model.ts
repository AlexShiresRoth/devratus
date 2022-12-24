import mongoose from "mongoose";

const AccountAchema = new mongoose.Schema({
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
  resources: {
    type: Array,
  },
  authProvider: {
    type: String,
  },
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountAchema);
