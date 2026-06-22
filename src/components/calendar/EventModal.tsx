"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import type { CalendarEvent, EventColor } from "@/types/calendar";
import { DevLabel } from "@/components/ui/DevLabel";

const COLORS: { value: EventColor; bg: string; label: string }[] = [
  { value: "peach", bg: "bg-peach", label: "복숭아" },
  { value: "mint", bg: "bg-mint", label: "민트" },
  { value: "sky", bg: "bg-sky", label: "하늘" },
  { value: "butter", bg: "bg-butter", label: "버터" },
  { value: "lavender", bg: "bg-lavender", label: "라벤더" },
  { value: "rose", bg: "bg-rose", label: "로즈" },
];

type Props = {
  isOpen: boolean;
  initialDate: string;
  editing?: CalendarEvent | null;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: (id: string) => void;
};

export function EventModal({ isOpen, initialDate, editing, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(editing?.title ?? "");
  const [date, setDate] = useState(editing?.date ?? initialDate);
  const [time, setTime] = useState(editing?.time ?? "");
  const [note, setNote] = useState(editing?.note ?? "");
  const [color, setColor] = useState<EventColor>(editing?.color ?? "peach");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      id: editing?.id ?? "",
      title: title.trim(),
      date,
      time: time || undefined,
      note: note.trim() || undefined,
      color,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={editing ? "일정 수정" : "일정 추가"}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-surface p-6 shadow-2xl"
      >
        <DevLabel name="EventModal" file="components/calendar/EventModal.tsx" depth={2} />
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{editing ? "일정 수정 ✏️" : "새 일정 추가 ✨"}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-full p-1 hover:bg-surface-muted"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold">제목</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
              placeholder="예: 회의, 산책, 집중 시간"
              className="rounded-xl border border-border-soft bg-background px-3 py-2 text-sm focus:border-peach-strong focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold">날짜</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="rounded-xl border border-border-soft bg-background px-3 py-2 text-sm focus:border-peach-strong focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold">시간 <span className="text-xs text-muted">(선택)</span></span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-xl border border-border-soft bg-background px-3 py-2 text-sm focus:border-peach-strong focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold">메모 <span className="text-xs text-muted">(선택)</span></span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="자세한 내용을 적어보세요"
              className="resize-none rounded-xl border border-border-soft bg-background px-3 py-2 text-sm focus:border-peach-strong focus:outline-none"
            />
          </label>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold">색상</legend>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`h-8 w-8 rounded-full ${c.bg} transition ${
                    color === c.value ? "ring-2 ring-foreground ring-offset-2 ring-offset-surface" : "hover:scale-110"
                  }`}
                  aria-label={c.label}
                  aria-pressed={color === c.value}
                />
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {editing && onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(editing.id)}
              className="inline-flex items-center gap-1 rounded-full bg-rose/40 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-rose"
            >
              <Trash2 size={14} />
              삭제
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-surface-muted px-4 py-2 text-sm font-semibold transition hover:bg-border-soft"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:opacity-90"
            >
              {editing ? "수정" : "추가"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
