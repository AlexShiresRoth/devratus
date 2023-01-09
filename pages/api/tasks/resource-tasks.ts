import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import ResourceModel from "../../../mongo/Resource.model";
import TaskModel from "../../../mongo/Task.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { resourceId } = req.body;

    console.log("resourceId", resourceId);

    if (!resourceId)
      return res
        .status(400)
        .json({ success: false, message: "No resource id provided" });

    const foundResource = await ResourceModel.findById(resourceId);

    if (!foundResource)
      return res
        .status(400)
        .json({ success: false, message: "No resource found" });

    const tasks = await Promise.all(
      foundResource.tasks.map(
        async (taskID: mongoose.Schema.Types.ObjectId) => {
          const task = await TaskModel.findById(taskID);

          return task;
        }
      )
    );

    let filteredTasks = tasks.filter(Boolean);

    return res.status(200).json({ success: true, tasks: filteredTasks });
  } catch (error) {
    console.error("error fetching tasks", error);
    return res.status(500).json({ success: false, message: error });
  }
}
