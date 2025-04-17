import { Modal, Form, Input, Button } from "antd";
import { useState } from "react";

const TaskModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const handleCancel = () => setIsVisible(false);

  const handleSubmit = (values: any) => {
    console.log("Задача обновлена:", values);
    setIsVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Редактировать задачу
      </Button>
      <Modal
        title="Редактировать задачу"
        visible={isVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Название задачи"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите название задачи!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[
              { required: true, message: "Пожалуйста, введите описание!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskModal;
