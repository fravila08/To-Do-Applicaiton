import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import axios from "axios";
import done from "../assets/done.png";
import pending from "../assets/pending.png";
import Button from "react-bootstrap/esm/Button";
import trash from "../assets/trash.png"

export interface TaskProps {
  task: ITask;
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
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

export const deleteTask = async (id: number) => {
  try {
    let response = await axios.delete(`deletetask/${id}`);
    return response.data.success;
  } catch (err) {
    alert(err);
    return false;
  }
};

export const Task: React.FC<TaskProps> = ({
  task,
  setSelectedTasks,
  selectedTasks,
  allTasks,
  setAllTasks,
}) => {
  const changeStatus = async (clicked: boolean, taskToChange: ITask) => {
    let response = await changeTaskStatus(taskToChange["id"]);
    if (response) {
      setAllTasks(allTasks.filter((task) => task !== taskToChange));
      taskToChange.completed = clicked;
      setAllTasks([...allTasks]);
    }
  };

  const deleteATask = async (id: number) => {
    let response = await deleteTask(id);
    if (response) {
      setAllTasks(allTasks.filter((task) => task.id !== id));
    }
  };

  return (
    <Row className="task">
      <Col xs={1}>
        <Form.Check
          type="checkbox"
          id={`taskSelectedBtn${task.id}`}
          onChange={(e) =>
            e.target.checked
              ? setSelectedTasks([...selectedTasks, task.id])
              : setSelectedTasks(selectedTasks.filter((id) => id !== task.id))
          }
        />
      </Col>
      <Col id={`task${task.id}`} xs={7} className="taskTitle">
        {task.title}
      </Col>
      <Col className="checkHolder" xs={1}>
        <Form.Check
          id={`taskCheck${task.id}`}
          type="checkbox"
          name="checkbox"
          className="check"
          checked={task.completed}
          onChange={(e) => changeStatus(e.target.checked, task)}
        />
        <Form.Label for="checkbox">
          <img className="checkImg" src={task.completed ? done : pending} />
        </Form.Label>
      </Col>
      <Col xs={1}>
        <Button
          id="delBtn"
          variant="danger"
          onClick={() => deleteATask(task.id)}
        >
          <img src={trash} style={{height:"2vh"}} />
        </Button>
      </Col>
    </Row>
  );
};
