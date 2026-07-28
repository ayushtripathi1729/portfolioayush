"use client";

import { Menu } from "lucide-react";

import { Logo } from "@/components/admin/layout/logo";
import { SidebarNav } from "@/components/admin/navigation/sidebar-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
          />
        }
      >
        <Menu className="size-5" />
        <span className="sr-only">Open navigation menu</span>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-70 p-0"
      >
        <div className="flex h-16 items-center border-b px-6">
          <Logo />
        </div>

        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}