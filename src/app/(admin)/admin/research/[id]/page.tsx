import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditResearchForm } from "@/components/admin/research/edit-research-form";
import { researchService } from "@/services/research.service";


interface EditResearchPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditResearchPage({
  params,
}: EditResearchPageProps) {

  const { id } = await params;


  const research =
    await researchService.getById(id);



  if (!research) {
    notFound();
  }





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
              Edit Research
            </h1>

          </div>



          <p className="mt-2 text-muted-foreground">
            Update your research publication details.
          </p>


        </div>


      </section>







      <EditResearchForm
        research={{
          id: research.id,

          title:
            research.title,

          slug:
            research.slug,

          abstract:
            research.abstract ?? "",

          publisher:
            research.publisher ?? "",

          journal:
            research.journal ?? "",

          doi:
            research.doi ?? "",

          externalUrl:
            research.externalUrl ?? "",

          publishedAt:
            research.publishedAt,

          pdfAssetId:
            research.pdfAssetId ?? "",

          coverImageId:
            research.coverImageId ?? "",

          featured:
            research.featured,

          visible:
            research.visible,

          displayOrder:
            research.displayOrder,

        }}
      />


    </div>
  );
}