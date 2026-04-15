interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "default" | "light";
}

const sizes = {
  sm: { mark: "h-9 w-9 text-xs", text: "text-base", subText: "text-[10px]" },
  md: { mark: "h-12 w-12 text-sm", text: "text-xl", subText: "text-[11px]" },
  lg: { mark: "h-14 w-14 text-base", text: "text-2xl", subText: "text-xs" },
};

const Logo = ({ className = "", size = "md", showText = true, variant = "default" }: LogoProps) => {
  const s = sizes[size];
  const textColor = variant === "light" ? "text-white" : "text-slate-900";
  const aheadColor = variant === "light" ? "text-gold" : "text-gold-deep";
  const markBorder = variant === "light" ? "border-white/35" : "border-slate-300";
  const markBg =
    variant === "light"
      ? "bg-gradient-to-br from-sky-500/80 to-indigo-700/90"
      : "bg-gradient-to-br from-sky-500 to-indigo-700";
  const subtitleText = "Always Ahead";
  const iGradientClass =
    "bg-[linear-gradient(160deg,#facc15_0_33.4%,rgba(255,255,255,0.22)_33.4%_36.1%,#ffffff_36.1%_100%)]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${s.mark} ${markBg} ${markBorder} shrink-0 rounded-xl border shadow-[0_8px_20px_rgba(15,23,42,0.25)] flex items-center justify-center font-extrabold tracking-[0.12em] text-white`}
        aria-label="AAI monogram"
      >
        <span className="text-white">AA</span>
        <span className={`ml-[0.02em] ${iGradientClass} bg-clip-text text-transparent`}>I</span>
      </div>
      {showText && (
        <div className="leading-tight">
          <span className={`block font-heading font-bold tracking-wide ${textColor} ${s.text}`}>
            AA | Innovations
          </span>
          <span
            className={`block uppercase tracking-[0.22em] font-semibold ${aheadColor} ${s.subText}`}
          >
            {subtitleText}
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
