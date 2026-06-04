import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// ────────────────────────────────────────────────────────────────────────────
// experiences
// 경력(work), 학력(education), 활동(activity) 타임라인 데이터
// 스키마 상세: docs/db/erd.md
// ────────────────────────────────────────────────────────────────────────────
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),

  /** work | education | activity */
  type: text("type").notNull(),

  /** 직책명 / 학위명 */
  title: text("title").notNull(),

  /** 회사명 / 학교명 */
  org: text("org").notNull(),

  /** 상세 설명 */
  description: text("description"),

  /** 입사일 / 입학일 (필수) */
  startedAt: date("started_at").notNull(),

  /** 퇴사일 / 졸업일. null = 재직·재학 중 */
  endedAt: date("ended_at"),

  /** 표시 순서 — 오름차순 정렬 (낮을수록 먼저 표시) */
  sortOrder: integer("sort_order").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
