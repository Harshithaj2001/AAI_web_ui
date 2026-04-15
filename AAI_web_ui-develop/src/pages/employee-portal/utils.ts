import { addDays, format, startOfWeek } from "date-fns";
import type { DailyEntriesMap } from "@/lib/timesheets";

export function mondayOfWeekContaining(d: Date): Date {
  return startOfWeek(d, { weekStartsOn: 1 });
}

export function ymd(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function weekDates(monday: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => ymd(addDays(monday, i)));
}

export function emptyWeekEntries(dates: string[]): DailyEntriesMap {
  const o: DailyEntriesMap = {};
  for (const d of dates) o[d] = { type: "OFF", hours: 0 };
  return o;
}

export function parseDaily(raw: unknown): DailyEntriesMap {
  if (!raw || typeof raw !== "object") return {};
  return raw as DailyEntriesMap;
}
