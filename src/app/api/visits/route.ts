import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { visitorService } from "@/services/visitor.service";

const COOKIE_NAME =
  process.env.NODE_ENV === "production" ? "__Host-visitor-id" : "visitor-id";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json(
      { success: false, message: "Invalid origin." },
      { status: 403 }
    );
  }

  const rateLimit = checkRateLimit(getClientIp(request) ?? "unknown", {
    limit: 60,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  const existingVisitorId = request.cookies.get(COOKIE_NAME)?.value;
  const visitorId = existingVisitorId ?? randomUUID();

  try {
    const data = await visitorService.recordVisit(visitorId);
    const response = NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": "no-store" } }
    );

    if (!existingVisitorId) {
      response.cookies.set(COOKIE_NAME, visitorId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return response;
  } catch (error) {
    console.error("POST /api/visits error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to record visit." },
      { status: 500 }
    );
  }
}
