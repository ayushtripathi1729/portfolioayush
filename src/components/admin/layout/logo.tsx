import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/admin"
      className="inline-flex items-center gap-2 select-none"
    >
      <span className="text-lg font-semibold tracking-tight">
        Ayush Tripathi
      </span>
    </Link>
  );
}