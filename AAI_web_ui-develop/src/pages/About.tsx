import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ValuesSection from "@/components/ValuesSection";
import PillarsSection from "@/components/PillarsSection";

const goldWaveBottom = "/placeholder.svg";

function AboutVisualPanel() {
  return (
    <div
      className="relative w-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] rounded-[22px] overflow-hidden border border-primary/15 shadow-[0_24px_54px_rgba(15,23,42,0.18)]"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #0f1f5e 0%, #1f3da4 42%, #2b57c7 55%, #1a3a8f 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -top-24 -right-16 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 md:p-10 text-white">
        <p className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-amber-200/90 font-bold mb-3">
          Delivery principle
        </p>
        <blockquote className="text-lg sm:text-xl md:text-2xl font-heading font-bold leading-snug text-white mb-4">
          Advice that doesn&apos;t ship has no value.
        </blockquote>
        <p className="text-white/75 text-sm leading-relaxed max-w-md">
          We measure success in deployed systems and measurable outcomes — from the first whiteboard session through
          go-live and beyond.
        </p>
      </div>
    </div>
  );
}

const About = () => {
  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <div
        className="fixed bottom-0 left-0 right-0 h-[200px] sm:h-[260px] md:h-[340px] pointer-events-none opacity-70 z-0"
        style={{
          backgroundImage: `url(${goldWaveBottom})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10">
        <Navbar />

        <section className="pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-start gap-4 sm:gap-5 mb-4 sm:mb-5">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all"
                >
                  <ArrowLeft size={16} /> Back to Home
                </Link>
                <div className="eyebrow-badge">
                  <span>About AA Innovation</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-foreground leading-tight">
                Who we are
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg mt-4 max-w-2xl">
                AA Innovation LLC was founded on a belief that professional services had a delivery problem — not a
                talent problem or a strategy problem, but a delivery problem.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <AboutVisualPanel />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-5 sm:space-y-6 order-1 md:order-2"
              >
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">What we do</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  We are a technology and consulting firm operating across seven industries: Energy, Healthcare,
                  Manufacturing, Finance, Consulting, Federal, and Logistics. Our practitioners design, build, and
                  implement solutions that transform how organizations operate — from modernizing legacy federal
                  systems to building the smart factories of tomorrow.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  We are not a firm that hands off deliverables and moves on. We define success in deployed systems,
                  measurable results, and clients who are genuinely better positioned after working with us than before.
                </p>
                <p className="text-muted-foreground leading-relaxed font-medium text-foreground/90 text-sm sm:text-base">
                  We show up. We deliver. We stay until it works.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <ValuesSection />
        <PillarsSection />
        <Footer />
      </div>
    </div>
  );
};

export default About;
