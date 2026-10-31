import { render, screen } from "@testing-library/react";
import { FeasibilityBadge } from "../feasibility-badge";

describe("FeasibilityBadge", () => {
  it("renders comfortable verdict with icon and text", () => {
    render(<FeasibilityBadge verdict="comfortable" />);
    expect(screen.getByText("Comfortable Budget")).toBeInTheDocument();
  });

  it("renders tight verdict with icon and text", () => {
    render(<FeasibilityBadge verdict="tight" />);
    expect(screen.getByText("Tight Budget")).toBeInTheDocument();
  });

  it("renders unrealistic verdict with icon and text", () => {
    render(<FeasibilityBadge verdict="unrealistic" />);
    expect(screen.getByText("Unrealistic Budget")).toBeInTheDocument();
  });
});

