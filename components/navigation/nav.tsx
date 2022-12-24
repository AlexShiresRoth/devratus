"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import AuthNav from "./auth-nav";

const Nav = () => {
  const { data, status } = useSession();

  if (status === "authenticated") return <AuthNav />;
  
  return (
    <nav className="min-h-screen border-r-[1px] border-sky-400 px-8 pt-12">
      <div className="flex flex-col gap-4">
        <Link href="/" className="text-slate-200">
          Home
        </Link>
        <Link href="/login" className="text-slate-200">
          Login
        </Link>
        <Link href="/register" className="text-slate-200">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
