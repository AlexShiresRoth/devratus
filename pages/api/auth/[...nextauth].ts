import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db-connect";
import Account from "../../../mongo/Account.model";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    // ...add more providers here
  ],
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    ...authOptions,
    callbacks: {
      async session({ session, token }) {
        await dbConnect();

        if (!token) throw new Error("Error No Token");

        const findAccount = await Account.findOne({
          email: session?.user?.email,
        });

        if (!findAccount) {
          const newAccount = new Account({
            name: session?.user?.name,
            email: session?.user?.email,
            avatar: session?.user?.image,
            authProvider: token?.provider,
            resources: [],
          });

          await newAccount.save();

          console.log("created a new account", newAccount);
        }

        return session;
      },
    },
  });
}
