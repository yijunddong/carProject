import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IntakeProvider } from "./context/IntakeContext";
import { AssessmentPage } from "./pages/AssessmentPage";
import { HomePage } from "./pages/HomePage";
import { ReceptionPage } from "./pages/ReceptionPage";
import { WaitingPage } from "./pages/WaitingPage";
import "./components/layout.css";

export default function App() {
  return (
    <IntakeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reception" element={<ReceptionPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/waiting-display" element={<WaitingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </IntakeProvider>
  );
}
