"use client";

type Depth = 1 | 2 | 3;

type Props = {
  /** Component display name, e.g. "Hero" */
  name: string;
  /** Relative file path from src/, e.g. "components/sections/Hero.tsx" */
  file: string;
  /** 1 = section (blue, top-left), 2 = component (purple, top-right), 3 = sub-area (orange, bottom-left) */
  depth: Depth;
};

const depthStyles: Record<Depth, string> = {
  1: "top-0 left-0 rounded-br-lg bg-blue-600",
  2: "top-0 right-0 rounded-bl-lg bg-purple-600",
  3: "bottom-0 left-0 rounded-tr-lg bg-orange-500",
};

export function DevLabel({ name, file, depth }: Props) {
  if (process.env.NODE_ENV !== "development") return null;

  const label = `${file} - ${name}`;

  const handleClick = () => {
    navigator.clipboard.writeText(label).catch(() => {
      /* clipboard may be unavailable */
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`📋 ${label}`}
      className={`absolute z-50 px-2 py-0.5 text-[10px] font-semibold leading-tight text-white opacity-60 transition-opacity hover:opacity-100 ${depthStyles[depth]}`}
    >
      {name}
    </button>
  );
}
