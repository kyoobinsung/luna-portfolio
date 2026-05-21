export type EventColor = "peach" | "mint" | "sky" | "butter" | "lavender" | "rose";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  note?: string;
  color: EventColor;
};
