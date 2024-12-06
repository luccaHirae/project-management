import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Header } from "@/components/header";
import { useAppSelector } from "@/app/redux";
import { useGetTaskQuery } from "@/state/api";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

interface TableViewProps {
  id: string;
  setIsNewTaskModalOpen: (value: boolean) => void;
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

export const TableView = ({ id }: TableViewProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

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
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="Table" isSmallText />

        <DataGrid
          rows={tasks ?? []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};
