import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITask } from "../App";
import Form from "react-bootstrap/Form";
import axios from "axios";
import done from "../assets/done.png";
import pending from "../assets/pending.png";
import Button from "react-bootstrap/esm/Button";
import trash from "../assets/trash.png";
import editPic from "../assets/edit.png";
import cancelPic from "../assets/cancel.png";
import confirmPic from "../assets/confirm.png"
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

export const changeTaskTitle = async (id:number, name:string) => {
  try {
    let response = await axios.put(`task/${id}/`, {"name": name})
    return response.data.changed
  } catch (err) {
    alert (err)
    return false
  }
}

export const Task: React.FC<TaskProps> = ({
  task,
  setSelectedTasks,
  selectedTasks,
  allTasks,
  setAllTasks,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>('')

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

  const alterTaskTitle = async ( taskToChange: ITask) => {
    let response = await changeTaskTitle(task.id, newTitle)
    if (response){
      setAllTasks(allTasks.filter(task => task !== taskToChange))
      taskToChange.title = newTitle
      setAllTasks([...allTasks])
      setTaskTitle(newTitle)
    }
  }

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
      {showForm ? (
        <Col id={`task${task.id}`} xs={7} className="taskTitle">
          {taskTitle}
        </Col>
      ) : (
        <Col xs={7} style={{display:"flex", justifyContent:"center", alignItems:"center"}} className="taskTitle">
          <Form.Control style={{height:"3vh"}} placeholder={taskTitle} value={newTitle} onChange={(e)=> setNewTitle(e.target.value)}/>
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
      {showForm?
      <Col xs={2} style={{display:"flex"}}>
        <Button
          id={`deleteBtn${task.id}`}
          className="delBtn"
          variant="danger"
          onClick={() => deleteATask(task.id)}
        >
          <img src={trash} style={{ height: "2vh" }} />
        </Button>
        <Button id="delBtn" variant="warning" onClick={() => setShowForm(!showForm)}>
          <img src={editPic} style={{ height: "2vh" }} />
        </Button>
      </Col>
      :
      <Col xs={2} style={{display:"flex"}}>
        <Button id="delBtn" variant="warning" onClick={()=>[setShowForm(!showForm), setNewTitle("")]}>
          <img src={ cancelPic } style={{ height: "2vh" }} />
        </Button>
        <Button id="delBtn" variant="success" onClick={()=>[alterTaskTitle(task), setShowForm(!showForm)]}>
          <img src={ confirmPic} style={{ height: "2vh" }} />
        </Button>
      </Col>
      }
    </Row>
  );
};
