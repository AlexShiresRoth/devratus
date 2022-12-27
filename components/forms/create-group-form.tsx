import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/redux-hooks";
import { addGroup } from "../../redux/slices/groups.slice";
import PrimaryButton from "../buttons/primary-buttons";
import SecondaryButton from "../buttons/secondary-button";
import TextInput from "../inputs/text-input";

type FormDataType = {
  groupName: string;
  category: string;
  resources:
    | Array<{
        resourceName: string;
        resourceLink: string;
      }>
    | [];
};

type Props = {
  toggleModalVisible: (val: boolean) => void;
  isModalVisible: boolean;
};

const CreateGroupForm = ({ toggleModalVisible, isModalVisible }: Props) => {
  const dispatch = useAppDispatch();
  const { data, status } = useSession();

  const [formData, setFormData] = useState<FormDataType>({
    groupName: "",
    category: "",
    resources: [],
  });

  const [resourceFormData, setResourceFormData] = useState({
    resourceName: "",
    resourceLink: "",
  });

  const [showResourceForm, setShowResourceForm] = useState<boolean>(false);

  const { groupName, category, resources } = formData;

  const { resourceName, resourceLink } = resourceFormData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleResourceInputChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
    setResourceFormData({
      ...resourceFormData,
      [e.target.name]: e.target.value,
    });

  const handleShowResourceForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowResourceForm(!showResourceForm);
  };

  const handleAddResource = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      resources: [...formData.resources, resourceFormData],
    });

    //reset resource form data
    setResourceFormData({
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
    //only authorized users can create groups
    if (status !== "authenticated") return;

    try {
      const res = await axios("/api/groups/create-group", {
        method: "POST",
        data: { groupData: formData, userData: { ...data.user, status } },
      });

      dispatch(addGroup({ group: res.data?.group }));

      //close modal on success
      toggleModalVisible(!isModalVisible);

      console.log(res);
    } catch (error) {
      console.error("Error creating group", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 rounded items-start"
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextInput
        htmlFor="groupName"
        labelText="Group Name"
        inputValue={groupName}
        onChange={handleChange}
        inputName={"groupName"}
        placeholder="e.g. Frontend"
      />
      <TextInput
        htmlFor="category"
        labelText="Group Category"
        inputValue={category}
        onChange={handleChange}
        inputName={"category"}
        placeholder="e.g. Web Development"
      />
      <div className="my-2 flex flex-col gap-2 items-start w-full">
        <SecondaryButton onClick={(e) => handleShowResourceForm(e)}>
          Add Resources
        </SecondaryButton>
        <p className="text-slate-400 text-xs">
          You can always add resources after group creation
        </p>
        {showResourceForm && (
          <div className="flex flex-col justify-between w-full gap-4 bg-slate-900/50 border-[1px] border-sky-400/20 px-6 py-4 rounded">
            <div className="flex w-full justify-between gap-4">
              <TextInput
                htmlFor="resourceName"
                labelText="Resource Name"
                inputValue={resourceName}
                onChange={handleResourceInputChangeEvent}
                inputName={"resourceName"}
                placeholder="e.g. Github"
              />
              <TextInput
                htmlFor="resourceLink"
                labelText="Resource Link"
                inputValue={resourceLink}
                onChange={handleResourceInputChangeEvent}
                inputName={"resourceLink"}
                placeholder="e.g. https://github.com"
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500">
                Enter Name & Link then hit add
              </p>
              <button
                onClick={(e) => handleAddResource(e)}
                disabled={resourceLink && resourceName !== "" ? false : true}
                className="text-xs text-slate-50 p-2 rounded bg-sky-600 font-bold transition-all hover:bg-sky-800"
              >
                + Add
              </button>
            </div>
          </div>
        )}

        {resources.length > 0 && (
          <div className="flex flex-col">
            <p className="text-slate-400 text-xs my-2">Added Resources</p>
            <div className="flex flex-wrap gap-2">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  data-index={index}
                  className="flex items-center gap-2  border-[1px] border-sky-400/20 p-2 text-xs rounded"
                >
                  <p className="text-slate-50 text-xs">
                    {resource.resourceName}
                  </p>
                  <button
                    onClick={(e) => handleRemoveResource(e)}
                    className="text-slate-400 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <PrimaryButton
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Create Group
      </PrimaryButton>
    </form>
  );
};

export default CreateGroupForm;
