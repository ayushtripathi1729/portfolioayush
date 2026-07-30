import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResearchForm } from "@/components/admin/research/research-form";


export default function NewResearchPage() {

  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/research">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>

          <div className="flex items-center gap-3">

            <FlaskConical className="size-7 text-primary" />


            <h1 className="text-3xl font-bold tracking-tight">
              Create Research
            </h1>

          </div>



          <p className="mt-2 text-muted-foreground">
            Add a new research paper or academic publication.
          </p>


        </div>


      </section>






      <ResearchForm />


    </div>
  );
}