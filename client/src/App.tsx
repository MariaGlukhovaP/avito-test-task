import { Routes, Route, Navigate } from "react-router-dom";
import IssuesPage from "./pages/issuePage/issuePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/issues" replace />} />
      <Route path="/issues" element={<IssuesPage />} />
      {/* Будущие маршруты:
      <Route path="/boards" element={<BoardsPage />} />
      <Route path="/board/:id" element={<BoardPage />} /> 
      */}
      <Route path="*" element={<h1>404 — Страница не найдена</h1>} />
    </Routes>
  );
};

export default App;
