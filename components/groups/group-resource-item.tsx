"use client";
import React from "react";
import { GroupResource, GroupType } from "../../types/group.types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { useState } from "react";
import EditResourceModal from "../modals/edit-resource-modal";
import DeleteModal from "../modals/delete-modal";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux-hooks";
import {
  deleteResourceInGroup,
  groupState,
  removeGroup,
} from "../../redux/slices/groups.slice";
import Image from "next/image";
type Props = {
  resource: GroupResource;
  group: GroupType;
};

const GroupResourceItem = ({ resource, group }: Props) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const { groups } = useAppSelector(groupState);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDeleteResource = async () => {
    try {
      const res = await axios("/api/resources/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          session,
          status,
          resourceId: resource?._id,
          groupId: group?._id,
        },
      });

      if (res.status !== 200) return setError(res.data.message);

      dispatch(deleteResourceInGroup({ group: group, resource }));

      //close on success
      setShowDeleteModal(false);
      //need to remove item in redux store
      console.log("res: ", res);
    } catch (error) {
      console.error("Error deleting resource: ", error);
    }
  };
  return (
    <>
      <DeleteModal
        isModalVisible={showDeleteModal}
        toggleModalVisible={setShowDeleteModal}
        callback={() => handleDeleteResource()}
        headingText={resource?.resourceName}
        deleteText={`Are you sure you want to delete ${resource?.resourceName}?`}
      />
      <EditResourceModal
        isModalVisible={showEditModal}
        setModalVisibility={setShowEditModal}
        resource={resource}
        group={group}
      />
      <div className='min-w-[400px]'>
        <div className='flex flex-col gap-2 bg-sky-400/10 p-8 rounded'>
          <div className='flex justify-between items-center'>
            <a
              className='text-slate-50 font-bold uppercase hover:underline'
              href={resource?.resourceLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              {resource?.resourceName}
            </a>
            <div className='flex items-center gap-4'>
              <button className='flex items-center gap-1 text-slate-400 text-sm'>
                <BiTask className='text-slate-400 ' />
                Tasks
              </button>
              <button
                onClick={() => setShowEditModal(!showEditModal)}
                className='flex items-center gap-1 text-slate-400 text-sm'
              >
                <AiOutlineEdit className='text-slate-400' />
                Edit
              </button>
            </div>
          </div>
          {/* Somehow get favicon or logo */}
          {resource?.resourceImage && (
            <div className='relative w-full h-56 rounded'>
              <Image
                alt={resource?.resourceName}
                src={resource?.resourceImage}
                fill={true}
                className='object-cover object-center rounded'
              />
            </div>
          )}
          <div className='flex items-center justify-end'>
            <button
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              className='text-red-300 flex items-center gap-2 text-xs mt-2'
            >
              <AiOutlineDelete />
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupResourceItem;
