"use client";

import { Logo } from "./logo";

import { SidebarNav } from "@/components/admin/navigation/sidebar-nav";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-70 flex-col border-r bg-background lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Logo />
      </div>

      <SidebarNav />
    </aside>
  );
}