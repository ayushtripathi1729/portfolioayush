import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResearchActions } from "./research-actions";


interface ResearchTableProps {
  research: Array<{
    id: string;
    title: string;
    slug: string;
    publisher: string | null;
    journal: string | null;
    publishedAt: Date | null;
    featured: boolean;
    visible: boolean;
  }>;
}



function formatDate(date: Date | null) {

  if (!date) {
    return "Not published";
  }


  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));

}





export function ResearchTable({
  research,
}: ResearchTableProps) {


  if (research.length === 0) {

    return (
      <div className="rounded-xl border p-8 text-center">


        <h3 className="text-lg font-semibold">
          No research found
        </h3>


        <p className="mt-2 text-sm text-muted-foreground">
          Add your first research publication.
        </p>




        <Link href="/admin/research/new">

          <Button className="mt-5">

            <Plus className="size-4" />

            New Research

          </Button>

        </Link>


      </div>
    );
  }






  return (
    <div className="overflow-hidden rounded-xl border">


      <div className="overflow-x-auto">


        <table className="w-full">


          <thead className="border-b bg-muted/40">


            <tr className="text-left text-sm">


              <th className="px-5 py-3 font-medium">
                Title
              </th>


              <th className="px-5 py-3 font-medium">
                Publication
              </th>


              <th className="px-5 py-3 font-medium">
                Published
              </th>


              <th className="px-5 py-3 font-medium">
                Status
              </th>


              <th className="px-5 py-3 font-medium">
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


            {research.map((item) => (

              <tr
                key={item.id}
                className="border-b last:border-0"
              >


                <td className="px-5 py-4">


                  <div className="space-y-1">


                    <p className="font-medium">
                      {item.title}
                    </p>


                    <p className="text-xs text-muted-foreground">
                      /{item.slug}
                    </p>


                  </div>


                </td>





                <td className="px-5 py-4 text-sm">


                  <div>


                    {item.journal ? (

                      <p>
                        {item.journal}
                      </p>

                    ) : item.publisher ? (

                      <p>
                        {item.publisher}
                      </p>

                    ) : (

                      <p className="text-muted-foreground">
                        No publisher
                      </p>

                    )}


                  </div>


                </td>





                <td className="px-5 py-4 text-sm">

                  {formatDate(
                    item.publishedAt
                  )}

                </td>





                <td className="px-5 py-4 text-sm">


                  <div className="flex gap-2">


                    {item.visible ? (

                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                        Visible
                      </span>

                    ) : (

                      <span className="rounded-full bg-muted px-2 py-1 text-xs">
                        Hidden
                      </span>

                    )}



                    {item.featured && (

                      <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs">
                        Featured
                      </span>

                    )}


                  </div>


                </td>





                <td className="px-5 py-4">


                  <ResearchActions
                    id={item.id}
                  />


                </td>


              </tr>

            ))}


          </tbody>


        </table>


      </div>


    </div>
  );
}