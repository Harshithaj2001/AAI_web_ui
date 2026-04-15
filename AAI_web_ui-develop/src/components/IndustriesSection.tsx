import { motion } from "framer-motion";
import { Zap, Heart, Factory, DollarSign, Users, Building, Truck } from "lucide-react";

const industries = [
  { icon: Zap, title: "Energy", tagline: "The energy sector is being rebuilt. We're helping lead it." },
  { icon: Heart, title: "Healthcare", tagline: "Better technology. Better care. No compromises." },
  { icon: Factory, title: "Manufacturing", tagline: "The factory of the future isn't coming — it's here." },
  { icon: DollarSign, title: "Finance", tagline: "Where risk meets resilience." },
  { icon: Users, title: "Consulting", tagline: "Strategic clarity and integrated delivery — not slideware." },
  { icon: Building, title: "Federal", tagline: "Mission-ready. Compliance-built. Outcome-accountable." },
  { icon: Truck, title: "Logistics", tagline: "Every link in the chain, optimized." },
];

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="eyebrow-badge mx-auto mb-4">
            <span>Where We Operate</span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl font-heading font-extrabold text-foreground">Industries We Serve</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Seven integrated practice areas — not siloed divisions — so the right experts align around your whole
            problem.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white p-6 border border-border rounded-[22px] hover:border-primary/30 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4 border border-gold/30 bg-gold-light/35 group-hover:bg-gold-light/55 transition-colors"
                aria-hidden
              >
                <ind.icon size={22} className="text-gold-deep" strokeWidth={1.75} />
              </div>
              <h3 className="text-foreground font-heading font-semibold mb-2">{ind.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{ind.tagline}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
