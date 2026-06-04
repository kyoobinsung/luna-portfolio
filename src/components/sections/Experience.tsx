import { SectionHeader } from "@/components/ui/SectionHeader";
import { db } from "@/db";
import { experiences } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Briefcase, GraduationCap, Star, Plus } from "lucide-react";
import Link from "next/link";

type ExperienceType = "work" | "education" | "activity";

const typeMeta: Record<ExperienceType, { icon: typeof Briefcase; bg: string }> = {
  work: { icon: Briefcase, bg: "bg-mint" },
  education: { icon: GraduationCap, bg: "bg-sky" },
  activity: { icon: Star, bg: "bg-butter" },
};

/** "2024-01-01" → "2024년" */
function formatYear(dateStr: string): string {
  return `${dateStr.slice(0, 4)}년`;
}

/** started_at, ended_at → "2022년 – 2024년" or "2024년 – 현재" */
function formatPeriod(startedAt: string, endedAt: string | null): string {
  const start = formatYear(startedAt);
  const end = endedAt ? formatYear(endedAt) : "현재";
  return `${start} – ${end}`;
}

export async function Experience() {
  const items = await db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.sortOrder));

  return (
    <section id="experience" className="bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        {/* 헤더 + 추가 버튼 */}
        <div className="flex items-start justify-between gap-4">
          <SectionHeader
            eyebrow="Experience"
            title="걸어온 길"
            description="일과 배움을 모두 즐기며 한 걸음씩 성장하고 있어요."
          />
          <Link
            href="/admin/experiences/new"
            className="mt-1 flex shrink-0 items-center gap-1.5 rounded-xl border border-peach-strong bg-peach px-3.5 py-2 text-sm font-semibold text-foreground transition-all hover:bg-peach-strong"
          >
            <Plus size={15} />
            경력 추가
          </Link>
        </div>

        {/* 타임라인 */}
        <ol className="relative mt-12 border-l-2 border-dashed border-peach pl-8">
          {items.map((item) => {
            const type = item.type as ExperienceType;
            const meta = typeMeta[type] ?? typeMeta.work;
            const Icon = meta.icon;
            return (
              <li key={item.id} className="relative mb-10 last:mb-0">
                <span
                  className={`absolute -left-[2.6rem] flex h-10 w-10 items-center justify-center rounded-full ${meta.bg} shadow-sm`}
                  aria-hidden
                >
                  <Icon size={18} />
                </span>
                <div className="rounded-2xl bg-surface p-5 shadow-sm">
                  <p className="text-xs font-semibold text-muted">
                    {formatPeriod(item.startedAt, item.endedAt)}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm font-medium text-foreground/80">{item.org}</p>
                  {item.description && (
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
