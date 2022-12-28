import React from "react";
import ModalContainer from "./modal-container";

type Props = {
  isModalVisible: boolean;
  setModalVisibility: (visibility: boolean) => void;
};

const EditResourceModal = ({ isModalVisible, setModalVisibility }: Props) => {
  if (!isModalVisible) return null;

  return (
    <ModalContainer>
      <div className="flex flex-col gap-2 p-8">
        PEEPEEE
      </div>
    </ModalContainer>
  );
};

export default EditResourceModal;
