import type { ReactNode } from "react";

type Variant = "peach" | "mint" | "sky" | "butter" | "lavender" | "rose";

const variantClass: Record<Variant, string> = {
  peach: "bg-peach text-foreground",
  mint: "bg-mint text-foreground",
  sky: "bg-sky text-foreground",
  butter: "bg-butter text-foreground",
  lavender: "bg-lavender text-foreground",
  rose: "bg-rose text-foreground",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function Badge({ children, variant = "peach", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantClass[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
