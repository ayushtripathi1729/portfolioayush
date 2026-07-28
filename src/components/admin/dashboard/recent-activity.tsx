import { Clock3 } from "lucide-react";

export function RecentActivity() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Clock3 className="size-5 text-muted-foreground" />

        <h2 className="text-lg font-semibold tracking-tight">
          Recent Activity
        </h2>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center py-10 text-center">
        <Clock3 className="mb-4 size-10 text-muted-foreground/60" />

        <h3 className="text-base font-medium">
          No activity yet
        </h3>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Your recent changes across projects, research,
          blog posts, experience and other content will
          appear here.
        </p>
      </div>
    </div>
  );
}