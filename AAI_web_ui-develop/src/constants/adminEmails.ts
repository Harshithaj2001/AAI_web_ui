const DEFAULT_ADMIN_EMAILS = ["krishna.boyapati@aainnovation.ai"];

function parseList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** Emails allowed to use admin sign-in and the submissions UI (client hint; RLS is authoritative). */
export function getAdminEmailAllowlist(): string[] {
  const fromEnv = parseList(import.meta.env.VITE_ADMIN_EMAILS);
  return fromEnv.length > 0 ? fromEnv : DEFAULT_ADMIN_EMAILS;
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return getAdminEmailAllowlist().includes(normalized);
}
