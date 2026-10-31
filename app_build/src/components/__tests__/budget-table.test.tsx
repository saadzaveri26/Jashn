import { render, screen, fireEvent } from "@testing-library/react";
import { BudgetTable } from "../budget-table";
import { createSamplePlan } from "@/lib/sample-plan";

describe("BudgetTable", () => {
  it("renders category allocations and handles lock toggles", () => {
    const plan = createSamplePlan();
    const onUpdate = jest.fn();
    render(<BudgetTable plan={plan} onUpdatePlan={onUpdate} />);

    expect(screen.getByText("Category Allocations")).toBeInTheDocument();
    expect(screen.getByText("Venue")).toBeInTheDocument();

    const lockButtons = screen.getAllByRole("button", { name: /lock/i });
    expect(lockButtons.length).toBeGreaterThan(0);
    fireEvent.click(lockButtons[0]);
    expect(onUpdate).toHaveBeenCalledTimes(1);

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "500000" } });
    expect(onUpdate).toHaveBeenCalled();

    const sliders = screen.getAllByRole("slider");
    fireEvent.change(sliders[0], { target: { value: "600000" } });
    expect(onUpdate).toHaveBeenCalled();
  });
});

