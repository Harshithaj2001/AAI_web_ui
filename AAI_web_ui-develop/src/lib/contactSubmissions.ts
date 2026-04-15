import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type FormSource = "contact_page" | "home_section" | "modal";

/** Portal row: owners get `access: 'full'` and all fields; staff get `access: 'limited'` (no message, phone, etc.). */
export type PortalSubmissionRow = {
  id: string;
  created_at: string;
  form_source: FormSource;
  access: "full" | "limited";
  email?: string;
  company?: string | null;
  name_display?: string;
  topic?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
  job_title?: string | null;
  phone?: string | null;
  zip_code?: string | null;
  location?: string | null;
  message?: string | null;
  internal_notes?: string | null;
  service_interest?: string | null;
  marketing_consent?: string | null;
  privacy_accepted?: boolean | null;
};

export type ContactSubmissionInsert = {
  form_source: FormSource;
  topic: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string;
  company: string | null;
  job_title: string | null;
  phone: string | null;
  zip_code: string | null;
  location: string | null;
  message: string;
  service_interest: string | null;
  marketing_consent: string | null;
  privacy_accepted: boolean | null;
};

export async function insertContactSubmission(
  row: ContactSubmissionInsert
): Promise<{ error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { error: "Form service is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY." };
  }
  const { error } = await supabase.from("contact_submissions").insert(row);
  if (error) return { error: error.message };
  return {};
}

export async function fetchPortalSubmissions(): Promise<{
  data: PortalSubmissionRow[] | null;
  error?: string;
}> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("fetch_portal_submissions");
  if (error) return { data: null, error: error.message };
  const arr = Array.isArray(data) ? data : typeof data === "string" ? JSON.parse(data) : [];
  return { data: arr as PortalSubmissionRow[] };
}

export type TeamMemberRow = { email: string; role: string };
export type AdminNotificationRow = {
  id: string;
  created_at: string;
  type: string;
  title: string;
  body: string | null;
  read_at: string | null;
  related_contact_submission_id: string | null;
  related_timesheet_id: string | null;
};

export async function fetchTeamMembers(): Promise<{
  data: TeamMemberRow[] | null;
  error?: string;
}> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("list_admin_team_members");
  if (error) return { data: null, error: error.message };
  const arr = Array.isArray(data) ? data : typeof data === "string" ? JSON.parse(data) : [];
  return { data: arr as TeamMemberRow[] };
}

export async function updateSubmissionInternalNotes(
  id: string,
  notes: string
): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("update_submission_internal_notes", {
    p_id: id,
    p_notes: notes,
  });
  if (error) return { error: error.message };
  return {};
}

export async function setTeamMemberRole(
  email: string,
  role: "owner" | "employee"
): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("set_admin_team_member_role", {
    p_email: email.trim().toLowerCase(),
    p_role: role,
  });
  if (error) return { error: error.message };
  return {};
}

export async function fetchAdminNotifications(
  limit = 50
): Promise<{ data: AdminNotificationRow[] | null; error?: string }> {
  if (!supabase) return { data: null, error: "Supabase is not configured." };
  const { data, error } = await supabase.rpc("fetch_admin_notifications", { p_limit: limit });
  if (error) return { data: null, error: error.message };
  const arr = Array.isArray(data) ? data : typeof data === "string" ? JSON.parse(data) : [];
  return { data: arr as AdminNotificationRow[] };
}

export async function markAdminNotificationRead(id: string): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("mark_admin_notification_read", { p_id: id });
  if (error) return { error: error.message };
  return {};
}

export async function deleteContactSubmission(id: string): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase is not configured." };
  const { error } = await supabase.rpc("delete_contact_submission", { p_id: id });
  if (error) return { error: error.message };
  return {};
}
