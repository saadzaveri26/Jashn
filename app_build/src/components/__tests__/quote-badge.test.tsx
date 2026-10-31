import { render, screen } from "@testing-library/react";
import { QuoteBadge } from "../quote-badge";

describe("QuoteBadge", () => {
  it("renders under status with icon and text", () => {
    render(<QuoteBadge comparison={{ verdict: "under", deltaPct: -10, deltaMinor: -1000 }} />);
    expect(screen.getByText("Under by 10%")).toBeInTheDocument();
  });

  it("renders within status with icon and text", () => {
    render(<QuoteBadge comparison={{ verdict: "within", deltaPct: 2, deltaMinor: 200 }} />);
    expect(screen.getByText("Within target (±5%)")).toBeInTheDocument();
  });

  it("renders over status with icon and text", () => {
    render(<QuoteBadge comparison={{ verdict: "over", deltaPct: 15, deltaMinor: 1500 }} />);
    expect(screen.getByText("Over by 15%")).toBeInTheDocument();
  });
});

