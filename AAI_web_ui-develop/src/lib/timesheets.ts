import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type TimesheetStatus = "draft" | "submitted" | "approved";

export type DayType = "WORK" | "PTO" | "OFF" | "HOLIDAY";

export type DailyEntry = { type: DayType; hours: number };

/** Keys are YYYY-MM-DD (Monday–Sunday of the row's week). */
export type DailyEntriesMap = Record<string, DailyEntry>;

export type TimesheetRow = {
  id: string;
  created_at: string;
  updated_at: string;
  user_email?: string;
  week_start: string;
  hours: number;
  entry_notes: string | null;
  status: TimesheetStatus;
  daily_entries?: DailyEntriesMap | null;
  approved_by_email?: string | null;
  approved_by_name?: string | null;
  approved_at?: string | null;
};

function parseRpcArray(data: unknown): TimesheetRow[] {
  const arr = Array.isArray(data) ? data : typeof data === "string" ? JSON.parse(data) : [];
  return arr as TimesheetRow[];
}

export async function fetchMyTimesheets(): Promise<{ data: TimesheetRow[] | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("fetch_my_timesheets");
  if (error) return { data: null, error: error.message };
  return { data: parseRpcArray(data) };
}

export async function saveMyTimesheetDraft(
  weekStart: string,
  dailyEntries: DailyEntriesMap,
  entryNotes: string
): Promise<{ data: Record<string, unknown> | null; error?: string }> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("save_my_timesheet_draft", {
    p_week_start: weekStart,
    p_daily_entries: dailyEntries,
    p_entry_notes: entryNotes,
  });
  if (error) return { data: null, error: error.message };
  return { data: (typeof data === "object" && data ? data : null) as Record<string, unknown> | null };
}

export async function submitMyTimesheet(weekStart: string): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("submit_my_timesheet", { p_week_start: weekStart });
  if (error) return { error: error.message };
  return {};
}

export async function listTimesheetsForOwner(): Promise<{ data: TimesheetRow[] | null; error?: string }> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("list_timesheets_for_owner");
  if (error) return { data: null, error: error.message };
  return { data: parseRpcArray(data) };
}

export async function approveTimesheet(id: string): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("approve_timesheet", { p_id: id });
  if (error) return { error: error.message };
  return {};
}

export async function ownerUpdateTimesheet(
  id: string,
  hours: number,
  entryNotes: string,
  dailyEntries: DailyEntriesMap | null = null
): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("owner_update_timesheet", {
    p_id: id,
    p_hours: hours,
    p_entry_notes: entryNotes,
    p_daily_entries: dailyEntries,
  });
  if (error) return { error: error.message };
  return {};
}
