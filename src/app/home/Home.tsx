import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <SidebarProvider>
          <AppSidebar />
        </SidebarProvider>
      </div>
    </div>
  );
};

export default Home;
