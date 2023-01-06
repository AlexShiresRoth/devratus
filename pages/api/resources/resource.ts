import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import ResourceModel from "../../../mongo/Resource.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { resourceId } = req.body;
    await authCheck(req, res, authOptions);
    await dbConnect();

    console.log("resourceId: ", resourceId);
    if (!resourceId)
      return res.status(400).json({ message: "Missing resource id" });

    const foundResource = await ResourceModel.findById(resourceId);

    if (!foundResource)
      return res.status(404).json({ message: "Resource not found" });

    return res.status(200).json({ resource: foundResource });
  } catch (error) {
    console.error("Error in api/resources/resource.ts: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
