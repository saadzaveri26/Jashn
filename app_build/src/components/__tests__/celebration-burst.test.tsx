import { render } from "@testing-library/react";
import * as framerMotion from "framer-motion";
import { CelebrationBurst } from "../celebration-burst";

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: jest.fn(),
  };
});

describe("CelebrationBurst Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders at most 40 particles when motion is allowed", () => {
    (framerMotion.useReducedMotion as jest.Mock).mockReturnValue(false);

    const { container } = render(<CelebrationBurst />);
    const particles = container.querySelectorAll("span");
    expect(particles.length).toBeGreaterThan(0);
    expect(particles.length).toBeLessThanOrEqual(40);
  });

  it("does not render any particles when reduced motion is requested", () => {
    (framerMotion.useReducedMotion as jest.Mock).mockReturnValue(true);

    const onComplete = jest.fn();
    const { container } = render(<CelebrationBurst onComplete={onComplete} />);
    expect(container.firstChild).toBeNull();
    expect(onComplete).toHaveBeenCalled();
  });
});

