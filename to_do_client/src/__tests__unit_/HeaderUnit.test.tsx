import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from "react-test-renderer";
import axios from "axios";
import { createTask } from "../components/Header";
import { Header } from "../components/Header";
import { ITask } from "../App";
import { filterWhiteSpaceInput } from "../components/Header";
import { ResponseCreateTask } from "../components/Header";

vi.mock("axios");

describe("Header", () => {
  describe("createTask()", () => {
    it("will return if a task was created and that task's id", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.post.mockResolvedValue({
        data: { itemCreated: true, id: 1 },
      })<ResponseCreateTask>;
      const newTasks = await createTask("new task/");
      expect(newTasks).toStrictEqual({ itemCreated: true, id: 1 });
    });
  });

  describe("filterWhiteSpaceInput()",()=>{
    it("will return true if input has something other than whitespace",()=>{
      const cleanInput= filterWhiteSpaceInput("        yes")
      expect(cleanInput).toBeTruthy
    })
    it("will return false if input has only whitespace",()=>{
      const cleanInput= filterWhiteSpaceInput("        ")
      expect(cleanInput).toBeFalsy
    })
  })



  it("will create and match snapshot", () => {
    let allTasks: ITask[] = [];
    const setAllTasks = (newAllTasks: ITask[]) => {
      allTasks = newAllTasks;
    };
    const myHeader = TestRenderer.create(
      <Header allTasks={allTasks} setAllTasks={setAllTasks} />
    );
    expect(myHeader).toMatchSnapshot();
  });
});
