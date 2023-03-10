import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { addResourcesToGroup } from "../../redux/slices/groups.slice";
import { GroupType } from "../../types/group.types";
import CloseModalButton from "../buttons/close-modal-button";
import PrimaryButton from "../buttons/primary-buttons";
import SecondaryButton from "../buttons/secondary-button";
import TextInput from "../inputs/text-input";
import ModalContainer from "./modal-container";
import ModalContentWrapper from "./modal-content-wrapper";
import ModalHeaderWrapper from "./modal-header-wrapper";

type Props = {
  group: GroupType;
  isModalVisible: boolean;
  toggleModalVisibility: (val: boolean) => void;
};

type ResourceFormData = {
  resources: {
    resourceName: string;
    resourceLink: string;
  }[];
};

const AddResourcesModal = ({
  group,
  isModalVisible,
  toggleModalVisibility,
}: Props) => {
  console.log("is this updating all the time");
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ResourceFormData>({
    resources: [],
  });

  const [resource, setResource] = useState<
    ResourceFormData["resources"][number]
  >({
    resourceName: "",
    resourceLink: "",
  });

  const { resources } = formData;

  const { resourceLink, resourceName } = resource;

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setResource({ ...resource, [e.target.name]: e.target.value });

  const handleAddResource = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      resources: [...formData.resources, resource],
    });

    //reset resource form data
    setResource({
      resourceName: "",
      resourceLink: "",
    });
  };

  //handle removeresource
  const handleRemoveResource = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const resourceIndex: string | undefined =
      e.currentTarget.parentElement?.dataset?.index;

    if (resourceIndex !== undefined) {
      const parseIndex = parseInt(resourceIndex);
      //clone resources
      const newResources = [...resources];

      let filtered = newResources.filter((r, i) => i !== parseIndex);

      setFormData({
        ...formData,
        resources: filtered,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios("/api/resources/create", {
        method: "POST",
        data: { ...formData, groupId: group?._id },
      });

      if (res.status !== 200) setError(res.data.message);

      //response provides an updated group object that we can use to updated the resources
      dispatch(
        addResourcesToGroup({
          group,
          resources: res.data.updatedGroup?.resources,
        })
      );

      console.log("response", res);

      setFormData({ resources: [] });
      //close modal on success
      toggleModalVisibility(!isModalVisible);
    } catch (error) {
      console.error("error creating resource", error);
    }
  };

  if (!isModalVisible) return null;

  return (
    <ModalContainer>
      <ModalHeaderWrapper>
        <h1 className='font-bold text-2xl text-slate-200'>
          Add Resources to{" "}
          <span className='text-sky-400'>{group?.groupName}</span>
        </h1>
        <CloseModalButton toggleModalVisibility={toggleModalVisibility} />
      </ModalHeaderWrapper>
      <ModalContentWrapper>
        <form className='flex flex-col gap-2 items-end'>
          <div className='flex flex-col justify-between w-full gap-4 bg-slate-900/50 border-[1px] border-sky-400/20 px-6 py-4 rounded'>
            <div className='flex w-full justify-between gap-4'>
              <TextInput
                htmlFor='resourceName'
                labelText='Resource Name'
                inputValue={resourceName}
                onChange={handleChange}
                inputName={"resourceName"}
                placeholder='e.g. Github'
              />
              <TextInput
                htmlFor='resourceLink'
                labelText='Resource Link'
                inputValue={resourceLink}
                onChange={handleChange}
                inputName={"resourceLink"}
                placeholder='e.g. https://github.com'
              />
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-xs text-slate-500'>
                Enter Name & Link then hit add
              </p>
              <SecondaryButton
                onClick={(e) => handleAddResource(e)}
                isDisabled={resourceLink && resourceName !== "" ? false : true}
              >
                + Add
              </SecondaryButton>
            </div>
            {resources.length > 0 && (
              <div className='flex flex-col w-full border-t-[1px] border-slate-800'>
                <p className='text-slate-400 text-xs my-2'>Added Resources</p>
                <div className='flex flex-wrap gap-2'>
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      data-index={index}
                      className='flex items-center gap-2  border-[1px] border-sky-400/20 p-2 text-xs rounded'
                    >
                      <p className='text-slate-50 text-xs'>
                        {resource.resourceName}
                      </p>
                      <button
                        onClick={(e) => handleRemoveResource(e)}
                        className='text-slate-400 text-xs'
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='mt-4'>
            <PrimaryButton onClick={(e) => handleSubmit(e)}>
              Submit
            </PrimaryButton>
          </div>
        </form>
      </ModalContentWrapper>
    </ModalContainer>
  );
};

export default AddResourcesModal;
