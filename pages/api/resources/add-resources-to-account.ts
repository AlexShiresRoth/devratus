import { NextApiRequest, NextApiResponse } from "next";
import AccountModel from "../../../mongo/Account.model";
import ResourceModel from "../../../mongo/Resource.model";
import TaskModel from "../../../mongo/Task.model";
import { authCheck } from "../auth/auth-check";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await authCheck(req, res, authOptions);

    if (!session?.user)
      return res.status(401).json({ message: "Unauthorized" });

    if (session) {
      const myAccount = await AccountModel.findOne({
        email: session.user.email,
      });

      if (!myAccount)
        return res.status(404).json({ message: "Account not found" });

      const resources: any[] = [];
      // myAccount.resources.push
      myAccount.resources
        .map((res: any) => res.toString())
        .forEach((re: any) => {
          if (!resources.includes(re.toString())) {
            resources.push(re);
          }
        });

      console.log(resources, "homie");
      //   await myAccount.save();

      return res.status(200).json({ message: "Resources added to account" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
