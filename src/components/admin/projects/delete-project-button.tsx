"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


interface DeleteProjectButtonProps {
  id: string;
}


export function DeleteProjectButton({
  id,
}: DeleteProjectButtonProps) {

  const router = useRouter();


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");



  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this project?"
      );


    if (!confirmed) {
      return;
    }



    setError("");

    setLoading(true);



    try {

      const response =
        await fetch(
          `/api/projects/${id}`,
          {
            method: "DELETE",
          }
        );



      const result =
        await response.json();



      if (!response.ok) {

        setError(
          result.message ??
          "Failed to delete project."
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

        <p className="max-w-40 text-xs text-destructive">
          {error}
        </p>

      )}


    </div>

  );
}