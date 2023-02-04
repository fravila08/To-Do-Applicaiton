import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from "react-test-renderer";
import axios from "axios";
import { createTask } from "../components/Header";
import { Header } from "../components/Header";
import { ITask } from "../App";
import { ResponseCreateTask } from "../components/Header";

vi.mock("axios");

describe("Header", () => {
  describe("createTask()", () => {
    it("will return if a task was created and that task's id", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.post.mockResolvedValue({
        data: { itemCreated: true, id: 1 },
      })<ResponseCreateTask>;
      const newTasks = await createTask("new task");
      expect(newTasks).toStrictEqual({ itemCreated: true, id: 1 });
    });
  });
});

describe("Header", () => {
  it("will create and match snapshot", () => {
    let pendTasks: ITask[] = [];
    const setPendTasks = (newPendTasks: ITask[]) => {
      pendTasks = newPendTasks;
    };
    const myHeader = TestRenderer.create(
      <Header pendTasks={pendTasks} setPendTasks={setPendTasks} />
    );
    expect(myHeader).toMatchSnapshot();
  });
});
