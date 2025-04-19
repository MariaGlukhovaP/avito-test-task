import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { Issue } from "../../types/issue";
import { useBoards } from "../../services/useBoards";
import { useUsers } from "../../services/useUsers";
import { useCreateTask, useUpdateTask } from "../../services/useMutateTask";
import { useLocation, NavLink } from "react-router-dom";

const { Option } = Select;

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  task?: Issue;
  boardName?: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  task,
  boardName,
}) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const isIssuesPage = location.pathname === "/issues";

  const { data: boards = [], isLoading: boardsLoading } = useBoards();
  const { data: users = [], isLoading: usersLoading } = useUsers();

  const { mutate: createTask, isPending: creating } = useCreateTask();
  const { mutate: updateTask, isPending: updating } = useUpdateTask(
    task?.id ?? 0
  );

  useEffect(() => {
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

  const handleSave = (values: any) => {
    const payload = {
      ...values,
      assigneeId: values.assignee,
    };

    if (task) {
      updateTask(payload, {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
        onError: (error) => {
          console.error("Ошибка обновления:", error);
        },
      });
    } else {
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
        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: "Введите название задачи" }]}
        >
          <Input placeholder="Введите название задачи" />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: "Введите описание задачи" }]}
        >
          <Input.TextArea placeholder="Введите описание задачи" />
        </Form.Item>

        {boardName && (
          <Form.Item label="Доска" name="boardName">
            <Input value={boardName} disabled />
          </Form.Item>
        )}

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

        <Form.Item
          label="Статус"
          name="status"
          rules={[{ required: true, message: "Выберите статус" }]}
        >
          <Select placeholder="Выберите статус">
            <Option value="open">To do</Option>
            <Option value="in_progress">In Progress</Option>
            <Option value="closed">Done</Option>
            <Option value="backlog">Backlog</Option>
          </Select>
        </Form.Item>

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

        {isIssuesPage && task?.boardId && (
          <Form.Item>
            <NavLink
              to={`/board/${task.boardId}`}
              onClick={onClose}
              style={{ display: "block" }}
            >
              <Button type="default" block>
                Перейти на доску
              </Button>
            </NavLink>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
