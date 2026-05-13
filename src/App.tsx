import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AccessibilityAnnouncerProvider } from "./components/ui/AccessibilityAnnouncer";
import { VoteFlowProvider } from "./components/voting/VoteFlowContext";
import MainLayout from "./layouts/MainLayout";
import Authentication from "./views/Authentication.tsx";
import Access from "./views/Access";
import Confirmation from "./views/Confirmation";
import Vote from "./views/Vote";

export default function App() {
  return (
    <AccessibilityAnnouncerProvider>
      <VoteFlowProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route
                index
                element={<Navigate replace to="/authentication" />}
              />
              <Route path="authentication" element={<Authentication />} />
              <Route path="access" element={<Access />} />
              <Route path="vote" element={<Vote />} />
              <Route path="confirmation" element={<Confirmation />} />
            </Route>
            <Route
              path="*"
              element={<Navigate replace to="/authentication" />}
            />
          </Routes>
        </BrowserRouter>
      </VoteFlowProvider>
    </AccessibilityAnnouncerProvider>
  );
}
