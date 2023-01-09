import classNames from "classnames";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { TaskType } from "../../types/task.types";

type Props = {
  task: TaskType;
};

const ResourceTask = ({ task }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const [taskEdited, editTask] = useState<string>(task?.task);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    editTask(e.target.value);

  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded p-2 bg-slate-500 text-slate-100 hover:shadow-xl hover:bg-slate-400 transition-all border-l-8",
        {
          "border-sky-400": task?.urgency === "low" || !task?.urgency,
          "border-orange-400": task?.urgency === "medium",
          "border-red-400": task?.urgency === "high",
        }
      )}
    >
      {editMode ? (
        <form>
          <input
            value={taskEdited}
            name='taskEdited'
            className='bg-transparent border-b-2 border-slate-300'
            onChange={onChange}
          />
        </form>
      ) : (
        <p>{task?.task}</p>
      )}
      <button
        onClick={() => setEditMode(!editMode)}
        className='rounded-full bg-slate-300 text-black p-1 text-sm hover:shadow-xl hover:bg-sky-400 transition-all'
      >
        <AiOutlineEdit />
      </button>
    </div>
  );
};

export default ResourceTask;
