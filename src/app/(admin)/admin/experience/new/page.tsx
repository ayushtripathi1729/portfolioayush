import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ExperienceForm } from "@/components/admin/experience/experience-form";


export default function NewExperiencePage() {

  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/experience">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Create Experience
          </h1>


          <p className="mt-2 text-muted-foreground">
            Add a new professional experience entry.
          </p>


        </div>


      </section>






      <ExperienceForm />


    </div>
  );
}