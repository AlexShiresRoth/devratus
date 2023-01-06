import React from "react";
import { GroupType } from "../../types/group.types";
import EditGroupForm from "../forms/edit-group-form";
import ModalContainer from "./modal-container";

type Props = {
  group: GroupType;
  isModalVisible: boolean;
  toggleModalVisibility: (val: boolean) => void;
};

const EditGroupModal = ({
  group,
  isModalVisible,
  toggleModalVisibility,
}: Props) => {
  if (!isModalVisible) return null;

  return (
    <ModalContainer>
      <div className='flex flex-col gap-2 border-b-[1px] pb-2 mb-2 border-sky-400/20 p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-2xl text-slate-200'>
            Edit Group: {group?.groupName}
          </h1>
          <button
            className='text-slate-400'
            onClick={() => toggleModalVisibility(!isModalVisible)}
          >
            Close
          </button>
        </div>
      </div>

      <EditGroupForm
        group={group}
        toggleModalVisibility={toggleModalVisibility}
      />
    </ModalContainer>
  );
};

export default EditGroupModal;
