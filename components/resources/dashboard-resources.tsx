import Link from "next/link";
import React from "react";
import { AiOutlineBlock, AiOutlineCluster } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import ResourcesLengthDisplay from "./resources-length-display";

const DashboardResources = () => {
  return (
    <div className='rounded border-2  border-slate-800 py-4 px-8 gap-2 text-slate-50 flex flex-col '>
      <div className='flex items-center justify-between gap-8'>
        <p className='text-slate-100 text-sm font-semibold'>
          Total Groups Created
        </p>
        <span className='p-1 border-2 border-green-400 rounded-full'>
          <AiOutlineBlock />
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <ResourcesLengthDisplay />
        <Link
          href='/resources'
          className='text-slate-200 text-sm hover:text-sky-400 transition-all flex items-center gap-1'
        >
          View <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default DashboardResources;
