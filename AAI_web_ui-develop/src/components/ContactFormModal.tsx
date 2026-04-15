import { useState } from "react";
import { ArrowLeft, Send, Sparkles, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertContactSubmission } from "@/lib/contactSubmissions";

const services = [
  "AI & Machine Learning",
  "Cloud Solutions",
  "Cybersecurity",
  "Data Analytics",
  "Digital Transformation",
  "IT Consulting",
  "Software Development",
  "Other",
];

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactFormModal = ({ open, onOpenChange }: ContactFormModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceInterest, setServiceInterest] = useState("");

  const setRequiredMessage = (el: HTMLInputElement | HTMLTextAreaElement) => {
    if (el.validity.valueMissing) el.setCustomValidity("Required");
    else if (el.validity.typeMismatch) el.setCustomValidity("Enter a valid value");
    else el.setCustomValidity("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const fd = new FormData(form);

    setIsSubmitting(true);
    const fullName = String(fd.get("full_name") ?? "").trim();
    const { error } = await insertContactSubmission({
      form_source: "modal",
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
    onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed right-0 top-0 z-50 h-full w-[380px] max-w-[95vw] bg-white border-l border-border shadow-[-10px_0_40px_-10px_rgba(14,26,79,0.12)] duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right focus:outline-none flex flex-col">
          <DialogPrimitive.Close className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <div className="flex-1 flex flex-col px-7 py-8 overflow-hidden">
            <div className="mb-6">
              <DialogPrimitive.Title className="flex items-center gap-2 text-lg font-heading font-bold text-foreground mb-1.5">
                <Sparkles className="h-5 w-5 text-primary" />
                Talk to a practitioner
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-xs text-muted-foreground leading-relaxed">
                Senior expertise on every engagement — we respond as quickly as we can.
              </DialogPrimitive.Description>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="flex-1 flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.12em] uppercase text-foreground mb-1.5">
                  Full Name
                </label>
                <input
                  name="full_name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="form-input-style py-2.5 px-3.5 text-sm"
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

              <div>
                <label className="block text-[10px] font-bold tracking-[0.12em] uppercase text-foreground mb-1.5">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane.doe@company.com"
                  className="form-input-style py-2.5 px-3.5 text-sm"
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

              <div>
                <label className="block text-[10px] font-bold tracking-[0.12em] uppercase text-foreground mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  maxLength={2000}
                  placeholder="Tell us about your project, challenge, or question..."
                  className="form-input-style py-2.5 px-3.5 text-sm resize-none"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.12em] uppercase text-foreground mb-1.5">
                    Company
                  </label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Your Company"
                    className="form-input-style py-2.5 px-3.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.12em] uppercase text-foreground mb-1.5">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="form-input-style py-2.5 px-3.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.12em] uppercase text-foreground mb-1.5">
                  Service Interest
                </label>
                <Select value={serviceInterest || undefined} onValueChange={setServiceInterest}>
                  <SelectTrigger className="w-full px-3.5 py-2.5 h-auto border border-border bg-white text-sm text-muted-foreground focus:border-primary/40 rounded-lg">
                    <SelectValue placeholder="Select a service (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl text-white transition-all disabled:opacity-50 shadow-[0_10px_18px_rgba(53,88,216,0.22)]"
                  style={{ backgroundColor: "hsl(228 65% 53%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsl(228 74% 42%)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsl(228 65% 53%)")}
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} /> Go Back
                </button>
              </div>
            </form>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ContactFormModal;
