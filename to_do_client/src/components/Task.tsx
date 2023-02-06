import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import axios from "axios";

interface TaskProps {
  task: ITask;
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
}

export const changeTaskStatus = async (id: number) => {
  let response = await axios.put(`changestatus/${id}`);
  return response.data.changed;
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

  return (
    <Row className="task">
      <Col>
        <Form.Check
          type="checkbox"
          onChange={(e) =>
            e.target.checked
              ? setSelectedTasks([...selectedTasks, task.id])
              : setSelectedTasks(selectedTasks.filter((id) => id !== task.id))
          }
        />
      </Col>
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
