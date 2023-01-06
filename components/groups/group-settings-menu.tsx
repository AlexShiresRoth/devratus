"use client";
import axios from "axios";
import React, { useState } from "react";
import { FiSettings, FiDelete, FiEdit } from "react-icons/fi";
import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { removeGroup } from "../../redux/slices/groups.slice";
import { GroupType } from "../../types/group.types";
import DeleteModal from "../modals/delete-modal";
import EditGroupModal from "../modals/edit-group-modal";

type Props = {
  group: GroupType;
};

const GroupSettingsMenu = ({ group }: Props) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleDeleteGroup = async () => {
    try {
      const res = await axios("/api/groups/delete", {
        method: "POST",
        data: {
          groupId: group?._id,
        },
      });

      console.log("res", res);

      if (res.status !== 200) {
        console.error("Error deleting resource: ", res.data.message);
        setError(res.data.message);
      }

      dispatch(removeGroup({ groupId: group?._id }));

      //close modal on success
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting group: ", error);
    }
  };

  return (
    <>
      <DeleteModal
        isModalVisible={showDeleteModal}
        toggleModalVisible={() => setShowDeleteModal(!setShowDeleteModal)}
        callback={handleDeleteGroup}
        headingText={"Group: " + group?.groupName}
        deleteText={`Are you sure you want to delete ${group?.groupName}?`}
      />
      <EditGroupModal
        group={group}
        isModalVisible={showEditModal}
        toggleModalVisibility={setShowEditModal}
      />
      <div
        className='relative '
        onMouseOver={() => setShowSettingsMenu(true)}
        onMouseLeave={() => setShowSettingsMenu(false)}
      >
        <button>
          <FiSettings className='text-slate-400 text-base' />
        </button>

        {showSettingsMenu && (
          <div className='absolute top-4 right-0 z-10  rounded min-w-[150px] py-2 hover:cursor-pointer'>
            <div className='flex flex-col gap-2 bg-slate-700  rounded items-center w-full shadow-xl'>
              <div className='flex flex-col w-full  items-center'>
                <div
                  onClick={() => setShowEditModal(!showEditModal)}
                  className='w-full rounded-t flex items-center justify-center border-b-[1px] border-slate-600 p-2 hover:bg-slate-800 transition-all'
                >
                  <button
                    onClick={() => setShowEditModal(!showEditModal)}
                    className='text-slate-400 text-xs flex items-center gap-2 hover:text-slate-200 transition-all'
                  >
                    <FiEdit />
                    Edit Group
                  </button>
                </div>
                <div
                  onClick={() => setShowEditModal(!showEditModal)}
                  className='w-full flex items-center justify-center p-2 hover:bg-slate-800 transition-all rounded-b'
                >
                  <button
                    onClick={() => setShowDeleteModal(!showDeleteModal)}
                    className='text-slate-400 text-xs flex items-center gap-2 hover:text-slate-200 transition-all'
                  >
                    <FiDelete />
                    Delete Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupSettingsMenu;
