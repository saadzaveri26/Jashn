import { render, screen, fireEvent } from "@testing-library/react";
import { MotionProvider, useMotionContext } from "../motion-provider";
import { PauseToggle } from "../pause-toggle";
import { tPress, tHover, tUi, tReveal, tBurst, easeOut, easeExpo, easeInOut } from "@/lib/motion";

function TestConsumer() {
  const { isPaused, togglePaused } = useMotionContext();
  return (
    <div>
      <span data-testid="status">{isPaused ? "paused" : "running"}</span>
      <button onClick={togglePaused}>Toggle</button>
    </div>
  );
}

describe("Motion System and Controls", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("motion-paused");
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("exports correct motion timings and easings", () => {
    expect(tPress).toBe(0.14);
    expect(tHover).toBe(0.18);
    expect(tUi).toBe(0.24);
    expect(tReveal).toBe(0.8);
    expect(tBurst).toBe(1.2);
    expect(easeOut).toEqual([0.22, 1, 0.36, 1]);
    expect(easeExpo).toEqual([0.16, 1, 0.3, 1]);
    expect(easeInOut).toEqual([0.76, 0, 0.24, 1]);
  });

  it("initializes running by default and toggles via context", () => {
    render(
      <MotionProvider>
        <TestConsumer />
      </MotionProvider>
    );

    expect(screen.getByTestId("status").textContent).toBe("running");
    expect(document.documentElement.classList.contains("motion-paused")).toBe(false);

    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByTestId("status").textContent).toBe("paused");
    expect(document.documentElement.classList.contains("motion-paused")).toBe(true);
    expect(localStorage.getItem("jashn_anim_paused")).toBe("true");
  });

  it("pause toggle updates aria-pressed and label", () => {
    render(
      <MotionProvider>
        <PauseToggle />
      </MotionProvider>
    );

    const btn = screen.getByRole("button");
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    expect(btn.getAttribute("aria-label")).toBe("Pause animations");

    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(btn.getAttribute("aria-label")).toBe("Resume animations");
  });

  it("defaults to paused when prefers-reduced-motion is active", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion: reduce"),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <MotionProvider>
        <TestConsumer />
      </MotionProvider>
    );

    expect(screen.getByTestId("status").textContent).toBe("paused");
    expect(document.documentElement.classList.contains("motion-paused")).toBe(true);
  });
});

