"use client";

// import { useState } from "react";
import { PROJECT_NAME } from "@/constants";
import Image from "next/image";
import { LockIcon } from "lucide-react";

export const Sidebar = () => {
  // const [showProjects, setShowProjects] = useState(true);
  // const [showPriority, setShowPriority] = useState(true);

  const sidebarClassNames = `fixed flex flex-col h-full justify-between shadow-xl
    transition-all duration-300 z-40 dark:bg-black overflow-y-auto bg-white w-64`;

  return (
    <aside className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div
            title={PROJECT_NAME}
            className="cursor-default text-xl font-bold text-gray-800 dark:text-white"
          >
            {PROJECT_NAME}
          </div>
        </div>

        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="/logo.png"
            alt={`${PROJECT_NAME} logo`}
            width={40}
            height={40}
            draggable={false}
          />

          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              {PROJECT_NAME} TEAM
            </h3>

            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />

              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
