"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCluster,
  AiOutlineBlock,
  AiOutlineLogout,
} from "react-icons/ai";
import Avatar from "../images/avatar";
import AvatarSquare from "../images/avatar-square";

const AuthNav = () => {
  const { data: session } = useSession();

  const pathname = usePathname();

  const baseClass =
    "text-slate-200 transition-all border-l-2  hover:text-sky-400 flex items-center gap-2 text-sm pl-2";
  const activePathClass = "text-sky-400 border-l-2 border-l-sky-400 pl-2";

  return (
    <nav className="min-h-screen  border-r-2 border-slate-800 px-8 pt-6 relative min-w-[170px]">
      <div className="flex flex-col gap-4 sticky top-5 min-h-[700px] justify-between">
        <div className="flex flex-col items-center gap-2 ">
          <p className="text-slate-200 font-bold mb-10">DEVRATUS</p>
          <AvatarSquare url={session?.user?.image ?? ""} />
          <p className="text-slate-200 text-xs">
            {session?.user?.name?.split(" ")[0]}
          </p>
        </div>
        <div className="flex flex-col gap-4  min-h-[300px]">
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
            href="/groups"
            className={classNames(baseClass, {
              "border-l-transparent": pathname !== "/groups",
              [activePathClass]: pathname === "/groups",
            })}
          >
            <AiOutlineCluster className="text-sm" />
            Groups
          </Link>
           <Link
            href="/resources"
            className={classNames(baseClass, {
              "border-l-transparent": pathname !== "/resources",
              [activePathClass]: pathname === "/resources",
            })}
          >
            <AiOutlineBlock className="text-sm" />
            Resources
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
            href="/settings"
            className={classNames(baseClass, {
              "border-l-transparent": pathname !== "/settings",
              [activePathClass]: pathname === "/settings",
            })}
          >
            <AiOutlineSetting className=" text-sm" />
            Settings
          </Link>
        </div>
        <div className="my-2 border-t-2 border-slate-800 flex flex-col  pt-4 w-full ">
          <button
            className="text-slate-500 p-1 py-2 flex items-center gap-2 text-sm hover:text-sky-500 transition-all"
            onClick={() => signOut()}
          >
            <AiOutlineLogout className="text-sm" />
            Signout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AuthNav;
