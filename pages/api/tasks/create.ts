import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel from "../../../mongo/Resource.model";
import TaskModel from "../../../mongo/Task.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();
    await authCheck(req, res, authOptions);

    const { task, urgency, order, resourceRef, groupRef } = req.body;

    const newtask = {
      task,
      urgency,
      order,
      resourceRef,
      groupRef,
    };

    console.log("new task", newtask);
    if (resourceRef) {
      newtask.resourceRef = resourceRef;
    }
    if (groupRef) newtask.groupRef = groupRef;

    const DBTask = await TaskModel.create(newtask);

    await DBTask.save();

    //need to add new task to resource or group
    if (resourceRef) {
      const foundResource = await ResourceModel.findById(resourceRef);

      //silently fail or not?
      if (!foundResource) console.error("Resource not found");

      foundResource.tasks.unshift(DBTask._id);

      await foundResource.save();
    }

    if (groupRef) {
      const foundGroup = await GroupingModel.findById(groupRef);

      if (!foundGroup) console.error("Group not found");

      foundGroup.tasks.unshift(DBTask._id);

      await foundGroup.save();
    }

    return res.status(200).json({ success: true, newTask: DBTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
