import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import AccountModel from "../../../mongo/Account.model";
import GroupingModel from "../../../mongo/Grouping.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    console.log("body of christ", req.body);

    if (req.body?.userData?.status !== "authenticated")
      throw new Error("Not authenticated");

    await dbConnect();

    const newGroup = await GroupingModel.create({
      ...req.body?.groupData,
    });

    if (!newGroup) throw new Error("Error creating group");

    console.log("new group", newGroup);

    await newGroup.save();

    let foundAccount = await AccountModel.findOne({
      email: req.body?.userData?.email,
    });

    console.log("found account", foundAccount);
    if (!foundAccount) throw new Error("Error finding account");

    //just want a reference to group
    foundAccount.groups.push(newGroup?._id);

    await foundAccount.save();

    return res.status(200).json({ success: true, newGroup });
  } catch (error) {
    console.error("Error creating group", error);
    return res.status(500).json({ message: error, success: false });
  }
}
