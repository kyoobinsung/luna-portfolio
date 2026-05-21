import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/data/skills";

const cardAccents = ["bg-peach/50", "bg-mint/50", "bg-sky/50", "bg-butter/50"];

export function Skills() {
  return (
    <section id="skills" className="bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <SectionHeader
          eyebrow="Skills"
          title="이런 도구들을 사용해요"
          description="자주 사용하는 기술과 도구들이에요. 새로운 도구 배우는 것도 좋아합니다!"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, idx) => (
            <div
              key={group.category}
              className={`rounded-3xl p-6 shadow-sm ${cardAccents[idx % cardAccents.length]}`}
            >
              <div className="text-3xl">{group.emoji}</div>
              <h3 className="mt-3 text-lg font-bold">{group.category}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-surface px-3 py-1 text-xs font-medium shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
