import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel, { Resource } from "../../../mongo/Resource.model";
import { authOptions } from "../auth/[...nextauth]";

//TODO: finish securing endpoints
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    console.log("session", session);
  } else return res.status(401).json({ message: "Not authenticated" });

  try {
    const { resourceId, groupId } = req.body;

    if (!resourceId)
      return res.status(400).json({ message: "Missing resource id" });

    const foundResource: Resource = await ResourceModel.findById(resourceId);

    if (!foundResource)
      return res.status(404).json({ message: "Resource not found" });
    // need to delete resource from group
    const foundGroup = await GroupingModel.findById(groupId);

    if (!foundGroup)
      return res.status(404).json({ message: "Group not found" });

    const filteredRsrcs = foundGroup.resources.filter((rsrc: { _id: any }) => {
      return rsrc._id.toString() !== resourceId;
    });

    foundGroup.resources = filteredRsrcs;

    console.log("foundGroup", foundGroup);

    await foundGroup.save();

    await foundResource.delete();

    console.log("resourceId", resourceId);
    return res.status(200).json({ success: true, message: "Resource deleted" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
