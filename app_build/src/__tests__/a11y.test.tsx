import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import HomePage from "@/app/page";
import NewPlanPage from "@/app/new/page";
import SamplePage from "@/app/sample/page";
import NotFound from "@/app/not-found";
import ErrorBoundary from "@/app/error";
import PlanLayout from "@/app/plan/layout";
import PlanOverviewPage from "@/app/plan/page";
import { setStoredPlan } from "@/lib/storage";
import { createSamplePlan } from "@/lib/sample-plan";

expect.extend(toHaveNoViolations);

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => "/plan",
}));

describe("Accessibility (jest-axe) across Light and Dark Themes", () => {
  beforeEach(() => {
    localStorage.clear();
    const plan = createSamplePlan();
    setStoredPlan(plan);
  });

  const themes = ["light", "dark"] as const;

  themes.forEach((theme) => {
    describe(`${theme} theme`, () => {
      beforeEach(() => {
        document.documentElement.className = theme === "dark" ? "dark" : "";
      });

      it(`HomePage has no axe violations in ${theme}`, async () => {
        const { container } = render(<HomePage />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it(`NewPlanPage has no axe violations in ${theme}`, async () => {
        const { container } = render(<NewPlanPage />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it(`SamplePage has no axe violations in ${theme}`, async () => {
        const { container } = render(<SamplePage />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it(`NotFound page has no axe violations in ${theme}`, async () => {
        const { container } = render(<NotFound />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it(`ErrorBoundary has no axe violations in ${theme}`, async () => {
        const { container } = render(
          <ErrorBoundary
            error={new Error("Test error")}
            reset={() => {}}
          />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it(`PlanOverviewPage in PlanLayout has no axe violations in ${theme}`, async () => {
        const { container } = render(
          <PlanLayout>
            <PlanOverviewPage />
          </PlanLayout>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
