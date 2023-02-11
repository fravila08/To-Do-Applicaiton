import { describe, expect, it } from "vitest";
import axios from "axios";
import {
  changeSelectedTasks,
  createTask,
  deleteMultTasks,
} from "../components/Header";

describe("Header", () => {
  describe("createTask()", () => {
    it("will return if a task was created and that task's id", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";
      const newTasks = await createTask("new task");
      expect(newTasks.itemCreated).toBe(true);
    });
  });

  describe("changeSelectedTasks", () => {
    it("will return true if it successfully changed the selected tasks completed status", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";
      const changedSelectedTasks = await changeSelectedTasks([1, 2, 3]);
      expect(changedSelectedTasks).toBe(true);
    });
  });

  describe("deleteMultTasks()", () => {
    it("will return if it successfully deleted all selected tasks", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";
      const deletedTasks = await deleteMultTasks([1, 2, 3]);
      expect(deletedTasks).toBe(true);
    });
  });
});
