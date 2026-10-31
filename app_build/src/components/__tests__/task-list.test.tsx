import { render, screen, fireEvent } from "@testing-library/react";
import { TaskList } from "../task-list";
import { createSamplePlan } from "@/lib/sample-plan";

describe("TaskList", () => {
  it("renders tasks and allows adding a new task", () => {
    const plan = createSamplePlan();
    const onUpdate = jest.fn();
    render(<TaskList plan={plan} onUpdatePlan={onUpdate} />);

    expect(screen.getByText("Add Custom Timeline Task")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("e.g. Schedule Bridal Trial");
    fireEvent.change(input, { target: { value: "Book Sangeet Choreographer" } });

    fireEvent.click(screen.getByRole("button", { name: "Add Task" }));
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it("toggles task done status", () => {
    const plan = createSamplePlan();
    const onUpdate = jest.fn();
    render(<TaskList plan={plan} onUpdatePlan={onUpdate} />);

    const toggleBtns = screen.getAllByRole("button", { name: /mark .* as complete/i });
    expect(toggleBtns.length).toBeGreaterThan(0);
    fireEvent.click(toggleBtns[0]);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });
});

