"use client";

import { Navbar } from "@/app/(components)/navbar";
import { Sidebar } from "@/app/(components)/sidebar";
import StoreProvider, { useAppSelector } from "@/app/redux";
import { useEffect } from "react";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardWrapperProps) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />

      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSidebarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};
