import { classNames } from "../../lib/classNames";
import { SystemMark } from "../ui/SystemMark";
import type { BallotOption } from "./ballot-data";

type BallotOptionCardProps = {
  option: BallotOption;
  active?: boolean;
  onChoose: (option: BallotOption) => void;
};

export function BallotOptionCard({
  option,
  active = false,
  onChoose,
}: BallotOptionCardProps) {
  return (
    <li>
      <button
        aria-labelledby={`option-${option.id}-title option-${option.id}-subtitle option-${option.id}-note`}
        aria-describedby={`option-${option.id}-desc`}
        aria-haspopup="dialog"
        aria-pressed={active}
        className={classNames(
          "flex w-full items-stretch gap-4 border border-slate-300 bg-white p-4 text-left transition-colors hover:border-slate-900 focus-visible:border-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10",
          active && "border-slate-900 bg-slate-50",
        )}
        type="button"
        onClick={() => onChoose(option)}
      >
        <img
          alt=""
          aria-hidden="true"
          className="h-20 w-20 shrink-0 border border-slate-300 object-cover"
          src={option.imageSrc}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                id={`option-${option.id}-title`}
                className="text-lg font-semibold text-slate-900"
              >
                {option.title}
              </h3>
              <p
                id={`option-${option.id}-subtitle`}
                className="mt-1 text-sm font-medium uppercase tracking-[0.22em] text-slate-500"
              >
                {option.subtitle}
              </p>
            </div>
            <span
              id={`option-${option.id}-note`}
              className="inline-flex items-center gap-2 border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500"
            >
              <SystemMark size="xs" className="border-slate-300 bg-white" />
              <span>{option.note}</span>
            </span>
          </div>

          <p
            className="mt-3 text-sm leading-6 text-slate-600"
            id={`option-${option.id}-desc`}
          >
            {option.description}
          </p>
          <p
            aria-hidden="true"
            className="mt-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500"
          >
            Pulsa Enter o haz clic para elegir
          </p>
        </div>
      </button>
    </li>
  );
}
