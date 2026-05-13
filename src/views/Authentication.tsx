import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAccessibilityAnnouncer } from "../components/ui/AccessibilityAnnouncer";
import { Button } from "../components/ui/Button";
import { SystemMark } from "../components/ui/SystemMark";
import { useVoteFlow } from "../components/voting/useVoteFlow";

export default function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetFlow } = useVoteFlow();
  const { announce } = useAccessibilityAnnouncer();

  useEffect(() => {
    const shouldResetFlow = (
      location.state as { resetVoteFlow?: boolean } | null
    )?.resetVoteFlow;

    if (!shouldResetFlow) {
      return;
    }

    resetFlow();
  }, [location.state, resetFlow]);

  useEffect(() => {
    announce(
      "Autenticación del votante. Paso 1 de 4. Verifica tu identidad antes de continuar con la guía y el tarjetón.",
    );
  }, [announce]);

  function handleContinue() {
    navigate("/access");
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col bg-white px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-6">
      <div className="flex items-start gap-4">
        <SystemMark size="sm" />
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Paso 1 de 4
          </span>
          <h2
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            id="authentication-heading"
          >
            Autenticación del votante
          </h2>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        Verifica tu identidad antes de continuar con la guía y el tarjetón.
      </p>

      <div className="mt-6 border border-slate-300 bg-slate-50 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <SystemMark size="xs" className="border-slate-300 bg-slate-50" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
            Estado
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Esta demostración mantiene la autenticación simplificada para centrar
          el flujo en la navegación y el registro del voto.
        </p>
      </div>

      <Button
        className="mt-6 w-full sm:w-auto"
        size="lg"
        onClick={handleContinue}
      >
        Continuar a la guía
      </Button>
    </section>
  );
}
