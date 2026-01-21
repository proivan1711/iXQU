"use client";

import { PieChart, Settings, Timer } from "lucide-react";
import { usePathname } from "next/dist/client/components/navigation"; // Menu items.
import Link from "next/link";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"; // Menu items.

// Menu items.
const items = [
  {
    title: "Timer",
    url: "/",
    icon: Timer,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: PieChart,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const placeholderAppVersion = "1.0 beta";
  const pageUrl = usePathname();

  return (
    <ShadcnSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pageUrl === item.url} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <p className="text-center mb-2 text-sm font-semibold text-muted-foreground">
        {placeholderAppVersion}
      </p>
    </ShadcnSidebar>
  );
}
