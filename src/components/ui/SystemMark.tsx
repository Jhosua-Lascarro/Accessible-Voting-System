import iconMark from "../../assets/mocks/icons/icon01.svg";

import { classNames } from "../../lib/classNames";

type SystemMarkSize = "xs" | "sm" | "md" | "lg";

type SystemMarkProps = {
  size?: SystemMarkSize;
  className?: string;
  inverse?: boolean;
};

const sizeClasses: Record<SystemMarkSize, string> = {
  xs: "h-4 w-4 p-0.5",
  sm: "h-8 w-8 p-1.5",
  md: "h-10 w-10 p-2",
  lg: "h-12 w-12 p-2.5",
};

export function SystemMark({
  size = "md",
  className,
  inverse = false,
}: SystemMarkProps) {
  return (
    <span
      className={classNames(
        "inline-flex shrink-0 items-center justify-center border border-slate-900 bg-white",
        sizeClasses[size],
        className,
      )}
    >
      <img
        alt=""
        aria-hidden="true"
        className={classNames(
          "h-full w-full object-contain",
          inverse && "invert",
        )}
        src={iconMark}
      />
    </span>
  );
}
