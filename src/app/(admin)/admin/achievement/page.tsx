import Link from "next/link";
import { Plus, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AchievementTable } from "@/components/admin/achievement/achievement-table";
import { achievementService } from "@/services/achievement.service";


export default async function AchievementPage() {

  const achievements =
    await achievementService.getAllIncludingHidden();



  return (
    <div className="space-y-8">


      <section className="flex items-center justify-between">


        <div className="flex items-center gap-4">


          <Trophy className="size-8 text-primary" />


          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              Achievements
            </h1>


            <p className="text-muted-foreground">
              Manage awards, certifications and accomplishments.
            </p>

          </div>


        </div>





        <Link href="/admin/achievement/new">

          <Button>

            <Plus className="mr-2 size-4" />

            Add Achievement

          </Button>

        </Link>


      </section>





      <AchievementTable

        achievements={
          achievements.map(
            (achievement) => ({

              id:
                achievement.id,

              title:
                achievement.title,

              category:
                achievement.category,

              issuer:
                achievement.issuer,

              issueDate:
                achievement.issueDate,

              visible:
                achievement.visible,

            })
          )
        }

      />


    </div>
  );
}