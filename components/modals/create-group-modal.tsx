import React from "react";
import CreateGroupForm from "../forms/create-group-form";

type Props = {
  isModalVisible: boolean;
  setModalVisibility: (visibility: boolean) => void;
};

const CreateGroupModal = ({ isModalVisible, setModalVisibility }: Props) => {
  if (!isModalVisible) return null;
  return (
    <div className="fixed bg-black/20 h-screen w-screen z-50 flex top-0 left-0 justify-center items-center">
      <div className="w-1/3 bg-black border-[1px] border-sky-800/50 rounded">
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
      </div>
    </div>
  );
};

export default CreateGroupModal;
