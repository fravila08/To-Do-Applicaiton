import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ITask } from "../App";
import plus from "../assets/plus.png";
import change from "../assets/change.png";
import trash from "../assets/trash.png";
import { Toggle } from "./Toggle";

interface HeaderProps {
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
  showPending: boolean;
  setShowPending: (showPending: boolean) => void;
  showCompleted: boolean;
  setShowCompleted: (showCompleted: boolean) => void;
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

export const changeSelectedTasks = async (lst: number[]) => {
  let response = await axios.put("changemultiple", { selected: lst });
  return response.data.success;
};

export const deleteMultTasks = async (lst: number[]) => {
  try {
    let response = await axios.delete("deletemultiple", {
      data: { selected: lst },
    });
    return response.data.success;
  } catch (err) {
    alert(err);
    return false;
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
export const Header: React.FC<HeaderProps> = ({
  allTasks,
  setAllTasks,
  selectedTasks,
  setSelectedTasks,
  showPending,
  setShowPending,
  showCompleted,
  setShowCompleted,
}) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [newTask, setNewTask] = useState("");

  const changingMultipleStatus = async () => {
    let response = await changeSelectedTasks(selectedTasks);
    if (response) {
      allTasks.map((task) => {
        selectedTasks.map((id) => {
          if (task.id === id) {
            task.completed = !task.completed;
          }
        });
      });
      setAllTasks([...allTasks]);
      setSelectedTasks([]);
    }
  };

  const deleteMultipleTasks = async () => {
    let response = await deleteMultTasks(selectedTasks);
    if (response) {
      setAllTasks(allTasks.filter((task) => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
    }
  };

  const isChangeStatusDisabled = (): boolean => {
    let mylist = selectedTasks;
    return mylist.length < 1;
  };

  useEffect(() => {
    isChangeStatusDisabled();
  }, [selectedTasks]);

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
        <Col xs={3} style={{ display: "flex" }}>
          <Button
            style={{
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "10vw",
            }}
            onClick={changingMultipleStatus}
            disabled={isChangeStatusDisabled()}
            id="changeStatusBtn"
          >
            <img src={change} style={{ height: "6vh" }} />
          </Button>
          <Button
            style={{
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "10vw",
            }}
            variant="danger"
            onClick={deleteMultipleTasks}
            disabled={isChangeStatusDisabled()}
            id="DeleteMultBtn"
          >
            <img src={trash} style={{ height: "3vh" }} />
          </Button>
        </Col>
        <Col xs={3}>
          <Toggle
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            showPending={showPending}
            setShowPending={setShowPending}
          />
        </Col>
        <Col xs={6} className="formHolder">
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
