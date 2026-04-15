import { motion } from "framer-motion";
import { Zap, Heart, Factory, DollarSign, Users, Building, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactBanner from "@/components/ContactBanner";
const goldWaveBottom = '/placeholder.svg';

const industries = [
  {
    icon: Zap, title: "Energy", tagline: "Powering the Infrastructure of Tomorrow.",
    desc: "AA Innovations empowers energy companies to modernize infrastructure, optimize grid management, and accelerate the transition to sustainable operations.",
    bullets: ["Smart grid modernization and energy management systems", "Predictive maintenance and asset performance optimization", "Renewable energy integration and sustainability reporting", "Regulatory compliance: NERC CIP, EPA, FERC, and state frameworks", "Cybersecurity for operational technology (OT) environments"],
  },
  {
    icon: Heart, title: "Healthcare", tagline: "Better Technology. Better Care. No Compromises.",
    desc: "We partner with health systems, payers, life sciences organizations, and government health agencies to modernize clinical and administrative operations.",
    bullets: ["EHR integration, optimization, and interoperability (HL7, FHIR)", "Healthcare data analytics and population health platforms", "Telehealth and digital care delivery infrastructure", "Revenue cycle modernization and billing automation", "HIPAA compliance, cybersecurity, and health data governance"],
  },
  {
    icon: Factory, title: "Manufacturing", tagline: "The Factory of the Future Is Here.",
    desc: "AA Innovations helps manufacturers embrace Industry 4.0 by connecting people, machines, and data across the production lifecycle.",
    bullets: ["Smart factory design and Industry 4.0 roadmapping", "MES implementation and ERP / OT integration", "Predictive quality and defect reduction analytics", "Supply chain visibility, demand forecasting, and inventory optimization", "OT / IT convergence and industrial cybersecurity"],
  },
  {
    icon: DollarSign, title: "Finance", tagline: "Where Risk Meets Resilience.",
    desc: "In the financial services sector, AA Innovations delivers technology-driven solutions that enhance operational resilience and ensure regulatory compliance.",
    bullets: ["Core banking modernization and cloud migration", "Risk management, AML compliance, and fraud detection", "Regulatory reporting, data governance, and audit readiness", "Wealth management and investment platform development", "Open banking architecture and fintech integration"],
  },
  {
    icon: Users, title: "Consulting", tagline: "Strategic Clarity. Actionable Outcomes.",
    desc: "AA Innovations' consulting practice brings strategic clarity to complex business challenges with analytical rigor.",
    bullets: ["Digital strategy and enterprise transformation roadmaps", "Organizational change management and adoption", "Process optimization and operational efficiency", "Technology vendor selection and program management", "Performance benchmarking and KPI development"],
  },
  {
    icon: Building, title: "Federal", tagline: "Mission-Ready. Compliance-Built. Outcome-Accountable.",
    desc: "AA Innovations is a trusted partner to federal agencies, delivering mission-critical technology solutions.",
    bullets: ["Federal IT modernization and legacy system migration", "Cloud adoption and FedRAMP-compliant infrastructure", "Cybersecurity: FISMA, NIST 800-53, Zero Trust Architecture", "Digital services and citizen experience platform development", "Program management, acquisition support, and CPIC alignment"],
  },
  {
    icon: Truck, title: "Logistics", tagline: "Every Link in the Chain, Optimized.",
    desc: "AA Innovations provides logistics companies with the digital tools they need to optimize operations and improve visibility.",
    bullets: ["Supply chain visibility and real-time tracking platforms", "Transportation management system (TMS) implementation and optimization", "Warehouse automation and inventory intelligence", "Last-mile delivery optimization and route analytics", "Supply chain resilience modeling and risk scenario planning"],
  },
];

const Industries = () => {
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
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4 font-medium">Where We Operate</p>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">Industries We Serve</h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              AA Innovations delivers specialized capabilities across seven core industries. Every practice
              is led by sector veterans.
            </p>
          </motion.div>
        </div>
      </section>

      {industries.map((ind, i) => (
        <section key={ind.title} className={`py-16 ${i % 2 === 0 ? "bg-background" : "bg-card"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ind.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">{ind.title}</h2>
                  <p className="text-primary text-sm font-medium">{ind.tagline}</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-4xl mb-6">{ind.desc}</p>
              <ul className="space-y-2 max-w-3xl">
                {ind.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-primary font-bold mt-0.5">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      ))}

      <ContactBanner />
      <Footer />
      </div>
    </div>
  );
};

export default Industries;
