import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useBoards } from "../../services/useBoards";
import { useUsers } from "../../services/useUsers";
import { useCreateTask, useUpdateTask } from "../../services/useMutateTask";
import { useLocation, NavLink } from "react-router-dom";
import { useUpdateTaskStatus } from "../../services/useUpdateTaskStatus";
import { CreateTaskModalProps } from "../../types/taskModalProps";
import "./taskModal.css";

const { Option } = Select;

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  task,
  boardName,
  boardId,
}) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const isIssuesPage = location.pathname === "/issues";

  // Загружаем доски и пользователей для выбора в форме
  const { data: boards = [], isLoading: boardsLoading } = useBoards();
  const { data: users = [], isLoading: usersLoading } = useUsers();

  // Хуки для мутаций: создание, обновление задач и обновление статуса
  const { mutate: createTask, isPending: creating } = useCreateTask();
  const { mutate: updateTask, isPending: updating } = useUpdateTask(
    task?.id ?? 0
  );
  const { mutate: updateTaskStatus } = useUpdateTaskStatus(
    task?.id ?? 0,
    String(boardId)
  );

  // Заполняем форму значениями при открытии модального окна для редактирования
  useEffect(() => {
    if (!visible) return;
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        boardId: task.boardId,
        priority: task.priority,
        status: task.status,
        assignee: task.assignee?.id,
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  // Обработчик сохранения задачи
  const handleSave = (values: any) => {
    const payload = {
      ...values,
      assigneeId: values.assignee,
    };

    // Проверяем, изменился ли только статус задачи
    const isOnlyStatusChanged =
      task &&
      values.status !== task.status &&
      values.title === task.title &&
      values.description === task.description &&
      values.boardId === task.boardId &&
      values.priority === task.priority &&
      values.assignee === task.assignee?.id;

    if (task) {
      if (isOnlyStatusChanged) {
        // Обновляем только статус задачи
        updateTaskStatus(values.status, {
          onSuccess: () => {
            form.resetFields();
            onClose();
          },
          onError: (error) => {
            console.error("Ошибка обновления статуса:", error);
          },
        });
      } else {
        // Обновляем задачу (не только статус)
        updateTask(payload, {
          onSuccess: () => {
            form.resetFields();
            onClose();
          },
          onError: (error) => {
            console.error("Ошибка обновления:", error);
          },
        });
      }
    } else {
      // Создаем новую задачу
      createTask(payload, {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
        onError: (error) => {
          console.error("Ошибка создания:", error);
        },
      });
    }
  };

  return (
    <Modal
      open={visible}
      title={task ? "Редактирование задачи" : "Создание новой задачи"}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        {/* Поле для названия задачи */}
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: "Введите название задачи" }]}
        >
          <Input placeholder="Введите название задачи" />
        </Form.Item>

        {/* Поле для описания задачи */}
        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: "Введите описание задачи" }]}
        >
          <Input.TextArea placeholder="Введите описание задачи" />
        </Form.Item>

        {/* Если есть boardName и boardId, скрываем поле выбора доски и показываем название проекта */}
        {boardName && boardId ? (
          <>
            <Form.Item name="boardId" initialValue={boardId} hidden>
              <Input />
            </Form.Item>

            <Form.Item label="Проект">
              <Input value={boardName} disabled />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            label="Проект"
            name="boardId"
            rules={[{ required: true, message: "Выберите проект" }]}
          >
            <Select
              placeholder="Выберите проект"
              loading={boardsLoading}
              disabled={boardsLoading}
            >
              {boards.map((board) => (
                <Option key={board.id} value={board.id}>
                  {board.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {/* Поле для выбора приоритета */}
        <Form.Item
          label="Приоритет"
          name="priority"
          rules={[{ required: true, message: "Выберите приоритет" }]}
        >
          <Select placeholder="Выберите приоритет">
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>

        {/* Поле для выбора статуса */}
        <Form.Item
          label="Статус"
          name="status"
          rules={[{ required: true, message: "Выберите статус" }]}
        >
          <Select placeholder="Выберите статус">
            <Option value="Backlog">To do</Option>
            <Option value="InProgress">In progress</Option>
            <Option value="Done">Done</Option>
          </Select>
        </Form.Item>

        {/* Поле для выбора исполнителя */}
        <Form.Item
          label="Исполнитель"
          name="assignee"
          rules={[{ required: true, message: "Выберите исполнителя" }]}
        >
          <Select
            placeholder="Выберите исполнителя"
            loading={usersLoading}
            disabled={usersLoading}
          >
            {users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Кнопки для перехода на доску и для сохранения задачи */}
        <div className="buttonsContainer">
          {isIssuesPage && task?.boardId && (
            <Form.Item>
              <NavLink to={`/board/${task.boardId}`} onClick={onClose}>
                <Button type="default" block>
                  Перейти на доску
                </Button>
              </NavLink>
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={creating || updating}
            >
              {task ? "Обновить задачу" : "Создать задачу"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
