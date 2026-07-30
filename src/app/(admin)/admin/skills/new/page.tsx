import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SkillForm } from "@/components/admin/skills/skill-form";


export default function NewSkillPage() {

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
            Create Skill
          </h1>


          <p className="mt-2 text-muted-foreground">
            Add a new technical skill to your portfolio.
          </p>


        </div>


      </section>




      <SkillForm />


    </div>
  );
}