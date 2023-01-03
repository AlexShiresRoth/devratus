"use client";
import axios from "axios";
import React, { useState } from "react";
import { FiSettings, FiDelete, FiEdit } from "react-icons/fi";
import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { removeGroup } from "../../redux/slices/groups.slice";
import { GroupType } from "../../types/group.types";
import DeleteModal from "../modals/delete-modal";

type Props = {
  group: GroupType;
};

const GroupSettingsMenu = ({ group }: Props) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      <div
        className='relative '
        onMouseOver={() => setShowSettingsMenu(true)}
        onMouseLeave={() => setShowSettingsMenu(false)}
      >
        <button>
          <FiSettings className='text-slate-400 text-base' />
        </button>

        {showSettingsMenu && (
          <div className='absolute top-4 right-0 z-10  rounded min-w-[150px] '>
            <div className='flex flex-col gap-2 bg-slate-800 p-4 rounded items-center w-full shadow-xl'>
              <div className='flex flex-col w-11/12 gap-2'>
                <button className='text-slate-400 text-xs flex items-center gap-2 hover:text-slate-200 transition-all'>
                  <FiEdit />
                  Edit Group
                </button>
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
        )}
      </div>
    </>
  );
};

export default GroupSettingsMenu;
