import { NextApiRequest, NextApiResponse } from "next";
import AccountModel from "../../../mongo/Account.model";
import GroupingModel from "../../../mongo/Grouping.model";

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
        return foundGroup;
      })
    );

    return res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Error fetching groups", error);

    return res.status(500).json({ message: error, success: false });
  }
}
