import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions, unstable_getServerSession } from "next-auth";

export const authCheck = async (
  req: NextApiRequest,
  res: NextApiResponse,
  authOptions: AuthOptions
) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return session;
  } else return res.status(401).json({ message: "Not authenticated" });
};
