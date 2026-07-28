"use client";

import { SidebarItem } from "@/components/admin/navigation/sidebar-item";
import { adminNavigation } from "@/lib/navigation";

export function SidebarNav() {
  return (
    <nav className="flex-1 space-y-1 p-4">
      {adminNavigation.map((item) => (
        <SidebarItem
          key={item.href}
          {...item}
        />
      ))}
    </nav>
  );
}