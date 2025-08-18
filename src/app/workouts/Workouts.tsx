"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Workouts = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen items-center justify-center">
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Workouts;
