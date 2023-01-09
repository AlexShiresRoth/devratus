import React from "react";
import { GroupType } from "../../types/group.types";
import CloseModalButton from "../buttons/close-modal-button";
import EditGroupForm from "../forms/edit-group-form";
import ModalContainer from "./modal-container";
import ModalContentWrapper from "./modal-content-wrapper";
import ModalHeaderWrapper from "./modal-header-wrapper";

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
      <ModalHeaderWrapper>
        <h1 className='font-bold text-2xl text-slate-200'>
          Edit Group <span className='text-sky-400'>{group?.groupName}</span>
        </h1>
        <CloseModalButton toggleModalVisibility={toggleModalVisibility} />
      </ModalHeaderWrapper>
      <ModalContentWrapper>
        <EditGroupForm
          group={group}
          toggleModalVisibility={toggleModalVisibility}
        />
      </ModalContentWrapper>
    </ModalContainer>
  );
};

export default EditGroupModal;
