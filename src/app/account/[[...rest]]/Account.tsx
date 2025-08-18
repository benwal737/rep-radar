"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProfile } from "@clerk/nextjs";

const Account = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full items-center justify-center">
        <AppSidebar />
        <UserProfile />
      </div>
    </SidebarProvider>
  );
};

export default Account;
