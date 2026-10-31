import { render, screen, fireEvent } from "@testing-library/react";
import { IntakeWizard } from "../intake-wizard";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("IntakeWizard", () => {
  it("navigates through wizard steps and submits plan", () => {
    render(<IntakeWizard />);
    expect(screen.getByText("Choose Celebration Type")).toBeInTheDocument();

    fireEvent.click(screen.getByText("birthday"));
    fireEvent.click(screen.getByText("wedding"));

    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Event Name & Date")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Celebration Name"), { target: { value: "Rohit & Ananya" } });
    fireEvent.change(screen.getByLabelText("Target Date"), { target: { value: "2026-12-15" } });
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Scale & Budget")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Guest Count"), { target: { value: "300" } });
    fireEvent.change(screen.getByLabelText("City Tier"), { target: { value: "tier-1" } });
    fireEvent.change(screen.getByLabelText("Total Budget (₹)"), { target: { value: "2000000" } });
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText(/Priority Categories/i)).toBeInTheDocument();

    const prioBtn = screen.getByText("Venue");
    fireEvent.click(prioBtn);
    fireEvent.click(prioBtn);
    fireEvent.click(prioBtn);

    fireEvent.click(screen.getByText("Back"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByText("Create Plan"));
    expect(mockPush).toHaveBeenCalledWith("/plan");
  });
});

