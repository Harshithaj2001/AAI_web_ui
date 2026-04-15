import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type PortalRole = "owner" | "employee";

interface AppUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AppUser | null;
  session: Session | null;
  loading: boolean;
  portalRole: PortalRole | null;
  /** Owner: full admin inbox + team. */
  isOwner: boolean;
  /** Employee: timesheet portal only (no inbox). */
  isEmployee: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string; portalRole?: PortalRole | null }>;
  signOut: () => Promise<void>;
  refreshPortalRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapUser(u: SupabaseUser | null): AppUser | null {
  if (!u?.email) return null;
  const meta = u.user_metadata as { full_name?: string } | undefined;
  const name =
    meta?.full_name?.trim() ||
    u.email
      .split("@")[0]
      .replace(/[._]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  return { name, email: u.email };
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [portalRole, setPortalRole] = useState<PortalRole | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRoleForSession = useCallback(async (s: Session | null) => {
    if (!supabase || !s) {
      setPortalRole(null);
      return;
    }
    const { data, error } = await supabase.rpc("get_my_admin_role");
    if (error) {
      setPortalRole(null);
      return;
    }
    const r = data as string | null;
    if (r === "owner" || r === "employee") setPortalRole(r);
    else if (r === "staff") setPortalRole("employee");
    else setPortalRole(null);
  }, []);

  const refreshPortalRole = useCallback(async () => {
    await loadRoleForSession(session);
  }, [session, loadRoleForSession]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      const {
        data: { session: s },
      } = await supabase.auth.getSession();
      if (cancelled) return;
      setSession(s);
      await loadRoleForSession(s);
      if (!cancelled) setLoading(false);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      void loadRoleForSession(s);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [loadRoleForSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: "Sign-in is not configured. Add Supabase environment variables." };
    const trimmed = email.trim();
    const { error } = await supabase.auth.signInWithPassword({
      email: trimmed,
      password,
    });
    if (error) return { error: error.message };

    const { data: role, error: roleErr } = await supabase.rpc("get_my_admin_role");
    if (roleErr || (role !== "owner" && role !== "employee" && role !== "staff")) {
      await supabase.auth.signOut();
      return { error: "This account is not authorized to sign in." };
    }
    const normalized: PortalRole = role === "owner" ? "owner" : "employee";
    setPortalRole(normalized);
    return { portalRole: normalized };
  }, []);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
    setPortalRole(null);
  }, []);

  const appUser = mapUser(session?.user ?? null);
  const isOwner = portalRole === "owner";
  const isEmployee = portalRole === "employee";

  return (
    <AuthContext.Provider
      value={{
        user: appUser,
        session,
        loading,
        portalRole,
        isOwner,
        isEmployee,
        signIn,
        signOut,
        refreshPortalRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
