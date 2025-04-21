import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { Issue } from "../../types/issue";
import { useBoards } from "../../services/useBoards";
import { useUsers } from "../../services/useUsers";
import { useCreateTask, useUpdateTask } from "../../services/useMutateTask";
import { useLocation, NavLink } from "react-router-dom";
import { useUpdateTaskStatus } from "../../services/useUpdateTaskStatus";
import { useQueryClient } from "@tanstack/react-query";
import "./taskModal.css";

const { Option } = Select;

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  task?: Issue;
  boardName?: string;
  boardId?: number;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
  task,
  boardName,
  boardId,
}) => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const [form] = Form.useForm();
  const location = useLocation();
  const isIssuesPage = location.pathname === "/issues";

  const { data: boards = [], isLoading: boardsLoading } = useBoards();
  const { data: users = [], isLoading: usersLoading } = useUsers();

  const { mutate: createTask, isPending: creating } = useCreateTask();
  const { mutate: updateTask, isPending: updating } = useUpdateTask(
    task?.id ?? 0
  );

  const { mutate: updateTaskStatus } = useUpdateTaskStatus(task?.id ?? 0);

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

  const handleSave = (values: any) => {
    const payload = {
      ...values,
      assigneeId: values.assignee,
    };

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
            <Option value="Backlog">To do</Option>
            <Option value="InProgress">In progress</Option>
            <Option value="Done">Done</Option>
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
