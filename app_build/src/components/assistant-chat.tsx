"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { applyAction } from "@/engine/actions";
import type { Action, AssistantResponse, Plan } from "@/engine/schemas";
import { ActionCard } from "./action-card";
import { Diya } from "./motifs";

type ChatItem = {
  role: "user" | "assistant";
  text: string;
  actions?: Action[];
};

type Props = {
  plan: Plan;
  onUpdatePlan: (p: Plan) => void;
  onApplyAction?: () => void;
};

export function AssistantChat({ plan, onUpdatePlan, onApplyAction }: Props) {
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      role: "assistant",
      text: "Namaste! I am your celebration assistant. Ask me anything about your budget, vendors, or timeline.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    const updatedMsgs = [...messages, { role: "user" as const, text }];
    setMessages(updatedMsgs);
    setLoading(true);
    setErrorMsg(null);
    try {
      const summary = `${plan.intake.eventName}: ${plan.intake.guests} guests, ${plan.intake.preset} preset, total budget ₹${Math.floor(plan.intake.totalBudget / 100)}`;
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          planSummary: summary,
          messages: updatedMsgs.slice(-10).map((m) => ({ role: m.role, text: m.text })),
          userMessage: text,
        }),
      });
      const data: AssistantResponse = await res.json();
      setMessages([...updatedMsgs, { role: "assistant", text: data.reply, actions: data.actions }]);
    } catch {
      setMessages([...updatedMsgs, { role: "assistant", text: "AI assistant is temporarily unavailable. Local planning tools remain active.", actions: [] }]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (action: Action) => {
    const today = new Date().toISOString().slice(0, 10);
    const res = applyAction(plan, action, today);
    if (res.ok) {
      setErrorMsg(null);
      onUpdatePlan(res.plan);
      onApplyAction?.();
    } else {
      setErrorMsg(`Cannot apply action: ${res.reason}`);
    }
  };

  const handleDismiss = (msgIdx: number, actIdx: number) => {
    const copy = [...messages];
    const target = copy[msgIdx];
    if (target?.actions) {
      target.actions = target.actions.filter((_, i) => i !== actIdx);
      setMessages(copy);
    }
  };

  return (
    <div className="flex flex-col h-[520px] rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-[var(--surface-muted)] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
              m.role === "user"
                ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                : "bg-[var(--surface-muted)] text-[var(--foreground)]"
            }`}>
              <p className="whitespace-pre-wrap">{m.text}</p>
              {m.actions?.map((act, actIdx) => (
                <ActionCard
                  key={actIdx}
                  action={act}
                  onApply={() => handleApply(act)}
                  onDismiss={() => handleDismiss(idx, actIdx)}
                />
              ))}
            </div>
            {m.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-[var(--surface-muted)] flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-[var(--foreground)]" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div role="status" aria-live="polite" className="flex items-center gap-2 text-[var(--muted-foreground)] text-xs">
            <div className="flex items-center gap-1">
              <Diya lit={true} size="sm" />
              <Diya lit={true} size="sm" />
              <Diya lit={true} size="sm" />
            </div>
            <span>Consulting celebration assistant...</span>
          </div>
        )}
        {errorMsg && (
          <div role="alert" className="p-2 text-xs rounded-md bg-[var(--surface-muted)] text-[var(--vermilion)] border border-[var(--vermilion)]">
            {errorMsg}
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] bg-[var(--card)] flex gap-2">
        <label htmlFor="assistant-input" className="sr-only">Message the planning assistant</label>
        <input
          id="assistant-input"
          type="text"
          placeholder="Ask for ideas, budget adjustments, or vendor advice..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
