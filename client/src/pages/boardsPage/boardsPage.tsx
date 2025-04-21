import BoardList from "../../components/boardList/boardList";
import Header from "../../components/header/header";
import { useBoards } from "../../services/useBoards";

const BoardsPage: React.FC = () => {
  // Загружаем список досок
  const { data: boards = [], isLoading, isError } = useBoards();

  return (
    <div className="container">
      {/* Заголовок страницы */}
      <Header />

      {/* Отображаем индикатор загрузки или ошибку */}
      {isLoading && <p>Загрузка...</p>}
      {isError && <p>Ошибка: не удалось загрузить доски</p>}

      {/* Если загрузка завершена и ошибок нет, отображаем список досок */}
      {!isLoading && !isError && <BoardList boards={boards} />}
    </div>
  );
};

export default BoardsPage;
