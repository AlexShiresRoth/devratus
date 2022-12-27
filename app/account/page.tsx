"use client";
import { useSession } from "next-auth/react";
import React from "react";
import AuthGuard from "../../components/auth/auth-guard";
import DashHeading from "../../components/containers/dash-heading";
import Avatar from "../../components/images/avatar";
import Heading3 from "../../components/text/heading-3";

const Account = () => {
  const { data, status } = useSession();

  console.log("data", data, status);

  if (status === "loading") return <p>Loading...</p>;
  return (
    <AuthGuard>
      <DashHeading>
        <Heading3>Account</Heading3>
        <div className="flex items-center gap-4">
          <Avatar url={data?.user?.image ?? ""} />
          <p className="text-slate-300">{data?.user?.name}</p>
        </div>
      </DashHeading>
      <div></div>
    </AuthGuard>
  );
};

export default Account;
