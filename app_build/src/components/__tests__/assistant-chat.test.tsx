import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AssistantChat } from "../assistant-chat";
import { createSamplePlan } from "@/lib/sample-plan";

describe("AssistantChat", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("renders initial greeting and sends host message", async () => {
    const plan = createSamplePlan();
    const onUpdate = jest.fn();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        reply: "Consider looking at local florists for discounts.",
        actions: [],
        ai: "enriched",
      }),
    });

    render(<AssistantChat plan={plan} onUpdatePlan={onUpdate} />);
    expect(screen.getByText(/Namaste! I am your celebration assistant/i)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Ask for ideas/i);
    fireEvent.change(input, { target: { value: "How can I save on decor?" } });
    fireEvent.click(screen.getByRole("button", { name: "" }));

    await waitFor(() => {
      expect(screen.getByText(/Consider looking at local florists/i)).toBeInTheDocument();
    });
  });
});

