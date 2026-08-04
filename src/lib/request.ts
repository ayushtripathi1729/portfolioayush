import type { NextRequest } from "next/server";

export function getClientIp(request: NextRequest) {
  const forwardedFor =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  return (
    forwardedFor ||
    request.headers.get("x-real-ip") ||
    null
  );
}

export function getUserAgent(request: NextRequest) {
  return request.headers.get("user-agent") ?? null;
}
