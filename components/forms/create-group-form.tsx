import React, { useState } from "react";
import TextInput from "../inputs/text-input";

const CreateGroupForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    category: "",
    resources: [],
  });

  const { groupName, category } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <form className="flex flex-col gap-2 rounded">
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
      <button className="p-2 text-xs bg-sky-500 rounded text-slate-50 font-bold hover:bg-sky-800 transition-all mt-4">
        Create Group
      </button>
    </form>
  );
};

export default CreateGroupForm;
