import { Menu, User, LogOut, ChevronDown, HelpCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@context/AuthContext";
import Logo from "@/components/Logo";
import { AdminNotificationsBell } from "@/components/AdminNotificationsBell";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const aboutDropdownItems = [
  { label: "Our Values", to: "/about" },
  { label: "FAQ", to: "/faq" },
];

const servicesDropdownItems = [
  { label: "AI & Automation", to: "/services/ai-automation" },
  { label: "Data & Analytics", to: "/services/data-analytics" },
  { label: "Cloud Solutions", to: "/services/cloud-solutions" },
  { label: "Cybersecurity", to: "/services/cybersecurity" },
];

const simpleNavLinks = [
  { label: "Home", hash: "" },
  { label: "Industries", hash: "#industries" },
  { label: "Contact Us", hash: "#contact" },
];

const Navbar = ({ onContactClick }: { onContactClick?: () => void } = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isOwner, isEmployee } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sectionIds = ["about", "services", "industries", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 88;
      const sections = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: Math.round(el.getBoundingClientRect().top + window.scrollY) } : null;
        })
        .filter((item): item is { id: string; top: number } => item !== null);

      let matchedHash = "";
      for (const section of sections) {
        if (scrollY >= section.top) matchedHash = `#${section.id}`;
        else break;
      }
      setActiveHash(matchedHash);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = useCallback(
    (hash: string) => {
      setSheetOpen(false);
      setActiveHash(hash);
      if (hash === "#contact" && onContactClick) {
        onContactClick();
        return;
      }
      if (location.pathname !== "/") {
        navigate("/" + hash);
        return;
      }
      if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.querySelector(hash);
      if (el) {
        const navHeight = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [location.pathname, navigate, onContactClick]
  );

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const handleDropdownItemClick = (item: { label: string; hash?: string; to?: string }) => {
    setOpenDropdown(null);
    if (item.hash) {
      scrollToSection(item.hash);
    } else if (item.to) {
      navigate(item.to);
    }
  };

  const handleLogout = () => {
    void signOut();
    setSheetOpen(false);
    navigate("/");
  };

  const isAboutPage = location.pathname === "/about" || location.pathname === "/faq";
  const isServicePage = location.pathname.startsWith("/services");
  const isHomePath = location.pathname === "/";
  const isAboutActive = isAboutPage || activeHash === "#about";
  const isServicesActive = isServicePage || activeHash === "#services";
  const loggedOutLabel = "Sign In";

  const renderDropdownNav = (
    label: string,
    items: { label: string; hash?: string; to?: string }[],
    isActive: boolean,
    parentHash: string
  ) => (
    <div
      className="relative"
      onMouseEnter={() => handleDropdownEnter(label)}
      onMouseLeave={handleDropdownLeave}
    >
      <button
        onClick={() => scrollToSection(parentHash)}
        className={`relative flex items-center gap-1 px-4 py-2.5 text-[13px] font-semibold tracking-wide hover:text-primary hover:bg-secondary rounded-xl transition-colors duration-200 ${isActive ? "text-primary" : "text-foreground/70"}`}
      >
        {label}
        <ChevronDown
          size={12}
          className={`opacity-50 transition-transform duration-200 ${openDropdown === label ? "rotate-180" : ""}`}
        />
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-[1px] left-[12%] right-[12%] h-[2.5px] bg-gold rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
      </button>

      <AnimatePresence>
        {openDropdown === label && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1 w-52 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-50"
          >
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => handleDropdownItemClick(item)}
                className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors duration-150"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full bg-white border-b border-border/75 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
          <button onClick={() => scrollToSection("")} className="flex items-center group">
            <Logo size="md" />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {/* Home */}
            <button
              onClick={() => scrollToSection("")}
              className={`relative px-4 py-2.5 text-[13px] font-semibold tracking-wide hover:text-primary hover:bg-secondary rounded-xl transition-colors duration-200 ${isHomePath && activeHash === "" ? "text-primary" : "text-foreground/70"}`}
            >
              Home
              {isHomePath && activeHash === "" && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-[1px] left-[12%] right-[12%] h-[2.5px] bg-gold rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>

            {/* About Us dropdown */}
            {renderDropdownNav("About Us", aboutDropdownItems, isAboutActive, "#about")}

            {/* Services dropdown */}
            {renderDropdownNav("Services", servicesDropdownItems, isServicesActive, "#services")}

            {/* Industries & Contact */}
            {simpleNavLinks.filter(l => l.label !== "Home").map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.hash)}
                className={`relative px-4 py-2.5 text-[13px] font-semibold tracking-wide hover:text-primary hover:bg-secondary rounded-xl transition-colors duration-200 ${isHomePath && activeHash === link.hash ? "text-primary" : "text-foreground/70"}`}
              >
                {link.label}
                {isHomePath && activeHash === link.hash && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-[1px] left-[12%] right-[12%] h-[2.5px] bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}

            <div className="w-px h-5 bg-border mx-2" />

            {user ? (
              <div className="flex items-center gap-1.5">
                {isOwner && <AdminNotificationsBell />}
                <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold tracking-wide text-primary hover:bg-secondary transition-colors outline-none rounded-xl border border-primary/20 hover:border-primary/40">
                  <User size={14} className="opacity-70" />
                  {user.name}
                  <ChevronDown size={12} className="opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-border rounded-xl shadow-lg">
                  <DropdownMenuLabel className="text-muted-foreground text-xs font-normal px-3 py-2">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  {isOwner && (
                    <DropdownMenuItem
                      onClick={() => navigate("/admin")}
                      className="cursor-pointer rounded-md mx-1"
                    >
                      Admin portal
                    </DropdownMenuItem>
                  )}
                  {isOwner && (
                    <DropdownMenuItem
                      onClick={() => navigate("/admin?view=team")}
                      className="cursor-pointer rounded-md mx-1"
                    >
                      Team & invites
                    </DropdownMenuItem>
                  )}
                  {isEmployee && (
                    <DropdownMenuItem
                      onClick={() => navigate("/portal")}
                      className="cursor-pointer rounded-md mx-1"
                    >
                      Employee portal
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 rounded-md mx-1">
                    <LogOut size={14} className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold tracking-wide text-primary hover:bg-secondary transition-all duration-200 rounded-xl border border-primary/20 hover:border-primary/40"
              >
                <User size={14} className="opacity-60" />
                {loggedOutLabel}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-secondary transition-all duration-200"
            onClick={() => setSheetOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Sheet menu */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="bg-white border-l border-border w-[280px] sm:max-w-[280px]">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-foreground text-left">Menu</SheetTitle>
            <SheetDescription className="text-muted-foreground text-left text-xs">
              Quick access links
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-1">
            <button
              onClick={() => scrollToSection("")}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors rounded-xl w-full text-left"
            >
              Home
            </button>

            {/* About Us with sub-items */}
            <MobileAccordionNav
              label="About Us"
              items={aboutDropdownItems}
              onItemClick={handleDropdownItemClick}
              onParentClick={() => scrollToSection("#about")}
            />

            {/* Services with sub-items */}
            <MobileAccordionNav
              label="Services"
              items={servicesDropdownItems}
              onItemClick={handleDropdownItemClick}
              onParentClick={() => scrollToSection("#services")}
            />

            <button
              onClick={() => scrollToSection("#industries")}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors rounded-xl w-full text-left"
            >
              Industries
            </button>

            <button
              onClick={() => scrollToSection("#contact")}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors rounded-xl w-full text-left"
            >
              Contact Us
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-primary font-medium rounded-xl">
                  <User size={18} className="text-primary" />
                  {user.name}
                </div>
                <div className="px-4 py-1 text-xs text-muted-foreground">{user.email}</div>
                {isOwner && (
                  <div className="px-4 pb-2 flex justify-end">
                    <AdminNotificationsBell />
                  </div>
                )}
                {isOwner && (
                  <button
                    type="button"
                    onClick={() => {
                      setSheetOpen(false);
                      navigate("/admin");
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-all duration-200 rounded-xl w-full text-left"
                  >
                    Admin portal
                  </button>
                )}
                {isOwner && (
                  <button
                    type="button"
                    onClick={() => {
                      setSheetOpen(false);
                      navigate("/admin?view=team");
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-all duration-200 rounded-xl w-full text-left"
                  >
                    Team & invites
                  </button>
                )}
                {isEmployee && (
                  <button
                    type="button"
                    onClick={() => {
                      setSheetOpen(false);
                      navigate("/portal");
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-all duration-200 rounded-xl w-full text-left"
                  >
                    Employee portal
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-destructive hover:bg-destructive/5 transition-all duration-200 rounded-xl w-full text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setSheetOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-all duration-200 rounded-xl"
              >
                <User size={18} className="text-primary" />
                {loggedOutLabel}
              </Link>
            )}

            <Link
              to="/faq"
              onClick={() => setSheetOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors rounded-xl"
            >
              <HelpCircle size={18} className="text-primary" />
              FAQ
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

/* Mobile accordion sub-nav */
const MobileAccordionNav = ({
  label,
  items,
  onItemClick,
  onParentClick,
}: {
  label: string;
  items: { label: string; hash?: string; to?: string }[];
  onItemClick: (item: { label: string; hash?: string; to?: string }) => void;
  onParentClick: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={onParentClick}
          className="flex-1 flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors rounded-l-xl text-left"
        >
          {label}
        </button>
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-3 text-foreground/50 hover:text-primary hover:bg-secondary transition-colors rounded-r-xl"
        >
          <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => onItemClick(item)}
                className="w-full text-left pl-8 pr-4 py-2.5 text-[13px] text-foreground/60 hover:text-primary hover:bg-secondary/50 transition-colors rounded-lg"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
