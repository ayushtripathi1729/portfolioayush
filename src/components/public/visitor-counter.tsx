"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    void fetch("/api/visits", {
      method: "POST",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) return;
        const result = (await response.json()) as {
          data?: { totalVisits?: number };
        };
        if (typeof result.data?.totalVisits === "number") {
          setVisits(result.data.totalVisits);
        }
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <span aria-live="polite">
      Visitors: {visits === null ? "—" : visits.toLocaleString("en-US")}
    </span>
  );
}
