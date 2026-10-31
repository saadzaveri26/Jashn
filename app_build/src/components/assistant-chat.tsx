"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { applyAction } from "@/engine/actions";
import type { Action, AssistantResponse, Plan } from "@/engine/schemas";
import { ActionCard } from "./action-card";

type ChatItem = {
  role: "user" | "assistant";
  text: string;
  actions?: Action[];
};

type Props = {
  plan: Plan;
  onUpdatePlan: (p: Plan) => void;
};

export function AssistantChat({ plan, onUpdatePlan }: Props) {
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
    <div className="flex flex-col h-[520px] rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden shadow-2xs">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
              m.role === "user"
                ? "bg-amber-700 text-amber-50 dark:bg-amber-600"
                : "bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
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
              <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-stone-700 dark:text-stone-300" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div role="status" aria-live="polite" className="flex items-center gap-2 text-stone-500 text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-amber-600" aria-hidden="true" />
            <span>Consulting celebration assistant...</span>
          </div>
        )}
        {errorMsg && (
          <div role="alert" className="p-2 text-xs rounded-md bg-rose-50 text-rose-800 border border-rose-300">
            {errorMsg}
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex gap-2">
        <label htmlFor="assistant-input" className="sr-only">Message the planning assistant</label>
        <input
          id="assistant-input"
          type="text"
          placeholder="Ask for ideas, budget adjustments, or vendor advice..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-md bg-amber-700 text-amber-50 hover:bg-amber-800 disabled:opacity-50 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-600"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

