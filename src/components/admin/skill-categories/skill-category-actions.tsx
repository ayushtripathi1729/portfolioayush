"use client";

import Link from "next/link";
import {
  Pencil,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteSkillCategoryButton } from "./delete-skill-category-button";


interface SkillCategoryActionsProps {
  id: string;
}



export function SkillCategoryActions({
  id,
}: SkillCategoryActionsProps) {

  return (
    <div className="flex items-center gap-2">


      <Link
        href={`/admin/skill-categories/${id}/edit`}
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
        href={`/skills?category=${id}`}
        target="_blank"
      >

        <Button
          variant="outline"
          size="icon"
          aria-label="Preview category"
        >

          <Eye className="size-4" />

        </Button>

      </Link>





      <DeleteSkillCategoryButton
        id={id}
      />


    </div>
  );
}