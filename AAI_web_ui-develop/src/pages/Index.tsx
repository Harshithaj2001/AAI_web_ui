import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import StatsSection from "@/components/StatsSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import CTABanner from "@/components/CTABanner";
import ContactFormModal from "@/components/ContactFormModal";
import Footer from "@/components/Footer";
const goldWaveBottom = '/placeholder.svg';

const Index = () => {
  const location = useLocation();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          const navHeight = 72;
          const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f3f7ff_100%)]">
      <div className="absolute inset-0 pointer-events-none opacity-30 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22), transparent 70%)" }} />
      <div className="absolute top-52 -right-40 h-96 w-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,204,92,0.24), transparent 72%)" }} />
      <div
        className="fixed bottom-0 left-0 right-0 h-[350px] md:h-[500px] pointer-events-none opacity-35 z-0"
        style={{ backgroundImage: `url(${goldWaveBottom})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      />
      <div className="relative z-10">
        <Navbar />
        <HeroSection onContactClick={() => setContactModalOpen(true)} />
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(232,240,255,0.35)_0%,rgba(248,251,255,0.7)_45%,rgba(255,255,255,0.95)_100%)]" />
          <div className="absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />
          <div className="absolute top-[36%] right-[-8%] h-80 w-80 rounded-full bg-amber-300/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[8%] left-[-10%] h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <AboutSection />
            <ServicesSection />
            <IndustriesSection />
            <StatsSection />
            <WhyUsSection />
            <CTABanner />
            <ContactSection />
          </div>
        </div>
        <Footer />
      </div>
      <ContactFormModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </div>
  );
};

export default Index;
