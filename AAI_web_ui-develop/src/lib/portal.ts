import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type EmployeeProfile = {
  user_email: string;
  display_name: string | null;
  phone: string | null;
  profile_locked: boolean;
};

export type EmployeeNotification = {
  id: string;
  created_at: string;
  type: string;
  title: string;
  body: string | null;
  read_at: string | null;
  related_timesheet_id: string | null;
};

export async function getPortalMaxHoursPerDay(): Promise<{ data: number | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("get_portal_max_hours_per_day");
  if (error) return { data: null, error: error.message };
  const n = typeof data === "number" ? data : Number(data);
  return { data: Number.isFinite(n) ? n : null };
}

export async function setPortalMaxHoursPerDay(max: number): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("set_portal_max_hours_per_day", { p_max: max });
  if (error) return { error: error.message };
  return {};
}

export async function fetchMyEmployeeProfile(): Promise<{ data: EmployeeProfile | null; error?: string }> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("fetch_my_employee_profile");
  if (error) return { data: null, error: error.message };
  return { data: (typeof data === "object" && data ? data : null) as EmployeeProfile | null };
}

export async function saveMyEmployeeProfile(
  displayName: string,
  phone: string
): Promise<{ data: EmployeeProfile | null; error?: string }> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("save_my_employee_profile", {
    p_display_name: displayName,
    p_phone: phone,
  });
  if (error) return { data: null, error: error.message };
  return { data: (typeof data === "object" && data ? data : null) as EmployeeProfile | null };
}

export async function adminUpdateEmployeeProfile(
  email: string,
  displayName: string,
  phone: string
): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("admin_update_employee_profile", {
    p_email: email,
    p_display_name: displayName,
    p_phone: phone,
  });
  if (error) return { error: error.message };
  return {};
}

export async function fetchMyNotifications(limit = 40): Promise<{ data: EmployeeNotification[] | null; error?: string }> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("fetch_my_notifications", { p_limit: limit });
  if (error) return { data: null, error: error.message };
  const arr = Array.isArray(data) ? data : typeof data === "string" ? JSON.parse(data) : [];
  return { data: arr as EmployeeNotification[] };
}

export async function markMyNotificationRead(id: string): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("mark_my_notification_read", { p_id: id });
  if (error) return { error: error.message };
  return {};
}
