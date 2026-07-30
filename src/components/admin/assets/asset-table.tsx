"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteAssetButton } from "@/components/admin/assets/delete-asset-button";


interface AssetTableProps {
  assets: Array<{
    id: string;
    fileName: string;
    originalName: string;
    url: string;
    mimeType: string;
    type: string;
    size: number;
    uploadedAt: Date;
  }>;
}



export function AssetTable({
  assets,
}: AssetTableProps) {

  function formatSize(size: number) {

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }



  return (
    <div className="overflow-x-auto rounded-xl border">

      <table className="w-full text-sm">

        <thead className="border-b bg-muted/50">

          <tr>

            <th className="px-4 py-3 text-left">
              File
            </th>


            <th className="px-4 py-3 text-left">
              Type
            </th>


            <th className="px-4 py-3 text-left">
              MIME
            </th>


            <th className="px-4 py-3 text-left">
              Size
            </th>


            <th className="px-4 py-3 text-left">
              Uploaded
            </th>


            <th className="px-4 py-3 text-right">
              Actions
            </th>

          </tr>

        </thead>




        <tbody>

          {assets.map((asset) => (

            <tr
              key={asset.id}
              className="border-b last:border-none"
            >

              <td className="px-4 py-3">

                <div className="font-medium">
                  {asset.originalName}
                </div>


                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:underline"
                >
                  {asset.fileName}
                </a>

              </td>




              <td className="px-4 py-3">

                <span className="rounded-full border px-2 py-1 text-xs">
                  {asset.type}
                </span>

              </td>




              <td className="px-4 py-3">
                {asset.mimeType}
              </td>




              <td className="px-4 py-3">
                {formatSize(asset.size)}
              </td>




              <td className="px-4 py-3">

                {new Date(
                  asset.uploadedAt
                ).toLocaleDateString()}

              </td>




              <td className="px-4 py-3 text-right">

                <div className="flex justify-end gap-2">

                  <Link
                    href={`/admin/assets/${asset.id}/edit`}
                  >

                    <Button
                      size="icon"
                      variant="outline"
                    >

                      <Pencil className="size-4" />

                    </Button>

                  </Link>




                  <DeleteAssetButton
                    id={asset.id}
                  />

                </div>

              </td>


            </tr>

          ))}

        </tbody>


      </table>


    </div>
  );
}