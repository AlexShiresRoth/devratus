"use client";

import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const { data, status } = useSession();
  const router = useRouter();

  console.log("data", data, status, router);

  useEffect(() => {
    if (status === "authenticated" && router) {
      console.log("redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="">
      <div className="flex flex-col gap-2 items-start">
        <p className="text-slate-200 text-xl">Sign in with Github</p>
        <button
          onClick={() => signIn()}
          className="text-slate-200 px-4 py-2 border-sky-400 border-[1px] rounded hover:bg-sky-400 transition-all"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
