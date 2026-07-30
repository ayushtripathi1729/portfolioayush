import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SkillCategoryForm } from "@/components/admin/skill-categories/skill-category-form";


export default function NewSkillCategoryPage() {

  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/skill-categories">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Create Skill Category
          </h1>


          <p className="mt-2 text-muted-foreground">
            Add a new category for organizing skills.
          </p>


        </div>


      </section>






      <SkillCategoryForm />


    </div>
  );
}