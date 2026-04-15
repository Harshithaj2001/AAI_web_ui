import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@context/AuthContext";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const goldWaveBottom = "/placeholder.svg";

const Login = () => {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/admin";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSending, setResetSending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setRequiredMessage = (el: HTMLInputElement) => {
    if (el.validity.valueMissing) el.setCustomValidity("Required");
    else if (el.validity.typeMismatch) el.setCustomValidity("Enter a valid value");
    else el.setCustomValidity("");
  };

  const sendPasswordSetupEmail = async () => {
    if (!email.trim()) {
      toast({ title: "Email required", description: "Enter your email above first.", variant: "destructive" });
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      toast({ title: "Not configured", description: "Supabase environment variables are missing.", variant: "destructive" });
      return;
    }
    setResetSending(true);
    const redirectTo = `${window.location.origin}/auth/update-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    setResetSending(false);
    if (error) {
      toast({ title: "Could not send email", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: "Check your inbox",
      description: "Open the link from Supabase to set your password. Add the redirect URL in Supabase if the link fails.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error, portalRole } = await signIn(email, password);
    if (error) {
      toast({ title: "Sign-in failed", description: error, variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    toast({ title: "Welcome", description: "You are signed in." });
    if (portalRole === "employee") {
      navigate("/portal", { replace: true });
    } else {
      navigate(from, { replace: true });
    }
    setIsSubmitting(false);
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
              <h1 className="text-xl font-heading font-bold text-foreground mb-1">Sign in</h1>
              <p className="text-xs text-muted-foreground">Authorized AA Innovation accounts only.</p>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@aainnovation.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input-style has-leading-icon"
                    onInvalid={(e) => {
                      setRequiredMessage(e.currentTarget);
                      e.currentTarget.classList.add("is-invalid");
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity("");
                      e.currentTarget.classList.remove("is-invalid");
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/60" />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input-style has-leading-icon"
                    onInvalid={(e) => {
                      setRequiredMessage(e.currentTarget);
                      e.currentTarget.classList.add("is-invalid");
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity("");
                      e.currentTarget.classList.remove("is-invalid");
                    }}
                  />
                </div>
                <div className="mt-1.5 text-right">
                  <button
                    type="button"
                    onClick={() => void sendPasswordSetupEmail()}
                    disabled={resetSending}
                    className="text-[10px] text-primary hover:underline disabled:opacity-50"
                  >
                    {resetSending ? "Sending…" : "Forgot password?"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold rounded-xl hover:bg-primary/85 transition-all disabled:opacity-50 shadow-[0_10px_18px_rgba(28,57,187,0.18)]"
              >
                {isSubmitting ? "Signing in..." : "Sign In"} <ArrowRight size={14} />
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-5">
              <Link to="/" className="text-primary hover:underline font-bold">
                Return to website
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
