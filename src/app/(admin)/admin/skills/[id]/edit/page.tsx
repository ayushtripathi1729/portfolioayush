import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditSkillForm } from "@/components/admin/skills/edit-skill-form";
import { skillService } from "@/services/skill.service";


interface EditSkillPageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function EditSkillPage({
  params,
}: EditSkillPageProps) {

  const { id } = await params;


  const skill =
    await skillService.getById(id);



  if (!skill) {
    notFound();
  }



  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/skills">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>




        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Edit Skill
          </h1>


          <p className="mt-2 text-muted-foreground">
            Update skill details and portfolio visibility.
          </p>


        </div>


      </section>





      <EditSkillForm
        skill={{
          id: skill.id,

          name: skill.name,

          slug: skill.slug,

          level: skill.level,

          icon:
            skill.icon ?? "",

          displayOrder:
            skill.displayOrder,

          featured:
            skill.featured,

          visible:
            skill.visible,

          categoryId:
            skill.categoryId,
        }}
      />


    </div>
  );
}