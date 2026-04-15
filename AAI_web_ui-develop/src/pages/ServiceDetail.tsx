import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Bot, BarChart3, Cloud, Shield } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const goldWaveBottom = '/placeholder.svg';

const serviceData: Record<string, {
  icon: typeof Bot; title: string; tagline: string; description: string;
  capabilities: string[]; benefits: string[];
}> = {
  "ai-automation": {
    icon: Bot,
    title: "AI & Automation",
    tagline: "AI deployed as a precision instrument — tied to specific outcomes.",
    description: "We leverage artificial intelligence and machine learning to automate processes, gain insights, and drive innovation across your organization. Our AI solutions are calibrated to your industry, always transparent, and human-led.",
    capabilities: ["Machine Learning & Deep Learning", "Natural Language Processing", "Robotic Process Automation", "Computer Vision", "Predictive Analytics", "Intelligent Document Processing"],
    benefits: ["Reduce manual effort by up to 70%", "Faster decision-making with real-time insights", "Scalable automation across departments", "Industry-specific AI models"],
  },
  "data-analytics": {
    icon: BarChart3,
    title: "Data & Analytics",
    tagline: "Transform raw data into actionable intelligence.",
    description: "Our data and analytics practice transforms raw data into actionable intelligence with advanced analytics platforms, real-time dashboards, and predictive modeling tailored to your business context.",
    capabilities: ["Business Intelligence Platforms", "Real-Time Dashboards", "Predictive & Prescriptive Modeling", "Data Warehousing & Lakes", "ETL/ELT Pipeline Design", "Data Governance Frameworks"],
    benefits: ["360° visibility into operations", "Data-driven decision making", "Reduced reporting cycles by 80%", "Compliant data management"],
  },
  "cloud-solutions": {
    icon: Cloud,
    title: "Cloud Solutions",
    tagline: "Modernize your infrastructure with scalable cloud architectures.",
    description: "Accelerate cloud adoption with FedRAMP-compliant infrastructure, migration strategies, and hybrid/multi-cloud architectures designed for performance, security, and cost optimization.",
    capabilities: ["Cloud Migration & Modernization", "Multi-Cloud & Hybrid Strategy", "Infrastructure as Code", "Serverless Architecture", "Cost Optimization", "FedRAMP Compliance"],
    benefits: ["40% average infrastructure cost reduction", "99.99% uptime SLA support", "Seamless legacy-to-cloud transitions", "Scalable on-demand resources"],
  },
  "cybersecurity": {
    icon: Shield,
    title: "Cybersecurity",
    tagline: "Protect your digital assets with comprehensive security frameworks.",
    description: "Our cybersecurity practice delivers comprehensive security frameworks including FISMA, NIST 800-53, Zero Trust Architecture, and OT environment protection to defend against evolving threats.",
    capabilities: ["Zero Trust Architecture", "Security Operations Center (SOC)", "Threat Detection & Response", "Compliance & Audit Support", "OT/ICS Security", "Penetration Testing"],
    benefits: ["Proactive threat mitigation", "Regulatory compliance assurance", "Reduced incident response time", "End-to-end security posture"],
  },
};

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const service = serviceData[serviceSlug || ""];

  if (!service) {
    return (
      <div className="relative min-h-screen bg-white">
        <div className="relative z-10">
          <Navbar />
          <div className="pt-10 sm:pt-12 pb-16 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Service not found</h1>
            <Link to="/" className="text-primary font-bold">Back to Home</Link>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  const Icon = service.icon;

  return (
    <div className="relative min-h-screen bg-white">
      <div
        className="fixed bottom-0 left-0 right-0 h-[260px] md:h-[340px] pointer-events-none opacity-70 z-0"
        style={{ backgroundImage: `url(${goldWaveBottom})`, backgroundSize: '100% 100%', backgroundPosition: 'bottom center', backgroundRepeat: 'no-repeat' }}
      />
      <div className="relative z-10">
        <Navbar />

        <section className="pt-10 sm:pt-12 pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Link to="/#services" className="inline-flex items-center gap-2 text-primary text-sm font-bold mb-6 hover:gap-3 transition-all">
                <ArrowLeft size={16} /> Back to Services
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center bg-primary/5 border border-primary/10">
                  <Icon size={28} className="text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground">{service.title}</h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">{service.tagline}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-extrabold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-extrabold text-foreground mb-6">Key Capabilities</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap) => (
                  <div key={cap} className="flex items-start gap-3 p-4 bg-white border border-border rounded-[14px] shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground text-sm">{cap}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-extrabold text-foreground mb-6">Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 p-4 bg-secondary border border-primary/15 rounded-[14px]">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center py-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Ready to get started?</h3>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_10px_18px_rgba(28,57,187,0.18)]"
              >
                Book a Free Strategy Call <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default ServiceDetail;
