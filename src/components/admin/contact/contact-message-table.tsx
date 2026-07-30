"use client";

import { useRouter } from "next/navigation";
import { Check, Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";


interface ContactMessageTableProps {
  messages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    isReplied: boolean;
    createdAt: Date;
  }>;
}



export function ContactMessageTable({
  messages,
}: ContactMessageTableProps) {


  const router = useRouter();



  async function updateMessage(
    id: string,
    data: object
  ) {

    await fetch(
      `/api/contact-messages/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(data),
      }
    );


    router.refresh();

  }





  async function deleteMessage(
    id: string
  ) {


    const confirmed =
      window.confirm(
        "Delete this message?"
      );


    if (!confirmed) {
      return;
    }



    await fetch(
      `/api/contact-messages/${id}`,
      {
        method: "DELETE",
      }
    );


    router.refresh();

  }





  return (
    <div className="rounded-xl border">


      <div className="overflow-x-auto">


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
                Subject
              </th>


              <th className="px-4 py-3 text-left">
                Status
              </th>


              <th className="px-4 py-3 text-left">
                Date
              </th>


              <th className="px-4 py-3 text-right">
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


            {messages.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No messages found.
                </td>

              </tr>

            )}




            {messages.map(
              (message) => (

                <tr
                  key={message.id}
                  className="border-b last:border-0"
                >


                  <td className="px-4 py-3 font-medium">

                    {message.name}

                  </td>



                  <td className="px-4 py-3">

                    {message.email}

                  </td>



                  <td className="px-4 py-3">

                    {message.subject || "-"}

                  </td>




                  <td className="px-4 py-3">

                    <div className="flex gap-2 text-xs">


                      {!message.isRead && (

                        <span className="rounded bg-primary/10 px-2 py-1">
                          New
                        </span>

                      )}



                      {message.isReplied && (

                        <span className="rounded bg-green-500/10 px-2 py-1">
                          Replied
                        </span>

                      )}


                    </div>


                  </td>





                  <td className="px-4 py-3">

                    {message.createdAt.toLocaleDateString()}

                  </td>





                  <td className="px-4 py-3">


                    <div className="flex justify-end gap-2">



                      {!message.isRead && (

                        <Button

                          variant="outline"

                          size="icon"

                          onClick={() =>
                            updateMessage(
                              message.id,
                              {
                                isRead: true,
                              }
                            )
                          }

                        >

                          <Eye className="size-4" />

                        </Button>

                      )}






                      {!message.isReplied && (

                        <Button

                          variant="outline"

                          size="icon"

                          onClick={() =>
                            updateMessage(
                              message.id,
                              {
                                isReplied: true,
                              }
                            )
                          }

                        >

                          <Check className="size-4" />

                        </Button>

                      )}






                      <Button

                        variant="destructive"

                        size="icon"

                        onClick={() =>
                          deleteMessage(
                            message.id
                          )
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