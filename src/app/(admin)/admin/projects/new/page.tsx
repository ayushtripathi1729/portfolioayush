import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectForm } from "@/components/admin/projects/project-form";


export default function NewProjectPage() {
  return (
    <div className="space-y-8">

      <section className="flex items-center gap-4">

        <Link href="/admin/projects">
          <Button
            variant="outline"
            size="icon"
          >
            <ArrowLeft className="size-4" />
          </Button>
        </Link>


        <div>
          <h1 className="text-3xl font-bold">
            Create Project
          </h1>

          <p className="mt-2 text-muted-foreground">
            Add a new project to your portfolio.
          </p>
        </div>

      </section>


      <ProjectForm />

    </div>
  );
}