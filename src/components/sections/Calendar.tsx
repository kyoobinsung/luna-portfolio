"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventModal } from "@/components/calendar/EventModal";
import { generateEventId, loadEvents, saveEvents } from "@/lib/calendar-storage";
import { DevLabel } from "@/components/ui/DevLabel";
import type { CalendarEvent, EventColor } from "@/types/calendar";

const WEEK_LABELS = ["일", "월", "화", "수", "목", "금", "토"];


const dotColor: Record<EventColor, string> = {
  peach: "bg-peach-strong",
  mint: "bg-mint-strong",
  sky: "bg-sky-strong",
  butter: "bg-butter-strong",
  lavender: "bg-lavender",
  rose: "bg-rose",
};

const pillColor: Record<EventColor, string> = {
  peach: "bg-peach text-foreground",
  mint: "bg-mint text-foreground",
  sky: "bg-sky text-foreground",
  butter: "bg-butter text-foreground",
  lavender: "bg-lavender text-foreground",
  rose: "bg-rose text-foreground",
};

export function Calendar() {
  const [hydrated, setHydrated] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [cursor, setCursor] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CalendarEvent | null>(null);
  const [modalInitialDate, setModalInitialDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time localStorage hydration on mount
    setEvents(loadEvents());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveEvents(events);
  }, [events, hydrated]);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, [events]);

  const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
  const selectedEvents = (eventsByDate.get(selectedDateKey) ?? []).slice().sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

  const openCreate = (date: Date) => {
    setEditing(null);
    setModalInitialDate(format(date, "yyyy-MM-dd"));
    setModalOpen(true);
  };

  const openEdit = (event: CalendarEvent) => {
    setEditing(event);
    setModalInitialDate(event.date);
    setModalOpen(true);
  };

  const handleSave = (event: CalendarEvent) => {
    setEvents((prev) => {
      if (event.id) {
        return prev.map((e) => (e.id === event.id ? event : e));
      }
      return [...prev, { ...event, id: generateEventId() }];
    });
    setSelectedDate(parseISO(event.date));
    setCursor(parseISO(event.date));
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setModalOpen(false);
  };

  return (
    <section id="calendar" className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <DevLabel name="Calendar" file="components/sections/Calendar.tsx" depth={1} />
      <SectionHeader
        eyebrow="Calendar"
        title="나의 일정 ✏️"
        description="브라우저에 저장되는 개인용 캘린더예요. 날짜를 클릭해서 일정을 추가/수정/삭제할 수 있어요."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-bold">
              {format(cursor, "yyyy년 M월")}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCursor((d) => subMonths(d, 1))}
                aria-label="이전 달"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted hover:bg-peach"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  setCursor(now);
                  setSelectedDate(now);
                }}
                className="rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold hover:bg-peach"
              >
                오늘
              </button>
              <button
                type="button"
                onClick={() => setCursor((d) => addMonths(d, 1))}
                aria-label="다음 달"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted hover:bg-peach"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted">
            {WEEK_LABELS.map((w, idx) => (
              <div key={w} className={idx === 0 ? "text-rose" : idx === 6 ? "text-sky-strong" : ""}>
                {w}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {calendarDays.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const dayEvents = eventsByDate.get(key) ?? [];
              const inMonth = isSameMonth(day, cursor);
              const selected = isSameDay(day, selectedDate);
              const today = isToday(day);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  onDoubleClick={() => openCreate(day)}
                  className={`group relative flex aspect-square flex-col items-center justify-start gap-1 rounded-xl p-1.5 text-sm transition sm:p-2 ${
                    selected
                      ? "bg-peach text-foreground shadow-sm"
                      : today
                      ? "bg-butter/60"
                      : "hover:bg-surface-muted"
                  } ${inMonth ? "" : "text-muted/60"}`}
                  aria-label={`${format(day, "yyyy-MM-dd")}${dayEvents.length ? ` · 일정 ${dayEvents.length}개` : ""}`}
                >
                  <span className={`text-xs font-semibold sm:text-sm ${today && !selected ? "text-peach-strong" : ""}`}>
                    {format(day, "d")}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="mt-auto flex flex-wrap items-center justify-center gap-0.5">
                      {dayEvents.slice(0, 3).map((ev) => (
                        <span
                          key={ev.id}
                          className={`h-1.5 w-1.5 rounded-full ${dotColor[ev.color]}`}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[10px] font-semibold text-muted">+{dayEvents.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-center text-xs text-muted">
            💡 날짜를 더블클릭하면 빠르게 일정을 추가할 수 있어요
          </p>
        </div>

        <aside className="rounded-3xl bg-surface-muted p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase text-muted">선택된 날짜</p>
              <p className="mt-1 font-display text-2xl">
                {format(selectedDate, "M월 d일")}
              </p>
              <p className="text-xs text-muted">{format(selectedDate, "EEEE")}</p>
            </div>
            <button
              type="button"
              onClick={() => openCreate(selectedDate)}
              className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:opacity-90"
            >
              <Plus size={14} />
              추가
            </button>
          </div>

          <ul className="mt-5 flex flex-col gap-2">
            {hydrated && selectedEvents.length === 0 && (
              <li className="rounded-2xl bg-surface px-4 py-6 text-center text-sm text-muted">
                아직 일정이 없어요. ✨
              </li>
            )}
            {selectedEvents.map((ev) => (
              <li key={ev.id}>
                <button
                  type="button"
                  onClick={() => openEdit(ev)}
                  className={`flex w-full flex-col gap-1 rounded-2xl px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 ${pillColor[ev.color]}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold">{ev.title}</span>
                    {ev.time && <span className="text-xs font-semibold opacity-80">{ev.time}</span>}
                  </div>
                  {ev.note && <span className="text-xs opacity-80">{ev.note}</span>}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <EventModal
        key={modalOpen ? `${editing?.id ?? "new"}-${modalInitialDate}` : "closed"}
        isOpen={modalOpen}
        initialDate={modalInitialDate}
        editing={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </section>
  );
}
