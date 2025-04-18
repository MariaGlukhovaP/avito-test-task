import { Issue } from "../../types/issue";
import TaskCard from "../taskCard/taskCard";

interface TaskListProps {
  tasks: Issue[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="container">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
