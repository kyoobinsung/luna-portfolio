import { SectionHeader } from "@/components/ui/SectionHeader";
import { experiences, type ExperienceItem } from "@/data/experience";
import { Briefcase, GraduationCap, Star } from "lucide-react";

const typeMeta: Record<ExperienceItem["type"], { icon: typeof Briefcase; bg: string }> = {
  work: { icon: Briefcase, bg: "bg-mint" },
  education: { icon: GraduationCap, bg: "bg-sky" },
  activity: { icon: Star, bg: "bg-butter" },
};

export function Experience() {
  return (
    <section id="experience" className="bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <SectionHeader
          eyebrow="Experience"
          title="걸어온 길"
          description="일과 배움을 모두 즐기며 한 걸음씩 성장하고 있어요."
        />
        <ol className="relative mt-12 border-l-2 border-dashed border-peach pl-8">
          {experiences.map((item, idx) => {
            const meta = typeMeta[item.type];
            const Icon = meta.icon;
            return (
              <li key={`${item.title}-${idx}`} className="relative mb-10 last:mb-0">
                <span
                  className={`absolute -left-[2.6rem] flex h-10 w-10 items-center justify-center rounded-full ${meta.bg} shadow-sm`}
                  aria-hidden
                >
                  <Icon size={18} />
                </span>
                <div className="rounded-2xl bg-surface p-5 shadow-sm">
                  <p className="text-xs font-semibold text-muted">{item.period}</p>
                  <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm font-medium text-foreground/80">{item.org}</p>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
