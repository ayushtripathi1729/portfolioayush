import { ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AchievementForm } from "@/components/admin/achievement/achievement-form";


export default function NewAchievementPage() {


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
              Add Achievement
            </h1>


          </div>




          <p className="mt-2 text-muted-foreground">
            Create a new achievement record.
          </p>


        </div>


      </section>





      <AchievementForm />


    </div>
  );
}