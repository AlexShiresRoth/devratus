import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import { TaskType } from "../../types/task.types";
import LoadingSpinner from "../loading/loading-spinner";
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
    description: "",
  });

  const { task, urgency, description } = taskData;

  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

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

    setIsCreatingTask(true);

    const res = await axios("/api/tasks/create", {
      method: "POST",
      data: { task, urgency, resourceRef, description },
    });

    if (res.status !== 200) throw new Error("Error creating task");

    addTaskToLocalState(res.data?.newTask);

    setIsCreatingTask(false);

    setTaskData({ task: "", urgency: "low", description: "" });

    setShowTaskForm(false);

    try {
    } catch (error) {
      console.error("error", error);
      setIsCreatingTask(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 mb-2 border-b-2 border-b-slate-700/30 pb-2"
      onSubmit={submitNewTask}
    >
      <div className="flex flex-col  justify-between gap-2">
        <p className="text-slate-100 font-bold text-xs">New Task</p>
        <input
          className="p-2 bg-slate-700 rounded w-full text-slate-100"
          placeholder="New Task"
          onChange={handleChange}
          value={task}
          name="task"
          autoFocus={true}
        />
      </div>
      <UrgencySelector
        handleSelectUrgency={handleSelectUrgency}
        urgency={urgency}
      />
      <p className="text-slate-100 font-bold text-xs">Description</p>
      <textarea
        className="min-h-[100px] rounded bg-slate-700 p-2 text-slate-100"
        placeholder="Task Description"
        value={description}
        name="description"
        onChange={(e) => handleChange(e)}
      />
      <div className="flex items-end justify-end">
        <button
          onSubmit={submitNewTask}
          onClick={submitNewTask}
          className="flex items-center font-bold bg-sky-500 text-slate-100 py-2 px-4 transition-all hover:bg-sky-700 rounded"
        >
          {isCreatingTask && <LoadingSpinner />}
          {isCreatingTask ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TasksForm;
