import { useContext } from "react";

import { VoteFlowContext } from "./vote-flow-state";

export function useVoteFlow() {
  const context = useContext(VoteFlowContext);

  if (!context) {
    throw new Error("useVoteFlow must be used within a VoteFlowProvider");
  }

  return context;
}
