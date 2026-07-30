"use client";


import { useState } from "react";

import {
  Loader2,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




export function PasswordForm() {


  const [currentPassword, setCurrentPassword] =
    useState("");


  const [newPassword, setNewPassword] =
    useState("");



  const [confirmPassword, setConfirmPassword] =
    useState("");



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



    if (
      newPassword !== confirmPassword
    ) {

      setError(
        "New passwords do not match."
      );

      return;

    }



    setLoading(true);



    try {


      const response =
        await fetch(
          "/api/profile/password",
          {

            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },


            body: JSON.stringify({

              currentPassword,

              newPassword,

            }),

          }
        );




      const result =
        await response.json();





      if (!response.ok) {


        setError(
          result.message ??
          "Failed to change password."
        );


        return;

      }





      setSuccess(
        "Password changed successfully."
      );



      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");




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



      <div className="flex items-center gap-3">


        <Lock className="size-5 text-primary" />


        <h2 className="text-lg font-semibold">
          Change Password
        </h2>


      </div>






      <div className="space-y-2">


        <Label>
          Current Password
        </Label>


        <Input

          type="password"

          value={currentPassword}

          onChange={(event) =>
            setCurrentPassword(
              event.target.value
            )
          }

          placeholder="Current password"

        />


      </div>






      <div className="space-y-2">


        <Label>
          New Password
        </Label>


        <Input

          type="password"

          value={newPassword}

          onChange={(event) =>
            setNewPassword(
              event.target.value
            )
          }

          placeholder="New password"

        />


      </div>






      <div className="space-y-2">


        <Label>
          Confirm New Password
        </Label>


        <Input

          type="password"

          value={confirmPassword}

          onChange={(event) =>
            setConfirmPassword(
              event.target.value
            )
          }

          placeholder="Confirm new password"

        />


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


        {loading ? (

          <>

            <Loader2 className="size-4 animate-spin" />

            Updating...

          </>


        ) : (

          "Change Password"

        )}



      </Button>





    </form>

  );

}   