"use client";

import { useState } from "react";
import { ProjectHeader } from "@/app/projects/project-header";
import { BoardView } from "@/app/projects/board-view";
import { ListView } from "@/app/projects/list-view";
import { TimelineView } from "@/app/projects/timeline-view";
import { TableView } from "@/app/projects/table-view";

interface ProjectProps {
  params: {
    id: string;
  };
}

export default function Project({ params }: ProjectProps) {
  const { id } = params;

  const [activeTab, setActiveTab] = useState("Board");
  const [, setIsNewTaskModalOpen] = useState(false);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && (
        <BoardView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "List" && (
        <ListView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}

      {activeTab === "Table" && (
        <TableView id={id} setIsNewTaskModalOpen={setIsNewTaskModalOpen} />
      )}
    </div>
  );
}
