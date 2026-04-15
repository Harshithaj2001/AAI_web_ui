import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = ({ onContactClick }: { onContactClick?: () => void } = {}) => {
  const openContact = () => {
    if (onContactClick) {
      onContactClick();
      return;
    }
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToIndustries = () => {
    const el = document.querySelector("#industries");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[linear-gradient(115deg,#ffffff_0%,#eef4ff_45%,#f9fbff_100%)]">
      <div className="absolute inset-0 opacity-45 pointer-events-none [background-image:linear-gradient(rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.06)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-[-6%] top-[-28%] w-[540px] h-[540px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)" }} />
      <div className="absolute right-[-10%] top-[-20%] w-[620px] h-[620px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,204,92,0.22), transparent 72%)" }} />
      <div className="absolute right-[8%] bottom-[-18%] w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(30,64,175,0.20), transparent 72%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-foreground leading-[1.08] mb-6 sm:mb-8"
          >
            Transforming complexity into{" "}
            <span className="text-primary">competitive advantage</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl mb-4 leading-relaxed"
          >
            AA Innovation LLC partners with leaders in Energy, Healthcare, Manufacturing, Finance, Federal,
            Logistics, and beyond — delivering technology and consulting solutions built for the specific realities
            of your industry, led by practitioners who know it from the inside out.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-foreground/80 text-sm md:text-base font-medium mb-12"
          >
            Senior expertise. No silos. Outcomes that ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <motion.button
              type="button"
              onClick={scrollToIndustries}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-8 py-3.5 text-sm font-bold rounded-xl text-white transition-all hover:-translate-y-0.5 shadow-[0_10px_18px_rgba(53,88,216,0.22)]"
              style={{ backgroundColor: "hsl(228 65% 53%)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(228 74% 42%)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(228 65% 53%)")}
            >
              Explore our industries
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              type="button"
              onClick={openContact}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-8 py-3.5 text-sm font-bold rounded-xl border-2 border-primary/20 text-foreground hover:border-primary/40 hover:bg-secondary transition-all hover:-translate-y-0.5"
            >
              Talk to a practitioner
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
