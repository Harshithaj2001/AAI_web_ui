import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  const scrollTo = (hash: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = "/" + hash;
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-12 px-4 sm:px-6">
      <div
        className="relative overflow-hidden max-w-7xl mx-auto p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/20 shadow-[0_24px_48px_rgba(30,64,175,0.25)]"
        style={{ background: "linear-gradient(135deg, hsl(228 65% 22%), hsl(225 72% 42%), hsl(228 65% 30%))" }}
      >
        <div className="absolute -right-24 -top-28 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute left-8 bottom-[-80px] h-44 w-44 rounded-full bg-amber-300/20 blur-2xl pointer-events-none" />
        <div>
          <h3 className="text-white font-heading font-bold text-xl md:text-2xl mb-2">Ready to move ahead of the curve?</h3>
          <p className="text-white/60 text-sm max-w-md">
            Tell us what you are building. We will meet you with senior practitioners, a clear definition of done, and
            the discipline to ship.
          </p>
        </div>
        <button
          type="button"
          onClick={() => scrollTo("#contact")}
          className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold rounded-xl text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300 whitespace-nowrap"
        >
          Get in touch
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default CTABanner;
