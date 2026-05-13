import { createPortal } from "react-dom";
import { useEffect, useId, useMemo, useRef, type ReactNode } from "react";

import { classNames } from "../../lib/classNames";
import { SystemMark } from "./SystemMark";

type ModalSize = "sm" | "md" | "lg";

type ModalProps = {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  onClose: () => void;
};

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  title,
  description,
  children,
  footer,
  size = "md",
  onClose,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const ariaDescribedBy = useMemo(
    () => (description ? descriptionId : undefined),
    [description, descriptionId],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialogNode = dialogRef.current;

    if (!dialogNode) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;

    const focusTitle = () => {
      const titleElement = document.getElementById(titleId);

      if (titleElement) {
        titleElement.focus();
        return;
      }

      const focusableElements = Array.from(
        dialogNode.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        return;
      }

      dialogNode.focus();
    };

    const animationFrame = window.requestAnimationFrame(focusTitle);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        dialogNode.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogNode.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6"
      onClick={onClose}
    >
      <div
        aria-describedby={ariaDescribedBy}
        aria-labelledby={titleId}
        aria-modal="true"
        className={classNames(
          "w-full border border-slate-300 bg-white p-6 shadow-none outline-none sm:p-8",
          sizeClasses[size],
        )}
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <SystemMark size="sm" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                Confirmación
              </p>
            </div>
            <h2
              id={titleId}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              {title}
            </h2>
            {description ? (
              <p
                id={descriptionId}
                className="text-sm leading-6 text-slate-600"
              >
                {description}
              </p>
            ) : null}
            <p className="visually-hidden">
              Presiona Escape para cerrar este diálogo.
            </p>
          </div>

          {children ? <div>{children}</div> : null}

          {footer ? <div className="pt-2">{footer}</div> : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
