"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


interface DeleteResearchButtonProps {
  id: string;
}



export function DeleteResearchButton({
  id,
}: DeleteResearchButtonProps) {

  const router = useRouter();


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");





  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this research entry?"
      );


    if (!confirmed) {
      return;
    }



    setLoading(true);

    setError("");



    try {

      const response =
        await fetch(
          `/api/research/${id}`,
          {
            method: "DELETE",
          }
        );



      const result =
        await response.json();




      if (!response.ok) {

        setError(
          result.message ??
          "Failed to delete research entry."
        );

        return;

      }




      router.refresh();



    } catch {

      setError(
        "Something went wrong while deleting."
      );


    } finally {

      setLoading(false);

    }

  }





  return (
    <div className="space-y-1">


      <Button
        variant="destructive"
        size="sm"
        disabled={loading}
        onClick={handleDelete}
      >


        {loading ? (

          <>

            <Loader2 className="size-4 animate-spin" />

            Deleting...

          </>

        ) : (

          <>

            <Trash2 className="size-4" />

            Delete

          </>

        )}


      </Button>




      {error && (

        <p className="max-w-44 text-xs text-destructive">
          {error}
        </p>

      )}


    </div>
  );
}