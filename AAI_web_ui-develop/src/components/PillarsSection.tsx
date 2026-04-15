import { motion } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "Senior Expertise. Every Engagement.",
    desc: "Senior practitioners don't just oversee engagements — they run them. You work directly with specialists who have spent decades inside your industries. There is no bait-and-switch because there is no gap between who we sell to and who delivers.",
  },
  {
    num: "02",
    title: "Seven Industries. One Integrated Team.",
    desc: "We serve Energy, Healthcare, Manufacturing, Finance, Consulting, Federal, and Logistics as an integrated ecosystem — not siloed practices. Real problems rarely respect one discipline; neither do we.",
  },
  {
    num: "03",
    title: "AI-Enabled. Always Human-Led.",
    desc: "AI is not the headline — outcomes are. We deploy AI as a precision instrument in real workflows, calibrated to your industry, with explainability and compliance built in. You stay in control.",
  },
  {
    num: "04",
    title: "Innovation That Ships.",
    desc: "We measure success in deployed systems, optimized operations, and measurable results — not delivered documents. Every engagement starts with a clear definition of done, tracked all the way to go-live and beyond.",
  },
];

const PillarsSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="eyebrow-badge mx-auto mb-4">
            <span>Brand pillars</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground">Four pillars of delivery</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Everything AA Innovation communicates should connect back to one of these four pillars. Together, they
            define what we are, how we work, and why clients choose us over firms ten times our size.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white p-8 border border-border rounded-[22px] border-l-[5px] border-l-primary hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="text-primary text-3xl font-heading font-bold">{p.num}</span>
              <h3 className="text-lg font-heading font-semibold text-foreground mt-4 mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
