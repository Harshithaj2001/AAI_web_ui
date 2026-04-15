import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

const goldWaveBottom = "/placeholder.svg";

const Register = () => {
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
        <div className="w-full max-w-[440px]">
        <div className="border border-border bg-white shadow-lg p-8 rounded-[22px] text-center">
          <div className="flex justify-center mb-4">
            <Logo size="md" showText={false} />
          </div>
          <h1 className="text-xl font-heading font-bold text-foreground mb-2">No public registration</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Website accounts are not open to the public. If you are an authorized administrator, use admin sign-in
            to review contact form submissions.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold rounded-xl hover:bg-primary/85 transition-all shadow-[0_10px_18px_rgba(28,57,187,0.18)]"
          >
            Go to admin sign in
          </Link>
          <p className="mt-5">
            <Link to="/" className="text-xs text-primary font-bold hover:underline">
              Back to home
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
