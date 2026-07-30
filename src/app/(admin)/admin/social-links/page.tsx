import Link from "next/link";
import { Plus, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SocialLinksTable } from "@/components/admin/social-links/social-links-table";
import { socialLinkService } from "@/services/social-link.service";


export default async function SocialLinksPage() {


  const socialLinks =
    await socialLinkService.getAll();



  return (
    <div className="space-y-8">


      <section className="flex items-center justify-between">


        <div className="flex items-center gap-4">


          <Share2 className="size-8 text-primary" />


          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              Social Links
            </h1>


            <p className="text-muted-foreground">
              Manage your social media profiles.
            </p>


          </div>


        </div>





        <Link href="/admin/social-links/new">

          <Button>

            <Plus className="mr-2 size-4" />

            Add Social Link

          </Button>

        </Link>


      </section>





      <SocialLinksTable

        socialLinks={
          socialLinks.map(
            (link) => ({

              id:
                link.id,

              platform:
                link.platform,

              label:
                link.label ?? "",

              url:
                link.url,

              username:
                link.username ?? "",

              visible:
                link.visible,

              displayOrder:
                link.displayOrder,

            })
          )
        }

      />


    </div>
  );
}