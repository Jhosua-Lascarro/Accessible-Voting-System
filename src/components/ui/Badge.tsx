import type { ReactNode } from "react";

import { classNames } from "../../lib/classNames";

type BadgeTone = "neutral" | "accent" | "success";

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-slate-300 bg-white text-slate-600",
  accent: "border-slate-900 bg-slate-900 text-white",
  success: "border-emerald-700 bg-emerald-50 text-emerald-800",
};

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
