import { motion } from "framer-motion";

const rows = [
  { us: "Senior practitioners on every engagement", them: "Junior delivery teams after contract signature" },
  { us: "Seven integrated industries, zero silos", them: "Siloed practices with competing priorities" },
  { us: "AI deployed to deliver outcomes, not demos", them: "AI roadmaps that rarely survive implementation" },
  { us: "End-to-end: strategy through go-live", them: "Recommendations handed off to another team" },
  { us: "Mobilize in days, not procurement cycles", them: "Months of scoping before work begins" },
  { us: "One team, one relationship, one outcome", them: "Multiple handoffs, multiple points of failure" },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="eyebrow-badge mx-auto mb-4">
            <span>What sets us apart</span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl font-heading font-extrabold text-foreground">
            Why AA Innovation
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            The AA Innovation way versus the alternative — direct, specific, and grounded in how we actually work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-hidden border border-border rounded-[18px] shadow-sm"
        >
          <div className="grid grid-cols-2" style={{ background: "linear-gradient(180deg, #0E1A4F, #142872)" }}>
            <div className="p-4 font-heading font-semibold text-sm text-gold">The AA Innovation Way</div>
            <div className="p-4 font-heading font-semibold text-sm text-white/80 border-l border-white/10">The Alternative</div>
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 ${i % 2 === 0 ? "bg-white" : "bg-secondary"}`}
            >
              <div className="p-4 text-sm text-foreground/80 font-medium">{row.us}</div>
              <div className="p-4 text-sm text-muted-foreground border-l border-border">{row.them}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
