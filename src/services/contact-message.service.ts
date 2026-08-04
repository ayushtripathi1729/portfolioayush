import { Prisma } from "../../generated/prisma/client";

import { contactMessageRepository } from "@/repositories/contact-message.repository";
import { logActivity } from "@/lib/activity";
import { sendContactNotification } from "@/lib/email";



export class ContactMessageService {




  async getAll() {

    return contactMessageRepository.findAll();

  }







  async getUnread() {

    return contactMessageRepository.findUnread();

  }







  async getRead() {

    return contactMessageRepository.findRead();

  }







  async getById(
    id: string
  ) {

    return contactMessageRepository.findById(
      id
    );

  }







  async markAsRead(
    id: string
  ) {

    const message =
      await contactMessageRepository.markAsRead(
        id
      );

    await logActivity({

      action: "UPDATE",

      entity: "ContactMessage",

      entityId: message.id,

      description: `Marked contact message from "${message.name}" as read`,

    });

    return message;

  }







  async markAsReplied(
    id: string
  ) {


    const message =
      await contactMessageRepository.findById(
        id
      );



    const updated =
      await contactMessageRepository.markAsReplied(
        id
      );





    await logActivity({

      action:
        "UPDATE",

      entity:
        "ContactMessage",

      entityId:
        id,

      description:

        message

        ?

        `Replied to message from "${message.name}"`

        :

        "Marked contact message as replied",

    });





    return updated;


  }









  async create(
    data: Prisma.ContactMessageCreateInput
  ) {



    const message =
      await contactMessageRepository.create(
        data
      );






    await logActivity({

      action:
        "CREATE",

      entity:
        "ContactMessage",

      entityId:
        message.id,

      description:
        `Received contact message from "${message.name}"`,

    });









    // Send email notification

    try {


      await sendContactNotification({

        name:
          message.name,


        email:
          message.email,


        subject:
          message.subject,


        message:
          message.message,

      });


    } catch(error) {


      console.error(
        "Failed to send contact notification email:",
        error
      );


    }








    return message;


  }









  async update(
    id: string,
    data: Prisma.ContactMessageUpdateInput
  ) {


    const message =
      await contactMessageRepository.update(
        id,
        data
      );


    await logActivity({

      action: "UPDATE",

      entity: "ContactMessage",

      entityId: message.id,

      description: `Updated contact message from "${message.name}"`,

    });



    return message;


  }









  async delete(
    id: string
  ) {


    const message =
      await contactMessageRepository.findById(
        id
      );



    const deleted =
      await contactMessageRepository.delete(
        id
      );







    await logActivity({

      action:
        "DELETE",

      entity:
        "ContactMessage",

      entityId:
        id,

      description:

        message

        ?

        `Deleted message from "${message.name}"`

        :

        "Deleted contact message",

    });





    return deleted;


  }









  async count() {

    return contactMessageRepository.count();

  }







  async countUnread() {

    return contactMessageRepository.countUnread();

  }



}








export const contactMessageService =
  new ContactMessageService();
