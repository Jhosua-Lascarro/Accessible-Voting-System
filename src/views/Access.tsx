import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAccessibilityAnnouncer } from "../components/ui/AccessibilityAnnouncer";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { SystemMark } from "../components/ui/SystemMark";
import { guideSteps } from "../components/voting/ballot-data";
import { useVoteFlow } from "../components/voting/useVoteFlow";

export default function Access() {
  const navigate = useNavigate();
  const { resetFlow } = useVoteFlow();
  const location = useLocation();
  const [isContinueModalOpen, setIsContinueModalOpen] = useState(false);
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
      "Guía antes de entrar al tarjetón. Paso 2 de 4. Revisa la ruta completa del sistema antes de continuar.",
    );
  }, [announce]);

  useEffect(() => {
    if (!isContinueModalOpen) {
      return;
    }

    announce(
      "Se abrió la confirmación para continuar al tarjetón. Revisa el aviso y decide si deseas avanzar.",
    );
  }, [announce, isContinueModalOpen]);

  function openContinueModal() {
    setIsContinueModalOpen(true);
  }

  function closeContinueModal() {
    setIsContinueModalOpen(false);
  }

  function handleStartFlow() {
    resetFlow();
    navigate("/vote");
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-6">
      <aside className="space-y-4 bg-white p-6 sm:p-8 lg:self-start">
        <div className="flex items-start gap-4">
          <SystemMark size="sm" />
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Paso 2 de 4
            </span>
            <h2
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              id="access-heading"
            >
              Guía antes de entrar al tarjetón
            </h2>
          </div>
        </div>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Antes de votar, revisa la ruta completa del sistema. Esta pantalla te
          muestra qué ocurre en cada paso y qué debes esperar al avanzar.
        </p>

        <div className="border border-slate-300 bg-slate-50 p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <SystemMark size="xs" className="border-slate-300 bg-slate-50" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Lo importante
            </p>
          </div>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
            <li>1. Verifica el paso actual antes de continuar.</li>
            <li>2. Confirma el aviso cuando quieras avanzar al tarjetón.</li>
            <li>3. En la siguiente pantalla solo podrás marcar una opción.</li>
          </ul>
        </div>
      </aside>

      <div className="space-y-4 border border-slate-300 bg-white p-4 sm:p-5 lg:self-start">
        <div
          className="space-y-2"
          role="region"
          aria-labelledby="access-route-title"
        >
          <div className="flex items-center gap-3">
            <SystemMark size="xs" className="border-slate-300 bg-slate-50" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              Ruta del proceso
            </p>
          </div>
          <h3
            className="text-xl font-semibold tracking-tight text-slate-900"
            id="access-route-title"
          >
            Así se usa el sistema
          </h3>
        </div>

        <ol className="grid gap-3">
          {guideSteps.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-4 border border-slate-300 bg-slate-50 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-slate-900 bg-white text-sm font-semibold text-slate-900">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-slate-900">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex justify-center pt-1">
          <Button
            className="mt-6 w-full sm:w-auto"
            size="lg"
            onClick={openContinueModal}
          >
            Continuar al tarjetón
          </Button>
        </div>
      </div>

      <Modal
        description="Si continúas, se iniciará el proceso de votación y se limpiará cualquier avance previo de esta sesión."
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={closeContinueModal}>
              Cancelar
            </Button>
            <Button onClick={handleStartFlow}>Continuar</Button>
          </div>
        }
        onClose={closeContinueModal}
        open={isContinueModalOpen}
        size="md"
        title="¿Deseas continuar con el proceso?"
      >
        <div className="border border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Al avanzar pasarás al tarjetón y el flujo quedará listo para elegir
          una sola opción.
        </div>
      </Modal>
    </section>
  );
}
