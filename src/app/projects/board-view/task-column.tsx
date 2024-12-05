import { useDrop } from "react-dnd";
import { EllipsisVertical, Plus } from "lucide-react";
import { Status } from "@/constants";
import { Task } from "@/app/projects/board-view/task";
import { Task as ITask } from "@/types";

interface TaskColumnProps {
  status: string;
  tasks: ITask[];
  moveTask: (taskId: number, status: string) => void;
  setIsNewTaskModalOpen: (value: boolean) => void;
}

export const TaskColumn = ({
  moveTask,
  setIsNewTaskModalOpen,
  status,
  tasks,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const taskCount = tasks.filter((task) => task.status === status).length;
  const statusColor: Record<string, string> = {
    [Status.ToDo]: "#2563EB",
    [Status.WorkInProgress]: "#059669",
    [Status.UnderReview]: "#D97706",
    [Status.Completed]: "#000000",
  };

  const handleNewTask = () => {
    setIsNewTaskModalOpen(true);
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />

        <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {status}{" "}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              {taskCount}
            </span>
          </h3>

          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>

            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
              onClick={handleNewTask}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};
