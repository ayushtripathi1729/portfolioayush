"use client";

import Link from "next/link";
import {
  Pencil,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteProjectButton } from "./delete-project-button";


interface ProjectActionsProps {
  id: string;
}


export function ProjectActions({
  id,
}: ProjectActionsProps) {

  return (
    <div className="flex items-center gap-2">


      <Link href={`/admin/projects/${id}/edit`}>

        <Button
          variant="outline"
          size="sm"
        >

          <Pencil className="size-4" />

          Edit

        </Button>

      </Link>



      <Link
        href={`/projects/${id}`}
        target="_blank"
      >

        <Button
          variant="outline"
          size="icon"
          aria-label="Preview project"
        >

          <Eye className="size-4" />

        </Button>


      </Link>




      <DeleteProjectButton
        id={id}
      />


    </div>
  );
}