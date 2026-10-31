import { render, screen, fireEvent, renderHook, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../theme-provider";
import { ThemeToggle } from "../theme-toggle";

describe("Theme System and Toggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
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

  it("renders light mode by default and toggles to dark", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const btn = screen.getByRole("button", { name: /toggle evening celebration theme/i });
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("jashn_theme")).toBe("dark");

    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("jashn_theme")).toBe("light");
  });

  it("respects saved theme from localStorage on load", () => {
    localStorage.setItem("jashn_theme", "dark");
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const btn = screen.getByRole("button", { name: /toggle evening celebration theme/i });
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("respects prefers-color-scheme dark on initial visit", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-color-scheme: dark"),
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
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const btn = screen.getByRole("button", { name: /toggle evening celebration theme/i });
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("supports explicit setTheme call", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
    expect(localStorage.getItem("jashn_theme")).toBe("dark");
  });
});
