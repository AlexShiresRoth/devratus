import React from "react";
import CloseModalButton from "../buttons/close-modal-button";
import CreateGroupForm from "../forms/create-group-form";
import ModalContainer from "./modal-container";
import ModalContentWrapper from "./modal-content-wrapper";
import ModalHeaderWrapper from "./modal-header-wrapper";

type Props = {
  isModalVisible: boolean;
  setModalVisibility: (visibility: boolean) => void;
};

const CreateGroupModal = ({ isModalVisible, setModalVisibility }: Props) => {
  if (!isModalVisible) return null;
  return (
    <ModalContainer>
      <ModalHeaderWrapper>
        <h1 className='font-bold text-2xl text-slate-200'>Create a Group</h1>
        <CloseModalButton toggleModalVisibility={setModalVisibility} />
      </ModalHeaderWrapper>
      <ModalContentWrapper>
        <p className='text-slate-400 mb-2'>
          Organize relative tools by creating a group
        </p>
        <CreateGroupForm
          isModalVisible={isModalVisible}
          toggleModalVisible={setModalVisibility}
        />
      </ModalContentWrapper>
    </ModalContainer>
  );
};

export default CreateGroupModal;
