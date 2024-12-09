"use client";

import { useState } from "react";
import { ProjectHeader } from "@/app/projects/project-header";
import { BoardView } from "@/app/projects/board-view";
import { ListView } from "@/app/projects/list-view";
import { TimelineView } from "@/app/projects/timeline-view";
import { TableView } from "@/app/projects/table-view";
import { NewTaskModal } from "@/components/new-task-modal";

interface ProjectProps {
  params: {
    id: string;
  };
}

export default function Project({ params }: ProjectProps) {
  const { id } = params;

  const [activeTab, setActiveTab] = useState("Board");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <div>
      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        projectId={id}
      />

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
