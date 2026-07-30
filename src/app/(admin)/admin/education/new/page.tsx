import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EducationForm } from "@/components/admin/education/education-form";


export default function NewEducationPage() {

  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/education">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>


          <div className="flex items-center gap-3">


            <GraduationCap className="size-7 text-primary" />


            <h1 className="text-3xl font-bold tracking-tight">
              Add Education
            </h1>


          </div>




          <p className="mt-2 text-muted-foreground">
            Add a new education record.
          </p>



        </div>


      </section>







      <EducationForm />


    </div>
  );
}