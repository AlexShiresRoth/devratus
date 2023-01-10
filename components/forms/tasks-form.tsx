import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { TaskType } from "../../types/task.types";
import UrgencySelector from "../tasks/urgency-selector";

type Props = {
  addTaskToLocalState: (task: TaskType) => void;
  resourceRef: string;
  showTaskForm: boolean;
  setShowTaskForm: (visibility: boolean) => void;
};

const TasksForm = ({
  addTaskToLocalState,
  resourceRef,
  showTaskForm,
  setShowTaskForm,
}: Props) => {
  const [taskData, setTaskData] = useState({
    task: "",
    urgency: "low",
  });

  const { task, urgency } = taskData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const handleSelectUrgency = (
    e: React.FormEvent<HTMLSpanElement>,
    priority: "low" | "medium" | "high"
  ) => {
    e.preventDefault();

    setTaskData({ ...taskData, urgency: priority });
  };

  const submitNewTask = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    const res = await axios("/api/tasks/create", {
      method: "POST",
      data: { task, urgency, resourceRef },
    });

    if (res.status !== 200) throw new Error("Error creating task");

    addTaskToLocalState(res.data?.newTask);

    setTaskData({ task: "", urgency: "low" });

    setShowTaskForm(false);

    try {
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <form className='flex flex-col gap-2' onSubmit={submitNewTask}>
      <div className='flex items-end justify-between gap-2'>
        <div className='w-11/12'>
          <input
            className='p-2 bg-slate-700 rounded w-full text-slate-100'
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
      </div>
      <UrgencySelector
        handleSelectUrgency={handleSelectUrgency}
        urgency={urgency}
      />
    </form>
  );
};

export default TasksForm;
