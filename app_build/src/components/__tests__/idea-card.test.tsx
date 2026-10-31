import { render, screen } from "@testing-library/react";
import { IdeaCard } from "../idea-card";
import type { Allocation, Idea } from "@/engine/schemas";

describe("IdeaCard", () => {
  it("renders idea with cost band and computed ceiling", () => {
    const idea: Idea = {
      title: "Interactive Live Dessert Counter",
      description: "Chefs prepare personalized desserts live.",
      categoryId: "catering",
      costBand: "medium",
    };
    const alloc: Allocation = {
      categoryId: "catering",
      label: "Catering",
      amount: 10000000,
      weight: 0.3,
      locked: false,
      pct: 30,
    };
    render(<IdeaCard idea={idea} allocation={alloc} />);
    expect(screen.getByText("Interactive Live Dessert Counter")).toBeInTheDocument();
    expect(screen.getByText("medium Cost")).toBeInTheDocument();
    expect(screen.getByText("≤ ₹35,000")).toBeInTheDocument();
  });
});

