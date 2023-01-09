import axios from "axios";
import React, { useState } from "react";
import { TaskType } from "../../types/task.types";
import SecondaryButton from "../buttons/secondary-button";
import TextInput from "../inputs/text-input";

type Props = {
  addTaskToLocalState: (task: TaskType) => void;
  resourceRef: string;
};

const TasksForm = ({ addTaskToLocalState, resourceRef }: Props) => {
  const [taskData, setTaskData] = useState({
    task: "",
    urgency: "",
  });

  const { task, urgency } = taskData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const submitNewTask = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    const res = await axios("/api/tasks/create", {
      method: "POST",
      data: { task, urgency, resourceRef },
    });

    if (res.status !== 200) throw new Error("Error creating task");

    addTaskToLocalState(res.data.task);

    console.log("res data", res.data);
    try {
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <form
      className='flex gap-2 w-full items-end justify-between'
      onSubmit={submitNewTask}
    >
      <div className='w-11/12'>
        <input
          className='p-2 bg-slate-700 rounded w-full'
          placeholder='New Task'
          onChange={handleChange}
          value={task}
          name='task'
        />
      </div>
      <div className='flex items-end justify-end'>
        <button
          onSubmit={submitNewTask}
          onClick={submitNewTask}
          className='bg-sky-500 text-slate-100 py-2 px-4 transition-all hover:bg-sky-700 rounded'
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TasksForm;
