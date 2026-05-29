import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Factory,
  Gauge,
  Globe2,
  Headphones,
  Layers,
  Mail,
  MapPin,
  Maximize,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logo from "./assets/logo.png";

type Page = "home" | "about" | "peb" | "process" | "projects" | "why" | "contact";

const img = {
  hero: "https://images.pexels.com/photos/5846282/pexels-photo-5846282.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2400",
  weld: "https://images.pexels.com/photos/177872/pexels-photo-177872.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
  peb: "https://images.pexels.com/photos/36397980/pexels-photo-36397980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=2000",
  shed: "https://images.pexels.com/photos/29224626/pexels-photo-29224626.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=2000",
  steel: "https://images.pexels.com/photos/15288014/pexels-photo-15288014.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
  process: "https://images.pexels.com/photos/33514501/pexels-photo-33514501.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=2000",
  tanks: "https://images.pexels.com/photos/10040001/pexels-photo-10040001.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
  gauge: "https://images.pexels.com/photos/36826987/pexels-photo-36826987.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1800",
};

const nav: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "about", label: "About" },
  { page: "peb", label: "PEB Division" },
  { page: "process", label: "Process Equipment" },
  { page: "projects", label: "Projects" },
  { page: "why", label: "Why Swastik" },
  { page: "contact", label: "Contact" },
];

const divisions = [
  ["PEB Structures", "Engineered steel building systems for warehouses, factories, infrastructure and large-span industrial facilities.", img.peb, "peb"],
  ["Heavy Steel Structures", "High-strength structural fabrication for demanding industrial, infrastructure and manufacturing environments.", img.steel, "peb"],
  ["Pressure Vessels", "Precision-built process vessels for chemical, pharmaceutical, petrochemical and manufacturing plants.", img.gauge, "process"],
  ["Storage Tanks", "Industrial-grade tanks engineered for reliability, safe storage and long service life.", img.tanks, "process"],
  ["Reactors", "Process reactors designed and fabricated for controlled industrial operations and production environments.", img.process, "process"],
  ["Heat Exchangers", "Thermal equipment solutions for critical process applications and energy transfer duties.", img.process, "process"],
  ["Distillation Columns", "Column equipment for separation, purification and high-performance process plant applications.", img.tanks, "process"],
  ["Lead-Lined Equipment", "Specialized equipment for highly corrosive and demanding chemical process requirements.", img.weld, "process"],
] as const;

const industries = ["Chemical Industry", "Pharmaceutical", "Petrochemical", "Power & Energy", "Food & Beverage", "Water Treatment", "Infrastructure", "Manufacturing"];
const customers = ["EPC Contractors", "Chemical Industries", "Pharmaceutical Industries", "Petrochemical Plants", "Manufacturing Industries", "Warehousing Companies", "Infrastructure Developers", "Government Projects", "Export Clients"];
const why = ["Single Window Solution", "Fast Delivery & Erection", "Advanced Manufacturing Facility", "High Quality Material", "Future Expansion Capability", "Customer Support Excellence"];
const pebApplications = ["Aircraft Hangars", "Shopping Malls", "Metro Stations", "Petrol Pumps", "Factories", "Warehouses"];
const pebBenefits = ["Single Source Responsibility", "Lower Cost", "Fast Construction", "Earthquake Resistant", "Low Maintenance", "Energy Efficient", "Future Expansion", "Durability"];
const pebComponents = ["Primary Framing", "Secondary Framing", "Bracing Systems", "Crane Systems", "Mezzanine Floors", "Cladding Systems", "Accessories"];
const processProducts = ["Pressure Vessels", "Storage Tanks", "Reactors", "Heat Exchangers", "Receiver Tanks", "Distillation Columns", "Chlorine Vaporizers", "Lead-Lined Equipment", "ISO Containers"];
const infrastructure = ["40,000 Sq Ft Facility", "Rolling Machines", "Welding Rotators", "Hydraulic Testing", "Dish End Forming", "Heat Treatment", "MIG Welding", "TIG Welding", "Machining", "Grinding", "Painting Facilities"];
const workflow = ["Identify Requirement", "Solution Proposal", "Quotation", "Design Approval", "Fabrication", "Supply", "Erection", "Completion"];
const values = ["Integrity", "Quality", "Safety", "Innovation", "Sustainability"];

function currentPage(): Page {
  const hash = window.location.hash.replace("#", "") as Page;
  return nav.some((item) => item.page === hash) ? hash : "home";
}

function go(page: Page) {
  window.location.hash = page === "home" ? "" : page;
}

function Logo() {
  return (
    <div className="flex shrink-0 items-center">
      <img className="h-7 sm:h-8 md:h-10 w-auto object-contain" src={logo} alt="Swastik Engineering Logo" />
    </div>
  );
}

