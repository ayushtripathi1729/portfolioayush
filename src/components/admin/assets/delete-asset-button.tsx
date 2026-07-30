"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";


interface DeleteAssetButtonProps {
  id: string;
}



export function DeleteAssetButton({
  id,
}: DeleteAssetButtonProps) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);



  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this asset?"
      );


    if (!confirmed) {
      return;
    }



    try {

      setLoading(true);



      const response =
        await fetch(
          `/api/assets/${id}`,
          {
            method: "DELETE",
          }
        );



      if (!response.ok) {

        throw new Error(
          "Failed to delete asset."
        );

      }



      router.refresh();


    } catch (error) {

      console.error(
        "Delete asset error:",
        error
      );


    } finally {

      setLoading(false);

    }

  }





  return (

    <Button
      size="icon"
      variant="outline"
      className="text-destructive"
      disabled={loading}
      onClick={handleDelete}
    >

      {loading ? (

        <Loader2 className="size-4 animate-spin" />

      ) : (

        <Trash2 className="size-4" />

      )}

    </Button>

  );
}