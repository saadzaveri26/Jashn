import { render, screen, fireEvent } from "@testing-library/react";
import { ExportMenu } from "../export-menu";
import { createSamplePlan } from "@/lib/sample-plan";

describe("ExportMenu", () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => "mock-url");
    global.URL.revokeObjectURL = jest.fn();
    window.print = jest.fn();
  });

  it("renders export buttons and triggers downloads", () => {
    const plan = createSamplePlan();
    render(<ExportMenu plan={plan} />);

    expect(screen.getByText("Export & Share Celebration Plan")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Calendar (.ics)"));
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Budget CSV"));
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Quotes CSV"));
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Plan Backup (JSON)"));
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Print Summary"));
    expect(window.print).toHaveBeenCalled();
  });
});

