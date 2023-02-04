import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITask } from "../App";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <Row className="task">
      <Col xs={9} className="taskTitle">
        {task.title}
      </Col>
    </Row>
  );
};
