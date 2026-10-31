import { render } from "@testing-library/react";
import {
  ToranaBunting,
  MarigoldGarland,
  JaaliLattice,
  PaisleyCorner,
  Diya,
  RangoliRing,
} from "../index";

describe("Motif Components", () => {
  it("renders ToranaBunting with decorative attributes", () => {
    const { container } = render(<ToranaBunting />);
    const el = container.querySelector("svg");
    expect(el).not.toBeNull();
    expect(el?.getAttribute("aria-hidden")).toBe("true");
    expect(el?.getAttribute("class")).toContain("pointer-events-none");
  });

  it("renders MarigoldGarland with decorative attributes", () => {
    const { container } = render(<MarigoldGarland />);
    const el = container.firstChild as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.getAttribute("aria-hidden")).toBe("true");
    expect(el.getAttribute("class")).toContain("pointer-events-none");
  });

  it("renders JaaliLattice with decorative attributes", () => {
    const { container } = render(<JaaliLattice />);
    const el = container.firstChild as HTMLElement;
    expect(el).not.toBeNull();
    expect(el.getAttribute("aria-hidden")).toBe("true");
    expect(el.getAttribute("class")).toContain("pointer-events-none");
  });

  it("renders PaisleyCorner with decorative attributes", () => {
    const { container } = render(<PaisleyCorner position="top-right" />);
    const el = container.querySelector("svg");
    expect(el).not.toBeNull();
    expect(el?.getAttribute("aria-hidden")).toBe("true");
    expect(el?.getAttribute("class")).toContain("pointer-events-none");
  });

  it("renders Diya both lit and unlit", () => {
    const { container: litBox } = render(<Diya lit={true} />);
    expect(litBox.querySelector(".diya-flame")).not.toBeNull();
    const { container: unlitBox } = render(<Diya lit={false} />);
    expect(unlitBox.querySelector(".diya-flame")).toBeNull();
  });

  it("renders RangoliRing with decorative attributes", () => {
    const { container } = render(<RangoliRing size={80} />);
    const el = container.querySelector("svg");
    expect(el).not.toBeNull();
    expect(el?.getAttribute("aria-hidden")).toBe("true");
    expect(el?.getAttribute("class")).toContain("pointer-events-none");
  });
});

