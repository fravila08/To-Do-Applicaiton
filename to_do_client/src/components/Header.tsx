import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ITask } from "../App";
import plus from "../assets/plus.png";

interface HeaderProps {
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
}

export interface ResponseCreateTask {
  itemCreated: boolean;
  id: number;
}

export const createTask = async (
  taskTitle: string
): Promise<ResponseCreateTask> => {
  try {
    let response = await axios.post("newtask/", {
      name: taskTitle,
    });
    return response["data"];
  } catch (err) {
    alert(err);
    return { itemCreated: false, id: 0 };
  }
};

export const isTaskTitleEmpty = (taskTitle: string) => {
  let cleanInput = taskTitle.replaceAll(" ", "");
  if (cleanInput.length >= 1 && cleanInput != "") {
    return false;
  } else {
    return true;
  }
};

export const Header: React.FC<HeaderProps> = ({ allTasks, setAllTasks }) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setIsSubmitDisabled(isTaskTitleEmpty(newTask));
  }, [newTask]);

  const createNewTask = async (
    str: string,
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    let response = await createTask(str);
    if (response.itemCreated) {
      setAllTasks([
        ...allTasks,
        { id: response.id, title: str, completed: false },
      ]);
      setNewTask("");
    }
  };

  return (
    <Container style={{ marginBottom: "1vh" }}>
      <Row>
        <Col xs={4}></Col>
        <Col xs={8} className="formHolder">
          <Form
            style={{ position: "relative" }}
            onSubmit={(e) => createNewTask(newTask, e)}
          >
            <Form.Control
              value={newTask}
              id="createTaskInput"
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button
              variant="success"
              id="createTaskButton"
              disabled={isSubmitDisabled}
              type="submit"
            >
              <img src={plus} style={{ height: "2vh" }} />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
