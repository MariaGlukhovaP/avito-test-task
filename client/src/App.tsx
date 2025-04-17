import { Routes, Route, Navigate } from "react-router-dom";
import IssuesPage from "./pages/issuePage/issuePage";
import BoardsPage from "./pages/boardsPage/boardsPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/issues" replace />} />
      <Route path="/issues" element={<IssuesPage />} />
      <Route path="/boards" element={<BoardsPage />} />
    </Routes>
  );
};

export default App;
