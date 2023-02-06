import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ITask } from "../App";

interface HeaderProps {
  selectedTasks: number[];
  setSelectedTasks: (selectedTasks: number[]) => void;
  allTasks: ITask[];
  setAllTasks: (allTasks: ITask[]) => void;
}

export interface ResponseCreateTask {
  itemCreated: boolean;
  id: number;
}

export const createTask = async (str: string): Promise<ResponseCreateTask> => {
  let response = await axios.post("newtask", {
    name: str,
  });
  return response["data"];
};

export const changeSelectedTasks = async (lst: number[]) => {
  let resposne = await axios.put("changemultiple", { selected: lst });
  return resposne.data.success;
};

export const Header: React.FC<HeaderProps> = ({
  allTasks,
  setAllTasks,
  selectedTasks,
  setSelectedTasks,
}) => {
  const [showCreate, setShowCreate] = useState(true);
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

  const evalChangeStatus=():boolean=>{
    let mylist = selectedTasks
    return mylist.length < 1
  }

  useEffect(()=>{
    evalChangeStatus()
  },[selectedTasks])

  useEffect(() => {
    let evalInput = newTask.replaceAll(" ", "");
    if (evalInput.length >= 1 && evalInput != "") {
      setShowCreate(false);
    } else {
      setShowCreate(true);
    }
  }, [newTask]);

  const creatingNewTask = async (
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
        <Col xs={4}>
          <Button
            onClick={changingMultipleStatus}
            disabled={evalChangeStatus()}
          >
            CS
          </Button>
        </Col>
        <Col xs={8} className="formHolder">
          <Form onSubmit={(e) => creatingNewTask(newTask, e)}>
            <Form.Control
              value={newTask}
              id="createTaskInput"
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button
              variant="success"
              id="createTaskButton"
              disabled={showCreate}
              type="submit"
            >
              Create
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
