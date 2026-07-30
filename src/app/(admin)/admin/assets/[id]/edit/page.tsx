import { ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EditAssetForm } from "@/components/admin/assets/edit-asset-form";
import { assetService } from "@/services/asset.service";


interface EditAssetPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditAssetPage({
  params,
}: EditAssetPageProps) {

  const { id } =
    await params;



  const asset =
    await assetService.getById(id);



  if (!asset) {
    notFound();
  }



  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/assets">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>

          <div className="flex items-center gap-3">

            <ImageIcon className="size-7 text-primary" />


            <h1 className="text-3xl font-bold tracking-tight">
              Edit Asset
            </h1>

          </div>




          <p className="mt-2 text-muted-foreground">
            Update asset details.
          </p>


        </div>


      </section>





      <EditAssetForm

        asset={{

          id:
            asset.id,

          fileName:
            asset.fileName,

          originalName:
            asset.originalName,

          url:
            asset.url,

          mimeType:
            asset.mimeType,

          type:
            asset.type,

          extension:
            asset.extension ?? "",

          size:
            asset.size,

          width:
            asset.width,

          height:
            asset.height,

          altText:
            asset.altText ?? "",

        }}

      />


    </div>
  );
}