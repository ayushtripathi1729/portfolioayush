import Link from "next/link";
import { Plus, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SkillCategoryTable } from "@/components/admin/skill-categories/skill-category-table";
import { skillCategoryService } from "@/services/skill-category.service";


export default async function SkillCategoriesPage() {

  const categories =
    await skillCategoryService.getAllIncludingHidden();



  return (
    <div className="space-y-8">


      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


        <div>


          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">

              <Layers className="size-5 text-primary" />

            </div>


            <h1 className="text-3xl font-bold tracking-tight">
              Skill Categories
            </h1>


          </div>




          <p className="mt-3 text-muted-foreground">
            Organize your technical skills into categories.
          </p>


        </div>





        <Link href="/admin/skill-categories/new">

          <Button>

            <Plus className="size-4" />

            New Category

          </Button>

        </Link>


      </section>






      <section className="rounded-xl border bg-card p-6">


        <div className="mb-5">

          <h2 className="font-semibold">
            All Categories
          </h2>


          <p className="text-sm text-muted-foreground">
            {categories.length} total categories
          </p>


        </div>





        <SkillCategoryTable
          categories={categories}
        />


      </section>


    </div>
  );
}