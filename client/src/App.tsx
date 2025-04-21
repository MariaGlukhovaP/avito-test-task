import { Routes, Route, Navigate } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";
import IssuesPage from "./pages/issuesPage/issuesPage";
import BoardsPage from "./pages/boardsPage/boardsPage";
import BoardPage from "./pages/boardPage/boardPage";

// Основной компонент приложения, определяющий маршруты
const App: React.FC = () => {
  return (
    <Routes>
      {/* Переадресация с главной страницы на страницу задач */}
      <Route path="/" element={<Navigate to="/issues" replace />} />

      {/* Страница всех задач */}
      <Route path="/issues" element={<IssuesPage />} />

      {/* Страница всех досок */}
      <Route path="/boards" element={<BoardsPage />} />

      {/* Страница конкретной доски по ID */}
      <Route path="/board/:id" element={<BoardPage />} />
    </Routes>
  );
};

export default App;
