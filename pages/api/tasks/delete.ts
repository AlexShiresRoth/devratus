import { NextApiRequest, NextApiResponse } from "next";
import TaskModel from "../../../mongo/Task.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const foundTask = await TaskModel.findById(taskId);

    if (!foundTask) {
      return res.status(400).json({ message: "Task not found" });
    }

    if (foundTask.status !== "archived")
      return res.status(400).json({ message: "Task is not archived" });

    await foundTask.delete();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task", error);
    return res.status(500).json({ message: "Error deleting task", error });
  }
}
