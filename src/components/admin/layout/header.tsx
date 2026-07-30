"use client";

import type { Session } from "next-auth";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/admin/navigation/breadcrumbs";
import { ThemeToggle } from "@/components/admin/user/theme-toggle";
import { UserMenu } from "@/components/admin/user/user-menu";


interface HeaderProps {
  session: Session | null;
  onMenuClick?: () => void;
}


export function Header({
  session,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        <Breadcrumbs />
      </div>


      <div className="flex items-center gap-2">
        <ThemeToggle />

        <UserMenu session={session} />
      </div>

    </header>
  );
}