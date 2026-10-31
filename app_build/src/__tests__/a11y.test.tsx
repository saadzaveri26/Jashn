import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import HomePage from "@/app/page";
import NewPlanPage from "@/app/new/page";
import NotFound from "@/app/not-found";

expect.extend(toHaveNoViolations);

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  usePathname: () => "/",
}));

describe("Accessibility (jest-axe)", () => {
  it("HomePage has no axe violations", async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("NewPlanPage has no axe violations", async () => {
    const { container } = render(<NewPlanPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("NotFound page has no axe violations", async () => {
    const { container } = render(<NotFound />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

