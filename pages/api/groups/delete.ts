import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import AccountModel from "../../../mongo/Account.model";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel from "../../../mongo/Resource.model";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    console.log("session", session);
  } else return res.status(401).json({ message: "Not authenticated" });

  try {
    const { groupId } = req.body;

    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    const foundGroup = await GroupingModel.findById(groupId);

    if (!foundGroup)
      return res.status(404).json({ message: "Group not found" });

    if (!session?.user?.email)
      return res.status(401).json({ message: "Not authenticated" });

    const foundAccount = await AccountModel.findOne({
      email: session.user.email,
    });

    // remove group from account
    const filterGroupsOnAccount = foundAccount?.groups.filter(
      (group: typeof GroupingModel & { _id: mongoose.Schema.Types.ObjectId }) =>
        group._id.toString() !== foundGroup._id.toString()
    );

    foundAccount.groups = filterGroupsOnAccount;

    //need to delete all resources in group
    if (foundGroup.resources.length > 0) {
      await Promise.all(
        foundGroup.resources?.map(
          async (
            resource: typeof ResourceModel & {
              _id: mongoose.Schema.Types.ObjectId;
            }
          ) => {
            const foundResource = await ResourceModel.findById(resource._id);

            if (!foundResource)
              console.log(
                "Error: resource not found. This should not happen. Most likely a dev error"
              );

            await foundResource?.delete();

            console.log("deleted resource:", resource._id);
            return "deleted resource: " + resource._id;
          }
        )
      );
    }

    await foundAccount?.save();

    await foundGroup.delete();

    return res.status(200).json({ success: true, message: "Group deleted" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
