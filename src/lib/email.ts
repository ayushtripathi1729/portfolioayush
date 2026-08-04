import { resend } from "@/lib/resend";



interface ContactEmailProps {

  name: string;

  email: string;

  subject?: string | null;

  message: string;

}






export async function sendContactNotification({

  name,

  email,

  subject,

  message,

}: ContactEmailProps) {


  await resend.emails.send({

    from:
      "Portfolio <onboarding@resend.dev>",


    to:
      process.env.CONTACT_EMAIL!,


    subject:
      `New Portfolio Message from ${name}`,


    html: `

      <h2>
        New Contact Message
      </h2>


      <p>
        <strong>Name:</strong>
        ${name}
      </p>


      <p>
        <strong>Email:</strong>
        ${email}
      </p>


      <p>
        <strong>Subject:</strong>
        ${subject ?? "No subject"}
      </p>


      <p>
        <strong>Message:</strong>
      </p>


      <p>
        ${message}
      </p>

    `,

  });


}