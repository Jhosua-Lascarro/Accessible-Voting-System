import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAccessibilityAnnouncer } from "../components/ui/AccessibilityAnnouncer";
import { Button } from "../components/ui/Button";
import { SystemMark } from "../components/ui/SystemMark";
import { useVoteFlow } from "../components/voting/useVoteFlow";

export default function Confirmation() {
  const navigate = useNavigate();
  const { selectedOption, isSubmitted, receiptId } = useVoteFlow();
  const { announce } = useAccessibilityAnnouncer();

  useEffect(() => {
    if (!selectedOption || !isSubmitted) {
      return;
    }

    announce(
      `Registro. Paso 4 de 4. Tu voto quedó registrado. Comprobante ${receiptId ?? "no disponible"}.`,
    );
  }, [announce, isSubmitted, receiptId, selectedOption]);

  if (!selectedOption || !isSubmitted) {
    return <Navigate replace to="/vote" />;
  }

  function handleResetFlow() {
    navigate("/authentication", {
      replace: true,
      state: { resetVoteFlow: true },
    });
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col bg-white px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-6">
      <div
        className="flex items-start gap-4"
        aria-labelledby="confirmation-heading"
      >
        <SystemMark size="sm" />
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Paso 4 de 4
          </span>
          <h2
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            id="confirmation-heading"
          >
            Tu voto quedó registrado
          </h2>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        El sistema marcó el proceso como finalizado. Si quieres comenzar de
        nuevo, vuelve al inicio y repite la guía.
      </p>

      <div className="mt-6 flex justify-center">
        <Button
          className="w-full sm:w-auto"
          size="lg"
          onClick={handleResetFlow}
        >
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}
