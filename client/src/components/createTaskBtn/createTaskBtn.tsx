import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./createTaskButton.css";

const CreateTaskButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-task");
  };

  return (
    <Button type="primary" onClick={handleClick} className="taskButton">
      Создать задачу
    </Button>
  );
};

export default CreateTaskButton;
