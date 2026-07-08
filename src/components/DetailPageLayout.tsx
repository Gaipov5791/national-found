import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import fundLogo from "@/assets/fund-logo.png.asset.json";

type DetailPageLayoutProps = {
  title: string;
  children: ReactNode;
};

export function DetailPageLayout({ title, children }: DetailPageLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#dbe6f1] via-[#e9eef5] to-[#f3f1e8] px-4 py-10 font-display text-[color:var(--ink)] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between gap-4 border-b border-[color:var(--ink)]/10 pb-6">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={fundLogo.url} alt="НИФ КР" className="h-9 w-auto sm:h-10" />
          </Link>
          <Link
            to="/"
            className="text-[10px] font-semibold tracking-[0.14em] text-[color:var(--ink)]/60 transition hover:text-[color:var(--gold)] sm:text-xs sm:tracking-[0.12em]"
          >
            ← На главную
          </Link>
        </header>
        <h1 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">{title}</h1>
        <div className="mt-5 space-y-4 text-sm leading-relaxed sm:mt-6 md:text-base">{children}</div>
      </div>
    </main>
  );
}

type DetailInfoBlockProps = {
  title: string;
  children: ReactNode;
};

export function DetailInfoBlock({ title, children }: DetailInfoBlockProps) {
  return (
    <section className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/60 p-5 shadow-sm sm:p-6">
      <h2 className="font-display text-base font-bold tracking-tight sm:text-lg">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-[color:var(--ink)]/80 sm:text-[15px]">{children}</div>
    </section>
  );
}
