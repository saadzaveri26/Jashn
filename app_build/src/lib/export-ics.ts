import type { Plan, Task } from "../engine/schemas";

export function escapeIcsValue(val: string): string {
  return val
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r/g, "")
    .replace(/\n/g, "\\n");
}

export function foldIcsLine(line: string): string {
  const buf = Buffer.from(line, "utf8");
  if (buf.length <= 75) return line;
  const parts: string[] = [];
  let start = 0;
  let max = 75;
  while (start < buf.length) {
    let end = Math.min(start + max, buf.length);
    while (end > start && (buf[end - 1] & 0xc0) === 0x80) {
      end -= 1;
    }
    const chunk = buf.subarray(start, end).toString("utf8");
    parts.push(start === 0 ? chunk : ` ${chunk}`);
    start = end;
    max = 74;
  }
  return parts.join("\r\n");
}

function renderEvent(planId: string, task: Task): string[] {
  const dateFormatted = task.due.replace(/-/g, "");
  const desc = task.compressReason ? `${task.title} - ${task.compressReason}` : task.title;
  return [
    "BEGIN:VEVENT",
    foldIcsLine(`UID:task-${planId}-${task.id}@jashn`),
    foldIcsLine(`DTSTART;VALUE=DATE:${dateFormatted}`),
    foldIcsLine(`SUMMARY:${escapeIcsValue(task.title)}`),
    foldIcsLine(`DESCRIPTION:${escapeIcsValue(desc)}`),
    "END:VEVENT",
  ];
}

export function exportPlanIcs(plan: Plan): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jashn//EN",
    "CALSCALE:GREGORIAN",
  ];
  for (const t of plan.tasks) {
    lines.push(...renderEvent(plan.id, t));
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

