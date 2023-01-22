import Link from "next/link";
import React from "react";
import { BiTask } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import TasksLengthDisplay from "./tasks-length-display";

const MyTasksDashboard = () => {
  return (
    <div className='rounded border-2  border-slate-800 py-4 px-8 gap-2 text-slate-50 flex flex-col '>
      <div className='flex items-center justify-between gap-8'>
        <p className='text-slate-100 text-sm font-semibold'>
          Total Current Tasks
        </p>
        <span className='p-1 border-2 border-purple-400 rounded-full'>
          <BiTask />
        </span>
      </div>
      <div className='flex items-center justify-between'>
        <TasksLengthDisplay />
        <Link
          href='/tasks'
          className='text-slate-200 text-sm hover:text-sky-400 transition-all flex items-center gap-1'
        >
          View <BsArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default MyTasksDashboard;
