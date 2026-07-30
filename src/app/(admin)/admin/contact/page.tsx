import { Mail } from "lucide-react";

import { contactMessageService } from "@/services/contact-message.service";
import { ContactMessageTable } from "@/components/admin/contact/contact-message-table";


export default async function ContactPage() {


  const messages =
    await contactMessageService.getAll();


    

  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Mail className="size-8 text-primary" />


        <div>


          <h1 className="text-3xl font-bold tracking-tight">
            Contact Messages
          </h1>


          <p className="text-muted-foreground">
            Manage messages received from your portfolio.
          </p>


        </div>


      </section>





      <ContactMessageTable

        messages={
          messages.map(
            (message) => ({

              id:
                message.id,

              name:
                message.name,

              email:
                message.email,

              subject:
                message.subject ?? "",

              message:
                message.message,

              isRead:
                message.isRead,

              isReplied:
                message.isReplied,

              createdAt:
                message.createdAt,

            })
          )
        }

      />


    </div>
  );
}