import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AccessibilityAnnouncerContextValue = {
  announce: (message: string) => void;
};

const AccessibilityAnnouncerContext =
  createContext<AccessibilityAnnouncerContextValue | null>(null);

type AccessibilityAnnouncerProviderProps = {
  children: ReactNode;
};

export function AccessibilityAnnouncerProvider({
  children,
}: AccessibilityAnnouncerProviderProps) {
  const [announcement, setAnnouncement] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const announce = useCallback((message: string) => {
    if (typeof window === "undefined") {
      return;
    }

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setAnnouncement("");

    timeoutRef.current = window.setTimeout(() => {
      setAnnouncement(message);
    }, 40);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      announce,
    }),
    [announce],
  );

  return (
    <AccessibilityAnnouncerContext.Provider value={value}>
      {children}
      <div
        aria-atomic="true"
        aria-live="polite"
        className="visually-hidden"
        role="status"
      >
        {announcement}
      </div>
    </AccessibilityAnnouncerContext.Provider>
  );
}

export function useAccessibilityAnnouncer() {
  const context = useContext(AccessibilityAnnouncerContext);

  if (!context) {
    throw new Error(
      "useAccessibilityAnnouncer must be used within an AccessibilityAnnouncerProvider",
    );
  }

  return context;
}
