import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import GroupingModel from "../../../mongo/Grouping.model";
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

    // await foundGroup.delete();

    console.log("found group", foundGroup, "session", session);

    return res.status(200).json({ success: true, message: "Group deleted" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
