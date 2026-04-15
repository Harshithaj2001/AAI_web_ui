import { motion } from "framer-motion";
import { ArrowRight, Briefcase, MapPin, FileText } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { insertContactSubmission } from "@/lib/contactSubmissions";

const goldWaveBottom = "/placeholder.svg";

const topics = [
  "Industries",
  "Solutions",
  "Careers",
  "Partnerships",
  "Press / Media",
  "Website Feedback",
  "Other",
];
const locations = [
  "United States",
  "Canada",
  "United Kingdom",
  "Europe",
  "Asia Pacific",
  "Middle East",
  "Latin America",
  "Other",
];

const quickLinks = [
  {
    icon: Briefcase,
    title: "Careers",
    description: "Explore opportunities to work with AA Innovation alongside practitioners who ship outcomes.",
    linkText: "View Open Positions",
  },
  {
    icon: MapPin,
    title: "Our Locations",
    description: "Learn how we support clients across Energy, Healthcare, Manufacturing, Finance, Federal, Logistics, and beyond.",
    linkText: "See Locations",
  },
  {
    icon: FileText,
    title: "Request a Proposal",
    description: "Share your objectives and constraints — we will respond with a practitioner-led path forward.",
    linkText: "Submit RFP",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [consent, setConsent] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [topic, setTopic] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!privacyAccepted) {
      toast({
        title: "Privacy statement required",
        description: "Please accept the privacy statement to continue.",
        variant: "destructive",
      });
      return;
    }
    if (!consent) {
      toast({
        title: "Consent required",
        description: "Please let us know if we may contact you about services and events.",
        variant: "destructive",
      });
      return;
    }
    if (!topic) {
      toast({ title: "Topic required", description: "Please select a topic.", variant: "destructive" });
      return;
    }
    if (!locationValue) {
      toast({ title: "Location required", description: "Please select your location.", variant: "destructive" });
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    setIsSubmitting(true);
    const { error } = await insertContactSubmission({
      form_source: "contact_page",
      topic,
      first_name: String(fd.get("first_name") ?? "").trim() || null,
      last_name: String(fd.get("last_name") ?? "").trim() || null,
      full_name: null,
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim() || null,
      job_title: String(fd.get("job_title") ?? "").trim() || null,
      phone: String(fd.get("phone") ?? "").trim() || null,
      zip_code: String(fd.get("zip_code") ?? "").trim() || null,
      location: locationValue,
      message: String(fd.get("message") ?? "").trim(),
      service_interest: null,
      marketing_consent: consent,
      privacy_accepted: privacyAccepted,
    });
    setIsSubmitting(false);

    if (error) {
      toast({ title: "Could not send", description: error, variant: "destructive" });
      return;
    }

    toast({
      title: "Message sent",
      description: "Thank you for contacting AA Innovation. We will be in touch shortly.",
    });
    form.reset();
    setConsent("");
    setPrivacyAccepted(false);
    setTopic("");
    setLocationValue("");
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div
        className="fixed bottom-0 left-0 right-0 h-[350px] md:h-[500px] pointer-events-none opacity-70 z-0"
        style={{
          backgroundImage: `url(${goldWaveBottom})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10">
        <Navbar />

        <section className="bg-secondary pt-10 sm:pt-12 pb-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3 font-medium">AA Innovation LLC</p>
              <h1 className="text-4xl md:text-5xl font-black text-foreground">Contact us</h1>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-2xl font-extrabold text-foreground mb-2">How can we help?</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Required fields are marked with an asterisk (<span className="text-primary font-semibold">*</span>)
              </p>

              <form onSubmit={(e) => void handleSubmit(e)} className="space-y-5">
                <FormSelectControlled
                  label="Topic"
                  value={topic}
                  onValueChange={setTopic}
                  required
                  options={topics}
                  placeholder="Please select"
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormInput label="First Name" name="first_name" required placeholder="Jane" />
                  <FormInput label="Last Name" name="last_name" required placeholder="Doe" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormInput
                    label="Email Address"
                    name="email"
                    required
                    type="email"
                    placeholder="jane.doe@company.com"
                  />
                  <FormInput label="Company" name="company" required placeholder="Your Company" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormInput label="Job Title" name="job_title" required placeholder="Your Title" />
                  <FormInput label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <FormInput label="Zip / Postal Code" name="zip_code" required placeholder="00000" />
                  <FormSelectControlled
                    label="Location"
                    value={locationValue}
                    onValueChange={setLocationValue}
                    required
                    options={locations}
                    placeholder="Select your location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    How can we help? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-muted-foreground"
                    placeholder="Tell us about your project, challenge, or question..."
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-3">
                    May we contact you about AA Innovation services and events?{" "}
                    <span className="text-primary">*</span>
                  </p>
                  <RadioGroup value={consent} onValueChange={setConsent} className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="consent-yes" />
                      <label htmlFor="consent-yes" className="text-sm text-foreground cursor-pointer">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="consent-no" />
                      <label htmlFor="consent-no" className="text-sm text-foreground cursor-pointer">
                        No
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={privacyAccepted}
                    onCheckedChange={(v) => setPrivacyAccepted(v === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I have read and accept the <span className="text-primary underline">Privacy Statement</span> and{" "}
                    <span className="text-primary underline">Terms of Use</span>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-sm font-medium rounded-full hover:bg-primary/80 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit"} <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              className="lg:w-[340px] space-y-5 lg:pt-12"
            >
              {quickLinks.map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border p-6 hover:border-primary/40 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon size={20} className="text-primary" />
                    <h3 className="text-primary font-bold text-base">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                    {item.linkText} <ArrowRight size={14} />
                  </span>
                </div>
              ))}

              <div className="bg-secondary border border-border p-6">
                <h3 className="text-foreground font-bold text-base mb-3">Get in touch directly</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Email:</span> info@aainnovation.ai
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Phone:</span> +1 (786) 495-7725
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-2">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
    />
  </div>
);

const FormSelectControlled = ({
  label,
  value,
  onValueChange,
  required: _required,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  required?: boolean;
  options: string[];
  placeholder: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-2">
      {label} {_required && <span className="text-primary">*</span>}
    </label>
    <Select value={value || undefined} onValueChange={onValueChange}>
      <SelectTrigger className="w-full px-4 py-3 h-auto border border-border bg-card text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default Contact;
