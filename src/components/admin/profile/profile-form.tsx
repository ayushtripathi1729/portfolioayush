"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



interface ProfileFormProps {

  user: {

    id: string;

    name: string;

    email: string;

    avatarId: string | null;

  };

}



export function ProfileForm({
  user,
}: ProfileFormProps) {


  const router = useRouter();


  const [name, setName] =
    useState(user.name);


  const [avatarId, setAvatarId] =
    useState(
      user.avatarId ?? ""
    );


  const [error, setError] =
    useState("");


  const [success, setSuccess] =
    useState("");



  const [loading, setLoading] =
    useState(false);





  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    setError("");
    setSuccess("");
    setLoading(true);



    try {


      const response =
        await fetch(
          "/api/profile",
          {

            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },


            body: JSON.stringify({

              name,

              avatarId,

            }),

          }
        );



      const result =
        await response.json();




      if (!response.ok) {


        setError(
          result.message ??
          "Failed to update profile."
        );


        return;

      }



      setSuccess(
        "Profile updated successfully."
      );


      router.refresh();



    } catch {


      setError(
        "Something went wrong."
      );


    } finally {


      setLoading(false);


    }


  }





  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border p-6"
    >


      <div className="space-y-2">

        <Label>
          Name
        </Label>


        <Input

          value={name}

          onChange={(event) =>
            setName(
              event.target.value
            )
          }

          placeholder="Your name"

        />


      </div>





      <div className="space-y-2">


        <Label>
          Email
        </Label>


        <Input

          value={user.email}

          disabled

        />


        <p className="text-xs text-muted-foreground">
          Email cannot be changed from profile settings.
        </p>


      </div>





      <div className="space-y-2">


        <Label>
          Avatar ID
        </Label>


        <Input

          value={avatarId}

          onChange={(event) =>
            setAvatarId(
              event.target.value
            )
          }

          placeholder="Asset ID"

        />


        <p className="text-xs text-muted-foreground">
          Avatar upload integration will be added with the asset manager.
        </p>


      </div>





      {error && (

        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">

          {error}

        </div>

      )}





      {success && (

        <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600">

          {success}

        </div>

      )}






      <Button
        type="submit"
        disabled={loading}
      >

        {
          loading ? (

            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>

          ) : (

            <>
              <Save className="size-4" />
              Save Changes
            </>

          )
        }


      </Button>


    </form>

  );

}