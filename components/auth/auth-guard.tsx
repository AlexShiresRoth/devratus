"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};
const AuthGuard = ({ children }: Props) => {
  const { data, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      router.push("/login");
    }
  }, [status, router]);
  return <>{children}</>;
};

export default AuthGuard;
