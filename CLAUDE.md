# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Project Overview

`luna-portfolio` is a personal portfolio website for a frontend developer (Luna / 루나). It is a single-page site composed of seven anchor-linked sections, plus a personal calendar widget backed by browser `localStorage`.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens are declared in CSS via `@theme inline` in [src/app/globals.css](src/app/globals.css) (no `tailwind.config.ts`)
- **date-fns** — calendar date math
- **lucide-react** — most icons (note: brand icons like GitHub/LinkedIn are **not** exported by lucide; see [src/components/ui/BrandIcons.tsx](src/components/ui/BrandIcons.tsx))

## Commands

```bash
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build
npm run lint       # ESLint (uses eslint-config-next, includes new React 19 rules)
npx tsc --noEmit   # type check only
```

## Directory Layout

```
src/
├── app/
│   ├── layout.tsx         # root layout: fonts (Gowun Dodum + Gaegu), Nav, Footer
│   ├── page.tsx           # composes all seven sections in order
│   └── globals.css        # Tailwind import + design tokens
├── components/
│   ├── Nav.tsx            # sticky top nav, mobile menu
│   ├── Footer.tsx
│   ├── sections/          # one component per page section
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Calendar.tsx   # ⚠ "use client" — uses localStorage
│   │   └── Contact.tsx
│   ├── calendar/
│   │   └── EventModal.tsx # ⚠ "use client" — add/edit/delete event form
│   └── ui/
│       ├── SectionHeader.tsx
│       ├── Badge.tsx
│       └── BrandIcons.tsx # inline SVG for GitHub / LinkedIn
├── data/                  # static content — edit these to update the site
│   ├── profile.ts         # name, role, tagline, social links
│   ├── skills.ts          # skill groups
│   ├── projects.ts        # project cards
│   ├── experience.ts      # career timeline
│   └── nav.ts             # top-nav items
├── lib/
│   └── calendar-storage.ts # load/save events to localStorage
└── types/
    └── calendar.ts         # CalendarEvent, EventColor types
```

## Design System

Pastel palette defined as CSS variables in [src/app/globals.css](src/app/globals.css) and mapped to Tailwind utilities via `@theme inline`:

| Token             | Tailwind class                  | Use                          |
|-------------------|---------------------------------|------------------------------|
| `--peach`         | `bg-peach`, `text-peach-strong` | primary accent, CTA hover    |
| `--mint`          | `bg-mint`                       | secondary accent             |
| `--sky`           | `bg-sky`                        | tertiary accent              |
| `--butter`        | `bg-butter`                     | warm highlight (today, etc.) |
| `--lavender`      | `bg-lavender`                   | softer accent                |
| `--rose`          | `bg-rose`                       | delete actions, Sunday text  |
| `--surface`       | `bg-surface`                    | cards on tinted background   |
| `--surface-muted` | `bg-surface-muted`              | alternating section bg       |
| `--text-muted`    | `text-muted`                    | secondary copy               |
| `--border`        | `border-border-soft`            | hairlines                    |

Fonts: `--font-sans` (Gowun Dodum, Korean-friendly) and `--font-display` (Gaegu, handwriting). Apply via `font-display` for playful headings.

## Section Conventions

- All sections use `id="..."` matching entries in [src/data/nav.ts](src/data/nav.ts) for anchor-link navigation.
- Alternating background: tinted sections use `bg-surface-muted`; default sections sit on body background.
- `SectionHeader` provides the standard eyebrow / title / description block.
- Sections that need React hooks (`Calendar`) are marked `"use client"`. All other sections are server components.

## Calendar Section

- **Storage**: `localStorage` key `luna-calendar-events`, JSON array of `CalendarEvent`. Read/write through [src/lib/calendar-storage.ts](src/lib/calendar-storage.ts).
- **Hydration**: Events are loaded on mount inside a `useEffect` (with `eslint-disable react-hooks/set-state-in-effect` since this is a legitimate one-time client-side hydration). A `hydrated` flag prevents flashing the empty state during SSR.
- **Modal lifecycle**: `EventModal` initializes its fields from props once. The parent (`Calendar.tsx`) passes a unique `key` (based on `editing?.id` and `modalInitialDate`) so the modal remounts whenever it opens — there is no `useEffect`-based reset. Do **not** re-introduce one; it will trip the React 19 lint rule.

