import { describe, expect, it } from "vitest";
import axios from "axios";
import { changeSelectedTasks, createTask } from "../components/Header";

describe("Header", () => {
  describe("createTask()", () => {
    it("retuns true if a task is created", async () => {
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
});
