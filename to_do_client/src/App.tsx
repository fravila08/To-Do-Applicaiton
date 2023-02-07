import React, { useEffect, useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Task } from "./components/Task";
import axios from "axios";
import { CsrfToken } from "./components/CsrfToken";
import { Header } from "./components/Header";

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export async function getTasks(): Promise<ITask[]> {
  let response = await axios.get("allTasks/");
  return response.data.tasks;
}

function App() {
  const [allTasks, setAllTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const getResponse = async () => {
      let response = await getTasks();
      setAllTasks(response);
    };
    getResponse();
  }, []);

  CsrfToken();

  return (
    <Container className="App">
      <Row id="Header">
        <h1>To Do App</h1>
      </Row>
      <Row>
        <Header allTasks={allTasks} setAllTasks={setAllTasks} />
      </Row>
      <Row>
        <Col xs={1}></Col>
        <Col xs={10} className="listHolder">
          <h5 className="listHeader"> Pending </h5>
          {allTasks.map((task) =>
            task.completed === false ? <Task allTasks={allTasks} setAllTasks={setAllTasks} task={task} /> : null
          )}
        </Col>
        <Col xs={1}></Col>
      </Row>
      <Row>
        <Col xs={1}></Col>
        <Col xs={10} id="CompletedList" className="listHolder">
          <h5 className="listHeader"> Completed </h5>
          {allTasks.map((task) =>
            task.completed ? <Task allTasks={allTasks} setAllTasks={setAllTasks} task={task} /> : null
          )}
        </Col>
        <Col xs={1}></Col>
      </Row>
    </Container>
  );
}

export default App;
