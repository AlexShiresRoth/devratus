import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { TaskType } from "../../types/task.types";

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
      <div className='w-full flex flex-col'>
        <p className='text-slate-100 font-bold text-sm mb-2'>Urgency Level</p>
        <div className='flex gap-2 w-full justify-between'>
          <span
            onClick={(e) => handleSelectUrgency(e, "low")}
            className={classNames(
              " rounded text-slate-50 flex-1 text-xs p-2 font-bold transition-all hover:cursor-pointer hover:bg-sky-500",
              {
                "bg-green-400": urgency !== "low",
                "bg-sky-500": urgency === "low",
              }
            )}
          >
            Low
          </span>
          <span
            onClick={(e) => handleSelectUrgency(e, "medium")}
            className={classNames(
              " rounded text-slate-50 flex-1 text-xs p-2 font-bold transition-all hover:cursor-pointer hover:bg-sky-500",
              {
                "bg-orange-400": urgency !== "medium",
                "bg-sky-500": urgency === "medium",
              }
            )}
          >
            Medium
          </span>
          <span
            onClick={(e) => handleSelectUrgency(e, "high")}
            className={classNames(
              " rounded text-slate-50 flex-1 text-xs p-2 font-bold transition-all hover:cursor-pointer hover:bg-sky-500",
              {
                "bg-red-400": urgency !== "high",
                "bg-sky-500": urgency === "high",
              }
            )}
          >
            High
          </span>
        </div>
      </div>
    </form>
  );
};

export default TasksForm;
