import axios from "axios";
import React, { useState } from "react";
import { GroupType } from "../../types/group.types";
import PrimaryButton from "../buttons/primary-buttons";
import TextInput from "../inputs/text-input";

type Props = {
  group: GroupType;
  toggleModalVisibility: (val: boolean) => void;
};

const EditGroupForm = ({ group, toggleModalVisibility }: Props) => {
  const [formData, setFormData] = useState({
    groupName: group.groupName,
    category: group.category,
  });

  const { groupName, category } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const res = await axios(`/api/groups/edit`, {
        method: "POST",
        data: { ...formData, groupId: group._id },
      });

      if (res.status !== 200) throw new Error("Error editing group");

      toggleModalVisibility(false);

      console.log("response", res);
    } catch (error) {
      console.error("Error editing group", error);
    }
  };

  return (
    <form className='flex flex-col gap-2 items-end' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2 px-4 w-full'>
        <TextInput
          htmlFor='groupName'
          labelText='Group Name'
          inputValue={groupName}
          onChange={handleChange}
          inputName={"groupName"}
          placeholder='e.g. Frontend'
        />
        <TextInput
          htmlFor='category'
          labelText='Group Category'
          inputValue={category}
          onChange={handleChange}
          inputName={"category"}
          placeholder='e.g. Web Development'
        />
      </div>
      <div className='p-4'>
        <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
      </div>
    </form>
  );
};

export default EditGroupForm;
