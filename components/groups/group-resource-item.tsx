"use client";
import React from "react";
import { GroupResource } from "../../types/group.types";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import EditResourceModal from "../modals/edit-resource-modal";
type Props = {
  resource: GroupResource;
};

const GroupResourceItem = ({ resource }: Props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <EditResourceModal
        isModalVisible={showEditModal}
        setModalVisibility={setShowEditModal}
        resource={resource}
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
            <button onClick={() => setShowEditModal(!showEditModal)}>
              <AiOutlineEdit className="text-slate-400 text-base" />
            </button>
          </div>
          <iframe src={resource?.resourceLink} className="rounded w-full" />
        </div>
      </div>
    </>
  );
};

export default GroupResourceItem;
