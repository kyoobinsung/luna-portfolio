import { ExperienceForm } from "../ExperienceForm";
import { createExperience } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewExperiencePage() {
  return (
    <div className="mx-auto max-w-xl">
      <Link
        href="/admin/experiences"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        목록으로
      </Link>
      <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border-soft">
        <h1 className="mb-6 text-xl font-bold">새 항목 추가</h1>
        <ExperienceForm action={createExperience} submitLabel="추가하기" />
      </div>
    </div>
  );
}
