"use client";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useGetTeamsQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import { Header } from "@/components/header";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />

    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Team ID",
    width: 100,
  },
  {
    field: "teamName",
    headerName: "Team Name",
    width: 200,
  },
  {
    field: "productOwnerUsername",
    headerName: "Product Owner",
    width: 200,
  },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

export default function TeamsPage() {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !teams)
    return <div>An error has occurred while retrieving teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />

      <div
        style={{
          height: 650,
          width: "100%",
        }}
      >
        <DataGrid
          rows={teams || []}
          columns={columns}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
}
