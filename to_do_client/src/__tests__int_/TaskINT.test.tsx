import { describe, expect, it } from "vitest";
import axios from "axios";
import { changeTaskStatus, deleteTask } from "../components/Task";

describe("Task", () => {
  describe("changeTaskStatus()", () => {
    it("Will return true if the completed status of a task was updated.", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const success = await changeTaskStatus(1);

      expect(success).toBe(true);
    });
  });

  describe("deleteTask()", () => {
    it("will return if it successfully deleted the task", async () => {
      axios.defaults.baseURL = "http://localhost:8000/";

      const deleted = await deleteTask(4);
      
      expect(deleted).toBe(true);
    });
  });
});
