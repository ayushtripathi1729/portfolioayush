"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";


interface User {
  id: string;
  name: string;
  email: string;
  avatarId: string | null;
  createdAt: Date;
  updatedAt: Date;
}


interface UsersTableProps {
  users: User[];
  currentUserId: string;
}



export function UsersTable({
  users,
  currentUserId,
}: UsersTableProps) {


  const router = useRouter();

  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");




  async function deleteUser(
    id: string
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user?"
      );


    if (!confirmed) {
      return;
    }



    try {
      setError("");
      setDeleting(id);

      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message ?? "Failed to delete user.");
      }

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete user."
      );
    } finally {
      setDeleting(null);
    }

  }





  return (

    <div className="rounded-xl border">


      <div className="overflow-x-auto">

        {error && (
          <p className="px-4 pt-4 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}


        <table className="w-full text-sm">


          <thead className="border-b bg-muted/50">

            <tr>


              <th className="px-4 py-3 text-left">
                Name
              </th>


              <th className="px-4 py-3 text-left">
                Email
              </th>


              <th className="px-4 py-3 text-left">
                Joined
              </th>


              <th className="px-4 py-3 text-left">
                Updated
              </th>


              <th className="px-4 py-3 text-right">
                Actions
              </th>


            </tr>

          </thead>





          <tbody>


            {users.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No users found.
                </td>

              </tr>

            )}






            {users.map(
              (user) => (

                <tr
                  key={user.id}
                  className="border-b last:border-0"
                >


                  <td className="px-4 py-3 font-medium">
                    {user.name}
                  </td>


                  <td className="px-4 py-3">
                    {user.email}
                  </td>


                  <td className="px-4 py-3">

                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}

                  </td>


                  <td className="px-4 py-3">

                    {new Date(
                      user.updatedAt
                    ).toLocaleDateString()}

                  </td>



                  <td className="px-4 py-3">

                    <div className="flex justify-end">


                      <Button
                        variant="destructive"
                        size="icon"
                        aria-label={`Delete ${user.name}`}
                        title={
                          user.id === currentUserId
                            ? "You cannot delete your own account"
                            : "Delete user"
                        }
                        disabled={
                          user.id === currentUserId ||
                          deleting === user.id
                        }
                        onClick={() =>
                          deleteUser(user.id)
                        }
                      >

                        <Trash2 className="size-4" />

                      </Button>


                    </div>

                  </td>


                </tr>

              )
            )}


          </tbody>


        </table>


      </div>


    </div>

  );
}
