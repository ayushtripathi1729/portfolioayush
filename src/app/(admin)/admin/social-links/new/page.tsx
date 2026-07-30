import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SocialLinkForm } from "@/components/admin/social-links/social-link-form";


export default function NewSocialLinkPage() {


  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/social-links">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>


          <div className="flex items-center gap-3">


            <Share2 className="size-7 text-primary" />


            <h1 className="text-3xl font-bold tracking-tight">
              Add Social Link
            </h1>


          </div>




          <p className="mt-2 text-muted-foreground">
            Add a new social profile.
          </p>


        </div>


      </section>





      <SocialLinkForm />


    </div>
  );
}