"use client";

import Link from "next/link";
import {
  Pencil,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteSkillButton } from "./delete-skill-button";


interface SkillActionsProps {
  id: string;
}


export function SkillActions({
  id,
}: SkillActionsProps) {

  return (
    <div className="flex items-center gap-2">


      <Link href={`/admin/skills/${id}/edit`}>

        <Button
          variant="outline"
          size="sm"
        >

          <Pencil className="size-4" />

          Edit

        </Button>

      </Link>




      <Link
        href={`/skills/${id}`}
        target="_blank"
      >

        <Button
          variant="outline"
          size="icon"
          aria-label="Preview skill"
        >

          <Eye className="size-4" />

        </Button>

      </Link>




      <DeleteSkillButton
        id={id}
      />


    </div>
  );
}