## Updating Content

To change site content, edit the files in [src/data/](src/data/). No code changes should be needed for typical edits (name, projects list, skills, etc.).

## Gotchas

- **lucide-react has no brand icons**: import `GithubIcon`/`LinkedinIcon` from [src/components/ui/BrandIcons.tsx](src/components/ui/BrandIcons.tsx) instead.
- **Tailwind v4 has no `tailwind.config.ts`**: extend the design system by adding CSS variables under `:root` and exposing them in the `@theme inline` block in [src/app/globals.css](src/app/globals.css).
- **React 19 `set-state-in-effect` rule**: prefer initializing state from props or remounting via `key` over `useEffect`-based prop syncing.
- **Calendar is client-only**: importing `Calendar` from a server component is fine, but anything reading `localStorage` must stay inside that boundary.

@AGENTS.md

## Database Guidelines

DB 관련 작업을 할 때는 반드시 아래 파일들을 먼저 확인하세요.

### 참고 파일

| 파일 | 설명 |
|---|---|
| [`docs/db/erd.md`](docs/db/erd.md) | 전체 DB 스키마 ERD (Mermaid) 및 컬럼 상세 |
| [`src/db/schema.ts`](src/db/schema.ts) | Drizzle ORM 스키마 정의 (Single source of truth) |
| [`src/db/index.ts`](src/db/index.ts) | Drizzle DB 클라이언트 싱글턴 |
| [`drizzle.config.ts`](drizzle.config.ts) | Drizzle Kit 설정 (마이그레이션 경로 등) |

### DB 작업 규칙

1. **스키마 변경은 항상 `src/db/schema.ts`에서 먼저** 수행 후 `npm run db:push` (개발) 또는 `npm run db:generate && npm run db:migrate` (프로덕션) 실행
2. **`docs/db/erd.md` 동기화**: 스키마를 변경하면 ERD 문서도 함께 업데이트
3. **DB 클라이언트 사용**: 서버 컴포넌트·Route Handler에서는 `import { db } from "@/db"` 사용
4. **Transaction Pooler 모드**: `prepare: false` 설정이 되어 있으므로 별도 설정 불필요
5. **환경변수**: `DATABASE_URL`은 서버 사이드 전용 — `NEXT_PUBLIC_` 접두어 절대 금지

### 스크립트

```bash
npm run db:push      # 스키마를 DB에 직접 반영 (개발용)
npm run db:generate  # 마이그레이션 파일 생성
npm run db:migrate   # 마이그레이션 실행 (프로덕션용)
npm run db:studio    # Drizzle Studio GUI 실행
```

## DevLabel Convention

모든 리액트 컴포넌트에는 개발 모드에서 컴포넌트 식별을 위한 `DevLabel`을 반드시 포함합니다. `DevLabel`은 `process.env.NODE_ENV === 'development'`일 때만 렌더링되며, 프로덕션에서는 완전히 제거됩니다.

### 사용법

```tsx
import { DevLabel } from "@/components/ui/DevLabel";

// 컴포넌트의 루트 요소 안에 배치 (루트 요소에 `relative` 클래스 필요)
<div className="relative ...">
  <DevLabel name="MyComponent" file="components/MyComponent.tsx" depth={1} />
  {/* ... */}
</div>
```

### depth 기준

| depth | 계층 | 색상 | 위치 | 예시 |
|---|---|---|---|---|
| `1` | 섹션 / 페이지 | 파란색 | top-left | `Hero`, `Nav`, `Footer`, 페이지 컴포넌트 |
| `2` | 컴포넌트 | 보라색 | top-right | `SectionHeader`, `EventModal`, `ExperienceForm` |
| `3` | 하위 영역 / 소형 | 주황색 | bottom-left | `Badge`, `DeleteButton`, `BrandIcons` |

### 규칙

1. **새 컴포넌트 작성 시** 반드시 `DevLabel`을 포함할 것
2. `file` prop에는 `src/` 이후의 상대 경로 사용 (예: `components/sections/Hero.tsx`)
3. `name` prop에는 컴포넌트 함수명 사용 (예: `Hero`, `SectionHeader`)
4. 루트 요소에 `relative` 클래스가 없으면 추가할 것
5. 클릭 시 `"파일명 - 컴포넌트명"` 형태로 클립보드에 복사됨

