import React from "react";
import DeleteButton from "../buttons/delete-button";
import Heading4 from "../text/heading-4";
import ModalContainer from "./modal-container";
import ModalHeaderWrapper from "./modal-header-wrapper";

type Props = {
  toggleModalVisible: (val: boolean) => void;
  isModalVisible: boolean;
  callback: (args: any) => void;
  headingText: string;
  deleteText: string;
};

const DeleteModal = ({
  toggleModalVisible,
  isModalVisible,
  callback,
  headingText,
  deleteText,
}: Props) => {
  if (!isModalVisible) return null;
  return (
    <ModalContainer>
      <ModalHeaderWrapper>
        <Heading4>{headingText}</Heading4>
        <button
          onClick={() => toggleModalVisible(!isModalVisible)}
          className='text-slate-400'
        >
          Cancel
        </button>
      </ModalHeaderWrapper>
      <div className='flex flex-col items-center justify-center w-full p-8 gap-6'>
        <p className='text-slate-400 text-center text-xl max-w-lg font-bold'>
          {deleteText}
        </p>
        <DeleteButton callback={callback}>Delete</DeleteButton>
      </div>
    </ModalContainer>
  );
};

export default DeleteModal;
