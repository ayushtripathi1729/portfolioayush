import { User } from "lucide-react";

import { requireAuth } from "@/lib/auth-guard";
import { userService } from "@/services/user.service";

import { ProfileForm } from "@/components/admin/profile/profile-form";
import { PasswordForm } from "@/components/admin/profile/password-form";



export default async function ProfilePage() {


  const session =
    await requireAuth();




  const user =
    await userService.getById(
      session.user.id
    );




  if (!user) {

    return (

      <div className="rounded-xl border p-6">

        <p className="text-muted-foreground">
          User profile not found.
        </p>

      </div>

    );

  }






  return (

    <div className="space-y-8">





      <section className="flex items-center gap-4">


        <User className="size-8 text-primary" />



        <div>


          <h1 className="text-3xl font-bold tracking-tight">
            Profile
          </h1>


          <p className="text-muted-foreground">
            Manage your administrator account.
          </p>


        </div>


      </section>







      <ProfileForm

        user={{

          id:
            user.id,


          name:
            user.name,


          email:
            user.email,


          avatarId:
            user.avatarId,


        }}

      />







      <PasswordForm />





    </div>

  );

}