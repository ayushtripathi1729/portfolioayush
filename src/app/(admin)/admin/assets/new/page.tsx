import { ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AssetForm } from "@/components/admin/assets/asset-form";


export default function NewAssetPage() {

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
              Create Asset
            </h1>

          </div>




          <p className="mt-2 text-muted-foreground">
            Add a new media asset.
          </p>


        </div>


      </section>





      <AssetForm />


    </div>
  );
}