# 🌙 Luna Portfolio

안녕하세요! 바이브코딩으로 만드는 포트폴리오입니다.

프론트엔드 개발자 **루나(Luna)** 의 개인 포트폴리오 웹사이트입니다. Next.js + TypeScript + Tailwind CSS로 만들어졌습니다.

## ✨ 주요 섹션

- **Hero** — 인사말과 CTA
- **About** — 자기소개
- **Skills** — 사용 가능한 기술 스택
- **Projects** — 주요 프로젝트
- **Experience** — 경력 타임라인
- **Calendar** — 브라우저 localStorage 기반 개인 일정 관리 (CRUD)
- **Contact** — 연락처 / 소셜 링크

## 🚀 개발 환경 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 으로 접속하세요.

## 🛠 기술 스택

- [Next.js 16](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/) — 캘린더 날짜 처리
- [lucide-react](https://lucide.dev/) — 아이콘

## 📁 구조

```
src/
├── app/                     # Next.js App Router
├── components/
│   ├── sections/            # 페이지 섹션 7개
│   ├── calendar/            # 캘린더 모달
│   └── ui/                  # 공통 UI 프리미티브
├── data/                    # 정적 콘텐츠 (프로필, 스킬, 프로젝트, 경력, 네비)
├── lib/                     # 유틸 (localStorage)
└── types/                   # 타입 정의
```

## 📝 콘텐츠 수정

`src/data/` 안의 파일들을 수정해서 본인의 정보로 바꾸세요.
