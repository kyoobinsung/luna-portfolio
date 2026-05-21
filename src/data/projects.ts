export type Project = {
  title: string;
  description: string;
  emoji: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
  };
  accent: "peach" | "mint" | "sky" | "butter" | "lavender" | "rose";
};

export const projects: Project[] = [
  {
    title: "Moonlight Notes",
    description: "밤하늘 테마의 마크다운 노트 앱. 로컬 저장과 태그 검색을 지원합니다.",
    emoji: "🌙",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    links: {
      github: "https://github.com/",
      demo: "https://example.com/",
    },
    accent: "lavender",
  },
  {
    title: "Pastel Pomodoro",
    description: "파스텔톤 UI의 뽀모도로 타이머. 집중과 휴식을 부드럽게 안내합니다.",
    emoji: "🍑",
    tags: ["React", "Framer Motion"],
    links: {
      github: "https://github.com/",
    },
    accent: "peach",
  },
  {
    title: "Cozy Weather",
    description: "감성 일러스트와 함께 날씨를 알려주는 위젯형 웹앱.",
    emoji: "☁️",
    tags: ["Vue", "Open API"],
    links: {
      demo: "https://example.com/",
    },
    accent: "sky",
  },
  {
    title: "Recipe Garden",
    description: "내 냉장고 재료로 만들 수 있는 레시피를 추천해주는 큐레이션 사이트.",
    emoji: "🥗",
    tags: ["Next.js", "Supabase"],
    links: {
      github: "https://github.com/",
      demo: "https://example.com/",
    },
    accent: "mint",
  },
];
