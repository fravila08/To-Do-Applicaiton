import { describe, expect, it } from "vitest";
import TestRenderer from "react-test-renderer";
import { TaskRenderer } from "../components/TaskRenderer";
import { ITask } from "../App";

describe("TaskRenderer", () => {
  it("will create and match a snapshot", () => {
    let completed: boolean = true;
    let allTasks: ITask[] = [];
    const setAllTasks = (tl: ITask[]) => {
      allTasks = tl;
    };
    let selected: number[] = [];
    const setSelected = (nl: number[]) => {
      selected = nl;
    };
    const taskRenderer = TestRenderer.create(
      <TaskRenderer
        completed={completed}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        selectedTasks={selected}
        setSelectedTasks={setSelected}
      />
    );

    expect(taskRenderer).toMatchSnapshot();
  });
});
