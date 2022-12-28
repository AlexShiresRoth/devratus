import { NextApiRequest, NextApiResponse } from "next";
import AccountModel from "../../../mongo/Account.model";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel from "../../../mongo/Resource.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user, status } = req.body;

    if (status !== "authenticated") throw new Error("Not authenticated");

    const foundAccount = await AccountModel.findOne({ email: user?.email });

    if (!foundAccount) throw new Error("Error finding account");

    const groups = await Promise.all(
      foundAccount?.groups?.map(async (group: string) => {
        const foundGroup = await GroupingModel.findById(group);

        if (!foundGroup) throw new Error("Error finding group");

        const foundResources = await Promise.all(
          foundGroup.resources.map(async (resource: string) => {
            const foundResource = await ResourceModel.findById(resource);

            return foundResource;
          })
        );

        foundGroup.resources = foundResources;

        return foundGroup;
      })
    );

    return res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Error fetching groups", error);

    return res.status(500).json({ message: error, success: false });
  }
}
