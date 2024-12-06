"use client";

import { useState } from "react";
import {
  Clock,
  Filter,
  Grid3X3,
  List,
  PlusSquare,
  Share2,
  Table,
} from "lucide-react";
import { Header } from "@/components/header";
import { TabButton } from "@/app/projects/tab-button";
import { NewProjectModal } from "@/app/projects/new-project-modal";

interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ProjectHeader = ({
  activeTab,
  setActiveTab,
}: ProjectHeaderProps) => {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const handleOpenNewProjectModal = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleCloseNewProjectModal = () => {
    setIsNewProjectModalOpen(false);
  };

  return (
    <div className="px-4 xl:px-6">
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={handleCloseNewProjectModal}
      />

      <div className="pb-6 lg:pb-4 lg:pt-8">
        <Header
          name="Project Design Development"
          buttonComponent={
            <button
              onClick={handleOpenNewProjectModal}
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
            >
              <PlusSquare className="mr-2 size-5" />
              New Boards
            </button>
          }
        />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />

          <TabButton
            name="List"
            icon={<List className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />

          <TabButton
            name="Timeline"
            icon={<Clock className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />

          <TabButton
            name="Table"
            icon={<Table className="size-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="size-5" />
          </button>

          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="size-5" />
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3X3 className="absolute left-3 top-2 size-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
