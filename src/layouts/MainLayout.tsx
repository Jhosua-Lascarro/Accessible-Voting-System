import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { SystemMark } from "../components/ui/SystemMark";
import { StepIndicator } from "../components/voting/StepIndicator";

function getCurrentStepIndex(pathname: string) {
  if (pathname.startsWith("/authentication")) {
    return 0;
  }

  if (pathname.startsWith("/access")) {
    return 1;
  }

  if (pathname.startsWith("/vote")) {
    return 2;
  }

  if (pathname.startsWith("/confirmation")) {
    return 3;
  }

  return 0;
}

export default function MainLayout() {
  const location = useLocation();
  const currentStepIndex = getCurrentStepIndex(location.pathname);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col border-x border-slate-300 bg-white/80 backdrop-blur-sm">
        <header className="border-b border-slate-300 bg-white px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-4">
              <SystemMark size="lg" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Sistema de voto guiado
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Registro de voto
                </h1>
              </div>
            </div>
          </div>
        </header>

        <StepIndicator currentStepIndex={currentStepIndex} />

        <main
          id="main-content"
          aria-label="Contenido principal"
          className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
          ref={mainRef}
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
