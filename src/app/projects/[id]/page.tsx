"use client";

import { useState } from "react";
import { ProjectHeader } from "@/app/projects/project-header";

interface ProjectProps {
  params: {
    id: string;
  };
}

export default function Project({}: ProjectProps) {
  // const { id } = params;

  const [activeTab, setActiveTab] = useState("Board");
  // const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
