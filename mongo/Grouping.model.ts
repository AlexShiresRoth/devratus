import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, "Please enter a group name"],
  },
  category: {
    type: String,
    required: [true, "Please enter a category"],
  },
  tasks: {
    type: Array<{
      _id: { type: Mongoose.Types.ObjectId; ref: "Task" };
    }>,
  },
  resources: {
    type: Array<{
      resourceName: { type: String };
      resourceLink: { type: String };
    }>,
    required: false,
  },
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
