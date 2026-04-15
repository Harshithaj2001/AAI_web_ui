import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

const goldWaveBottom = "/placeholder.svg";

/**
 * Opened from the password-reset link Supabase emails after resetPasswordForEmail().
 * Supabase redirects here with tokens in the URL hash; the client emits PASSWORD_RECOVERY.
 */
const UpdatePassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const h = window.location.hash;
      if (h.includes("type=recovery")) setRecoveryMode(true);
    }

    if (!isSupabaseConfigured || !supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecoveryMode(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Mismatch", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not update password", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password updated", description: "You can sign in with your new password." });
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <div
        className="fixed bottom-0 left-0 right-0 h-[260px] md:h-[340px] pointer-events-none opacity-70 z-0"
        style={{
          backgroundImage: `url(${goldWaveBottom})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Navbar />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-[420px]">
        <div className="border border-border bg-white shadow-lg p-8 rounded-[22px]">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Logo size="md" showText={false} />
            </div>
            <h1 className="text-xl font-heading font-bold text-foreground mb-1">Set a new password</h1>
            {!recoveryMode && (
              <p className="text-xs text-muted-foreground">
                Waiting for a valid reset link… If you opened this page directly, use{" "}
                <strong className="text-foreground">Set password via email</strong> on the sign-in page first, then
                click the link in your inbox.
              </p>
            )}
            {recoveryMode && (
              <p className="text-xs text-muted-foreground">Choose a password for your admin account.</p>
            )}
          </div>

          {recoveryMode && (
            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">New password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-style has-leading-icon"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                  <input
                    type="password"
                    required
                    autoComplete="new-password"
                    minLength={8}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="form-input-style has-leading-icon"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold rounded-xl hover:bg-primary/85 transition-all disabled:opacity-50 shadow-[0_10px_18px_rgba(28,57,187,0.18)]"
              >
                {submitting ? "Saving…" : "Save password"} <ArrowRight size={14} />
              </button>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground mt-5">
            <Link to="/login" className="text-primary hover:underline font-bold">
              Back to sign in
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
