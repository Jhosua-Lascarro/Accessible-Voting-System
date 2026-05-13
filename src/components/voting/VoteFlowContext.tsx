import { useEffect, useReducer, type ReactNode } from "react";

import { ballotOptions } from "./ballot-data";
import {
  readStoredState,
  storageKey,
  type VoteFlowContextValue,
  VoteFlowContext,
  voteFlowReducer,
} from "./vote-flow-state";

export function VoteFlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    voteFlowReducer,
    undefined,
    readStoredState,
  );
  const selectedOption =
    ballotOptions.find((option) => option.id === state.selectedOptionId) ??
    null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const value: VoteFlowContextValue = {
    options: ballotOptions,
    selectedOption,
    selectedOptionId: state.selectedOptionId,
    isSubmitted: state.isSubmitted,
    submittedAt: state.submittedAt,
    receiptId: state.receiptId,
    selectOption(optionId) {
      dispatch({ type: "select", optionId });
    },
    confirmVote(optionId) {
      dispatch({ type: "confirm", optionId });
    },
    submitVote() {
      dispatch({ type: "submit" });
    },
    resetFlow() {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(storageKey);
      }

      dispatch({ type: "reset" });
    },
  };

  return (
    <VoteFlowContext.Provider value={value}>
      {children}
    </VoteFlowContext.Provider>
  );
}
