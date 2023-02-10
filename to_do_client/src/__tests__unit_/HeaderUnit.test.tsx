import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from "react-test-renderer";
import axios from "axios";
import { createTask } from "../components/Header";
import { Header } from "../components/Header";
import { ITask } from "../App";
import { isTaskTitleEmpty } from "../components/Header";
import { ResponseCreateTask } from "../components/Header";
import { changeSelectedTasks } from "../components/Header";

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

  describe("changeSelectedTasks()", () => {
    it("Will return if request was successful", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.put.mockResolvedValue({
        data: { success: true },
      });
      const changedMultipleTasks = await changeSelectedTasks([1, 2, 3]);
      expect(changedMultipleTasks).toBeTruthy();
    });
  });

  describe("isTaskTitleEmpty()", () => {
    it("will return true if input has something other than whitespace", () => {
      const cleanInput = isTaskTitleEmpty("    yes    ");

      expect(cleanInput).toBe(false);
    });

    it("will return false if input has only whitespace", () => {
      const cleanInput = isTaskTitleEmpty("        ");

      expect(cleanInput).toBe(true);
    });
  });

  it("will create and match snapshot", () => {
    let allTasks: ITask[] = [];
    const setAllTasks = (newAllTasks: ITask[]) => {
      allTasks = newAllTasks;
    };
    let selectedTasks: number[] = [];
    const setSelectedTasks = (nl: number[]) => {
      selectedTasks = nl;
    };

    const myHeader = TestRenderer.create(
      <Header
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
      />
    );
    
    expect(myHeader).toMatchSnapshot();
  });
});
