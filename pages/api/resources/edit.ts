import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import ResourceModel from "../../../mongo/Resource.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const { resourceName, resourceLink, status, resourceId } = req.body;

    if (status !== "authenticated") throw new Error("Not authenticated");

    if (!resourceName && !resourceLink) throw new Error("No resource data");

    const foundResource = await ResourceModel.findById(resourceId);

    if (!foundResource) throw new Error("Error finding resource");

    if (resourceName) foundResource.resourceName = resourceName;

    if (resourceLink) foundResource.resourceLink = resourceLink;

    await foundResource.save();

    return res.status(200).json({ success: true, resource: foundResource });
  } catch (error) {
    console.error("Error editing resource", error);

    return res.status(500).json({ message: error, success: false });
  }
}
