export type ExperienceItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  type: "work" | "education" | "activity";
};

export const experiences: ExperienceItem[] = [
  {
    period: "2024 - 현재",
    title: "프론트엔드 개발자",
    org: "Cozy Studio",
    description: "디자인 시스템 구축과 사용자 대시보드 리뉴얼을 주도했습니다.",
    type: "work",
  },
  {
    period: "2022 - 2024",
    title: "주니어 프론트엔드 개발자",
    org: "Moonlight Lab",
    description: "React 기반 웹앱을 설계/개발하고, 접근성 개선 작업에 참여했습니다.",
    type: "work",
  },
  {
    period: "2021 - 2022",
    title: "프론트엔드 부트캠프 수료",
    org: "Pastel Academy",
    description: "6개월간 모던 웹 프론트엔드 풀스택 과정을 수료했습니다.",
    type: "education",
  },
  {
    period: "2017 - 2021",
    title: "컴퓨터공학 학사",
    org: "Sunshine University",
    description: "컴퓨터공학 전공, HCI 동아리 활동.",
    type: "education",
  },
];
