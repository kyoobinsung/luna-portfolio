import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <div className="grid items-center gap-12 md:grid-cols-[280px_1fr]">
        <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-peach via-rose to-lavender text-7xl shadow-lg md:mx-0 md:h-64 md:w-64">
          🌙
        </div>
        <div className="flex flex-col gap-5">
          <SectionHeader
            eyebrow="About"
            title="작은 디테일에 즐거움을 더해요"
            description={profile.bio}
          />
          <div className="flex flex-wrap gap-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 shadow-sm">
              <MapPin size={14} />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 shadow-sm">
              ☕ 커피와 함께 코딩
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 shadow-sm">
              🎨 UI/UX에 진심
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
