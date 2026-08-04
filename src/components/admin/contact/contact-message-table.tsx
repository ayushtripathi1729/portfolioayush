"use client";


import {
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  Check,
  Eye,
  Trash2,
  X,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";





interface ContactMessageTableProps {


  messages: Array<{

    id:string;

    name:string;

    email:string;

    subject:string;

    message:string;

    isRead:boolean;

    isReplied:boolean;

    createdAt:Date;

  }>;


}








export function ContactMessageTable({

  messages,

}:ContactMessageTableProps){



  const router =
    useRouter();




  const [
    selectedMessage,
    setSelectedMessage,
  ] =
  useState<
    ContactMessageTableProps["messages"][number] | null
  >(null);




  const [
    deleting,
    setDeleting,
  ] =
  useState<string | null>(null);








  async function updateMessage(

    id:string,

    data:object

  ){


    try{


      const response =
        await fetch(
          `/api/contact-messages/${id}`,
          {

            method:"PUT",

            headers:{
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(data),

          }
        );



      if(!response.ok){

        throw new Error(
          "Failed to update message"
        );

      }



      router.refresh();



    }catch(error){

      console.error(error);

      alert(
        "Unable to update message"
      );

    }

  }











  async function deleteMessage(

    id:string

  ){


    const confirmed =
      window.confirm(
        "Delete this message permanently?"
      );



    if(!confirmed){

      return;

    }




    try{


      setDeleting(id);




      const response =
        await fetch(
          `/api/contact-messages/${id}`,
          {
            method:"DELETE",
          }
        );





      const result =
        await response.json();






      if(!response.ok){


        throw new Error(
          result.message ??
          "Delete failed"
        );


      }





      setSelectedMessage(null);



      router.refresh();





    }catch(error){


      console.error(
        "Delete error:",
        error
      );


      alert(
        error instanceof Error
        ? error.message
        : "Unable to delete message"
      );



    }finally{


      setDeleting(null);


    }


  }









  function openMessage(

    message:
    ContactMessageTableProps["messages"][number]

  ){


    setSelectedMessage(message);



    if(!message.isRead){


      updateMessage(

        message.id,

        {
          isRead:true,
        }

      );


    }


  }









  return (

    <>


      <div
        className="
        rounded-xl
        border
        "
      >


        <div
          className="
          overflow-x-auto
          "
        >


          <table
            className="
            w-full
            text-sm
            "
          >



            <thead
              className="
              border-b
              bg-muted/50
              "
            >

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



              {
                messages.length===0 && (

                  <tr>

                    <td
                      colSpan={6}
                      className="
                      px-4
                      py-8
                      text-center
                      text-muted-foreground
                      "
                    >

                      No messages found.

                    </td>


                  </tr>

                )
              }





              {
                messages.map(

                  message => (

                    <tr

                      key={message.id}

                      className="
                      border-b
                      last:border-0
                      "

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


                          {
                            !message.isRead && (

                              <span
                                className="
                                rounded
                                bg-primary/10
                                px-2
                                py-1
                                "
                              >

                                New

                              </span>

                            )
                          }





                          {
                            message.isReplied && (

                              <span
                                className="
                                rounded
                                bg-green-500/10
                                px-2
                                py-1
                                "
                              >

                                Replied

                              </span>

                            )
                          }


                        </div>


                      </td>





                      <td className="px-4 py-3">

                        {
                          message.createdAt
                          .toLocaleDateString()
                        }

                      </td>






                      <td className="px-4 py-3">


                        <div className="flex justify-end gap-2">



                          <Button

                            variant="outline"

                            size="icon"

                            onClick={() =>
                              openMessage(message)
                            }

                          >

                            <Eye
                              className="size-4"
                            />

                          </Button>







                          {!message.isReplied && (

                            <Button

                              variant="outline"

                              size="icon"

                              onClick={() =>
                                updateMessage(
                                  message.id,
                                  {
                                    isReplied:true,
                                  }
                                )
                              }

                            >

                              <Check
                                className="size-4 text-green-600"
                              />

                            </Button>

                          )}








                          <Button

                            variant="destructive"

                            size="icon"

                            disabled={
                              deleting===message.id
                            }

                            onClick={() =>
                              deleteMessage(
                                message.id
                              )
                            }

                          >


                            <Trash2
                              className="size-4"
                            />


                          </Button>




                        </div>


                      </td>






                    </tr>

                  )

                )
              }



            </tbody>



          </table>



        </div>


      </div>









      <Dialog

        open={
          !!selectedMessage
        }

        onOpenChange={() =>
          setSelectedMessage(null)
        }

      >


        <DialogContent
          className="max-w-2xl"
        >


          <DialogHeader>

            <DialogTitle>
              Contact Message
            </DialogTitle>


          </DialogHeader>





          {
            selectedMessage && (

              <div className="space-y-6">


                <div>

                  <p className="text-sm text-muted-foreground">
                    Name
                  </p>

                  <p>
                    {selectedMessage.name}
                  </p>

                </div>



                <div>

                  <p className="text-sm text-muted-foreground">
                    Email
                  </p>

                  <p>
                    {selectedMessage.email}
                  </p>

                </div>



                <div>

                  <p className="text-sm text-muted-foreground">
                    Subject
                  </p>

                  <p>
                    {selectedMessage.subject || "-"}
                  </p>

                </div>




                <div>

                  <p className="text-sm text-muted-foreground">
                    Message
                  </p>


                  <p
                    className="
                    mt-2
                    whitespace-pre-line
                    rounded-lg
                    bg-muted
                    p-4
                    "
                  >

                    {selectedMessage.message}

                  </p>


                </div>




                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedMessage(null)
                  }
                >

                  <X className="mr-2 size-4"/>

                  Close

                </Button>



              </div>

            )
          }



        </DialogContent>


      </Dialog>



    </>

  );

}