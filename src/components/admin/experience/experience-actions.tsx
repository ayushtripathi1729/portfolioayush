"use client";

import Link from "next/link";
import {
  Pencil,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteExperienceButton } from "./delete-experience-button";


interface ExperienceActionsProps {
  id: string;
}



export function ExperienceActions({
  id,
}: ExperienceActionsProps) {

  return (
    <div className="flex items-center gap-2">


      <Link
        href={`/admin/experience/${id}/edit`}
      >

        <Button
          variant="outline"
          size="sm"
        >

          <Pencil className="size-4" />

          Edit

        </Button>

      </Link>





      <Link
        href={`/experience/${id}`}
        target="_blank"
      >

        <Button
          variant="outline"
          size="icon"
          aria-label="Preview experience"
        >

          <Eye className="size-4" />

        </Button>

      </Link>





      <DeleteExperienceButton
        id={id}
      />


    </div>
  );
}