import { VisitorCounter } from "@/components/public/visitor-counter";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col gap-2 px-6 py-8 text-center text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} shunyam.</span>
        <VisitorCounter />
      </div>
    </footer>
  );
}
