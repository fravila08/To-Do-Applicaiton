import { describe, expect, it, vi, Mocked } from "vitest";
import TestRenderer from "react-test-renderer";
import axios from "axios";
import { getTasks } from "../App";
import App from "../App";

vi.mock("axios");

describe("App", () => {
  describe("getTasks()", () => {
    it("will return an array of tasks", async () => {
      const mockedAxios = axios as Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { tasks: [] } });
      const tasks = await getTasks();
      expect(tasks).toStrictEqual([]);
    });
  });

  it("will create and match snapshot", () => {
    const myApp = TestRenderer.create(<App />);
    expect(myApp).toMatchSnapshot();
  });
});
