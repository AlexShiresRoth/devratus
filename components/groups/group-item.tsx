import React from "react";
import { GroupType } from "../../types/group.types";
import Heading4 from "../text/heading-4";
import GroupResourceItem from "./group-resource-item";
import { AiOutlinePlus } from "react-icons/ai";
import GroupSettingsMenu from "./group-settings-menu";
type Props = {
  group: GroupType;
};

const GroupItem = ({ group }: Props) => {
  return (
    <div
      key={group?._id}
      className='flex flex-col gap-2 overflow-hidden border-2 border-slate-800 p-8 rounded'
    >
      <div className='flex justify-between items-center border-b-2 border-slate-800 pb-4'>
        <div>
          <Heading4>{group?.groupName}</Heading4>
          <p className='text-slate-400 text-sm '>{group?.category}</p>
        </div>
        <div className='flex items-center gap-4'>
          <button className='text-slate-400 text-xs bg-slate-800 rounded p-2 flex items-center gap-2'>
            <AiOutlinePlus className='text-slate-400 text-xs' />
            Add Resource/s
          </button>
          <GroupSettingsMenu />
        </div>
      </div>
      <div className='flex  gap-8 overflow-x-auto rounded py-4 max-w-screen-xl '>
        {group.resources?.length > 0 &&
          group.resources?.map((resource: any, i: number) => (
            <GroupResourceItem resource={resource} key={i} group={group} />
          ))}
      </div>
    </div>
  );
};

export default GroupItem;
