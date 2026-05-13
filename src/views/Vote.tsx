import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAccessibilityAnnouncer } from "../components/ui/AccessibilityAnnouncer";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { SystemMark } from "../components/ui/SystemMark";
import { BallotOptionCard } from "../components/voting/BallotOptionCard";
import { blankVoteOption } from "../components/voting/ballot-data";
import { useVoteFlow } from "../components/voting/useVoteFlow";
import type { BallotOption } from "../components/voting/ballot-data";

export default function Vote() {
  const navigate = useNavigate();
  const { options, confirmVote, isSubmitted } = useVoteFlow();
  const [pendingOption, setPendingOption] = useState<BallotOption | null>(null);
  const { announce } = useAccessibilityAnnouncer();

  useEffect(() => {
    if (isSubmitted) {
      return;
    }

    announce(
      "Tarjetón. Paso 3 de 4. Selecciona una sola opción y confirma antes de registrar el voto.",
    );
  }, [announce, isSubmitted]);

  useEffect(() => {
    if (!pendingOption) {
      return;
    }

    announce(
      `Seleccionaste ${pendingOption.title}, ${pendingOption.subtitle}. Se abrió la confirmación para revisar tu elección.`,
    );
  }, [announce, pendingOption]);

  if (isSubmitted) {
    return <Navigate replace to="/confirmation" />;
  }

  function openConfirmModal(option: BallotOption) {
    setPendingOption(option);
  }

  function closeConfirmModal() {
    setPendingOption(null);
  }

  function handleConfirmOption() {
    if (!pendingOption) {
      return;
    }

    confirmVote(pendingOption.id);
    setPendingOption(null);
    navigate("/confirmation");
  }

  function getConfirmationTitle(option: BallotOption) {
    if (option.id === blankVoteOption.id) {
      return "¿Estás seguro de elegir el voto en blanco?";
    }

    return `¿Estás seguro de elegir a ${option.title}?`;
  }

  function getConfirmationDescription(option: BallotOption) {
    if (option.id === blankVoteOption.id) {
      return "Vas a registrar un voto en blanco. Puedes confirmar esta elección o volver a la lista para elegir otro candidato.";
    }

    return `Seleccionaste a ${option.title}, quien representa al ${option.subtitle}. Puedes confirmar esta elección o volver a la lista para elegir otro candidato.`;
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-6">
      <aside
        className="space-y-4 bg-white p-6 sm:p-8 lg:self-start"
        aria-labelledby="vote-heading"
      >
        <div className="flex items-start gap-4">
          <SystemMark size="sm" />
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Paso 3 de 4
            </span>
            <h2
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              id="vote-heading"
            >
              Marca una sola opción en el tarjetón
            </h2>
          </div>
        </div>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Toca una opción o recórrela con el teclado. Después confirma en la
          ventana emergente para registrar tu voto y pasar al siguiente paso.
        </p>
      </aside>

      <div
        className="space-y-4 border border-slate-300 bg-white p-4 sm:p-5 lg:self-start"
        role="region"
        aria-labelledby="vote-ballot-title"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <SystemMark size="xs" className="border-slate-300 bg-slate-50" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Tarjetón
            </p>
          </div>
          <h3
            className="text-xl font-semibold tracking-tight text-slate-900"
            id="vote-ballot-title"
          >
            Opciones disponibles
          </h3>
          <p className="text-sm leading-6 text-slate-600">
            Elige solo una opción. Luego revisa y confirma en la ventana que se
            abrirá antes de registrar tu voto.
          </p>
        </div>
        <div className="max-h-[62dvh] overflow-y-auto pr-1 lg:max-h-[calc(100dvh-18rem)]">
          <ul
            className="grid gap-3"
            aria-label="Lista de opciones del tarjetón"
          >
            {options.map((option) => (
              <BallotOptionCard
                key={option.id}
                active={pendingOption?.id === option.id}
                onChoose={openConfirmModal}
                option={option}
              />
            ))}
          </ul>
        </div>
      </div>

      <Modal
        description={
          pendingOption ? getConfirmationDescription(pendingOption) : undefined
        }
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={closeConfirmModal}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmOption}>Confirmar voto</Button>
          </div>
        }
        onClose={closeConfirmModal}
        open={Boolean(pendingOption)}
        size="md"
        title={pendingOption ? getConfirmationTitle(pendingOption) : ""}
      >
        {pendingOption ? (
          <div className="border border-slate-300 bg-slate-50 p-4">
            <div className="flex items-start gap-4">
              <img
                alt={`Fotografía de ${pendingOption.title}`}
                className="h-20 w-20 shrink-0 border border-slate-300 object-cover"
                src={pendingOption.imageSrc}
              />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {pendingOption.id === blankVoteOption.id
                    ? "Detalle"
                    : "Partido"}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {pendingOption.subtitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {pendingOption.description}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
