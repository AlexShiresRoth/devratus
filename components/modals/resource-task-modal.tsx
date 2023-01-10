import classNames from "classnames";
import React, { useMemo, useState } from "react";
import {
  AiOutlineBackward,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import useFetchTasksOnResource from "../../custom-hooks/useFetchTasksOnResource";
import { GroupResource } from "../../types/group.types";
import { TaskType } from "../../types/task.types";
import CloseModalButton from "../buttons/close-modal-button";
import TasksForm from "../forms/tasks-form";
import ResourceTask from "../tasks/resource-task";
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
  const {
    tasks: fetchedTasks,
    isTasksLoading,
    tasksFetchError,
  } = useFetchTasksOnResource({ resourceId: resource?._id });

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Array<any>>(fetchedTasks ?? []);
  const [taskTab, setTaskTab] = useState<
    "incomplete" | "completed" | "archived"
  >("incomplete");

  const handleAddTask = (task: TaskType) => setTasks([task, ...tasks]);

  useMemo(() => {
    if (fetchedTasks?.length > 0) {
      setTasks(fetchedTasks);
    }
  }, [fetchedTasks]);

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
            <div className='flex items-center gap-4'>
              <h4
                className={classNames(
                  " font-bold hover:cursor-pointer hover:text-slate-50 transition-all",
                  {
                    "text-slate-50": taskTab === "incomplete",
                    "text-slate-400": taskTab !== "incomplete",
                  }
                )}
              >
                Tasks: {tasks?.length ?? 0}
              </h4>
              <h4
                className={classNames(
                  " font-bold hover:cursor-pointer hover:text-slate-50 transition-all",
                  {
                    "text-slate-50": taskTab === "completed",
                    "text-slate-400": taskTab !== "completed",
                  }
                )}
              >
                Completed:{" "}
                {tasks.filter((task: TaskType) => task?.status === "completed")
                  .length ?? 0}
              </h4>
              <h4
                className={classNames(
                  " font-bold hover:cursor-pointer hover:text-slate-50 transition-all",
                  {
                    "text-slate-50": taskTab === "archived",
                    "text-slate-400": taskTab !== "archived",
                  }
                )}
              >
                Archived
              </h4>
            </div>
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
                setShowTaskForm={setShowTaskForm}
                showTaskForm={showTaskForm}
              />
            </div>
          )}
          {tasks.length > 0 ? (
            <div className='flex flex-col max-h-[250px] overflow-y-auto gap-2'>
              {tasks
                .filter(
                  (task: TaskType) =>
                    task.status !== "completed" && task.status !== "archived"
                )
                .map((task: TaskType) => (
                  <ResourceTask key={task?._id} task={task} />
                ))}
            </div>
          ) : (
            <p className='text-slate-50'>No tasks yet</p>
          )}
        </div>
      </ModalContentWrapper>
    </ModalContainer>
  );
};

export default ResourceTaskModal;
