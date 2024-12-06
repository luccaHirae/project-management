import { useMemo, useState } from "react";
import { DisplayOption, ViewMode, Gantt } from "gantt-task-react";
import { useAppSelector } from "@/app/redux";
import { useGetTaskQuery } from "@/state/api";
import "gantt-task-react/dist/index.css";

interface TimelineViewProps {
  id: string;
  setIsNewTaskModalOpen: (value: boolean) => void;
}

type TaskTypeItems = "task" | "milestone" | "project";

export const TimelineView = ({
  id,
  setIsNewTaskModalOpen,
}: TimelineViewProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTaskQuery({
    projectId: Number(id),
  });

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganntTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate ?? ""),
        end: new Date(task.dueDate ?? ""),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) ?? []
    );
  }, [tasks]);

  const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: e.target.value as ViewMode,
    }));
  };

  const handleNewTask = () => {
    setIsNewTaskModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred while retrieving tasks</div>;

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>

        <div className="relative inline-block w-64">
          <select
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
            name=""
            id=""
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganntTasks}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
            {...displayOptions}
          />
        </div>

        <div className="px-4 pb-5 pt-1">
          <button
            onClick={handleNewTask}
            className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};
