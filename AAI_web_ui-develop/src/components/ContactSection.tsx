import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmission } from "@/lib/contactSubmissions";

const serviceOptions = [
  "AI & Automation",
  "Data & Analytics",
  "Cloud Solutions",
  "Cybersecurity",
  "Digital Transformation",
  "Technology Consulting",
  "Other",
];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceInterest, setServiceInterest] = useState<string>("");

  const setRequiredMessage = (el: HTMLInputElement | HTMLTextAreaElement) => {
    if (el.validity.valueMissing) el.setCustomValidity("Required");
    else if (el.validity.typeMismatch) el.setCustomValidity("Enter a valid value");
    else el.setCustomValidity("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setIsSubmitting(true);
    const fullName = String(fd.get("full_name") ?? "").trim();
    const { error } = await insertContactSubmission({
      form_source: "home_section",
      topic: null,
      first_name: null,
      last_name: null,
      full_name: fullName || null,
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim() || null,
      job_title: null,
      phone: String(fd.get("phone") ?? "").trim() || null,
      zip_code: null,
      location: null,
      message: String(fd.get("message") ?? "").trim(),
      service_interest: serviceInterest || null,
      marketing_consent: null,
      privacy_accepted: null,
    });
    setIsSubmitting(false);

    if (error) {
      toast({ title: "Could not send", description: error, variant: "destructive" });
      return;
    }

    toast({
      title: "Message sent",
      description: "Thank you for contacting AA Innovation. We'll be in touch shortly.",
    });
    form.reset();
    setServiceInterest("");
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="eyebrow-badge mx-auto mb-4">
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mb-4">Talk to a practitioner</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Share your challenge — senior practitioners respond, not a call center.
          </p>
        </motion.div>

        <motion.form
          onSubmit={(e) => void handleSubmit(e)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-5 bg-white border border-border rounded-[22px] p-8 shadow-sm"
        >
          <p className="text-muted-foreground text-sm mb-2">
            Required fields are marked with an asterisk (<span className="text-gold-deep font-bold">*</span>)
          </p>

          <FormInput label="Full Name" name="full_name" required placeholder="Jane Doe" />
          <FormInput label="Email" name="email" required type="email" placeholder="jane.doe@company.com" />

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">
              Message <span className="text-gold-deep">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={2000}
              className="w-full px-4 py-3 border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/12 focus:border-primary/40 resize-none placeholder:text-muted-foreground rounded-[14px]"
              placeholder="Tell us about your project, challenge, or question..."
              onInvalid={(e) => {
                setRequiredMessage(e.currentTarget);
                e.currentTarget.classList.add("is-invalid");
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity("");
                e.currentTarget.classList.remove("is-invalid");
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 items-start">
            <FormInput label="Company Name" name="company" placeholder="Your Company (optional)" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-2">
                <label className="block text-sm font-bold text-foreground">Phone Number</label>
                <span className="text-muted-foreground text-xs whitespace-nowrap">For a faster response</span>
              </div>
              <input
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/12 focus:border-primary/40 placeholder:text-muted-foreground rounded-[14px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Service Interest</label>
            <Select value={serviceInterest || undefined} onValueChange={setServiceInterest}>
              <SelectTrigger className="w-full px-4 py-3 h-auto border border-border bg-white text-sm rounded-[14px]">
                <SelectValue placeholder="Select a service (optional)" />
              </SelectTrigger>
              <SelectContent>
                {serviceOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 px-8 py-3.5 text-sm font-bold rounded-xl text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 shadow-[0_10px_18px_rgba(53,88,216,0.22)]"
            style={{ backgroundColor: "hsl(228 65% 53%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(228 74% 42%)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(228 65% 53%)")}
          >
            {isSubmitting ? "Sending..." : "Send Message"} <ArrowRight size={16} />
          </button>
        </motion.form>

        <div className="mt-8 text-center text-sm text-muted-foreground space-y-1">
          <p>
            <span className="text-foreground font-bold">Email:</span> info@aainnovation.ai
          </p>
          <p>
            <span className="text-foreground font-bold">Phone:</span> +1 (786) 495-7725
          </p>
        </div>
      </div>
    </section>
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
    <label className="block text-sm font-bold text-foreground mb-2">
      {label} {required && <span className="text-gold-deep">*</span>}
    </label>
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-border bg-white text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/12 focus:border-primary/40 placeholder:text-muted-foreground rounded-[14px]"
      onInvalid={(e) => {
        if (e.currentTarget.validity.valueMissing) e.currentTarget.setCustomValidity("Required");
        else if (e.currentTarget.validity.typeMismatch) e.currentTarget.setCustomValidity("Enter a valid value");
        else e.currentTarget.setCustomValidity("");
        e.currentTarget.classList.add("is-invalid");
      }}
      onInput={(e) => {
        e.currentTarget.setCustomValidity("");
        e.currentTarget.classList.remove("is-invalid");
      }}
    />
  </div>
);

export default ContactSection;
