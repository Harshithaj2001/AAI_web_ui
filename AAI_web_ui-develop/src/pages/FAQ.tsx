import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/ContactFormModal";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const goldWaveBottom = '/placeholder.svg';

const faqs = [
  { q: "What services does AA Innovation offer?", a: "We offer AI & Machine Learning, Cloud Solutions, Cybersecurity, Data Analytics, Digital Transformation, IT Consulting, and Custom Software Development. Each service is tailored to your organization's specific needs." },
  { q: "How do I get started with AA Innovation?", a: "Simply reach out via our Contact Us form or email us at info@aainnovation.ai. We'll schedule a free consultation to understand your requirements and propose a tailored solution." },
  { q: "What industries do you serve?", a: "We serve Healthcare, Finance & Banking, Retail & E-Commerce, Manufacturing, Education, Government, and more. Our solutions are adaptable to any industry's unique challenges." },
  { q: "How long does a typical project take?", a: "Project timelines vary based on scope and complexity. A small automation project may take 4–6 weeks, while a full digital transformation can span 3–6 months. We provide detailed timelines during the proposal phase." },
  { q: "Do you offer ongoing support after project delivery?", a: "Yes. We provide post-launch support, maintenance, and optimization services to ensure your solution continues to perform at its best. Support plans are flexible and can be customized." },
  { q: "What is your pricing model?", a: "We offer flexible pricing — fixed-price projects, time & materials, and retainer-based engagements. Pricing depends on the project scope, and we provide transparent estimates upfront." },
  { q: "Can you work with our existing technology stack?", a: "Absolutely. We specialize in integrating with and enhancing existing systems. Our team evaluates your current infrastructure and recommends the most efficient path forward." },
  { q: "Is my data secure with AA Innovation?", a: "Security is a core pillar of everything we build. We follow industry best practices including encryption, access controls, regular audits, and compliance with standards like SOC 2 and GDPR." },
];

const FAQ = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white">
      <div
className="fixed bottom-0 left-0 right-0 h-[350px] md:h-[500px] pointer-events-none opacity-70 z-0"
        style={{ backgroundImage: `url(${goldWaveBottom})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      />
      <div className="relative z-10">
        <Navbar onContactClick={() => setContactModalOpen(true)} />
        <main className="pt-4 sm:pt-6">
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="eyebrow-badge mx-auto mb-4">
                  <span>Frequently Asked Questions</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                  Got Questions? We've Got Answers.
                </h1>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto">
                  Everything you need to know about working with AA Innovation.
                </p>
              </div>

              <div className="border border-border bg-white p-6 sm:p-8 rounded-[22px] shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-border">
                      <AccordionTrigger className="text-sm text-foreground hover:text-primary hover:no-underline py-3">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
      <ContactFormModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </div>
  );
};

export default FAQ;
