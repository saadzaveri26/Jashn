import { render, screen, fireEvent } from "@testing-library/react";
import PlanLayout from "@/app/plan/layout";
import PlanAssistantPage from "@/app/plan/assistant/page";
import { setStoredPlan } from "@/lib/storage";
import { createSamplePlan } from "@/lib/sample-plan";

jest.mock("next/navigation", () => ({
  usePathname: () => "/plan",
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

jest.mock("next/dynamic", () => () => {
  return function MockDynamic(props: { onApplyAction?: () => void }) {
    if (props.onApplyAction) {
      return <button onClick={props.onApplyAction}>Apply Action</button>;
    }
    return <div data-testid="celebration-burst">Burst</div>;
  };
});

describe("Celebration Burst Lifecycle", () => {
  beforeEach(() => {
    localStorage.clear();
    setStoredPlan(null);
    Object.defineProperty(window, "location", {
      value: { search: "", pathname: "/plan" },
      writable: true,
      configurable: true,
    });
  });

  it("does not fire burst on regular plan load with pending tasks", () => {
    const plan = createSamplePlan();
    setStoredPlan(plan);
    render(
      <PlanLayout>
        <div>Content</div>
      </PlanLayout>
    );

    expect(screen.queryByTestId("celebration-burst")).toBeNull();
  });

  it("fires burst when query string contains burst=sample", () => {
    const plan = createSamplePlan();
    setStoredPlan(plan);
    Object.defineProperty(window, "location", {
      value: { search: "?burst=sample", pathname: "/plan" },
      writable: true,
      configurable: true,
    });

    render(
      <PlanLayout>
        <div>Content</div>
      </PlanLayout>
    );

    expect(screen.getByTestId("celebration-burst")).toBeInTheDocument();
  });

  it("fires burst when all plan tasks are marked complete", () => {
    const plan = createSamplePlan();
    plan.tasks = plan.tasks.map((t) => ({ ...t, done: true }));
    setStoredPlan(plan);

    render(
      <PlanLayout>
        <div>Content</div>
      </PlanLayout>
    );

    expect(screen.getByTestId("celebration-burst")).toBeInTheDocument();
  });

  it("fires burst on action apply in assistant page", () => {
    const plan = createSamplePlan();
    setStoredPlan(plan);

    render(<PlanAssistantPage />);
    expect(screen.queryByTestId("celebration-burst")).toBeNull();

    fireEvent.click(screen.getByText("Apply Action"));
    expect(screen.getByTestId("celebration-burst")).toBeInTheDocument();
  });
});
