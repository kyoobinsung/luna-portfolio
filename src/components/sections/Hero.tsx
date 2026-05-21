import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-peach/40 via-butter/30 to-background"
    >
      <div className="bg-grid-soft absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:py-32">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-xs font-semibold shadow-sm">
          <Sparkles size={14} className="text-peach-strong" />
          {profile.role}
        </span>
        <h1 className="font-display text-5xl leading-tight sm:text-7xl">
          안녕하세요, <span className="text-peach-strong">{profile.name}</span>입니다 👋
        </h1>
        <p className="max-w-2xl text-lg text-muted sm:text-xl">
          {profile.tagline}
        </p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="#projects"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:opacity-90"
          >
            프로젝트 구경하기
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-surface px-6 text-sm font-semibold shadow-sm transition hover:bg-peach"
          >
            연락하기
          </Link>
        </div>
      </div>
    </section>
  );
}
