"use client";

import { useRouter } from "next/navigation";

import type { Session } from "next-auth";

import { LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface UserMenuProps {
  session: Session | null;
}


function getInitials(
  name?: string | null
) {
  if (!name) {
    return "A";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


export function UserMenu({
  session,
}: UserMenuProps) {


  const router = useRouter();


  const name =
    session?.user?.name ??
    "Administrator";


  const email =
    session?.user?.email ??
    "";


  const initials =
    getInitials(name);



  return (
    <DropdownMenu>


      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="size-10 rounded-full p-0"
            aria-label="Open user menu"
          />
        }
      >

        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {initials}
        </div>

      </DropdownMenuTrigger>





      <DropdownMenuContent
        align="end"
        className="w-64"
      >


        <DropdownMenuLabel>

          <div className="flex flex-col">

            <span className="font-semibold">
              {name}
            </span>


            <span className="text-xs text-muted-foreground">
              {email}
            </span>

          </div>

        </DropdownMenuLabel>





        <DropdownMenuSeparator />





        <DropdownMenuGroup>


          <DropdownMenuItem
            onClick={() =>
              router.push("/admin/profile")
            }
          >

            <User className="size-4" />

            Profile

          </DropdownMenuItem>





          <DropdownMenuItem
            onClick={() =>
              router.push("/admin/settings")
            }
          >

            <Settings className="size-4" />

            Settings

          </DropdownMenuItem>



        </DropdownMenuGroup>





        <DropdownMenuSeparator />





        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {

            await signOut({
              callbackUrl: "/login",
            });

          }}
        >

          <LogOut className="size-4" />

          Sign out

        </DropdownMenuItem>





      </DropdownMenuContent>


    </DropdownMenu>
  );
}