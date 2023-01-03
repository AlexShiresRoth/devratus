"use client";
import React, { useState } from "react";
import { FiSettings, FiDelete, FiEdit } from "react-icons/fi";

const GroupSettingsMenu = () => {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  return (
    <div
      className='relative '
      onMouseOver={() => setShowSettingsMenu(true)}
      onMouseLeave={() => setShowSettingsMenu(false)}
    >
      <button>
        <FiSettings className='text-slate-400 text-base' />
      </button>

      {showSettingsMenu && (
        <div className='absolute top-4 right-0 z-10  rounded min-w-[150px] '>
          <div className='flex flex-col gap-2 bg-slate-800 p-4 rounded items-center w-full shadow-xl'>
            <div className='flex flex-col w-11/12 gap-2'>
              <button className='text-slate-400 text-xs flex items-center gap-2 hover:text-slate-200 transition-all'>
                <FiEdit />
                Edit Group
              </button>
              <button className='text-slate-400 text-xs flex items-center gap-2 hover:text-slate-200 transition-all'>
                <FiDelete />
                Delete Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSettingsMenu;
