import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import AccountModel from "../../../mongo/Account.model";
import GroupingModel from "../../../mongo/Grouping.model";
import ResourceModel from "../../../mongo/Resource.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const session = await authCheck(req, res, authOptions);

    console.log("Session", session);

    const foundAccount = await AccountModel.findOne({
      email: session?.user?.email,
    });

    if (!foundAccount) throw new Error("Error finding account");

    const groups = await Promise.all(
      foundAccount?.groups?.map(async (group: string) => {
        const foundGroup = await GroupingModel.findById(group);

        if (!foundGroup) throw new Error("Error finding group");

        return foundGroup;
      })
    );

    return res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Error fetching groups", error);

    return res.status(500).json({ message: error, success: false });
  }
}
