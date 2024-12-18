import { Header } from "@/components/header";
import { TaskCard } from "@/components/task-card";
import { useGetTaskQuery } from "@/state/api";

interface ListViewProps {
  id: string;
  setIsNewTaskModalOpen: (value: boolean) => void;
}

export const ListView = ({ id, setIsNewTaskModalOpen }: ListViewProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTaskQuery({
    projectId: Number(id),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred while retrieving tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};
