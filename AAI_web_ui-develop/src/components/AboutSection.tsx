import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-[22px] border border-primary/10 bg-[linear-gradient(145deg,#0f1f5e_0%,#1f3da4_45%,#2b57c7_100%)] p-8 md:p-10 shadow-[0_24px_54px_rgba(15,23,42,0.28)] min-h-[400px] md:min-h-[500px]">
              <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-sky-300/20 blur-3xl pointer-events-none" />
              <p className="text-xs tracking-[0.28em] uppercase text-amber-300 font-bold mb-4">Unique value</p>
              <h3 className="text-white font-heading text-2xl md:text-3xl font-bold mb-6 leading-tight">
                We are not the largest firm in your industry. We are the most committed to it.
              </h3>
              <p className="text-white/85 text-sm leading-relaxed mb-6">
                AA Innovation merges the strategic expertise of a global consultancy with the accountability, agility,
                and sector knowledge of a boutique specialist. Every project is led by practitioners who understand your
                world — not generalists who just studied it.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-white text-xl font-extrabold">7</p>
                  <p className="text-white/80 text-xs uppercase tracking-[0.14em]">Integrated industries</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-white text-xl font-extrabold">Senior</p>
                  <p className="text-white/80 text-xs uppercase tracking-[0.14em]">Every engagement</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-white text-xl font-extrabold">End-to-end</p>
                  <p className="text-white/80 text-xs uppercase tracking-[0.14em]">Strategy to go-live</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-white text-xl font-extrabold">Proof</p>
                  <p className="text-white/80 text-xs uppercase tracking-[0.14em]">Not promises</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="eyebrow-badge">
              <span>About us</span>
            </div>
            <h2 className="section-heading text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-foreground">
              We&apos;re not the biggest firm in the room. We&apos;re the most committed.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The largest consulting firms in the world offer scale. We offer something more valuable: the right team,
              with the right expertise, fully accountable to your outcomes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              AA Innovation LLC was built on a simple conviction: that organizations deserve senior-level expertise on
              every engagement — not just the ones with nine-figure budgets. That cross-domain challenges deserve
              integrated responses — not siloed practices protecting their turf. And that transformation should end in
              results, not reports.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We serve seven industries — Energy, Healthcare, Manufacturing, Finance, Consulting, Federal, and Logistics
              — not as separate divisions, but as a single, integrated team of practitioners who have spent careers
              building, operating, and transforming organizations like yours.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 text-sm font-bold rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-[0_10px_18px_rgba(28,57,187,0.18)]"
            >
              Learn more <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
