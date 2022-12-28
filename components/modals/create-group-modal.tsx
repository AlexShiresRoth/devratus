import React from "react";
import CreateGroupForm from "../forms/create-group-form";
import ModalContainer from "./modal-container";

type Props = {
  isModalVisible: boolean;
  setModalVisibility: (visibility: boolean) => void;
};

const CreateGroupModal = ({ isModalVisible, setModalVisibility }: Props) => {
  if (!isModalVisible) return null;
  return (
    <ModalContainer>
      <div className="flex flex-col gap-2 p-8">
        <div className="flex flex-col gap-2 border-b-[1px] pb-2 mb-2 border-sky-400/20">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl text-slate-200">
              Create a Group
            </h1>
            <button
              className="text-slate-400"
              onClick={() => setModalVisibility(!isModalVisible)}
            >
              Close
            </button>
          </div>
          <p className="text-slate-400">
            Organize relative tools by creating a group
          </p>
        </div>
        <CreateGroupForm
          isModalVisible={isModalVisible}
          toggleModalVisible={setModalVisibility}
        />
      </div>
    </ModalContainer>
  );
};

export default CreateGroupModal;
