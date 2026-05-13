import { useId, type InputHTMLAttributes } from "react";

import { classNames } from "../../lib/classNames";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({
  label,
  hint,
  error,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId]
    .filter((value): value is string => Boolean(value))
    .join(" ");

  return (
    <div className="space-y-2">
      {label ? (
        <label
          className="block text-sm font-medium text-slate-900"
          htmlFor={inputId}
        >
          {label}
        </label>
      ) : null}
      <input
        aria-describedby={describedBy || undefined}
        aria-invalid={Boolean(error)}
        className={classNames(
          "w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10",
          error &&
            "border-rose-600 focus:border-rose-600 focus:ring-rose-600/10",
          className,
        )}
        id={inputId}
        {...props}
      />
      {hint ? (
        <p className="text-sm text-slate-500" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-rose-700" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
