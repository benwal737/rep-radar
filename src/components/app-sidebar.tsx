"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="text-2xl font-bold">Rep Radar</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push("/workouts")}>
                Workouts
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Exercises</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Progress</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push("/account")}>
                Account
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <UserButton userProfileMode="navigation" userProfileUrl="/account" />
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
