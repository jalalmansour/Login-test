"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  Dna,
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  Wallet,
  BarChart2,
  Sparkles,
  Settings,
  ChevronDown
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { UserNav } from "./user-nav";
import type { User, NavItem } from "@/lib/types";
import { users } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = React.useState<User>(users[4]); // Default to EMPLOYEE

  const navItems: NavItem[] = [
    { href: "/dashboard", title: "Dashboard", icon: LayoutDashboard, roles: ['ADMIN', 'RRH', 'RF', 'MANAGER', 'EMPLOYEE', 'TRAINER'] },
    { href: "/trainings", title: "Catalog", icon: BookOpen, roles: ['ADMIN', 'RRH', 'RF', 'MANAGER', 'EMPLOYEE', 'TRAINER'] },
    { href: "/sessions", title: "Sessions", icon: Calendar, roles: ['ADMIN', 'RRH', 'RF', 'MANAGER', 'EMPLOYEE', 'TRAINER'] },
    { href: "/enrollments", title: "Enrollments", icon: Users, roles: ['MANAGER', 'EMPLOYEE'] },
    { href: "/budget", title: "Budget", icon: Wallet, roles: ['ADMIN', 'RRH', 'RF', 'MANAGER'] },
    { href: "/reports", title: "Reports", icon: BarChart2, roles: ['ADMIN', 'RRH', 'RF', 'MANAGER'] },
    { href: "/recommendations", title: "AI Recommendations", icon: Sparkles, roles: ['EMPLOYEE', 'MANAGER'] },
  ];

  const visibleNavItems = navItems.filter(item => item.roles.includes(currentUser.role));

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader>
          <div
            className={cn(
              "flex items-center gap-2 p-2 transition-all duration-200",
              "group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
            )}
          >
            <Dna className="h-8 w-8 text-primary flex-shrink-0" />
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              EHC Training Hub
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {visibleNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.title }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="group-data-[collapsible=icon]:hidden">
            <Link href="#" legacyBehavior passHref>
                <SidebarMenuButton>
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
          <SidebarTrigger className="sm:hidden" />
          <div className="flex-1">
             <h1 className="text-2xl font-semibold capitalize">{pathname.split('/').pop()?.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-4">
             <UserNav currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {React.cloneElement(children as React.ReactElement, { currentUser })}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
