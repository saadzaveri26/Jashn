import { getPreset } from "./presets";
import type { PresetId, Task } from "./schemas";

export type TimelineInput = {
  eventDate: string;
  today: string;
  preset: PresetId;
};

export type TimelineResult = {
  tasks: Task[];
  hasCompressed: boolean;
};

function minusDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d - days));
  return dt.toISOString().slice(0, 10);
}

export function buildTimeline(input: TimelineInput): TimelineResult {
  const preset = getPreset(input.preset);
  let hasCompressed = false;
  const tasks: Task[] = preset.tasks.map((t, idx) => {
    const rawDue = minusDays(input.eventDate, t.leadDays);
    const isCompressed = rawDue < input.today;
    if (isCompressed) hasCompressed = true;
    const due = isCompressed ? input.today : rawDue;
    const task: Task = {
      id: `${input.preset}-${idx + 1}`,
      title: t.title,
      categoryId: t.categoryId,
      due,
      done: false,
      leadDays: t.leadDays,
      atRisk: isCompressed,
      compressed: isCompressed,
      compressReason: isCompressed ? `Originally due ${rawDue}; compressed because planning started late.` : undefined,
    };
    return task;
  });
  tasks.sort((a, b) => a.due.localeCompare(b.due));
  return { tasks, hasCompressed };
}

