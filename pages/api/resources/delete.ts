import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

//TODO: finish securing endpoints
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    console.log("session", JSON.stringify(session, null, 2));
  } else return res.status(401).json({ message: "Not authenticated" });
  try {
    const {} = req.body;
    console.log("delete req", req.body);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
