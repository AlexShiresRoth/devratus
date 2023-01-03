import { NextApiRequest, NextApiResponse } from "next";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel from "../../../mongo/Resource.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authCheck(req, res, authOptions);

  try {
    const { groupId, resources } = req.body;

    if (!groupId) return res.status(400).json({ message: "Missing group id" });

    const updatedGroup = await Promise.all(
      resources.map(
        async (resource: { resourceName: string; resourceLink: string }) => {
          const { resourceName, resourceLink } = resource;
          if (!resourceName)
            return res.status(400).json({ message: "Missing resource name" });

          if (!resourceLink)
            return res.status(400).json({ message: "Missing resource link" });

          const foundGroup = await GroupingModel.findById(groupId);

          if (!foundGroup)
            return res.status(404).json({ message: "Group not found" });

          const newResource = await ResourceModel.create({
            resourceName,
            resourceLink,
          });

          foundGroup.resources.push(newResource);

          await foundGroup.save();
        }
      )
    );

    //pass the updated group  with new resources to the front end
    return res
      .status(200)
      .json({ success: true, message: "Resource added", updatedGroup });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
