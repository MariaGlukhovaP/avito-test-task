import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CreateTaskButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-task");
  };

  return (
    <Button type="primary" onClick={handleClick}>
      Создать задачу
    </Button>
  );
};

export default CreateTaskButton;
