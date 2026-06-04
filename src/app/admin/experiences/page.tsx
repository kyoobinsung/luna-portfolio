import Link from "next/link";
import { db } from "@/db";
import { experiences } from "@/db/schema";
import { asc } from "drizzle-orm";
import { Briefcase, GraduationCap, Star, Plus, Pencil } from "lucide-react";
import { DeleteButton } from "./DeleteButton";

type ExperienceType = "work" | "education" | "activity";

const typeMeta: Record<ExperienceType, { icon: typeof Briefcase; label: string; bg: string }> = {
  work: { icon: Briefcase, label: "경력", bg: "bg-mint text-mint-strong" },
  education: { icon: GraduationCap, label: "학력", bg: "bg-sky text-sky-strong" },
  activity: { icon: Star, label: "활동", bg: "bg-butter text-butter-strong" },
};

function formatPeriod(startedAt: string, endedAt: string | null) {
  const start = startedAt.slice(0, 7).replace("-", ".");
  const end = endedAt ? endedAt.slice(0, 7).replace("-", ".") : "현재";
  return `${start} – ${end}`;
}

export default async function AdminExperiencesPage() {
  const items = await db.select().from(experiences).orderBy(asc(experiences.sortOrder));

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">경력 / 학력 관리</h1>
          <p className="mt-1 text-sm text-muted">총 {items.length}건</p>
        </div>
        <Link
          href="/admin/experiences/new"
          className="flex items-center gap-2 rounded-xl bg-peach-strong px-4 py-2.5 text-sm font-bold text-foreground shadow-sm transition-all hover:brightness-95"
        >
          <Plus size={16} />
          새 항목 추가
        </Link>
      </div>

      {/* 목록 */}
      {items.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border-soft bg-surface py-20 text-center">
          <p className="text-muted">등록된 항목이 없습니다.</p>
          <Link
            href="/admin/experiences/new"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-peach-strong underline-offset-2 hover:underline"
          >
            <Plus size={14} /> 첫 항목 추가하기
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => {
            const type = item.type as ExperienceType;
            const meta = typeMeta[type] ?? typeMeta.work;
            const Icon = meta.icon;
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border-soft"
              >
                {/* 아이콘 */}
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${meta.bg.split(" ")[0]} shadow-sm`}
                >
                  <Icon size={18} />
                </span>

                {/* 내용 */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${meta.bg}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs text-muted">{formatPeriod(item.startedAt, item.endedAt)}</span>
                    <span className="text-xs text-muted">· 순서 {item.sortOrder}</span>
                  </div>
                  <p className="mt-0.5 truncate font-semibold">{item.title}</p>
                  <p className="text-sm text-muted">{item.org}</p>
                </div>

                {/* 액션 버튼 */}
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/experiences/${item.id}/edit`}
                    className="flex items-center gap-1.5 rounded-lg border border-sky bg-sky/30 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:bg-sky"
                  >
                    <Pencil size={13} />
                    수정
                  </Link>
                  <DeleteButton id={item.id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
