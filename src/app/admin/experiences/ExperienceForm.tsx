"use client";

import { useActionState } from "react";
import type { Experience } from "@/db/schema";
import { DevLabel } from "@/components/ui/DevLabel";

type ActionState = { error: string } | null;
type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

type Props = {
  action: Action;
  defaultValues?: Partial<Experience>;
  submitLabel: string;
};

const TYPE_OPTIONS = [
  { value: "work", label: "💼 경력 (work)" },
  { value: "education", label: "🎓 학력 (education)" },
  { value: "activity", label: "⭐ 활동 (activity)" },
] as const;

export function ExperienceForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="relative space-y-5">
      <DevLabel name="ExperienceForm" file="app/admin/experiences/ExperienceForm.tsx" depth={2} />
      {/* hidden id (수정 시) */}
      {defaultValues?.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      {/* 에러 메시지 */}
      {state && typeof state === "object" && "error" in state && (
        <div className="rounded-xl border border-rose bg-rose/20 px-4 py-3 text-sm text-foreground/80">
          {state.error}
        </div>
      )}

      {/* 구분 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" htmlFor="type">
          구분 <span className="text-peach-strong">*</span>
        </label>
        <select
          id="type"
          name="type"
          defaultValue={defaultValues?.type ?? "work"}
          required
          className="rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-peach-strong"
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 직책/학위명 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" htmlFor="title">
          직책명 / 학위명 <span className="text-peach-strong">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={defaultValues?.title ?? ""}
          required
          placeholder="예) 프론트엔드 개발자"
          className="rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-peach-strong"
        />
      </div>

      {/* 회사/학교명 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" htmlFor="org">
          회사명 / 학교명 <span className="text-peach-strong">*</span>
        </label>
        <input
          id="org"
          name="org"
          type="text"
          defaultValue={defaultValues?.org ?? ""}
          required
          placeholder="예) 루나 주식회사"
          className="rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-peach-strong"
        />
      </div>

      {/* 기간 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" htmlFor="startedAt">
            입사일 / 입학일 <span className="text-peach-strong">*</span>
          </label>
          <input
            id="startedAt"
            name="startedAt"
            type="date"
            defaultValue={defaultValues?.startedAt ?? ""}
            required
            className="rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-peach-strong"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold" htmlFor="endedAt">
            퇴사일 / 졸업일{" "}
            <span className="text-xs font-normal text-muted">(비워두면 '현재')</span>
          </label>
          <input
            id="endedAt"
            name="endedAt"
            type="date"
            defaultValue={defaultValues?.endedAt ?? ""}
            className="rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-peach-strong"
          />
        </div>
      </div>

      {/* 설명 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" htmlFor="description">
          상세 설명
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={defaultValues?.description ?? ""}
          placeholder="담당 업무, 주요 성과 등을 입력하세요."
          className="resize-none rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-peach-strong"
        />
      </div>

      {/* 표시 순서 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold" htmlFor="sortOrder">
          표시 순서{" "}
          <span className="text-xs font-normal text-muted">(낮을수록 먼저 표시)</span>
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={defaultValues?.sortOrder ?? 0}
          className="rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-peach-strong"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-peach-strong px-4 py-3 text-sm font-bold text-foreground transition-all hover:brightness-95 disabled:opacity-60"
      >
        {isPending ? "저장 중…" : submitLabel}
      </button>
    </form>
  );
}
