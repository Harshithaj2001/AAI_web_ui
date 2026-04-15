import { motion } from "framer-motion";
import { ArrowRight, Bot, BarChart3, Cloud, Shield, Monitor, Cpu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBanner from "@/components/ContactBanner";
const goldWaveBottom = '/placeholder.svg';

const categories = ["All", "AI & Automation", "Data & Analytics", "Cloud", "Cybersecurity", "Digital Transformation"];

const solutions = [
  { icon: Bot, title: "AI & Automation", category: "AI & Automation", desc: "AI deployed as a precision instrument — tied to specific outcomes, calibrated to your industry, always transparent and human-led." },
  { icon: BarChart3, title: "Data & Analytics", category: "Data & Analytics", desc: "Transform raw data into actionable intelligence with advanced analytics platforms, BI dashboards, and predictive models." },
  { icon: Cloud, title: "Cloud Solutions", category: "Cloud", desc: "Accelerate cloud adoption with FedRAMP-compliant infrastructure, migration strategies, and hybrid cloud architectures." },
  { icon: Shield, title: "Cybersecurity", category: "Cybersecurity", desc: "Comprehensive security frameworks including FISMA, NIST 800-53, Zero Trust Architecture, and OT environment protection." },
  { icon: Monitor, title: "Digital Transformation", category: "Digital Transformation", desc: "End-to-end transformation from legacy modernization to enterprise platform development, strategy through go-live." },
  { icon: Cpu, title: "Technology Consulting", category: "Digital Transformation", desc: "Technology vendor selection, program management, performance benchmarking, and enterprise transformation roadmaps." },
];

const Solutions = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? solutions : solutions.filter((s) => s.category === active);

  return (
    <div className="relative min-h-screen bg-white">
      <div
        className="fixed bottom-0 left-0 right-0 h-[260px] md:h-[340px] pointer-events-none opacity-70 z-0"
        style={{ backgroundImage: `url(${goldWaveBottom})`, backgroundSize: '100% 100%', backgroundPosition: 'bottom center', backgroundRepeat: 'no-repeat' }}
      />
      <div className="relative z-10">
      <Navbar />

      <section className="bg-secondary pt-10 sm:pt-12 pb-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="eyebrow-badge mb-4">
              <span>What We Offer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6">Expert Solutions for a Digital Future</h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-8">
              Technology and consulting solutions built for the specific realities of each industry we serve,
              executed by experts who have spent careers inside them.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_10px_18px_rgba(28,57,187,0.18)]"
            >
              Book a Free Strategy Call <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-0 mb-12 border-b border-border">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                  active === cat
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-white p-8 border border-border rounded-[22px] hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="w-10 h-10 rounded-[14px] bg-secondary flex items-center justify-center mb-5">
                  <s.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-foreground font-heading font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link
                  to="/contact"
                  className="text-primary text-sm font-bold inline-flex items-center gap-1"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactBanner />
      <Footer />
      </div>
    </div>
  );
};

export default Solutions;
