import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import GroupingModel from "../../../mongo/Grouping.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  await authCheck(req, res, authOptions);
  try {
    const { groupName, category, groupId } = req.body;

    const foundGroup = await GroupingModel.findById(groupId);

    console.log("foundGroup", foundGroup);

    if (!foundGroup)
      return res.status(404).json({ message: "Group not found" });

    if (groupName) foundGroup.groupName = groupName;

    if (category) foundGroup.category = category;

    await foundGroup.save();

    return res.status(200).json({ success: true, updatedGroup: foundGroup });
  } catch (error) {
    console.error("Error updating group", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
