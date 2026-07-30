"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";


interface DeleteEducationButtonProps {
  id: string;
}



export function DeleteEducationButton({
  id,
}: DeleteEducationButtonProps) {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);



  async function handleDelete() {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this education record?"
      );


    if (!confirmed) {
      return;
    }



    try {

      setLoading(true);



      const response =
        await fetch(
          `/api/education/${id}`,
          {
            method: "DELETE",
          }
        );



      if (!response.ok) {

        throw new Error(
          "Failed to delete education record."
        );

      }



      router.refresh();


    } catch (error) {

      console.error(
        "Delete education error:",
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