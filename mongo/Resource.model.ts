import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  resourceName: {
    type: String,
    required: [true, "Please enter a resource name"],
  },
  resourceLink: {
    type: String,
    required: [true, "Please enter a resource link"],
  },
  visits: {
    type: Number,
  },
});

export default mongoose.models.Resource ||
  mongoose.model("Resource", ResourceSchema);
