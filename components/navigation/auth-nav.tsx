"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineCluster } from "react-icons/ai";
const AuthNav = () => {
  const pathname = usePathname();

  const baseClass =
    "text-slate-200 transition-all border-l-2 pl-2 hover:text-sky-400 flex items-center gap-2 text-sm";
  const activePathClass = "text-sky-400 border-l-2 border-l-sky-400 pl-2";
  return (
    <nav className="min-h-screen border-r-2 border-slate-800 px-4 pt-8 relative">
      <p className="text-slate-200 font-bold">DEVRATUS</p>
      <div className="flex flex-col gap-4 sticky top-20">
        <Link
          href="/dashboard"
          className={classNames(baseClass, {
            "border-l-transparent": pathname !== "/dashboard",
            [activePathClass]: pathname === "/dashboard",
          })}
        >
          <AiOutlineHome className=" text-sm" />
          Home
        </Link>
        <Link
          href="/account"
          className={classNames(baseClass, {
            "border-l-transparent": pathname !== "/account",
            [activePathClass]: pathname === "/account",
          })}
        >
          <AiOutlineUser className="text-sm" />
          Account
        </Link>
        <Link
          href="/resources"
          className={classNames(baseClass, {
            "border-l-transparent": pathname !== "/resources",
            [activePathClass]: pathname === "/resources",
          })}
        >
          <AiOutlineCluster className="text-sm" />
          Resources
        </Link>
        <Link
          href="/settings"
          className={classNames(baseClass, {
            "border-l-transparent": pathname !== "/settings",
            [activePathClass]: pathname === "/settings",
          })}
        >
          <AiOutlineSetting className=" text-sm" />
          Settings
        </Link>
        <div className="my-2 border-t-2 border-slate-800 flex flex-col  pt-4 w-full">
          <button
            className="text-slate-200 p-1 py-2 font-bold  border-[1px] border-sky-400 rounded text-xs hover:bg-sky-500 hover:border-sky-500 transition-all"
            onClick={() => signOut()}
          >
            Signout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuthNav;
