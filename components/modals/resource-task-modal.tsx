import React, { useState } from "react";
import { AiOutlineBackward, AiOutlinePlus } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { GroupResource } from "../../types/group.types";
import { TaskType } from "../../types/task.types";
import CloseModalButton from "../buttons/close-modal-button";
import TasksForm from "../forms/tasks-form";
import Heading4 from "../text/heading-4";
import ModalContainer from "./modal-container";
import ModalContentWrapper from "./modal-content-wrapper";
import ModalHeaderWrapper from "./modal-header-wrapper";

type Props = {
  isModalVisible: boolean;
  setModalVisibility: (visibility: boolean) => void;
  resource: GroupResource;
};

const ResourceTaskModal = ({
  resource,
  isModalVisible,
  setModalVisibility,
}: Props) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Array<any>>([
    "create stuff",
    "eat a bagel",
    "flerm",
  ]);

  const handleAddTask = (task: TaskType) => setTasks([...tasks, task?.task]);

  if (!isModalVisible) return null;
  return (
    <ModalContainer>
      <ModalHeaderWrapper>
        <Heading4>
          Tasks for {` `}
          <span className='text-sky-400'>{resource.resourceName}</span>
        </Heading4>
        <CloseModalButton toggleModalVisibility={setModalVisibility} />
      </ModalHeaderWrapper>
      <ModalContentWrapper>
        <div className='flex flex-col gap-2 mt-4 bg-slate-600 p-3 rounded'>
          <div className='flex gap-2 items-center justify-between'>
            <h4 className='text-slate-50 font-bold'>Tasks</h4>
            {!showTaskForm && (
              <div className='flex items-center gap-2'>
                <p className='text-slate-400 text-sm'>Add New Tasks</p>
                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className='rounded bg-slate-400 text-black flex items-center gap-1 text-xs p-2 hover:bg-sky-500 hover:text-slate-50 transition-all'
                >
                  <AiOutlinePlus /> Add
                </button>
              </div>
            )}
            {showTaskForm && (
              <div className=''>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className='text-red-300 text-xs font-bold flex items-center gap-1'
                >
                  <BiArrowBack />
                  Back
                </button>
              </div>
            )}
          </div>
          {showTaskForm && (
            <div className='flex flex-col gap-2'>
              <TasksForm
                addTaskToLocalState={handleAddTask}
                resourceRef={resource?._id}
              />
            </div>
          )}
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={task + index}
                className='rounded p-2 bg-slate-500 text-black hover:shadow-xl hover:bg-slate-400 transition-all'
              >
                <p>{task}</p>
              </div>
            ))
          ) : (
            <p className='text-slate-50'>No tasks yet</p>
          )}
        </div>
      </ModalContentWrapper>
    </ModalContainer>
  );
};

export default ResourceTaskModal;
