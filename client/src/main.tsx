import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "antd/dist/reset.css"; // Стили для Ant Design
import { Provider } from "react-redux";
import { store } from "./store/store"; // Подключение Redux
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Подключение React Query

const queryClient = new QueryClient(); // Создание клиента для React Query

const root = ReactDOM.createRoot(document.getElementById("root")!); // Получение корневого элемента

root.render(
  <BrowserRouter>
    {/* Оборачивание в Router для работы с маршрутами */}
    <Provider store={store}>
      {/* Провайдер Redux */}
      <QueryClientProvider client={queryClient}>
        {/* Провайдер для React Query */}
        <App /> {/* Основной компонент приложения */}
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
