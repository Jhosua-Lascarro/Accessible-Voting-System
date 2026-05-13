import { createContext } from "react";

import type { BallotOption } from "./ballot-data";

export type VoteFlowState = {
  selectedOptionId: string | null;
  isSubmitted: boolean;
  submittedAt: string | null;
  receiptId: string | null;
};

export type VoteFlowAction =
  | { type: "select"; optionId: string }
  | { type: "confirm"; optionId: string }
  | { type: "submit" }
  | { type: "reset" };

export type VoteFlowContextValue = {
  options: BallotOption[];
  selectedOption: BallotOption | null;
  selectedOptionId: string | null;
  isSubmitted: boolean;
  submittedAt: string | null;
  receiptId: string | null;
  selectOption: (optionId: string) => void;
  submitVote: () => void;
  confirmVote: (optionId: string) => void;
  resetFlow: () => void;
};

export const storageKey = "accessible-voting-flow-v1";

export const initialState: VoteFlowState = {
  selectedOptionId: null,
  isSubmitted: false,
  submittedAt: null,
  receiptId: null,
};

export const VoteFlowContext = createContext<VoteFlowContextValue | null>(null);

export function createReceiptId() {
  const timeStamp = Date.now().toString(36).toUpperCase();
  return `VR-${timeStamp.slice(-8)}`;
}

export function readStoredState(): VoteFlowState {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const storedValue = window.sessionStorage.getItem(storageKey);

    if (!storedValue) {
      return initialState;
    }

    const parsedValue = JSON.parse(storedValue) as Partial<VoteFlowState>;

    return {
      selectedOptionId: parsedValue.selectedOptionId ?? null,
      isSubmitted: Boolean(parsedValue.isSubmitted),
      submittedAt: parsedValue.submittedAt ?? null,
      receiptId: parsedValue.receiptId ?? null,
    };
  } catch {
    return initialState;
  }
}

export function voteFlowReducer(
  state: VoteFlowState,
  action: VoteFlowAction,
): VoteFlowState {
  switch (action.type) {
    case "select":
      return {
        selectedOptionId: action.optionId,
        isSubmitted: false,
        submittedAt: null,
        receiptId: null,
      };
    case "confirm":
      return {
        selectedOptionId: action.optionId,
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
        receiptId: createReceiptId(),
      };
    case "submit":
      if (!state.selectedOptionId) {
        return state;
      }

      return {
        ...state,
        isSubmitted: true,
        submittedAt: new Date().toISOString(),
        receiptId: state.receiptId ?? createReceiptId(),
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
}
