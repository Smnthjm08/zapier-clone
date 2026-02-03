"use client";

import { app } from "@/constants/base";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../ui/sidebar";
import Link from "next/link";
import { NavSidebar } from "./nav-sidebar";
import { AxeIcon, Compass, Home, KeyRound, Settings, User } from "lucide-react";
import { AppFooter } from "./app-footer";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="data-[slot=sidebar-menu-button]:p-1.5! border-2 border-primary h-11 items-center flex justify-center">
              <Link href="/app">
                <span className="text-base font-bold leading-1 flex items-center gap-2">
                  <AxeIcon className="w-5 h-5" />
                  {app.title}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavSidebar
          items={[
            {
              title: "Home",
              url: "/app",
              icon: Home,
            },
            {
              title: "Integrations",
              url: "/app/integrations",
              icon: KeyRound,
            },
            {
              title: "Discover",
              url: "/app/discover",
              icon: Compass,
            },
          ]}
        />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <AppFooter
          items={[
            {
              title: "My Profile",
              url: "/app/my-profile",
              icon: User,
            },
            {
              title: "Settings",
              url: "/app/settings",
              icon: Settings,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
