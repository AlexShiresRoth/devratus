"use client";
import React from "react";
import { GroupResource, GroupType } from "../../types/group.types";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { useState } from "react";
import EditResourceModal from "../modals/edit-resource-modal";
type Props = {
  resource: GroupResource;
  group: GroupType;
};

const GroupResourceItem = ({ resource, group }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <EditResourceModal
        isModalVisible={showEditModal}
        setModalVisibility={setShowEditModal}
        resource={resource}
        group={group}
      />
      <div className="min-w-[400px]">
        <div className="flex flex-col gap-2 bg-sky-400/10 p-8 rounded">
          <div className="flex justify-between items-center">
            <a
              className="text-slate-50 font-bold uppercase hover:underline"
              href={resource?.resourceLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {resource?.resourceName}
            </a>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-slate-400 text-sm">
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
          <iframe src={resource?.resourceLink} className="rounded w-full" />
        </div>
      </div>
    </>
  );
};

export default GroupResourceItem;
