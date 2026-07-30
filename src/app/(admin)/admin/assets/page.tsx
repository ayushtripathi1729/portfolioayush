import Link from "next/link";
import { ImageIcon } from "lucide-react";

import { assetService } from "@/services/asset.service";
import { Button } from "@/components/ui/button";
import { AssetTable } from "@/components/admin/assets/asset-table";


export default async function AssetsAdminPage() {

  const assets =
    await assetService.getAll();



  return (
    <div className="space-y-8">


      <section className="flex items-center justify-between">


        <div className="flex items-center gap-3">

          <ImageIcon className="size-8 text-primary" />


          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              Assets
            </h1>


            <p className="text-muted-foreground">
              Manage uploaded files and media assets.
            </p>

          </div>

        </div>





        <Link href="/admin/assets/new">

          <Button>
            Create Asset
          </Button>

        </Link>


      </section>






      {assets.length === 0 ? (

        <div className="rounded-xl border p-6 text-muted-foreground">

          No assets found.

        </div>

      ) : (

        <AssetTable
          assets={assets}
        />

      )}


    </div>
  );
}