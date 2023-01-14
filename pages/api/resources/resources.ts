import { NextApiRequest, NextApiResponse } from "next";
import AccountModel from "../../../mongo/Account.model";
import ResourceModel, { Resource } from "../../../mongo/Resource.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await authCheck(req, res, authOptions);

    if (!session) return res.status(401).json({ message: "Unauthorized" });

    if (session.user) {
      const myAccount = await AccountModel.findOne({
        email: session.user.email,
      });

      if (myAccount) {
        const accountResources = myAccount.resources;

        const foundResources = await Promise.all(
          accountResources.map(async (resource: Resource) => {
            const foundResource = await ResourceModel.findById(resource?._id);

            if (!foundResource) return null;

            return foundResource;
          })
        );

        return res.status(200).json({ resources: foundResources });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