function Header({ active }: { active: Page }) {
  const [solid, setSolid] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (page: Page) => {
    go(page);
    setMega(false);
    setMobile(false);
  };

  return (
    <header className={`fixed inset-x-0 z-50 transition-all duration-500 flex justify-center ${solid ? "top-3" : "top-6"}`}>
      <div className={`flex h-16 w-[95%] max-w-[1200px] items-center justify-between rounded-full border border-[#C9A14A]/15 bg-white/95 px-6 backdrop-blur-2xl transition-all duration-500 ${solid ? "shadow-[0_20px_50px_rgba(31,31,31,0.1)] border-[#C9A14A]/30" : "shadow-xl"}`}>
        <button onClick={() => navigate("home")} aria-label="Swastik Engineering home"><Logo /></button>
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.slice(0, 5).map((item) => (
            <button key={item.page} onClick={() => navigate(item.page)} className={`group relative whitespace-nowrap px-5 py-2.5 text-[12px] font-semibold tracking-wide transition-colors ${active === item.page ? "text-[#C9A14A]" : "text-[#5E5E5E] hover:text-[#1F1F1F]"}`}>
              <span className="relative z-10">{item.label}</span>
              <span className={`absolute inset-0 z-0 rounded-full transition-all duration-300 ${active === item.page ? "bg-[#C9A14A]/15 opacity-100 scale-100" : "bg-black/5 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}`} />
            </button>
          ))}
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="group relative flex items-center gap-2 whitespace-nowrap px-5 py-2.5 text-[12px] font-semibold tracking-wide text-[#5E5E5E] transition-colors hover:text-[#1F1F1F]">
              <span className="relative z-10 flex items-center gap-2">More <ChevronDown className="h-3 w-3" /></span>
              <span className="absolute inset-0 z-0 rounded-full bg-black/5 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
            </button>
            <AnimatePresence>
              {mega && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 top-full mt-4 w-[760px] rounded-3xl border border-[#C9A14A]/15 bg-white/95 p-8 shadow-[0_20px_80px_rgba(31,31,31,0.08)] backdrop-blur-2xl">
                  <div className="grid grid-cols-[0.8fr_1.2fr] gap-8">
                    <div className="border-r border-[#C9A14A]/15 pr-8">
                      <p className="text-[10px]  tracking-wide text-[#C9A14A]">Navigation</p>
                      <p className="mt-5 text-2xl font-medium leading-tight text-[#1F1F1F]">Advanced engineering presence across every division.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {nav.slice(5).map((item) => (
                        <button key={item.page} onClick={() => navigate(item.page)} className="group rounded-2xl border border-[#C9A14A]/10 bg-[#FAF8F3]/50 p-4 text-left transition hover:border-[#C9A14A]/30 hover:bg-[#FAF8F3]">
                          <span className="block text-sm font-sans text-[#1F1F1F] group-hover:text-[#C9A14A]">{item.label}</span>
                          <span className="mt-1 block text-xs text-[#5E5E5E]">System overview.</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
        <button onClick={() => navigate("contact")} className="hidden whitespace-nowrap rounded-full bg-gradient-to-r from-[#C9A14A] to-[#E2C675] px-7 py-2.5 text-[12px] font-bold tracking-wide text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_10px_25px_rgba(201,161,74,0.3)] xl:block">Inquiry</button>
        <button onClick={() => setMobile(true)} className="grid h-10 w-10 place-items-center rounded-full border border-[#C9A14A]/15 bg-white/50 text-[#1F1F1F] xl:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></button>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[70] overflow-y-auto bg-[#FAF8F3] p-6 xl:hidden">
            <div className="flex items-center justify-between"><Logo /><button onClick={() => setMobile(false)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#C9A14A]/15 bg-white text-[#1F1F1F]"><X /></button></div>
            <div className="mt-12 grid gap-3 pb-12">
              {nav.map((item, index) => <motion.button key={item.page} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }} onClick={() => navigate(item.page)} className="rounded-2xl border border-[#C9A14A]/15 bg-white px-6 py-5 text-left text-lg font-medium tracking-wide text-[#1F1F1F] active:bg-[#C9A14A]/10 active:text-[#C9A14A]">{item.label}</motion.button>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function GoldLine() {
  return <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9A14A] to-transparent" />;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold  tracking-wide text-[#C9A14A]">{children}</p>;
}

function Button({ children, page, variant = "gold" }: { children: React.ReactNode; page?: Page; variant?: "gold" | "outline" }) {
  return (
    <motion.button onClick={() => page && go(page)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`group relative overflow-hidden rounded-full px-7 py-4 text-xs font-semibold  tracking-wide transition-all ${variant === "gold" ? "bg-[#C9A14A] text-white shadow-[0_15px_30px_rgba(201,161,74,0.3)] hover:shadow-[0_20px_40px_rgba(201,161,74,0.4)]" : "border border-[#C9A14A]/30 bg-white/80 text-[#1F1F1F] backdrop-blur-xl hover:border-[#C9A14A]/60 hover:bg-[#C9A14A]/5"}`}>
      <span className="relative z-10 flex items-center justify-center gap-3">{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.button>
  );
}

function SectionTitle({ kicker, title, text }: { kicker?: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto max-w-4xl text-center">
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="mt-4 text-3xl font-medium leading-[1.1] tracking-tight text-[#1F1F1F] md:text-5xl lg:text-6xl">{title}</h2>
      {text && <p className="mx-auto mt-6 max-w-2xl text-lg text-[#5E5E5E]">{text}</p>}
      <div className="mt-8 flex justify-center"><GoldLine /></div>
    </Reveal>
  );
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-multiply">
      <motion.div className="absolute left-[10%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-[#E2C675]/15 blur-[120px]" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-[5%] top-[40%] h-[25rem] w-[25rem] rounded-full bg-[#C9A14A]/10 blur-[100px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

function GridPattern() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a14a1a_1px,transparent_1px),linear-gradient(to_bottom,#c9a14a1a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  );
}

function HomeHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 150]);
  
  const carouselImages = [img.hero, img.peb, img.shed, img.process];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF8F3] pt-24">
      {carouselImages.map((src, idx) => (
        <motion.img 
          key={src}
          src={src} 
          alt={`Industrial facility slide ${idx + 1}`} 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: idx === currentIndex ? 1 : 0, 
            scale: idx === currentIndex ? 1 : 1.05 
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover" 
          style={{ y, zIndex: idx === currentIndex ? 1 : 0 }} 
        />
      ))}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/90 via-[#1F1F1F]/50 to-transparent" />
        <GridPattern />
        <AmbientGlow />
      </div>
      <div className="pointer-events-none absolute bottom-12 right-12 hidden font-space text-[12vw] font-bold leading-none text-[#FAF8F3]/20 mix-blend-overlay lg:block z-10">SWASTIK</div>
      
      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1400px] items-center px-6 py-20 md:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-[900px]">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#C9A14A]/30 bg-black/20 backdrop-blur-md px-5 py-2 mb-8">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E2C675] opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-[#C9A14A]"></span></span>
            <span className="text-[11px] font-semibold tracking-wide text-[#E2C675]">Next Generation Engineering</span>
          </div>
          <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[110px] drop-shadow-2xl">
            Precision.<br /><span className="text-[#C9A14A]">Engineered.</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl font-light leading-relaxed text-white/90 drop-shadow-lg">Advanced steel structures and intelligent process equipment manufacturing for modern industrial sectors.</p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row"><Button page="peb">Explore PEB Systems</Button><Button page="process" variant="gold">View Process Equipment</Button></div>
          
          <div className="mt-16 flex gap-3">
            {carouselImages.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-[#C9A14A]' : 'w-2 bg-[#C9A14A]/30 hover:bg-[#C9A14A]/60'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metrics() {
  const items = [["In-House", "Fabrication"], ["Plastic", "Painting"], ["CNC", "Machinery"], ["1000 MT", "Monthly Capacity"], ["40,000", "Sq Ft Facility"]];
  return (
    <section className="relative z-20 py-24 px-6 md:px-10 bg-[#FAF8F3]">
      <div className="mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 md:grid-cols-5">
        {items.map(([value, label], i) => (
          <Reveal key={label} delay={i * 0.05} className="group relative overflow-hidden rounded-2xl border border-[#C9A14A]/15 bg-white/90 p-6 shadow-[0_15px_40px_rgba(31,31,31,0.05)] backdrop-blur-xl transition hover:border-[#C9A14A]/40">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#C9A14A]/5 to-transparent opacity-0 transition group-hover:opacity-100" />
            <p className="text-3xl font-medium tracking-tight text-[#1F1F1F]">{value}</p>
            <p className="mt-2 text-[10px] font-semibold  tracking-wide text-[#5E5E5E]">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section className="px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white p-2 shadow-[0_20px_60px_rgba(31,31,31,0.06)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A14A]/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            <img src={img.shed} alt="Facility" className="h-[600px] w-full rounded-2xl object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
          </div>
        </Reveal>
        <Reveal>
          <Kicker>System Architecture</Kicker>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] tracking-tight text-[#1F1F1F] md:text-5xl lg:text-6xl">Industrial execution<br />redefined.</h2>
          <p className="mt-8 text-lg leading-relaxed text-[#5E5E5E]">A cutting-edge engineering and fabrication ecosystem delivering high-performance PEB structures and critical process equipment through data-driven manufacturing and precision assembly.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {customers.slice(0, 6).map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-[#C9A14A]/15 bg-white px-4 py-3 text-sm text-[#1F1F1F] shadow-sm transition hover:bg-[#FAF8F3]">
                <Check className="h-4 w-4 text-[#C9A14A]" />{item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Divisions() {
  return (
    <section className="relative overflow-hidden border-y border-[#C9A14A]/10 bg-[#EFE7D6]/50 px-6 py-32 md:px-10">
      <AmbientGlow />
      <SectionTitle kicker="Core Modules" title="Specialized engineering divisions." text="Advanced Pre-Engineered Buildings and high-integrity process equipment under one highly controlled manufacturing environment." />
      <div className="mx-auto mt-20 grid max-w-[1400px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {divisions.map(([name, copy, photo, page], i) => (
          <Reveal key={name} delay={i * 0.05}>
            <motion.button onClick={() => go(page as Page)} whileHover={{ y: -5 }} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white text-left shadow-[0_15px_40px_rgba(31,31,31,0.05)] transition hover:border-[#C9A14A]/40 hover:shadow-[0_25px_60px_rgba(201,161,74,0.15)]">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-[#C9A14A]/10 mix-blend-overlay transition group-hover:opacity-0" />
                <img src={photo} alt={name} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-110 group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold  tracking-wide text-[#C9A14A]">MOD-{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight text-[#1F1F1F]">{name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5E5E5E]">{copy}</p>
                <div className="mt-auto pt-6 flex items-center text-xs font-medium text-[#C9A14A] opacity-0 transition group-hover:opacity-100">
                  Explore Module <ArrowRight className="ml-2 h-3 w-3" />
                </div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function IconGrid({ title = "Deployed across critical sectors.", kicker = "Industries Served", items = industries }: { title?: string; kicker?: string; items?: string[] }) {
  const icons: LucideIcon[] = [Factory, ShieldCheck, Gauge, Zap, Waves, Globe2, Building2, Sparkles];
  return (
    <section className="px-6 py-32 md:px-10">
      <SectionTitle kicker={kicker} title={title} />
      <div className="mx-auto mt-20 grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal key={item} delay={index * 0.04}>
              <motion.div whileHover={{ scale: 1.02 }} className="group relative overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white p-8 shadow-[0_15px_40px_rgba(31,31,31,0.04)] transition hover:border-[#C9A14A]/40 hover:bg-[#FAF8F3]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#C9A14A]/5 blur-3xl transition group-hover:bg-[#C9A14A]/10" />
                <div className="inline-flex rounded-2xl border border-[#C9A14A]/15 bg-[#FAF8F3] p-4 text-[#C9A14A] transition group-hover:border-[#C9A14A]/40 group-hover:bg-white">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="mt-12 text-xl font-medium text-[#1F1F1F]">{item}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Timeline({ items, title, kicker }: { items: string[]; title: string; kicker: string }) {
  return (
    <section className="relative border-y border-[#C9A14A]/10 bg-[#EFE7D6]/30 px-6 py-32 md:px-10 overflow-hidden">
      <GridPattern />
      <div className="relative z-10 mx-auto max-w-[1000px]">
        <Reveal className="text-center">
          <Kicker>{kicker}</Kicker>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] tracking-tight text-[#1F1F1F] md:text-5xl lg:text-6xl">{title}</h2>
        </Reveal>
        <div className="mt-20 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A14A]/50 via-[#C9A14A]/10 to-transparent md:left-1/2 md:-ml-px" />
          <div className="grid gap-12">
            {items.map((item, i) => (
              <Reveal key={item} delay={i * 0.1} className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-8 h-4 w-4 -translate-x-[7.5px] rounded-full border-4 border-[#FAF8F3] bg-[#C9A14A] shadow-[0_0_15px_rgba(201,161,74,0.4)] md:left-1/2" />
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <p className="text-[10px] font-semibold  tracking-wide text-[#C9A14A]">Phase 0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-medium text-[#1F1F1F]">{item}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E5E5E]">A controlled execution point improving reliability, speed, and long-term industrial performance.</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PEBBenefits() {
  const benefits = [
    { title: "Single Source Responsibility", text: "As the complete building package is supplied by a single vendor, compatibility of all building components and accessories is assured. This is one of the major benefits of pre-engineered building systems." },
    { title: "Lower Cost", text: "The use of tapered built-up structural members (Columns & Rafters) and Z-shaped secondary members (Purlin & Girt) allows overlapping. Foundation is almost 30% lighter." },
    { title: "Architectural Versatility", text: "Aesthetic features such as fascia, parapets, and curved eaves greatly improve the appearance of the building. Flashing and trims are available in different shapes and colors. A wide range of wall and roof sheeting." },
    { title: "Optimal & Aesthetic Designs", text: "Steel has a high strength/weight ratio. Thus, the dead weight of steel structures is relatively small. Steel can aid in innovative designs compared to concrete." },
    { title: "Future Expansion", text: "Steel buildings can be easily expanded in length by adding additional bays. Also, expansion in width and height is possible by pre-designing for future expansion." },
    { title: "Enhanced Speed of Construction", text: "Factory-controlled prefabrication combined with standardized connections results in significantly faster construction times compared to conventional methods." },
    { title: "Quality Control", text: "As buildings are manufactured completely in the factory under controlled conditions, the quality is assured." },
    { title: "Foundation", text: "Pre-engineered buildings are about 30% lighter than conventional steel structures. Hence, the foundations are of simple design, easy to construct, and lighter in weight." },
    { title: "Low Maintenance", text: "Buildings are supplied with high-quality paint systems for cladding and steel to suit ambient conditions at the site, which results in long durability and low maintenance costs." },
    { title: "Erection", text: "Steel structure is faster to erect compared to RCC frames. Since all the connections of the different components are standard, the erection time is faster." },
    { title: "Earthquake Resistant", text: "Properly designed steel structures can have high ductility, which is an important characteristic for resisting shock loading, such as blasts or earthquakes." },
    { title: "Functional Versatility", text: "Large clear spans (up to 100m). Long bay spacing (up to 13m without jack beams). Modular construction." },
    { title: "Durability", text: "In contrast to reinforced concrete, steel properties do not change considerably with time." },
    { title: "Energy Efficient Systems", text: "Buildings can be supplied with polyurethane insulated panels or fiberglass blanket insulation to achieve required 'U' values." },
    { title: "Early Occupancy", text: "Reduced project time results in early occupancy, which provides an economic advantage to the clients." }
  ];

  return (
    <section className="bg-[#FAF8F3] px-6 py-32 md:px-10 border-t border-[#C9A14A]/10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="text-center">
          <Kicker>Advantages</Kicker>
          <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#1F1F1F] md:text-5xl">System Benefits</h2>
          <div className="mt-8 flex justify-center"><GoldLine /></div>
        </Reveal>
        
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i % 4) * 0.05} className="group relative overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white p-8 shadow-[0_15px_40px_rgba(31,31,31,0.04)] transition hover:border-[#C9A14A]/40 hover:shadow-[0_20px_50px_rgba(201,161,74,0.1)] hover:-translate-y-1">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#C9A14A]/5 blur-3xl transition group-hover:bg-[#C9A14A]/15" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAF8F3] text-[#C9A14A] border border-[#C9A14A]/10 group-hover:bg-[#C9A14A] group-hover:text-white transition-colors duration-500">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-[#1F1F1F] relative z-10">{benefit.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#5E5E5E] relative z-10">{benefit.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectWorkflow() {
  const steps = [
    { title: "Identifying Customers Need", text: "Develop possible solutions & select promising one." },
    { title: "Providing Quotation with Promising Solutions", text: "We offer the best proposal with promising solutions to all kinds of PEB structures." },
    { title: "Finalizing Deal and Receiving Purchase Order", text: "Our experienced Design, Fabrication & Erection teams start planning to complete the project in optimum time." },
    { title: "Getting Approval of GA Drawing from Customers", text: "After approval of the GA drawing, detailed design drawings and erection drawings will be prepared." },
    { title: "Fabrication and Supply of Structural Material", text: "All fabrication work is done by CNC. Cutting, welding, forming systems, etc." },
    { title: "Erection Process", text: "Assembling and erecting the structure safely at the site." },
    { title: "Work Completion Certificate from Customer", text: "A project completion certificate is issued when a project is completed in its entirety with full satisfaction from the customer." }
  ];

  return (
    <section className="relative border-y border-[#C9A14A]/10 bg-[#EFE7D6]/30 px-6 py-32 md:px-10 overflow-hidden">
      <GridPattern />
      <div className="relative z-10 mx-auto max-w-[1000px]">
        <Reveal className="text-center">
          <Kicker>Process</Kicker>
          <h2 className="mt-4 text-4xl font-medium leading-[1.1] tracking-tight text-[#1F1F1F] md:text-5xl lg:text-6xl">Project Work Flow</h2>
        </Reveal>
        <div className="mt-20 relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A14A]/50 via-[#C9A14A]/10 to-transparent md:left-1/2 md:-ml-px" />
          <div className="grid gap-12">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-8 h-4 w-4 -translate-x-[7.5px] rounded-full border-4 border-[#FAF8F3] bg-[#C9A14A] shadow-[0_0_15px_rgba(201,161,74,0.4)] md:left-1/2" />
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <p className="text-[10px] font-semibold tracking-wide text-[#C9A14A]">Phase 0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-medium text-[#1F1F1F]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E5E5E]">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  const projects = [["PEB Systems", img.peb], ["Industrial Hubs", img.shed], ["Heavy Steel", img.steel], ["Process Vessels", img.process]];
  return (
    <section className="px-6 py-32 md:px-10">
      <SectionTitle kicker="Deployments" title="Proven structural execution." />
      <div className="mx-auto mt-20 grid max-w-[1400px] gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projects.map(([name, photo], index) => (
          <Reveal key={name} delay={index * 0.1} className={index === 0 || index === 3 ? "lg:col-span-2" : "lg:col-span-1"}>
            <motion.button onClick={() => go("projects")} className="group relative h-[400px] w-full overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white shadow-[0_15px_40px_rgba(31,31,31,0.06)]">
              <img src={photo} alt={name} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/90 via-[#1F1F1F]/40 to-transparent" />
              <div className="absolute inset-0 border-2 border-[#C9A14A]/0 transition duration-500 group-hover:border-[#C9A14A]/30 rounded-3xl" />
              <div className="absolute bottom-0 left-0 p-8 text-left">
                <p className="text-[10px] font-semibold  tracking-wide text-[#E2C675]">{name}</p>
                <p className="mt-2 text-2xl font-medium text-white transition-transform group-hover:translate-x-2">View Specs →</p>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return <><HomeHero /><Metrics /><Overview /><Divisions /><IconGrid /><Timeline items={why} kicker="Why Swastik" title="The execution advantage." /><ProjectsPreview /></>;
}

function PageHero({ kicker, title, text, photo }: { kicker: string; title: string; text: string; photo: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 760], [0, 100]);
  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-[#FAF8F3] pt-24">
      <motion.img src={photo} alt={title} className="absolute inset-0 h-full w-full object-cover" style={{ y }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F1F]/90 via-[#1F1F1F]/60 to-transparent" />
        <GridPattern />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1400px] items-center px-6 pb-12 pt-20 md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#C9A14A]/30 bg-black/20 backdrop-blur-md px-5 py-2 mb-6">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E2C675] opacity-75"></span><span className="relative inline-flex h-2 w-2 rounded-full bg-[#C9A14A]"></span></span>
            <span className="text-[11px] font-semibold tracking-wide text-[#E2C675]">{kicker}</span>
          </div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[80px] drop-shadow-xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-xl font-light leading-relaxed text-white/90 drop-shadow-md">{text}</p>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <PageHero kicker="About" title="Engineering precision at scale." text="A specialized engineering and fabrication ecosystem delivering high-performance PEB structures and critical process equipment." photo={img.weld} />
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="text-3xl font-medium leading-[1.2] tracking-tight text-[#1F1F1F] md:text-5xl lg:text-6xl">
              We engineer industrial structures that form the backbone of modern manufacturing and logistics operations.
            </h2>
          </Reveal>
          <div className="mt-20 grid gap-6 md:grid-cols-2">
            {[
              ["Vision", "To be recognized globally as a trusted partner in manufacturing world-class process equipment and to set new benchmarks in quality and innovation."], 
              ["Mission", "To deliver safe, efficient, and cost-effective engineering solutions. To provide customized equipment meeting exact client requirements. To continuously upgrade our technology and processes."]
            ].map(([a, b]) => (
              <Reveal key={a} className="rounded-3xl border border-[#C9A14A]/15 bg-white p-10 shadow-[0_15px_40px_rgba(31,31,31,0.04)]">
                <Kicker>{a}</Kicker>
                <p className="mt-6 text-2xl leading-relaxed text-[#1F1F1F]">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-[#FAF8F3] px-6 py-32 md:px-10 border-t border-[#C9A14A]/10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="text-center">
            <Kicker>Core Values</Kicker>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#1F1F1F] md:text-5xl">The foundation of our engineering.</h2>
            <div className="mt-8 flex justify-center"><GoldLine /></div>
          </Reveal>
          
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              { title: "Integrity", text: "Transparent business practices." },
              { title: "Quality", text: "Zero-compromise approach." },
              { title: "Safety", text: "Highest priority in design & operation." },
              { title: "Innovation", text: "Continuous improvement & R&D." },
              { title: "Sustainability", text: "Eco-friendly and responsible manufacturing." }
            ].map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1} className="group relative overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white p-8 shadow-[0_15px_40px_rgba(31,31,31,0.04)] transition hover:border-[#C9A14A]/40 hover:shadow-[0_20px_50px_rgba(201,161,74,0.1)] hover:-translate-y-1">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#C9A14A]/5 blur-3xl transition group-hover:bg-[#C9A14A]/15" />
                <h3 className="text-2xl font-medium text-[#1F1F1F] relative z-10">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#5E5E5E] relative z-10">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SpecList({ title, items, photo }: { title: string; items: string[]; photo?: string }) {
  return (
    <section className="px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Kicker>{title}</Kicker>
          <h2 className="mt-4 text-4xl font-medium text-[#1F1F1F]">Technical Parameters</h2>
          {photo && <div className="mt-10 overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white p-2 shadow-sm"><img src={photo} alt={title} className="h-[500px] w-full rounded-2xl object-cover opacity-90" /></div>}
        </Reveal>
        <div className="grid gap-3">
          {items.map((item, i) => (
            <Reveal key={item} delay={i * 0.03} className="flex items-center justify-between rounded-2xl border border-[#C9A14A]/15 bg-white p-6 shadow-[0_10px_30px_rgba(31,31,31,0.03)] hover:border-[#C9A14A]/40 hover:bg-[#FAF8F3] transition">
              <p className="text-xl font-medium text-[#1F1F1F]">{item}</p>
              <span className="text-sm font-semibold text-[#C9A14A]/70">0{i + 1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PEB() {
  return (
    <>
      <PageHero kicker="PEB Division" title="Intelligent Building Systems." text="High-span, load-bearing Pre-Engineered Buildings for massive logistics hubs, factories, and commercial infrastructure." photo={img.peb} />
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Kicker>Overview</Kicker>
            <h2 className="mt-4 text-3xl font-medium leading-[1.4] tracking-tight text-[#1F1F1F] md:text-4xl">
              We specialize in providing complete solutions including consulting, design, fabrication and erection of high-quality pre-engineered steel building and steel structure products with the help of latest technology and manufacturing facilities.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-[#5E5E5E]">
              <p>
                We provide a reliable approach for fast turnkey construction primarily for non-residential buildings such as manufacturing plants, heavy industry, warehouses, high-rise building, shopping mall, exhibition centers, commercial, sports centers, offices, transportation, and aircraft hangars.
              </p>
              <p>
                <strong className="font-semibold text-[#1F1F1F]">Plant Facility & Capacity:</strong> Production line of SWASTIK is totally closed with highly automatic and advanced facilities, which provides superior quality and high precision of products, having 1,000 MT production capacity per month.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="group relative overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white p-2 shadow-[0_20px_60px_rgba(31,31,31,0.06)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A14A]/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <img src={img.shed} alt="PEB Facility" className="h-[600px] w-full rounded-2xl object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-32 md:px-10 border-y border-[#C9A14A]/5">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply grayscale">
          <img src={img.steel} alt="Background" className="h-full w-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <Reveal className="mb-16">
            <h2 className="text-4xl font-medium tracking-tight text-[#1F1F1F] md:text-5xl uppercase">What is PEB?</h2>
            <div className="mt-6 h-[2px] w-24 bg-[#C9A14A]" />
          </Reveal>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              "Pre-engineered building is built over three members. Primary members (columns, rafters, bracing, Canopies), Secondary members (Z or C purlins, girts, eave struts), Galvalume sheeting (Roof and wall sheeting) connected to each other.",
              "The entire primary members and secondary members are designed and fully fabricated including cut-to-length, punching, drilling, welding and prefabricated in the factory before shipping to the site for erection.",
              "At the site, all components are assembled and joined via nut & bolt connections; thereby reducing the costs and assembly times."
            ].map((text, i) => (
              <Reveal key={i} delay={i * 0.1} className="group relative rounded-3xl border border-[#C9A14A]/15 bg-[#FAF8F3] p-10 shadow-sm transition hover:border-[#C9A14A]/40 hover:shadow-md">
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#C9A14A]/5 blur-2xl transition group-hover:bg-[#C9A14A]/10" />
                <span className="mb-6 inline-block text-5xl font-light text-[#C9A14A]/30 transition group-hover:text-[#C9A14A]/60">0{i + 1}</span>
                <p className="relative z-10 text-lg leading-relaxed text-[#5E5E5E]">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#C9A14A]/10 bg-[#EFE7D6]/30 px-6 py-24 md:px-10">
        <SectionTitle kicker="Architecture" title="Engineered for scale." text="PEB technology offers a superior strength-to-weight ratio, allowing for massive clear spans, rapid assembly, and extreme durability against seismic and environmental loads." />
      </section>
      <SpecList title="Applications" items={pebApplications} photo={img.shed} />
      <PEBBenefits />
      <SpecList title="Structural Components" items={pebComponents} photo={img.steel} />
      <ProjectWorkflow />
    </>
  );
}

function Process() {
  return (
    <>
      <PageHero kicker="Process Equipment" title="Critical Process Vessels." text="High-integrity pressure vessels, reactors, and heat exchangers engineered for demanding chemical and petrochemical environments." photo={img.process} />
      
      <section className="bg-[#EFE7D6]/30 px-6 py-32 md:px-10 border-y border-[#C9A14A]/10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="text-center">
            <Kicker>Infrastructure</Kicker>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#1F1F1F] md:text-5xl uppercase">Our Infrastructure</h2>
            <div className="mt-8 flex justify-center"><GoldLine /></div>
            <p className="mt-8 mx-auto max-w-3xl text-xl leading-relaxed text-[#5E5E5E]">
              Our manufacturing facility is spread across 40,000 sq. ft., equipped with advanced machinery to handle complex fabrication and large-scale projects.
            </p>
          </Reveal>
          <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-[0_15px_40px_rgba(31,31,31,0.04)] border border-[#C9A14A]/15">
            <h3 className="text-2xl font-medium text-[#1F1F1F] mb-8">Key Infrastructure Highlights:</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Rolling machines (up to 3000 mm width, 25 mm thickness).",
                "Welding Rotators (up to 10 tonnes).",
                "Hydraulic testing machines (up to 40 Kg/cm²).",
                "Dish end forming and heat treatment facilities.",
                "MIG, TIG (Argon), and advanced welding machines.",
                "In-house machining, grinding, and finishing facilities.",
                "Third-party certified sand blasting and painting shop."
              ].map((highlight, idx) => (
                <Reveal key={idx} delay={idx * 0.05} className="flex items-start gap-4">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A14A]" />
                  <p className="text-lg text-[#5E5E5E]">{highlight}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="mt-12 text-center">
            <p className="text-lg italic text-[#1F1F1F]">
              "This robust setup allows us to produce precision-engineered equipment, ensuring timely delivery with international quality standards."
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-32 md:px-10">
        <SectionTitle kicker="Equipment Roster" title="Industrial process solutions." />
        <div className="mx-auto mt-20 grid max-w-[1400px] gap-8 md:grid-cols-2 lg:grid-cols-3">
          {processProducts.map((product, index) => (
            <Reveal key={product} delay={(index % 3) * 0.1}>
              <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white shadow-[0_15px_40px_rgba(31,31,31,0.04)] transition hover:border-[#C9A14A]/40 hover:shadow-[0_20px_50px_rgba(201,161,74,0.1)] hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden shrink-0">
                  <img src={[img.gauge, img.tanks, img.process][index % 3]} alt={product} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <Kicker>Model {String(index + 1).padStart(2, "0")}</Kicker>
                  <h2 className="mt-4 text-2xl font-medium text-[#1F1F1F]">{product}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#5E5E5E]">Manufactured with stringent welding controls, x-ray testing, and precise dimensional tolerances to handle high-pressure and corrosive fluid dynamics.</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function Projects() {
  const filters = ["PEB Projects", "Industrial Buildings", "Heavy Structures", "Process Equipment"];
  const [filter, setFilter] = useState(filters[0]);
  return <><PageHero kicker="Projects" title="Deployed Architecture." text="Examine our portfolio of high-stress structures and critical process equipment deployed globally." photo={img.steel} /><section className="px-6 py-32 md:px-10"><div className="mx-auto max-w-[1400px]"><div className="flex flex-wrap justify-center gap-3">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-6 py-2.5 text-xs font-semibold  tracking-wide transition-all ${filter === item ? "bg-[#C9A14A] text-white shadow-[0_10px_20px_rgba(201,161,74,0.3)]" : "border border-[#C9A14A]/20 bg-white text-[#5E5E5E] hover:text-[#1F1F1F] hover:border-[#C9A14A]/40"}`}>{item}</button>)}</div><div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[img.peb, img.shed, img.steel, img.process, img.tanks, img.gauge].map((photo, index) => <Reveal key={`${filter}-${photo}`} delay={index * 0.05}><motion.div whileHover={{ y: -5 }} className="group relative h-[400px] overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white shadow-[0_15px_40px_rgba(31,31,31,0.06)]"><img src={photo} alt={filter} className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" /><div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/90 via-[#1F1F1F]/30 to-transparent" /><div className="absolute bottom-0 p-8"><p className="text-[10px] font-semibold  tracking-wide text-[#E2C675]">{filter}</p><p className="mt-2 text-2xl font-medium text-white transition-transform group-hover:translate-x-2">Case 0{index + 1}</p></div></motion.div></Reveal>)}</div></div></section></>;
}

function WhyPage() {
  const advantages = [
    { title: "Single Window Solution", text: "From conceptual design and engineering to manufacturing and final erection, we provide an integrated, end-to-end service.", icon: Layers },
    { title: "Fast Delivery & Erection", text: "Optimized pre-fabrication in our controlled facility guarantees rapid on-site assembly and drastically reduced project timelines.", icon: Zap },
    { title: "Advanced Manufacturing Facility", text: "Our 40,000 sq ft plant is equipped with automated CNC machinery, ensuring unparalleled precision and scale.", icon: Building2 },
    { title: "High Quality Material", text: "We source only premium-grade steel and raw materials, undergoing stringent quality checks before entering the production line.", icon: ShieldCheck },
    { title: "Future Expansion Capability", text: "Our engineered structures are designed with modularity in mind, allowing for seamless horizontal or vertical expansion.", icon: Maximize },
    { title: "Customer Support Excellence", text: "Dedicated project managers provide transparent communication and ongoing support from initialization to post-completion.", icon: Headphones }
  ];

  return (
    <>
      <PageHero kicker="Why Us" title="The Swastik Advantage." text="A rigorous, controlled workflow ensuring precise translation from engineering requirement to structural reality." photo={img.hero} />
      
      <section className="bg-white px-6 py-32 md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="text-center max-w-3xl mx-auto">
            <Kicker>The Swastik Advantage</Kicker>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#1F1F1F] md:text-5xl">Engineered for absolute reliability.</h2>
            <p className="mt-6 text-lg text-[#5E5E5E]">
              We don't just build structures; we architect scalable, high-performance industrial ecosystems designed to outlast and outperform.
            </p>
          </Reveal>

          <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={i * 0.1} className="group relative overflow-hidden rounded-3xl bg-[#FAF8F3] p-10 border border-[#C9A14A]/10 transition hover:border-[#C9A14A]/30 hover:shadow-[0_20px_50px_rgba(201,161,74,0.08)]">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-[#C9A14A]/10 blur-3xl transition duration-500 group-hover:bg-[#C9A14A]/20" />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-[#C9A14A]/10 text-[#C9A14A] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#C9A14A] group-hover:text-white">
                  <adv.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-8 text-2xl font-medium text-[#1F1F1F]">{adv.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#5E5E5E]">
                  {adv.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1F1F1F] px-6 py-32 md:px-10">
        <div className="absolute inset-0 opacity-20">
          <img src={img.weld} alt="Background" className="h-full w-full object-cover grayscale mix-blend-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Kicker>Execution Model</Kicker>
              <h2 className="mt-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
                Precision at every phase.
              </h2>
              <p className="mt-6 text-lg text-white/60">
                From the initial requirement gathering to the final handover, our workflow is a tightly controlled, highly transparent process designed to eliminate risks and guarantee on-time delivery.
              </p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {[
                  ["Design Approval", "Advanced CAD & structural modeling for perfect accuracy."],
                  ["Automated Fabrication", "CNC-driven manufacturing for zero-tolerance precision."],
                  ["Stringent QC", "Multi-stage inspections ensuring global compliance."],
                  ["Rapid Erection", "Standardized components for fast, safe assembly."]
                ].map(([title, desc]) => (
                  <div key={title} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A14A]/20 text-[#C9A14A]">
                      <div className="h-2 w-2 rounded-full bg-[#C9A14A]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{title}</h4>
                      <p className="mt-1 text-sm text-white/50">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2} className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <img src={img.steel} alt="Execution" className="rounded-2xl object-cover h-[500px] w-full" />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
              </div>
              
              <div className="absolute -left-8 -bottom-8 rounded-2xl border border-white/10 bg-[#1F1F1F] p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A14A]/20 text-[#C9A14A]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">100% Quality Assurance</p>
                    <p className="text-xs text-white/50">Zero-compromise standards</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
function Info({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="flex gap-4 rounded-2xl border border-[#C9A14A]/15 bg-white p-6 shadow-sm hover:border-[#C9A14A]/30 transition"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9A14A]/10 text-[#C9A14A]"><Icon className="h-5 w-5" /></div><div><p className="text-[10px]  tracking-[0.2em] text-[#5E5E5E]">{title}</p><p className="mt-1 text-lg text-[#1F1F1F]">{text}</p></div></div>;
}

function Contact() {
  return <><PageHero kicker="Contact" title="Initialize Project." text="Establish communication for PEB, structural fabrication, or process equipment requirements." photo={img.hero} /><section className="px-6 py-32 md:px-10"><div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2"><Reveal><form onSubmit={(e) => e.preventDefault()} className="grid gap-6 rounded-3xl border border-[#C9A14A]/15 bg-white p-8 shadow-[0_20px_60px_rgba(31,31,31,0.05)] md:p-12"><h2 className="text-3xl font-medium text-[#1F1F1F] mb-4">Send a transmission</h2>{["Name", "Company", "Email", "Phone"].map((field) => <label key={field}><span className="mb-2 block text-xs font-semibold  tracking-wide text-[#5E5E5E]">{field}</span><input type={field === "Email" ? "email" : field === "Phone" ? "tel" : "text"} className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3] px-4 py-4 text-[#1F1F1F] placeholder:text-[#1F1F1F]/40 outline-none transition focus:border-[#C9A14A] focus:bg-white" placeholder={`Enter your ${field.toLowerCase()}`} /></label>)}<label><span className="mb-2 block text-xs font-semibold  tracking-wide text-[#5E5E5E]">Requirement Data</span><textarea rows={5} className="w-full rounded-xl border border-[#C9A14A]/15 bg-[#FAF8F3] px-4 py-4 text-[#1F1F1F] outline-none transition focus:border-[#C9A14A] focus:bg-white" placeholder="Specify dimensions, capacity, or general scope..." /></label><Button>Transmit Data</Button></form></Reveal><Reveal className="space-y-6"><Info icon={MapPin} title="HQ Coordinates" text="1601/1 GIDC, Ankleshwar - 393002" /><Info icon={Phone} title="Commlink" text="+91 9104567596 / +91 9157646407" /><Info icon={Mail} title="Data Channel" text="Swastikind1601@gmail.com" /><div className="mt-6 h-[400px] w-full overflow-hidden rounded-3xl border border-[#C9A14A]/15 bg-white p-2 shadow-[0_15px_40px_rgba(31,31,31,0.05)]"><iframe title="HQ Location" src="https://www.google.com/maps?q=GIDC%20Ankleshwar%20393002&output=embed" className="h-full w-full rounded-2xl grayscale" loading="lazy" /></div></Reveal></div></section></>;
}

function Footer() {
  return <footer className="border-t border-[#C9A14A]/15 bg-[#1F1F1F] px-6 py-20 text-white/60 md:px-10"><div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"><div><Logo /><p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">High-performance engineering and fabrication. Delivering PEB structures and critical process equipment through precision manufacturing.</p><div className="mt-8 flex gap-4"><a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-[#C9A14A] hover:text-white"><Globe2 className="h-4 w-4" /></a><a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-[#C9A14A] hover:text-white"><Mail className="h-4 w-4" /></a></div></div><div><p className="text-sm font-semibold text-white">Index</p><div className="mt-6 grid gap-3">{nav.slice(0, 6).map((item) => <button key={item.page} onClick={() => go(item.page)} className="w-fit text-sm transition hover:text-[#E2C675]">{item.label}</button>)}</div></div><div><p className="text-sm font-semibold text-white">Modules</p><div className="mt-6 grid gap-3">{divisions.slice(0, 5).map(([name]) => <p key={name} className="text-sm cursor-default hover:text-white/80 transition">{name}</p>)}</div></div><div><p className="text-sm font-semibold text-white">Comm Node</p><p className="mt-6 text-sm">1601/1 GIDC<br />Ankleshwar - 393002</p><p className="mt-4 text-sm text-[#E2C675]">9104567596</p><p className="mt-2 text-sm text-[#E2C675]">Swastikind1601@gmail.com</p></div></div><div className="mx-auto mt-20 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[10px] font-semibold  tracking-wide text-white/40 md:flex-row"><p>SWASTIK ENGINEERING © {new Date().getFullYear()}</p><p>System Architecture Active</p></div></footer>;
}

export default function App() {
  const [page, setPage] = useState<Page>(currentPage());
  useEffect(() => {
    const onHash = () => setPage(currentPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [page]);

  const pages: Record<Page, React.ReactNode> = useMemo(() => ({
    home: <Home />,
    about: <About />,
    peb: <PEB />,
    process: <Process />,
    projects: <Projects />,
    why: <WhyPage />,
    contact: <Contact />,
  }), []);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1F1F1F] selection:bg-[#C9A14A]/30 selection:text-[#1F1F1F]">
      <Header active={page} />
      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 15, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -15, filter: "blur(10px)" }} transition={{ duration: 0.4 }}>{pages[page]}</motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}