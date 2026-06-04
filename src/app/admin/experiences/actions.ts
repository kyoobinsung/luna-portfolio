"use server";

import { db } from "@/db";
import { experiences, type NewExperience } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ExperienceFormData = {
  type: string;
  title: string;
  org: string;
  description: string;
  startedAt: string;
  endedAt: string;
  sortOrder: string;
};

function parseFormData(data: ExperienceFormData): NewExperience {
  return {
    type: data.type,
    title: data.title.trim(),
    org: data.org.trim(),
    description: data.description.trim() || null,
    startedAt: data.startedAt,
    endedAt: data.endedAt?.trim() ? data.endedAt : null,
    sortOrder: parseInt(data.sortOrder, 10) || 0,
  };
}

type ActionState = { error: string } | null;

export async function createExperience(_: ActionState, formData: FormData): Promise<ActionState> {
  const raw: ExperienceFormData = {
    type: formData.get("type") as string,
    title: formData.get("title") as string,
    org: formData.get("org") as string,
    description: formData.get("description") as string,
    startedAt: formData.get("startedAt") as string,
    endedAt: formData.get("endedAt") as string,
    sortOrder: formData.get("sortOrder") as string,
  };

  if (!raw.title || !raw.org || !raw.startedAt || !raw.type) {
    return { error: "필수 항목을 모두 입력해주세요." };
  }

  await db.insert(experiences).values(parseFormData(raw));
  revalidatePath("/");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function updateExperience(_: ActionState, formData: FormData): Promise<ActionState> {
  const id = Number(formData.get("id"));
  const raw: ExperienceFormData = {
    type: formData.get("type") as string,
    title: formData.get("title") as string,
    org: formData.get("org") as string,
    description: formData.get("description") as string,
    startedAt: formData.get("startedAt") as string,
    endedAt: formData.get("endedAt") as string,
    sortOrder: formData.get("sortOrder") as string,
  };

  if (!raw.title || !raw.org || !raw.startedAt || !raw.type) {
    return { error: "필수 항목을 모두 입력해주세요." };
  }

  await db
    .update(experiences)
    .set({ ...parseFormData(raw), updatedAt: new Date() })
    .where(eq(experiences.id, id));

  revalidatePath("/");
  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: number) {
  await db.delete(experiences).where(eq(experiences.id, id));
  revalidatePath("/");
  revalidatePath("/admin/experiences");
}
