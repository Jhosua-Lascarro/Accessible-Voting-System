import type { ButtonHTMLAttributes, ReactNode } from "react";

import { classNames } from "../../lib/classNames";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonWidth = "auto" | "full";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-slate-900 bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900",
  secondary:
    "border-slate-900 bg-white text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-900",
  ghost:
    "border-transparent bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-900",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-3 text-xs",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-6 text-sm sm:text-base",
};

const widthClasses: Record<ButtonWidth, string> = {
  auto: "",
  full: "w-full",
};

export function Button({
  variant = "primary",
  size = "md",
  width = "auto",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center border font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        widthClasses[width],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
