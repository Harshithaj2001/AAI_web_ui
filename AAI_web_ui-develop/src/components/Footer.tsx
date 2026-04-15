import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const contactItems = [
  { label: "Email", href: "mailto:info@aainnovation.ai", Icon: Mail },
  { label: "Phone", href: "tel:+17864957725", Icon: Phone },
  { label: "Location", href: "#", Icon: MapPin },
];

const Footer = () => {
  const scrollTo = (hash: string) => {
    if (window.location.pathname !== "/") {
      window.location.href = "/" + hash;
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(228 65% 20%), hsl(228 65% 35%), hsl(228 65% 28%))" }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-[-200px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(45 90% 65%), transparent 70%)" }} />
      <div className="absolute bottom-[-150px] left-[-80px] w-[300px] h-[300px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, hsl(228 65% 60%), transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Logo size="sm" variant="light" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-6">
              Technology and consulting built for the realities of your industry — transforming complexity into
              competitive advantage.
            </p>
            <p className="text-white/60 text-sm mb-2">info@aainnovation.ai</p>
            <p className="text-white/60 text-sm mb-5">+1 (786) 495-7725</p>
            <div className="flex gap-3">
              {contactItems.map(({ label, href, Icon }) => (
                <a key={label} href={href} className="w-9 h-9 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white/60 hover:text-white transition-all duration-300" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-sm mb-5 tracking-wide uppercase">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/50 text-sm hover:text-white transition-colors duration-200">Home</Link></li>
              <li><button onClick={() => scrollTo("#about")} className="text-white/50 text-sm hover:text-white transition-colors duration-200">About Us</button></li>
              <li><button onClick={() => scrollTo("#services")} className="text-white/50 text-sm hover:text-white transition-colors duration-200">Services</button></li>
              <li><button onClick={() => scrollTo("#industries")} className="text-white/50 text-sm hover:text-white transition-colors duration-200">Industries</button></li>
              <li><button onClick={() => scrollTo("#contact")} className="text-white/50 text-sm hover:text-white transition-colors duration-200">Contact Us</button></li>
              <li><Link to="/faq" className="text-white/50 text-sm hover:text-white transition-colors duration-200">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-sm mb-5 tracking-wide uppercase">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services/ai-automation" className="text-white/50 text-sm hover:text-white transition-colors duration-200">AI & Automation</Link></li>
              <li><Link to="/services/data-analytics" className="text-white/50 text-sm hover:text-white transition-colors duration-200">Data Analytics</Link></li>
              <li><Link to="/services/cloud-solutions" className="text-white/50 text-sm hover:text-white transition-colors duration-200">Cloud Solutions</Link></li>
              <li><Link to="/services/cybersecurity" className="text-white/50 text-sm hover:text-white transition-colors duration-200">Cybersecurity</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-heading font-bold text-sm mb-5 tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/50 text-sm hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link to="/faq" className="text-white/50 text-sm hover:text-white transition-colors duration-200">FAQ</Link></li>
              <li><button onClick={() => scrollTo("#contact")} className="text-white/50 text-sm hover:text-white transition-colors duration-200">Contact</button></li>
              <li><Link to="/login" className="text-white/50 text-sm hover:text-white transition-colors duration-200">Sign In</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2026 AA Innovation LLC. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <a key={link} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors duration-200">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
