import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GroupType } from "../../types/group.types";

type Props = {
  group: GroupType;
};

//TODO finish this by adding the correct post request to create resources on group
const GroupAddResource = ({ group }: Props) => {
  return (
    <button className='text-slate-400 text-xs bg-slate-800 rounded p-2 flex items-center gap-2'>
      <AiOutlinePlus className='text-slate-400 text-xs' />
      Add Resource/s
    </button>
  );
};

export default GroupAddResource;
