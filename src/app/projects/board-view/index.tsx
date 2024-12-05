import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGetTaskQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { TaskColumn } from "@/app/projects/board-view/task-column";
import { Status } from "@/constants";

interface BoardViewProps {
  id: string;
  setIsNewTaskModalOpen: (value: boolean) => void;
}

const taskStatus = [
  Status.ToDo,
  Status.WorkInProgress,
  Status.UnderReview,
  Status.Completed,
];

export const BoardView = ({ id, setIsNewTaskModalOpen }: BoardViewProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTaskQuery({
    projectId: Number(id),
  });

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, status: string) => {
    updateTaskStatus({ taskId, status });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred while retrieving tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks ?? []}
            moveTask={moveTask}
            setIsNewTaskModalOpen={setIsNewTaskModalOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};
