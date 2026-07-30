import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EditAchievementForm } from "@/components/admin/achievement/edit-achievement-form";
import { achievementService } from "@/services/achievement.service";


interface EditAchievementPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditAchievementPage({
  params,
}: EditAchievementPageProps) {


  const { id } =
    await params;



  const achievement =
    await achievementService.getById(id);



  if (!achievement) {
    notFound();
  }





  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/achievement">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>


          <div className="flex items-center gap-3">


            <Trophy className="size-7 text-primary" />


            <h1 className="text-3xl font-bold tracking-tight">
              Edit Achievement
            </h1>


          </div>




          <p className="mt-2 text-muted-foreground">
            Update achievement details.
          </p>


        </div>


      </section>





      <EditAchievementForm

        achievement={{

          id:
            achievement.id,

          title:
            achievement.title,

          description:
            achievement.description ?? "",

          category:
            achievement.category ?? "",

          issuer:
            achievement.issuer ?? "",

          issueDate:
            achievement.issueDate,

          credentialUrl:
            achievement.credentialUrl ?? "",

          imageId:
            achievement.imageId ?? "",

          displayOrder:
            achievement.displayOrder,

          visible:
            achievement.visible,

        }}

      />


    </div>
  );
}