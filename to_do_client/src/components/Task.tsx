import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import axios, { all } from "axios";
import done from "../assets/done.png";
import pending from "../assets/pending.png";
import Button from "react-bootstrap/esm/Button";
import trash from "../assets/trash.png";
import editPic from "../assets/edit.png";
import cancelPic from "../assets/cancel.png";
import confirmPic from "../assets/confirm.png";
import { useState } from "react";

export interface TaskProps {
  task: ITask;
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
}

export const changeTaskStatus = async (id: number) => {
  try {
    let response = await axios.put(`task/${id}/`);
    return response.data.changed;
  } catch (err) {
    alert(err);
    return false;
  }
};

export const deleteTask = async (id: number) => {
  try {
    let response = await axios.delete(`task/${id}/`);
    return response.data.success;
  } catch (err) {
    alert(err);
    return false;
  }
};

export const changeTaskTitle = async (id: number, name: string) => {
  try {
    let response = await axios.put(`task/${id}/`, { name: name });
    return response.data.changed;
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
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>(task.title);

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
      let selectedTask = document.getElementById(`taskMaster${id}`);
      if (selectedTask) {
        selectedTask.style.display = "none";
      }
    }
  };

  const alterTaskTitle = async (taskToChange: ITask) => {
    let response = await changeTaskTitle(task.id, newTitle);
    if (response) {
      setAllTasks(allTasks.filter((task) => task !== taskToChange));
      taskToChange.title = newTitle;
      setAllTasks([...allTasks]);
      setTaskTitle(newTitle);
    }
  };

  return (
    <Row id={`taskMaster${task.id}`} className="task">
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
      {showForm ? (
        <Col id={`task${task.id}`} xs={7} className="taskTitle">
          {taskTitle}
        </Col>
      ) : (
        <Col
          xs={7}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="taskTitle"
        >
          <Form.Control
            id={`newTitleForm${task.id}`}
            style={{ height: "3vh" }}
            placeholder={taskTitle}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Col>
      )}
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
      {showForm ? (
        <Col xs={2} className="buttonHolder" >
          <Button
            id={`deleteBtn${task.id}`}
            className="alterBtn"
            variant="danger"
            onClick={() => deleteATask(task.id)}
          >
            <img className="buttonImg" src={trash}  />
          </Button>
          <Button
            id={`showChangeForm${task.id}`}
            className="alterBtn"
            variant="warning"
            onClick={() => setShowForm(!showForm)}
          >
            <img className="buttonImg" src={editPic}  />
          </Button>
        </Col>
      ) : (
        <Col xs={2} className="buttonHolder" >
          <Button
            className="alterBtn"
            variant="warning"
            onClick={() => [setShowForm(!showForm), setNewTitle(task.title)]}
          >
            <img className="buttonImg" src={cancelPic}  />
          </Button>
          <Button
            id={`confirmChange${task.id}`}
            className="alterBtn"
            variant="success"
            onClick={() => [alterTaskTitle(task), setShowForm(!showForm)]}
          >
            <img className="buttonImg" src={confirmPic}  />
          </Button>
        </Col>
      )}
    </Row>
  );
};
