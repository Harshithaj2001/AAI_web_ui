import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Invites an employee via Edge Function `invite-staff`.
 *
 * - **Development:** calls `/{proxy}/invite-staff` on the Vite dev server (same origin) so the
 *   browser never cross-origin preflights Supabase (avoids gateway JWT-on-OPTIONS failures).
 * - **Production:** uses `supabase.functions.invoke`. Deploy with `verify_jwt = false` for this
 *   function (see AAI_supabase) or `supabase functions deploy invite-staff --no-verify-jwt`.
 */
export async function inviteEmployeeByEmail(email: string): Promise<{ error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { error: "Not configured." };
  }
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    return { error: "You must be signed in." };
  }

  const trimmed = email.trim();

  if (import.meta.env.DEV && typeof window !== "undefined") {
    const res = await fetch(`${window.location.origin}/__sb_functions/invite-staff`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: trimmed }),
    });

    const json = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };
    if (!res.ok) {
      return { error: json.error || `Invite failed (${res.status})` };
    }
    return {};
  }

  const { data, error } = await supabase.functions.invoke<{ error?: string; ok?: boolean }>(
    "invite-staff",
    {
      body: { email: trimmed },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );

  if (error) {
    const msg =
      error.message ||
      (typeof (error as { context?: { body?: string } }).context?.body === "string"
        ? (error as { context: { body: string } }).context.body
        : null);
    return { error: msg || "Invite request failed" };
  }

  if (data && typeof data === "object" && "error" in data && data.error) {
    return { error: String(data.error) };
  }

  return {};
}

/** @deprecated use inviteEmployeeByEmail */
export const inviteStaffByEmail = inviteEmployeeByEmail;
