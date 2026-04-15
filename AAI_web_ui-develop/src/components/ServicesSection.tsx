import { motion } from "framer-motion";
import { ArrowRight, Bot, BarChart3, Cloud, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Bot,
    slug: "ai-automation",
    title: "AI & Automation",
    description:
      "Leverage artificial intelligence and machine learning to automate processes, gain insights, and drive innovation across your organization.",
  },
  {
    icon: BarChart3,
    slug: "data-analytics",
    title: "Data & Analytics",
    description:
      "Transform raw data into actionable intelligence with advanced analytics platforms, real-time dashboards, and predictive modeling.",
  },
  {
    icon: Cloud,
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Modernize your infrastructure with scalable cloud architectures, seamless migrations, and optimized multi-cloud strategies.",
  },
  {
    icon: Shield,
    slug: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Protect your digital assets with comprehensive security frameworks, threat detection, and compliance-driven defense strategies.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="eyebrow-badge mx-auto mb-4">
            <span>What We Do</span>
          </div>
          <h2 className="section-heading text-3xl md:text-4xl font-heading font-extrabold text-foreground">Our Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white border border-border p-8 rounded-[22px] shadow-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-6 border border-gold/35 bg-gold-light/40"
                aria-hidden
              >
                <service.icon className="text-gold-deep" size={28} strokeWidth={1.75} />
              </div>
              <h3 className="text-foreground font-heading font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-3 transition-all duration-200"
              >
                Learn More
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
