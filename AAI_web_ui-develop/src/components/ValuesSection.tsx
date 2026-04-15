import { motion } from "framer-motion";
import { Lightbulb, Shield, Award, Handshake, Zap } from "lucide-react";

const missionCards = [
  {
    label: "Our Mission",
    text: "To empower forward-thinking organizations with the technology expertise, strategic clarity, and operational precision they need to lead — not follow — in an era of relentless change. We show up, we deliver, and we stay until the work is done.",
  },
  {
    label: "Our Vision",
    text: "To be the most trusted innovation and technology partner for organizations navigating transformation — recognized not for our size, but for our depth; not for our promises, but for our proof.",
  },
  {
    label: "Our Purpose",
    text: "To transform complexity into competitive advantage — delivering technology and consulting solutions built for the specific realities of each industry we serve.",
  },
];

const values = [
  { icon: Lightbulb, title: "Innovation", desc: "We embrace emerging technologies and creative thinking to solve problems that matter." },
  { icon: Shield, title: "Integrity", desc: "We operate with transparency, honesty, and accountability in every engagement." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards of quality, precision, and performance." },
  { icon: Handshake, title: "Partnership", desc: "We succeed when our clients succeed. Their goals are our goals." },
  { icon: Zap, title: "Agility", desc: "We adapt quickly to changing environments, technologies, and client needs." },
];

const ValuesSection = () => {
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
            <span>What Drives Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground">Mission, Vision & Values</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {missionCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white p-8 border border-border rounded-[22px] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <h3 className="text-primary font-heading font-semibold text-sm tracking-wide uppercase mb-4">{card.label}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-heading font-bold text-primary">Core Values</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-4 bg-primary/5 border border-primary/10">
                <v.icon size={24} className="text-primary" />
              </div>
              <h4 className="text-foreground font-heading font-semibold text-sm mb-2">{v.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
