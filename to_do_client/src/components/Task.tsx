import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import axios from "axios";

interface TaskProps {
  task: ITask;
  pendingTasks: ITask[];
  setPendingTasks: (pendTasks: ITask[]) => void;
  completedTasks: ITask[];
  setCompletedTasks: (completedTasks: ITask[]) => void;
}

export const changeTaskStatus = async (id: number) => {
  let response = await axios.put(`changestatus/${id}`);
  return response.data.changed;
};

export const Task: React.FC<TaskProps> = ({
  task,
  pendingTasks,
  setPendingTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  
  const changeStatus = async (clicked: boolean, taskToChange: ITask) => {
    let response = await changeTaskStatus(taskToChange["id"]);
    if (response) {
      if (clicked) {
        taskToChange.completed = clicked;
        setCompletedTasks([...completedTasks, taskToChange]);
        setPendingTasks(pendingTasks.filter((task) => task !== taskToChange));
      } else {
        taskToChange.completed = clicked;
        setCompletedTasks(
          completedTasks.filter((task) => taskToChange !== task)
        );
        setPendingTasks([...pendingTasks, taskToChange]);
      }
    }
  };

  return (
    <Row className="task">
      <Col id={`task${task.id}`} xs={9} className="taskTitle">
        {task.title}
      </Col>
      <Col style={{ display: "flex" }}>
        <Form.Check
          id={`taskCheck${task.id}`}
          type="checkbox"
          label="Done"
          checked={task.completed}
          onChange={(e) => changeStatus(e.target.checked, task)}
        />
      </Col>
    </Row>
  );
};
