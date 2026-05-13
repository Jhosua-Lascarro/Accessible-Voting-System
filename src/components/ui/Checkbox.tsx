import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import { classNames } from "../../lib/classNames";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  hint?: string;
};

export function Checkbox({
  label,
  hint,
  id,
  className,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const hintId = hint ? `${checkboxId}-hint` : undefined;

  return (
    <div className="flex items-start gap-3">
      <input
        aria-describedby={hintId}
        className={classNames(
          "mt-1 h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-900/10",
          className,
        )}
        id={checkboxId}
        type="checkbox"
        {...props}
      />
      <div className="min-w-0">
        <label
          className="block text-sm font-medium text-slate-900"
          htmlFor={checkboxId}
        >
          {label}
        </label>
        {hint ? (
          <p className="mt-1 text-sm text-slate-500" id={hintId}>
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
