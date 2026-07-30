import { Users } from "lucide-react";

import { userService } from "@/services/user.service";
import { UsersTable } from "@/components/admin/users/users-table";


export default async function UsersPage() {


  const users =
    await userService.getAll();



  return (

    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Users className="size-8 text-primary" />


        <div>


          <h1 className="text-3xl font-bold tracking-tight">
            Users
          </h1>


          <p className="text-muted-foreground">
            Manage registered users.
          </p>


        </div>


      </section>





      <UsersTable

        users={
          users.map(
            (user) => ({

              id:
                user.id,

              name:
                user.name,

              email:
                user.email,

              avatarId:
                user.avatarId,

              createdAt:
                user.createdAt,

              updatedAt:
                user.updatedAt,

            })
          )
        }

      />


    </div>

  );
}