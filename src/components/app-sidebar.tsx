"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar className="w-52">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Rep Radar</div>
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push("/templates")}>
                Templates
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
        {/* <UserButton userProfileMode="navigation" userProfileUrl="/account" /> */}
        <SignOutButton>
          <Button variant="outline" size="icon">
            <LogOut className="size-4" />
          </Button>
        </SignOutButton>
      </SidebarFooter>
    </Sidebar>
  );
}
