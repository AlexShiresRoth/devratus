import mongoose, { Mongoose } from "mongoose";

const ResourceSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: [true, "Please enter a resource name"],
  },
  resourceLink: {
    type: String,
    required: [true, "Please enter a resource link"],
  },
  resourceImage: {
    type: String,
  },
  tasks: {
    type: Array<{
      _id: { type: Mongoose.Types.ObjectId; ref: "Task" };
    }>,
  },
  visits: {
    type: Number,
  },
});

export type Resource = (mongoose.Document & typeof ResourceSchema) | null;

export default mongoose.models.Resource ||
  mongoose.model("Resource", ResourceSchema);
