import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, type Project } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { DevLabel } from "@/components/ui/DevLabel";

const accentBg: Record<Project["accent"], string> = {
  peach: "bg-peach/60",
  mint: "bg-mint/60",
  sky: "bg-sky/60",
  butter: "bg-butter/60",
  lavender: "bg-lavender/60",
  rose: "bg-rose/60",
};

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <DevLabel name="Projects" file="components/sections/Projects.tsx" depth={1} />
      <SectionHeader
        eyebrow="Projects"
        title="만들어 본 것들"
        description="작은 사이드 프로젝트부터 협업 프로젝트까지, 즐겁게 만들고 있어요."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`flex h-32 items-center justify-center text-6xl ${accentBg[project.accent]}`}>
              {project.emoji}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="flex-1 text-sm text-muted">{project.description}</p>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:opacity-90"
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1.5 text-xs font-semibold transition hover:bg-peach"
                  >
                    <ExternalLink size={14} />
                    Demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
