import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { updateGroup } from "../../redux/slices/groups.slice";
import { GroupType } from "../../types/group.types";
import PrimaryButton from "../buttons/primary-buttons";
import TextInput from "../inputs/text-input";
import ModalContainer from "./modal-container";

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

      dispatch(updateGroup({ group: group }));

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
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex justify-between items-center border-b-[1px] border-b-slate-800 pb-2'>
          <h1 className='font-bold text-2xl text-slate-200'>
            Add Resources to {group?.groupName}
          </h1>
          <button
            className='text-slate-400'
            onClick={() => toggleModalVisibility(!isModalVisible)}
          >
            Close
          </button>
        </div>

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
              <button
                onClick={(e) => handleAddResource(e)}
                disabled={resourceLink && resourceName !== "" ? false : true}
                className='text-xs text-slate-50 p-2 rounded bg-sky-600 font-bold transition-all hover:bg-sky-800'
              >
                + Add
              </button>
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
      </div>
    </ModalContainer>
  );
};

export default AddResourcesModal;
