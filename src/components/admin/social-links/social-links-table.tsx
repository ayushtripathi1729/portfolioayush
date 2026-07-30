"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";



interface SocialLink {
  id: string;
  platform: string;
  label: string | null;
  url: string;
  username: string | null;
  displayOrder: number;
  visible: boolean;
}



interface SocialLinksTableProps {
  socialLinks: SocialLink[];
}



export function SocialLinksTable({
  socialLinks,
}: SocialLinksTableProps) {


  const router = useRouter();



  async function deleteSocialLink(
    id: string
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this social link?"
      );


    if (!confirmed) return;


    await fetch(
      `/api/social-links/${id}`,
      {
        method: "DELETE",
      }
    );


    router.refresh();

  }





  if (socialLinks.length === 0) {
    return (
      <div className="rounded-xl border p-8 text-center text-muted-foreground">
        No social links found.
      </div>
    );
  }




  return (
    <div className="rounded-xl border">


      <div className="overflow-x-auto">


        <table className="w-full text-sm">


          <thead className="border-b bg-muted/50">

            <tr>

              <th className="px-4 py-3 text-left">
                Platform
              </th>


              <th className="px-4 py-3 text-left">
                Label
              </th>


              <th className="px-4 py-3 text-left">
                URL
              </th>


              <th className="px-4 py-3 text-left">
                Order
              </th>


              <th className="px-4 py-3 text-left">
                Status
              </th>


              <th className="px-4 py-3 text-right">
                Actions
              </th>

            </tr>

          </thead>





          <tbody>


            {socialLinks.map(
              (link) => (

                <tr
                  key={link.id}
                  className="border-b last:border-0"
                >


                  <td className="px-4 py-3 font-medium">
                    {link.platform}
                  </td>


                  <td className="px-4 py-3">
                    {link.label ?? "-"}
                  </td>


                  <td className="px-4 py-3 max-w-xs truncate">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {link.url}
                    </a>
                  </td>


                  <td className="px-4 py-3">
                    {link.displayOrder}
                  </td>


                  <td className="px-4 py-3">

                    {link.visible ? (
                      <span className="text-green-600">
                        Visible
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Hidden
                      </span>
                    )}

                  </td>




                  <td className="px-4 py-3">

                    <div className="flex justify-end gap-2">


                      <Link
                        href={`/admin/social-links/${link.id}/edit`}
                      >

                        <Button
                          variant="outline"
                          size="icon"
                        >

                          <Pencil className="size-4" />

                        </Button>

                      </Link>




                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          deleteSocialLink(link.id)
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