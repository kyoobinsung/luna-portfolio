import { DevLabel } from "@/components/ui/DevLabel";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: Props) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`relative flex flex-col gap-3 ${alignClass}`}>
      <DevLabel name="SectionHeader" file="components/ui/SectionHeader.tsx" depth={2} />
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-peach px-3 py-1 text-xs font-semibold text-foreground/80">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-base text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
