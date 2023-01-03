"use client";
import React, { useMemo, useState } from "react";
import { GroupResource, GroupType } from "../../types/group.types";
import Heading4 from "../text/heading-4";
import ModalContainer from "./modal-container";
import { AiOutlineClose } from "react-icons/ai";
import TextInput from "../inputs/text-input";
import SecondaryButton from "../buttons/secondary-button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { updateResourceInGroup } from "../../redux/slices/groups.slice";
type Props = {
  isModalVisible: boolean;
  setModalVisibility: (visibility: boolean) => void;
  resource: GroupResource;
  group: GroupType;
};

const EditResourceModal = ({
  isModalVisible,
  setModalVisibility,
  resource,
  group,
}: Props) => {
  const dispatch = useDispatch();

  const { data, status } = useSession();

  const [formData, setFormData] = useState({
    resourceName: resource?.resourceName ?? "",
    resourceLink: resource?.resourceLink ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { resourceName, resourceLink } = formData;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios("/api/resources/edit", {
        method: "POST",
        data: { ...formData, ...data, status, resourceId: resource?._id },
      });

      dispatch(updateResourceInGroup({ resource: res.data?.resource, group }));

      console.log("response", res, "group", group);

      setModalVisibility(!isModalVisible);
    } catch (error) {
      console.error("Error editing resource", error);
    }
  };

  useMemo(() => {
    if (resource) {
      setFormData({
        resourceName: resource?.resourceName ?? "",
        resourceLink: resource?.resourceLink ?? "",
      });
    }
  }, [resource]);

  if (!isModalVisible) return null;

  return (
    <ModalContainer>
      <div className='flex flex-col gap-2 p-8'>
        <div className='flex items center justify-between border-b-[1px] border-slate-800 pb-2'>
          <Heading4>Edit {resource?.resourceName} Resource</Heading4>
          <button
            onClick={() => setModalVisibility(!isModalVisible)}
            className='text-xs text-slate-400 flex items-center gap-1   transition-all hover:text-red-500/30 '
          >
            <AiOutlineClose /> Close
          </button>
        </div>
        <form className='flex flex-col items-end mt-4'>
          <div className='flex flex-col gap-4 w-full items-end mb-8'>
            <TextInput
              inputValue={resourceName}
              inputName={"resourceName"}
              onChange={handleChange}
              labelText={"Edit Resource Name"}
              maxLength={15}
            />
            <TextInput
              inputValue={resourceLink}
              inputName={"resourceLink"}
              onChange={handleChange}
              labelText={"Edit Resource Link"}
            />
          </div>
          <SecondaryButton onClick={(e) => handleSubmit(e)}>
            Submit Changes
          </SecondaryButton>
        </form>
      </div>
    </ModalContainer>
  );
};

export default EditResourceModal;
