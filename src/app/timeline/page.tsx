"use client";

import { useMemo, useState } from "react";
import { DisplayOption, ViewMode, Gantt } from "gantt-task-react";
import { useAppSelector } from "@/app/redux";
import { useGetProjectsQuery } from "@/state/api";
import { Header } from "@/components/header";
import "gantt-task-react/dist/index.css";

type TaskTypeItems = "task" | "milestone" | "project";

export default function TimelinePage() {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganntTasks = useMemo(() => {
    return (
      projects?.map((projects) => ({
        start: new Date(projects.startDate ?? ""),
        end: new Date(projects.endDate ?? ""),
        name: projects.name,
        id: `Projects-${projects.id}`,
        type: "Projects" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) ?? []
    );
  }, [projects]);

  const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: e.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError || !projects)
    return <div>An error has occurred while retrieving projects</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />

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
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganntTasks}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
            {...displayOptions}
          />
        </div>
      </div>
    </div>
  );
}
