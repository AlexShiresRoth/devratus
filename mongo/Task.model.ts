import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please enter a task"],
  },
  urgency: {
    type: String,
  },
  order: {
    type: Number,
  },
  status: {
    type: String,
  },
  taskDescription: {
    type: String,
  },
  groupRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grouping",
  },
  resourceRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
  },
});

export type Task = (mongoose.Document & typeof TaskSchema) | null;

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
