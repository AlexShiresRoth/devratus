"use client";
import React, { useMemo } from "react";
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
  updateResourceInGroup,
} from "../../redux/slices/groups.slice";
import Image from "next/image";
import useFetchResource from "../../custom-hooks/useFetchResource";
import { Session } from "next-auth";
import { mutate } from "swr";
import ResourceTaskModal from "../modals/resource-task-modal";

type Props = {
  resourceId: string;
  group: GroupType;
};

type EditFormData = {
  resourceName: string;
  resourceLink: string;
};

//I cant tell in my sleep deprived mind if this is insane?
//1st step, fetch the initial resource
//2nd step, add the fetched resource to local state
//3rd step, update the local state with the updated resource if an update is made
const GroupResourceItem = ({ resourceId, group }: Props) => {
  const {
    resource: fetchedResource,
    resourceFetchError,
    isResourceLoading,
  } = useFetchResource({ resourceId: resourceId });

  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [error, setError] = useState<string | unknown>("");
  //do we need to rely on redux for this component?
  //updating the local state on edit seems to suffice for now
  const [localResource, setLocalResource] = useState<GroupResource | null>(
    fetchedResource ?? null
  );

  const handleEditSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    formData: EditFormData,
    data: Session | null,
    resourceId: string
  ) => {
    e.preventDefault();
    try {
      const res = await axios("/api/resources/edit", {
        method: "POST",
        data: { ...formData, ...data, status, resourceId },
      });

      if (res.status !== 200) throw new Error("Error editing resource");

      setLocalResource(res.data?.resource);

      setShowEditModal(false);
    } catch (error) {
      console.error("Error editing resource", error);
      setError(error);
    }
  };

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
          resourceId: fetchedResource?._id,
          groupId: group?._id,
        },
      });

      if (res.status !== 200) return setError(res.data.message);

      dispatch(
        deleteResourceInGroup({
          group: group,
          resourceId: fetchedResource["_id"],
        })
      );

      //close on success
      setShowDeleteModal(false);
      //need to remove item in redux store
      console.log("res: ", res);
    } catch (error) {
      console.error("Error deleting resource: ", error);
    }
  };

  useMemo(() => {
    if (!isResourceLoading) setLocalResource(fetchedResource);
  }, [isResourceLoading, fetchedResource]);

  if (resourceFetchError) return <div>Error fetching resource</div>;

  if (isResourceLoading) return <div>Loading...</div>;

  if (!localResource) return null;

  return (
    <>
      <DeleteModal
        isModalVisible={showDeleteModal}
        toggleModalVisible={setShowDeleteModal}
        callback={() => handleDeleteResource()}
        headingText={localResource?.resourceName}
        deleteText={`Are you sure you want to delete ${localResource?.resourceName}?`}
      />

      <EditResourceModal
        isModalVisible={showEditModal}
        setModalVisibility={setShowEditModal}
        resource={localResource}
        group={group}
        handleSubmit={handleEditSubmit}
      />

      <ResourceTaskModal
        setModalVisibility={setShowTaskModal}
        isModalVisible={showTaskModal}
        resource={localResource}
      />

      <div className="min-w-[400px]">
        <div className="flex flex-col gap-2 bg-sky-400/10 p-8 rounded">
          <div className="flex justify-between items-center">
            <a
              className="text-slate-50 font-bold uppercase hover:underline"
              href={localResource?.resourceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {localResource?.resourceName}
            </a>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowTaskModal(!showTaskModal)}
                className="flex items-center gap-1 text-slate-400 text-sm"
              >
                <BiTask className="text-slate-400 " />
                Tasks
              </button>
              <button
                onClick={() => setShowEditModal(!showEditModal)}
                className="flex items-center gap-1 text-slate-400 text-sm"
              >
                <AiOutlineEdit className="text-slate-400" />
                Edit
              </button>
            </div>
          </div>
          {/* Somehow get favicon or logo */}
          {localResource?.resourceImage && (
            <a
              href={localResource?.resourceLink}
              rel="noopener noreferrer"
              target="_blank"
              className="relative w-full h-56 rounded"
            >
              <Image
                alt={localResource?.resourceName}
                src={localResource?.resourceImage}
                fill={true}
                className="object-cover object-center rounded"
              />
            </a>
          )}
          <div className="flex items-center justify-end">
            <button
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              className="text-red-300 flex items-center gap-2 text-xs mt-2"
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
