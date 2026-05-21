export type SkillGroup = {
  category: string;
  emoji: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    emoji: "✨",
    items: ["TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    emoji: "🚀",
    items: ["React", "Next.js", "Vue", "Astro"],
  },
  {
    category: "Styling",
    emoji: "🎨",
    items: ["Tailwind CSS", "Styled Components", "Framer Motion"],
  },
  {
    category: "Tools",
    emoji: "🛠️",
    items: ["Git", "Figma", "Vite", "Vercel"],
  },
];
