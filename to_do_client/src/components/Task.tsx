import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import axios from "axios";

interface TaskProps {
  task: ITask;
  allTasks: ITask[];
  setAllTasks: (pendTasks: ITask[]) => void;
}

export const changeTaskStatus = async (id: number) => {
  try {
    let response = await axios.put(`changestatus/${id}`);
    return response.data.changed;
  } catch (err) {
    alert(err);
    return false;
  }
};

export const Task: React.FC<TaskProps> = ({ task, allTasks, setAllTasks }) => {
  const changeStatus = async (clicked: boolean, taskToChange: ITask) => {
    let response = await changeTaskStatus(taskToChange["id"]);
    if (response) {
      setAllTasks(allTasks.filter((task) => task !== taskToChange));
      taskToChange.completed = clicked;
      setAllTasks([...allTasks]);
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
