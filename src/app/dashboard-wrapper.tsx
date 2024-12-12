"use client";

import { useEffect } from "react";
import StoreProvider, { useAppSelector } from "@/app/redux";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/app/auth-provider";

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
      <AuthProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
    </StoreProvider>
  );
};
