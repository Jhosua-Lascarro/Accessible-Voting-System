import { classNames } from "../../lib/classNames";
import { flowSteps } from "./ballot-data";

type StepIndicatorProps = {
  currentStepIndex: number;
};

export function StepIndicator({ currentStepIndex }: StepIndicatorProps) {
  const currentStep = flowSteps[currentStepIndex];

  return (
    <nav
      aria-label={`Progreso de la votación, ${flowSteps.length} pasos`}
      className="border-b border-slate-300 bg-white"
    >
      <div className="border-b border-slate-300 bg-slate-300 md:hidden">
        <div
          aria-current="step"
          className="flex items-start gap-4 bg-white px-4 py-4"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white bg-slate-900 text-sm font-semibold text-white">
            {String(currentStepIndex + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              {currentStep.title}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {currentStep.description}
            </p>
            <span className="visually-hidden">Paso actual.</span>
          </div>
        </div>
      </div>

      <ol className="hidden gap-px bg-slate-300 md:grid md:grid-cols-4">
        {flowSteps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isComplete = index < currentStepIndex;

          return (
            <li
              key={step.id}
              aria-current={isCurrent ? "step" : undefined}
              className={classNames(
                "flex items-start gap-4 bg-white px-4 py-4 transition-colors",
                isCurrent && "bg-slate-900 text-white",
              )}
            >
              <span
                className={classNames(
                  "flex h-10 w-10 shrink-0 items-center justify-center border border-slate-900 text-sm font-semibold transition-colors",
                  isComplete && "bg-slate-900 text-white",
                  isCurrent &&
                    !isComplete &&
                    "border-white bg-slate-900 text-white",
                  !isCurrent &&
                    !isComplete &&
                    "border-slate-300 bg-white text-slate-500",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {step.title}
                </p>
                <span className="visually-hidden">
                  {isCurrent
                    ? "Paso actual."
                    : isComplete
                      ? "Paso completado."
                      : "Paso pendiente."}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
