import { db } from "@/db";
import { experiences } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ExperienceForm } from "../../ExperienceForm";
import { updateExperience } from "../../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const [item] = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, Number(id)));

  if (!item) notFound();

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
        <h1 className="mb-6 text-xl font-bold">항목 수정</h1>
        <ExperienceForm
          action={updateExperience}
          defaultValues={item}
          submitLabel="저장하기"
        />
      </div>
    </div>
  );
}
