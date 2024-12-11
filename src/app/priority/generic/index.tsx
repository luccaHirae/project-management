"use client";

import { useState } from "react";
import { useAppSelector } from "@/app/redux";
import { useGetUserTasksQuery } from "@/state/api";
import { Priority } from "@/constants";
import { NewTaskModal } from "@/components/new-task-modal";
import { Header } from "@/components/header";
import { TaskCard } from "@/components/task-card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

interface PriorityGenericProps {
  priority: Priority;
}

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 p-2 text-sm font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username ?? "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username ?? "Unassigned",
  },
];

export const PriorityGeneric = ({ priority }: PriorityGenericProps) => {
  const [view, setView] = useState<"list" | "table">("list");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const userId = 1; // TODO: get user id from auth library
  const {
    data: task,
    isLoading,
    isError: isTaskErrored,
  } = useGetUserTasksQuery(userId, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = task?.filter((task) => task.priority === priority);

  if (isTaskErrored || !task)
    return <div>An error has occurred while retrieving tasks</div>;

  return (
    <div className="m-5 p-4">
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        projectId={null}
      />

      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            Add Task
          </button>
        }
      />

      <div className="mb-4 flex justify-start">
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 ${view === "list" ? "bg-gray-200" : "bg-white"} rounded-l`}
        >
          List
        </button>

        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 ${view === "table" ? "bg-gray-200" : "bg-white"} rounded-l`}
        >
          Table
        </button>
      </div>

      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};
