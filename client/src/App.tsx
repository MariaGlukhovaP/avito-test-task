import { Routes, Route, Navigate } from "react-router-dom";
import IssuesPage from "./pages/issuesPage/issuesPage";
import BoardsPage from "./pages/boardsPage/boardsPage";
import BoardPage from "./pages/boardPage/boardPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/issues" replace />} />
      <Route path="/issues" element={<IssuesPage />} />
      <Route path="/boards" element={<BoardsPage />} />
      <Route path="/board/:id" element={<BoardPage />} />
    </Routes>
  );
};

export default App;
