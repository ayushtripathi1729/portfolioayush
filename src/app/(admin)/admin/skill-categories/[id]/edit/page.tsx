import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditSkillCategoryForm } from "@/components/admin/skill-categories/edit-skill-category-form";
import { skillCategoryService } from "@/services/skill-category.service";


interface EditSkillCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditSkillCategoryPage({
  params,
}: EditSkillCategoryPageProps) {

  const { id } = await params;


  const category =
    await skillCategoryService.getById(id);



  if (!category) {
    notFound();
  }




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
            Edit Skill Category
          </h1>


          <p className="mt-2 text-muted-foreground">
            Update category information and visibility.
          </p>


        </div>


      </section>






      <EditSkillCategoryForm
        category={{
          id: category.id,

          name: category.name,

          slug: category.slug,

          description:
            category.description ?? "",

          displayOrder:
            category.displayOrder,

          visible:
            category.visible,
        }}
      />


    </div>
  );
}