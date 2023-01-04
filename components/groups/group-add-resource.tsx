import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { GroupType } from "../../types/group.types";
import AddResourcesModal from "../modals/add-resources-modal";

type Props = {
  group: GroupType;
};

//TODO finish this by adding the correct post request to create resources on group
const GroupAddResource = ({ group }: Props) => {
  const [showAddResource, setShowAddResource] = useState<boolean>(false);

  return (
    <>
      <AddResourcesModal
        group={group}
        isModalVisible={showAddResource}
        toggleModalVisibility={setShowAddResource}
      />
      <button
        className='text-slate-400 text-xs bg-slate-800 rounded p-2 flex items-center gap-2'
        onClick={() => setShowAddResource(true)}
      >
        <AiOutlinePlus className='text-slate-400 text-xs' />
        Add Resource/s
      </button>
    </>
  );
};

export default GroupAddResource;
