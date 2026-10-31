import { render, screen, fireEvent } from "@testing-library/react";
import { ActionCard } from "../action-card";
import type { Action } from "@/engine/schemas";

describe("ActionCard", () => {
  it("renders adjust_category action and triggers Apply and Dismiss", () => {
    const act: Action = {
      type: "adjust_category",
      categoryId: "catering",
      newAmount: 25000000,
    };
    const onApply = jest.fn();
    const onDismiss = jest.fn();
    render(<ActionCard action={act} onApply={onApply} onDismiss={onDismiss} />);

    expect(screen.getByText("Adjust catering budget")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Apply"));
    expect(onApply).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("renders add_task action", () => {
    const act: Action = {
      type: "add_task",
      title: "Hire Pandit",
      categoryId: "venue",
      leadDays: 45,
    };
    render(<ActionCard action={act} onApply={jest.fn()} onDismiss={jest.fn()} />);
    expect(screen.getByText("Add task: Hire Pandit")).toBeInTheDocument();
  });

  it("renders set_guest_count action", () => {
    const act: Action = {
      type: "set_guest_count",
      guests: 350,
    };
    render(<ActionCard action={act} onApply={jest.fn()} onDismiss={jest.fn()} />);
    expect(screen.getByText("Update guest count to 350")).toBeInTheDocument();
  });
});

