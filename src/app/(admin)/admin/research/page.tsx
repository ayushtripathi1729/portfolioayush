import Link from "next/link";
import { Plus, FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResearchTable } from "@/components/admin/research/research-table";
import { researchService } from "@/services/research.service";


export default async function ResearchPage() {

  const research =
    await researchService.getAllIncludingHidden();



  return (
    <div className="space-y-8">


      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


        <div>


          <div className="flex items-center gap-3">


            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">

              <FlaskConical className="size-5 text-primary" />

            </div>


            <h1 className="text-3xl font-bold tracking-tight">
              Research
            </h1>


          </div>




          <p className="mt-3 text-muted-foreground">
            Manage research papers, publications, and academic work.
          </p>


        </div>





        <Link href="/admin/research/new">

          <Button>

            <Plus className="size-4" />

            New Research

          </Button>

        </Link>


      </section>






      <section className="rounded-xl border bg-card p-6">


        <div className="mb-5">


          <h2 className="font-semibold">
            All Research
          </h2>


          <p className="text-sm text-muted-foreground">
            {research.length} total research publications
          </p>


        </div>





        <ResearchTable
          research={research}
        />


      </section>


    </div>
  );
}