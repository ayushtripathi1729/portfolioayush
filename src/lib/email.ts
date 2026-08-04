import { resend } from "@/lib/resend";

interface ContactEmailProps {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMultilineHtml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function sanitizeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!contactEmail) {
    throw new Error("CONTACT_EMAIL is not configured.");
  }

  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: contactEmail,
    subject: `New Portfolio Message from ${sanitizeHeader(name)}`,
    html: `
      <h2>New Contact Message</h2>

      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || "No subject")}</p>

      <p><strong>Message:</strong></p>
      <p>${renderMultilineHtml(message)}</p>
    `,
  });
}
