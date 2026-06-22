"use client";

import { useTransition } from "react";
import { deleteExperience } from "./actions";
import { Trash2 } from "lucide-react";
import { DevLabel } from "@/components/ui/DevLabel";

export function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    startTransition(() => deleteExperience(id));
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="relative flex items-center gap-1.5 rounded-lg border border-rose bg-rose/30 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:bg-rose disabled:opacity-50"
    >
      <DevLabel name="DeleteButton" file="app/admin/experiences/DeleteButton.tsx" depth={3} />
      <Trash2 size={13} />
      {isPending ? "삭제 중…" : "삭제"}
    </button>
  );
}

