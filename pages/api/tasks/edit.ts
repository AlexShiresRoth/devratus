import { NextApiRequest, NextApiResponse } from "next";
import TaskModel from "../../../mongo/Task.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { task, urgency, description, taskId, status } = req.body;
    console.log("req", req.body);

    if (!taskId) throw new Error("No task id provided");

    const foundTask = await TaskModel.findById(taskId);

    if (!foundTask) throw new Error("Could not locate task in db");

    if (task) foundTask.task = task;
    if (urgency) foundTask.urgency = urgency;
    if (description) foundTask.description = description;
    if (status) foundTask.status = status;

    await foundTask.save();

    return res.status(200).json({ updatedTask: foundTask, success: true });
  } catch (error) {
    console.error("error editing task", error);
    return res.status(500).json({ success: false, error });
  }
}
