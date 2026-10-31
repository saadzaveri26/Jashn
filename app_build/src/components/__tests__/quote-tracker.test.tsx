import { render, screen, fireEvent } from "@testing-library/react";
import { QuoteTracker } from "../quote-form";
import { createSamplePlan } from "@/lib/sample-plan";

describe("QuoteTracker", () => {
  it("renders logged quotes, allows adding and deleting quotes", () => {
    const plan = createSamplePlan();
    const onUpdate = jest.fn();
    render(<QuoteTracker plan={plan} onUpdatePlan={onUpdate} />);

    expect(screen.getByText("Log Vendor Quote")).toBeInTheDocument();
    expect(screen.getByText("Gulmohar Heritage Palace")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("e.g. Grand Heritage Hall"), { target: { value: "New Caterer" } });
    fireEvent.change(screen.getByPlaceholderText("250000"), { target: { value: "150000" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Quote" }));
    expect(onUpdate).toHaveBeenCalledTimes(1);

    const deleteBtns = screen.getAllByRole("button", { name: /delete quote/i });
    expect(deleteBtns.length).toBeGreaterThan(0);
    fireEvent.click(deleteBtns[0]);
    expect(onUpdate).toHaveBeenCalledTimes(2);
  });
});

