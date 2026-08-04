import { NextResponse } from "next/server";

import { UnauthorizedError, requireAuth } from "@/lib/auth-guard";
import { contactMessageService } from "@/services/contact-message.service";

// Public contact submission is handled exclusively by POST /api/contact.
// This endpoint is only for an authenticated administrator to manage messages.
export async function GET() {
  try {
    await requireAuth();

    const messages = await contactMessageService.getAll();

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }

    console.error("GET /api/contact-messages error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch contact messages." },
      { status: 500 }
    );
  }
}
