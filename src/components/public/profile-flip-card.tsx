"use client";

import { useState } from "react";
import Image from "next/image";

interface ProfileFlipCardProps {
  src: string;
  alt: string;
}

export function ProfileFlipCard({ src, alt }: ProfileFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const showBack = flipped || hovering;

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-label="Flip profile card"
      aria-pressed={flipped}
      className="relative h-64 w-64 rounded-full text-left outline-none perspective-[1000px] focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-4 motion-reduce:perspective-none sm:h-80 sm:w-80"
    >
      <span
        className={`relative block h-full w-full rounded-full transition-transform duration-700 ease-out transform-3d motion-reduce:transition-none ${showBack ? "rotate-y-180" : ""}`}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full border-[3px] border-background bg-background shadow-[0_24px_70px_rgba(124,58,237,0.24)] backface-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 640px) 320px, 256px"
            draggable={false}
            className="select-none object-cover"
          />
        </span>
        <span className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-violet-900 px-8 text-center text-white shadow-[0_24px_70px_rgba(124,58,237,0.28)] backface-hidden">
          <span className="text-2xl font-semibold tracking-tight">Research &amp; Engineering</span>
          <span className="mt-3 text-xs uppercase tracking-[0.25em] text-white/75">Explore the work</span>
        </span>
      </span>
    </button>
  );
}
