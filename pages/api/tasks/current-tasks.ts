import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import AccountModel from "../../../mongo/Account.model";
import TaskModel, { Task } from "../../../mongo/Task.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("a requesT?", req);
    await dbConnect();

    const session = await authCheck(req, res, authOptions);

    console.log("Session my dude", session);

    if (!session) throw new Error("No session found");

    const foundAccount = await AccountModel.findOne({
      email: session?.user?.email,
    });

    if (!foundAccount) throw new Error("No account found");

    const tasks = await Promise.all(
      foundAccount.tasks?.map(
        async (taskId: mongoose.Schema.Types.ObjectId) => {
          if (!taskId) throw new Error("No task id found");
          const foundTask = await TaskModel.findById(taskId);

          return foundTask;
        }
      )
    );

    let filteredTasks = tasks.filter((task) => task.status !== "archived");

    return res.status(200).json({ success: true, tasks: filteredTasks });
  } catch (error) {
    console.error("error fetching tasks", error);
    return res.status(500).json({ success: false, message: error });
  }
}
