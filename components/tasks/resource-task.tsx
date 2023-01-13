import axios from "axios";
import classNames from "classnames";
import React, { useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUndo,
} from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { TaskType } from "../../types/task.types";
import UrgencySelector from "./urgency-selector";

type Props = {
  task: TaskType;
  updateTaskStatus: (
    taskId: string,
    status: "incomplete" | "completed" | "archived"
  ) => void;
  removeTaskFromList: (taskId: string) => void;
};

const ResourceTask = ({
  task,
  updateTaskStatus,
  removeTaskFromList,
}: Props) => {
  const [editMode, setEditMode] = useState(false);

  const [taskEdited, editTask] = useState<string>(task?.task);

  const [description, setDescription] = useState<string>(
    task?.description ?? ""
  );

  const [urgency, setUrgency] = useState<"low" | "medium" | "high" | string>(
    task?.urgency
  );

  const [error, setError] = useState<string | null>(null);

  const [submittingEdits, setEditSubmit] = useState<boolean>(false);

  const [showActions, setShowActions] = useState<boolean>(false);

  const [showDescription, setShowDescription] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    editTask(e.target.value);

  const onDescChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDescription(e.currentTarget.value);
  };

  const handleSelectUrgency = (
    e: React.FormEvent<HTMLSpanElement>,
    priority: "low" | "medium" | "high"
  ) => {
    e.preventDefault();

    setUrgency(priority);
  };

  //reset on close
  //this does not work, need to figure out how to just roll back
  const handleReset = () => {
    setEditMode(false);
    setError(null);
    setUrgency(task?.urgency);
    setDescription(task?.description ?? "");
    editTask(task?.task);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLButtonElement | HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      //trigger loading state
      setEditSubmit(true);

      const res = await axios("/api/tasks/edit", {
        method: "POST",
        data: {
          task: taskEdited,
          description,
          taskId: task?._id,
          urgency,
        },
      });

      if (res.status !== 200)
        throw new Error(res.data?.message ?? "Could not update task");

      //if successful update in local state
      editTask(res.data.updatedTask?.task);

      setDescription(res.data?.updatedTask?.description);

      setUrgency(res.data?.updatedTask?.urgency);

      //end loading
      setEditSubmit(false);

      setEditMode(false);
    } catch (error) {
      setEditSubmit(false);

      console.error("error editing task", error);

      setError(typeof error === "string" ? error : "Error Editing Task");
    }
  };

  const handleTaskAction = async (
    action: "completed" | "archived" | "incomplete"
  ) => {
    try {
      //@TODO:need task loading state
      const res = await axios("/api/tasks/edit", {
        method: "POST",
        data: {
          taskId: task?._id,
          status: action,
        },
      });

      if (res.status !== 200)
        throw new Error(res.data?.message ?? "Could not update task");

      updateTaskStatus(task?._id, action);
    } catch (error) {
      console.error("Error actioning", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const res = await axios("/api/tasks/delete", {
        method: "POST",
        data: {
          taskId: task?._id,
        },
      });
      //do not remove from local state if error
      if (res.status !== 200) throw new Error(res.data?.message);
      //if successful delete from local state
      removeTaskFromList(task?._id);
      //need to delete task in local state as well
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div
      onMouseEnter={() => setShowActions(!editMode && true)}
      onMouseLeave={() => setShowActions(false)}
      className={classNames(
        "flex justify-between rounded p-2 bg-slate-500 text-slate-100 hover:shadow-xl hover:bg-slate-400 transition-all border-l-8 ",
        {
          "border-sky-400": urgency === "low" || !urgency,
          "border-orange-400": urgency === "medium",
          "border-red-400": urgency === "high",
          "items-center": !editMode,
          "items-start": editMode,
        }
      )}
    >
      <div className='flex items-center gap-2 w-full'>
        {showActions && !editMode && (
          <div className='flex items-center gap-2'>
            {/* Allow for user to complete task */}
            {task?.status === "incomplete" && (
              <button
                onClick={() => handleTaskAction("completed")}
                className='text-slate-400/80 rounded-full p-1 bg-slate-600/80 text-xs hover:bg-green-400 hover:text-slate-50 font-bold transition-all'
              >
                <AiOutlineCheck />
              </button>
            )}
            {task?.status === "completed" && (
              // Allow for user to set a task back to incomplete
              <button
                onClick={() => handleTaskAction("incomplete")}
                className='text-slate-500 rounded-full p-1 bg-green-400 text-xs hover:bg-slate-800/50 hover:text-slate-50 font-bold transition-all'
              >
                <AiOutlineCheck />
              </button>
            )}

            {task?.status !== "archived" && (
              <button
                onClick={() => handleTaskAction("archived")}
                className='text-slate-400/80 rounded-full p-1 bg-slate-600/80 text-xs hover:bg-red-400 hover:text-slate-50 font-bold transition-all'
              >
                <BsArchive />
              </button>
            )}
            {/* //only allow for deleting of archived tasks? */}
            {task?.status === "archived" && (
              <>
                <button
                  onClick={() => handleTaskAction("incomplete")}
                  className='text-slate-50  rounded-full p-1 bg-sky-500 text-sm hover:bg-sky-600 hover:text-slate-50 font-bold transition-all'
                >
                  <AiOutlineUndo />
                </button>
                <button
                  onClick={() => handleDeleteTask()}
                  className='text-slate-50    rounded-full p-1 bg-red-500 text-sm hover:bg-red-400 hover:text-slate-50 font-bold transition-all'
                >
                  <AiOutlineDelete />
                </button>
              </>
            )}
          </div>
        )}
        {editMode ? (
          <form className='flex flex-col gap-2 w-full p-2'>
            <input
              value={taskEdited}
              name='taskEdited'
              className='bg-slate-600 rounded p-2'
              onChange={onChange}
              autoFocus={true}
              placeholder='Task'
            />
            <UrgencySelector
              handleSelectUrgency={handleSelectUrgency}
              urgency={urgency}
            />
            <p className='text-slate-100 font-bold text-xs'>Description</p>
            <textarea
              className='min-h-[100px] rounded bg-slate-600 p-2'
              placeholder='Task Description'
              value={description}
              onChange={(e) => onDescChange(e)}
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className='flex items-center bg-green-400 rounded text-slate-50 font-bold p-2 self-end hover:bg-green-500 transition-all'
            >
              {submittingEdits && (
                <svg
                  className='animate-spin h-5 w-5 mr-3 rounded-full border-4 border-slate-500/50 border-t-slate-50'
                  viewBox='0 0 24 24'
                ></svg>
              )}
              {submittingEdits ? "Saving..." : "Save"}
            </button>
          </form>
        ) : (
          <div className='flex flex-col gap-2'>
            <p
              className='hover:cursor-pointer'
              onClick={() => setShowDescription(!showDescription)}
            >
              {taskEdited}
            </p>
            {showDescription && description && (
              <div className='p-2 bg-slate-600 rounded'>
                <p className='text-slate-100 font-bold text-xs'>Description</p>
                <p className='text-slate-300'>{description}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className='w-1/4 flex justify-end'>
        {editMode ? (
          <button
            onClick={() => handleReset()}
            className='flex items-center rounded-full bg-slate-300 text-black p-1 text-sm hover:shadow-xl hover:bg-sky-400 transition-all'
          >
            <AiOutlineClose />{" "}
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className='flex items-center rounded-full bg-slate-300 text-black p-1 text-sm hover:shadow-xl hover:bg-sky-400 transition-all'
          >
            <AiOutlineEdit />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResourceTask;
