import type { PortfolioSetting } from "@/types/portfolio";

import { ProfileFlipCard } from "@/components/public/profile-flip-card";

interface HeroSectionProps {
  setting: PortfolioSetting | null;
}

const dots = Array.from({ length: 16 });

function DotGrid() {
  return (
    <div className="grid grid-cols-4 gap-3 opacity-45" aria-hidden="true">
      {dots.map((_, index) => (
        <span key={index} className="size-1 rounded-full bg-violet-500" />
      ))}
    </div>
  );
}

export function HeroSection({ setting }: HeroSectionProps) {
  if (!setting) return null;

  const [givenName, ...familyName] = setting.fullName.trim().split(/\s+/);

  return (
    <section className="relative isolate overflow-hidden border-b bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-background via-background to-violet-500/[0.07] dark:to-violet-500/[0.12]" />
      <div className="pointer-events-none absolute left-[-12rem] top-12 -z-10 size-96 rounded-full bg-violet-500/10 blur-3xl motion-reduce:hidden" />

      <div className="mx-auto grid max-w-[90rem] items-center gap-14 px-6 py-20 sm:px-8 md:py-28 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)] lg:px-16 lg:py-32">
        <div className="space-y-8 md:space-y-10">
          <div>
            <p className="mb-6 max-w-none text-[0.65rem] uppercase leading-6 tracking-[0.14em] text-violet-700 dark:text-violet-300 sm:whitespace-nowrap sm:tracking-[0.18em]">
              Theoretical Computer Science &middot; Pure Mathematics &middot; Security Analysis
            </p>
            <h1 className="text-balance font-serif text-5xl font-semibold leading-[0.94] tracking-tight sm:text-6xl md:text-7xl lg:whitespace-nowrap lg:text-7xl xl:text-[7rem]">
              {givenName}
              {familyName.length > 0 && (
                <span className="text-violet-700 dark:text-violet-300"> {familyName.join(" ")}</span>
              )}
            </h1>
            <p className="mt-6 text-sm tracking-wide text-muted-foreground">
              aka <span className="font-semibold tracking-[0.22em] text-violet-700 dark:text-violet-300">SHUNYAM</span>
            </p>
            <div className="mt-4 h-px w-32 bg-violet-500/70" />
          </div>

          <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            {setting.tagline ?? "Building systems and solving problems at the intersection of algorithms, mathematics and technology."}
          </p>
          <p className="max-w-2xl leading-8 text-muted-foreground">
            {setting.siteDescription ?? "Computer Science engineer focused on competitive programming, cybersecurity, artificial intelligence, and theoretical computer science."}
          </p>

          <div className="flex flex-wrap gap-3">
            <a href={setting.resume?.url ?? "/resume.pdf"} target="_blank" rel="noopener noreferrer" className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/85">
              Resume
            </a>
            <a href="https://github.com/ayushtripathi1729" target="_blank" rel="noopener noreferrer" className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted">
              GitHub
            </a>
            <a href="/contact" className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted">
              Contact
            </a>
          </div>

          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Computer Science Engineer &middot; Competitive Programmer &middot; Mathematical Computing
          </p>
        </div>

        {setting.profileImage && (
          <div className="relative mx-auto flex h-80 w-80 items-center justify-center sm:h-112 sm:w-112 lg:ml-auto lg:mr-0">
            <div className="pointer-events-none absolute inset-10 rounded-full bg-violet-500/20 blur-3xl motion-reduce:hidden" />
            <div className="pointer-events-none absolute inset-5 rounded-full border border-violet-500/25" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-violet-500/40 animate-[spin_48s_linear_infinite] motion-reduce:animate-none" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-[-1rem] rounded-full border-t border-violet-500/55 rotate-45" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 animate-[spin_36s_linear_infinite] motion-reduce:animate-none" aria-hidden="true">
              <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-violet-500 shadow-[0_0_18px_rgba(139,92,246,0.7)]" />
            </div>
            <div className="pointer-events-none absolute inset-3 animate-[spin_56s_linear_infinite_reverse] motion-reduce:animate-none" aria-hidden="true">
              <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_16px_rgba(167,139,250,0.65)]" />
            </div>
            <div className="absolute -right-4 -top-3 hidden sm:block"><DotGrid /></div>
            <div className="absolute -bottom-4 -left-4 hidden sm:block"><DotGrid /></div>
            <ProfileFlipCard src={setting.profileImage.url} alt={setting.fullName} />
          </div>
        )}
      </div>
    </section>
  );
}
