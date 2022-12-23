import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="min-h-screen border-r-[1px] border-sky-400 px-8 pt-12">
      <div className="flex flex-col gap-4">
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
