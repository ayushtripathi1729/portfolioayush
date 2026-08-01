import type { ReactNode } from "react";

import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";


export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

    </div>
  );
}