import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EditSocialLinkForm } from "@/components/admin/social-links/edit-social-link-form";
import { socialLinkService } from "@/services/social-link.service";


interface EditSocialLinkPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditSocialLinkPage({
  params,
}: EditSocialLinkPageProps) {


  const { id } =
    await params;



  const socialLink =
    await socialLinkService.getById(id);



  if (!socialLink) {
    notFound();
  }





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
              Edit Social Link
            </h1>


          </div>




          <p className="mt-2 text-muted-foreground">
            Update social profile details.
          </p>


        </div>


      </section>





      <EditSocialLinkForm

        socialLink={{

          id:
            socialLink.id,

          platform:
            socialLink.platform,

          label:
            socialLink.label ?? "",

          url:
            socialLink.url,

          username:
            socialLink.username ?? "",

          visible:
            socialLink.visible,

          displayOrder:
            socialLink.displayOrder,

        }}

      />


    </div>
  );
}