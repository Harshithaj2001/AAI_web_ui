import { motion } from "framer-motion";

const stats = [
  { value: "7", label: "Industries, one integrated team" },
  { value: "4", label: "Delivery pillars" },
  { value: "Senior", label: "Practitioners on every engagement" },
  { value: "Shipped", label: "Measured in outcomes, not decks" },
];

const StatsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-[26px] p-10 text-white"
          style={{
            background: "linear-gradient(180deg, #0E1A4F, #12276c)",
            boxShadow: "0 24px 56px rgba(14,26,79,0.18)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-heading font-extrabold text-gold mb-2 leading-tight">
                  {stat.value}
                </p>
                <p className="text-white/70 text-xs md:text-sm tracking-wide leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
