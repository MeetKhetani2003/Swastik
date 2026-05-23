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
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Page = "home" | "about" | "peb" | "process" | "infrastructure" | "projects" | "industries" | "why" | "contact";

const colors = {
  gold: "#C9A14A",
  gold2: "#E2C675",
  ivory: "#FAF8F3",
  warm: "#F5F3EE",
  champagne: "#EFE7D6",
  text: "#1F1F1F",
  muted: "#5E5E5E",
};

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
  { page: "infrastructure", label: "Infrastructure" },
  { page: "projects", label: "Projects" },
  { page: "industries", label: "Industries Served" },
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

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative grid h-12 w-12 place-items-center rounded-[18px] border border-[#C9A14A]/30 ${inverse ? "bg-white/10" : "bg-white/70"} shadow-[0_14px_40px_rgba(201,161,74,0.16)] backdrop-blur-xl`}>
        <div className="absolute inset-2 rounded-[12px] bg-[linear-gradient(135deg,#E2C675,#C9A14A)] opacity-18" />
        <Factory className="relative h-6 w-6 text-[#C9A14A]" strokeWidth={1.35} />
      </div>
      <div className="leading-none">
        <p className={`text-sm font-semibold tracking-[0.36em] ${inverse ? "text-white" : "text-[#1F1F1F]"}`}>SWASTIK</p>
        <p className="mt-1 text-[10px] tracking-[0.48em] text-[#C9A14A]">ENGINEERING</p>
      </div>
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "border-b border-[#C9A14A]/15 bg-white/82 shadow-[0_20px_80px_rgba(31,31,31,0.08)] backdrop-blur-2xl" : "bg-white/24 backdrop-blur-sm"}`}>
      <div className="mx-auto flex h-24 max-w-[1680px] items-center justify-between px-6 md:px-10">
        <button onClick={() => navigate("home")} aria-label="Swastik Engineering home"><Logo /></button>
        <nav className="hidden items-center gap-1 xl:flex">
          {nav.slice(0, 5).map((item) => (
            <button key={item.page} onClick={() => navigate(item.page)} className={`px-4 py-3 text-[11px] uppercase tracking-[0.22em] transition hover:text-[#C9A14A] ${active === item.page ? "text-[#C9A14A]" : "text-[#1F1F1F]/66"}`}>{item.label}</button>
          ))}
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="flex items-center gap-2 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-[#1F1F1F]/66 transition hover:text-[#C9A14A]">More <ChevronDown className="h-3 w-3" /></button>
            <AnimatePresence>
              {mega && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 top-full w-[760px] rounded-[32px] border border-[#C9A14A]/18 bg-white/88 p-8 shadow-[0_40px_120px_rgba(31,31,31,0.14)] backdrop-blur-2xl">
                  <div className="grid grid-cols-[0.8fr_1.2fr] gap-8">
                    <div className="border-r border-[#C9A14A]/15 pr-8">
                      <p className="text-xs uppercase tracking-[0.36em] text-[#C9A14A]">Navigation</p>
                      <p className="mt-5 text-3xl font-semibold uppercase leading-tight tracking-[-0.04em] text-[#1F1F1F]">Luxury engineering presence across every division.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      {nav.slice(5).map((item) => (
                        <button key={item.page} onClick={() => navigate(item.page)} className="group rounded-3xl border border-[#C9A14A]/12 bg-[#FAF8F3]/70 p-5 text-left transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(201,161,74,0.16)]">
                          <span className="block text-sm font-semibold text-[#1F1F1F] group-hover:text-[#C9A14A]">{item.label}</span>
                          <span className="mt-2 block text-xs leading-6 text-[#5E5E5E]">Open premium page experience.</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
        <button onClick={() => navigate("contact")} className="hidden rounded-full border border-[#C9A14A]/25 bg-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#1F1F1F] shadow-[0_12px_40px_rgba(201,161,74,0.12)] transition hover:bg-[#C9A14A] hover:text-white xl:block">Inquiry</button>
        <button onClick={() => setMobile(true)} className="grid h-12 w-12 place-items-center rounded-full border border-[#C9A14A]/20 bg-white/70 text-[#1F1F1F] xl:hidden" aria-label="Open menu"><Menu /></button>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-0 z-[70] bg-[#FAF8F3] p-6 xl:hidden">
            <div className="flex items-center justify-between"><Logo /><button onClick={() => setMobile(false)} className="grid h-12 w-12 place-items-center rounded-full border border-[#C9A14A]/20"><X /></button></div>
            <div className="mt-12 grid gap-3">
              {nav.map((item, index) => <motion.button key={item.page} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }} onClick={() => navigate(item.page)} className="rounded-3xl border border-[#C9A14A]/14 bg-white px-6 py-5 text-left text-xl uppercase tracking-[0.14em] text-[#1F1F1F] shadow-sm">{item.label}</motion.button>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function GoldLine() {
  return <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C9A14A] to-transparent" />;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#C9A14A]">{children}</p>;
}

function Button({ children, page, variant = "gold" }: { children: React.ReactNode; page?: Page; variant?: "gold" | "white" }) {
  return (
    <motion.button onClick={() => page && go(page)} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} className={`group relative overflow-hidden rounded-full px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition ${variant === "gold" ? "bg-[#C9A14A] text-white shadow-[0_22px_60px_rgba(201,161,74,0.26)]" : "border border-[#C9A14A]/35 bg-white/80 text-[#1F1F1F] shadow-[0_18px_55px_rgba(31,31,31,0.08)] backdrop-blur-xl"}`}>
      <span className="relative z-10 flex items-center gap-3">{children}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
    </motion.button>
  );
}

function SectionTitle({ kicker, title, text }: { kicker?: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto max-w-6xl text-center">
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="mt-6 text-balance text-4xl font-semibold uppercase leading-[0.96] tracking-[-0.055em] text-[#1F1F1F] md:text-7xl">{title}</h2>
      {text && <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#5E5E5E]">{text}</p>}
      <div className="mt-8 flex justify-center"><GoldLine /></div>
    </Reveal>
  );
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute left-[10%] top-[18%] h-80 w-80 rounded-full bg-[#E2C675]/26 blur-3xl" animate={{ scale: [1, 1.18, 1], opacity: [0.22, 0.42, 0.22] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.div className="absolute right-[6%] top-[45%] h-96 w-96 rounded-full bg-white/60 blur-3xl" animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 9, repeat: Infinity }} />
    </div>
  );
}

function HomeHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 130]);
  const scale = useTransform(scrollY, [0, 900], [1, 1.08]);
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF8F3] pt-24">
      <motion.img src={img.hero} alt="Luxury industrial facility" className="absolute inset-0 h-full w-full object-cover opacity-42" style={{ y, scale }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,243,0.98)_0%,rgba(250,248,243,0.9)_38%,rgba(250,248,243,0.52)_74%,rgba(250,248,243,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(226,198,117,0.32),transparent_25rem),linear-gradient(180deg,transparent_64%,#FAF8F3_100%)]" />
      <AmbientGlow />
      <div className="pointer-events-none absolute bottom-8 right-6 hidden text-[15vw] font-semibold uppercase leading-none tracking-[-0.1em] text-white/34 mix-blend-soft-light lg:block">Swastik</div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1680px] items-center px-6 py-20 md:px-10">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-[1120px]">
          <Kicker>SWASTIK ENGINEERING</Kicker>
          <h1 className="mt-8 text-balance text-6xl font-semibold uppercase leading-[0.86] tracking-[-0.08em] text-[#1F1F1F] md:text-8xl xl:text-[116px]">
            Engineering Strength.<br />Delivering Precision.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-9 text-[#5E5E5E]">Premium steel structures and process equipment manufacturing solutions trusted across industrial sectors.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button page="peb">Explore PEB Division</Button><Button page="process" variant="white">Explore Process Equipment</Button></div>
        </motion.div>
      </div>
    </section>
  );
}

function Metrics() {
  const items = [["1000 MT", "Monthly Production Capacity"], ["40,000", "Sq Ft Manufacturing Facility"], ["Turnkey", "Design To Erection"], ["CNC", "Advanced Fabrication"], ["Global", "International Quality Standards"]];
  return (
    <section className="bg-white px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-[1580px] gap-5 md:grid-cols-5">
        {items.map(([value, label], i) => (
          <Reveal key={label} delay={i * 0.04} className="rounded-[24px] border border-[#C9A14A]/18 bg-gradient-to-br from-white to-[#FAF8F3] p-8 shadow-[0_24px_70px_rgba(31,31,31,0.06)]">
            <p className="text-4xl font-semibold uppercase tracking-[-0.06em] text-[#1F1F1F] md:text-5xl">{value}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#5E5E5E]">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section className="bg-[#FAF8F3] px-6 py-32 md:px-10">
      <div className="mx-auto grid max-w-[1580px] items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] border border-[#C9A14A]/18 bg-white p-3 shadow-[0_36px_100px_rgba(31,31,31,0.09)]">
            <img src={img.shed} alt="Manufacturing facility" className="h-[620px] w-full rounded-[30px] object-cover" />
          </div>
        </Reveal>
        <Reveal>
          <Kicker>Company Overview</Kicker>
          <h2 className="mt-7 text-5xl font-semibold uppercase leading-[0.96] tracking-[-0.06em] text-[#1F1F1F] md:text-7xl">World-class engineering with architectural restraint.</h2>
          <p className="mt-8 text-xl leading-10 text-[#5E5E5E]">A leading engineering and fabrication company delivering world-class PEB structures and industrial process equipment through advanced manufacturing, precision engineering, and turnkey execution.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {customers.map((item) => <div key={item} className="flex items-center gap-3 rounded-full border border-[#C9A14A]/16 bg-white/70 px-5 py-3 text-sm font-medium text-[#1F1F1F] shadow-sm"><Check className="h-4 w-4 text-[#C9A14A]" />{item}</div>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Divisions() {
  return (
    <section className="bg-[#EFE7D6] px-6 py-32 md:px-10">
      <SectionTitle kicker="Business Divisions" title="A complete industrial portfolio, presented with precision." text="Pre-Engineered Buildings, heavy structures and process equipment brought together under one high-control manufacturing ecosystem." />
      <div className="mx-auto mt-16 grid max-w-[1580px] gap-6 md:grid-cols-2 xl:grid-cols-4">
        {divisions.map(([name, copy, photo, page], i) => (
          <Reveal key={name} delay={i * 0.03}>
            <motion.button onClick={() => go(page as Page)} whileHover={{ y: -8 }} className="group h-full overflow-hidden rounded-[24px] border border-[#C9A14A]/18 bg-white text-left shadow-[0_28px_90px_rgba(31,31,31,0.08)] transition hover:shadow-[0_36px_100px_rgba(201,161,74,0.22)]">
              <div className="relative h-56 overflow-hidden"><img src={photo} alt={name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" /></div>
              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.28em] text-[#C9A14A]">0{i + 1}</p>
                <h3 className="mt-5 text-2xl font-semibold uppercase tracking-[-0.04em] text-[#1F1F1F]">{name}</h3>
                <p className="mt-4 text-sm leading-7 text-[#5E5E5E]">{copy}</p>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function IconGrid({ title = "Trusted across critical industrial sectors.", kicker = "Industries We Serve", items = industries, bg = "white" }: { title?: string; kicker?: string; items?: string[]; bg?: "white" | "ivory" | "champagne" }) {
  const icons: LucideIcon[] = [Factory, ShieldCheck, Gauge, Zap, Waves, Globe2, Building2, Sparkles];
  const bgClass = bg === "ivory" ? "bg-[#FAF8F3]" : bg === "champagne" ? "bg-[#EFE7D6]" : "bg-white";
  return (
    <section className={`${bgClass} px-6 py-32 md:px-10`}>
      <SectionTitle kicker={kicker} title={title} />
      <div className="mx-auto mt-16 grid max-w-[1420px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal key={item} delay={index * 0.03}>
              <motion.div whileHover={{ y: -7 }} className="group min-h-[230px] rounded-[24px] border border-[#C9A14A]/18 bg-white/78 p-8 shadow-[0_24px_80px_rgba(31,31,31,0.06)] backdrop-blur-xl hover:shadow-[0_34px_90px_rgba(201,161,74,0.18)]">
                <Icon className="h-8 w-8 text-[#C9A14A]" strokeWidth={1.35} />
                <p className="mt-20 text-2xl font-semibold tracking-[-0.04em] text-[#1F1F1F]">{item}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Timeline({ items, title, kicker, dark = false }: { items: string[]; title: string; kicker: string; dark?: boolean }) {
  return (
    <section className={`${dark ? "bg-[#1F1F1F]" : "bg-[#FAF8F3]"} px-6 py-32 md:px-10`}>
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-5xl">
          <Kicker>{kicker}</Kicker>
          <h2 className={`mt-6 text-5xl font-semibold uppercase leading-[0.96] tracking-[-0.06em] md:text-7xl ${dark ? "text-white" : "text-[#1F1F1F]"}`}>{title}</h2>
        </Reveal>
        <div className="mt-16 grid gap-5">
          {items.map((item, i) => <Reveal key={item} delay={i * 0.035} className={`rounded-[24px] border p-7 backdrop-blur-xl ${dark ? "border-[#E2C675]/18 bg-white/[0.06] text-white" : "border-[#C9A14A]/16 bg-white/75 text-[#1F1F1F] shadow-[0_20px_70px_rgba(31,31,31,0.06)]"}`}><div className="grid gap-6 md:grid-cols-[100px_1fr_0.8fr] md:items-center"><p className="text-xs uppercase tracking-[0.34em] text-[#C9A14A]">{String(i + 1).padStart(2, "0")}</p><h3 className="text-3xl font-semibold uppercase tracking-[-0.05em] md:text-5xl">{item}</h3><p className={`${dark ? "text-white/56" : "text-[#5E5E5E]"} text-sm leading-7`}>A controlled execution point improving reliability, speed, material quality and long-term industrial performance.</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  const projects = [["PEB Projects", img.peb], ["Industrial Buildings", img.shed], ["Heavy Structures", img.steel], ["Process Equipment", img.process]];
  return (
    <section className="bg-white px-6 py-32 md:px-10">
      <SectionTitle kicker="Featured Projects" title="Portfolio presentation with architectural calm." />
      <div className="mx-auto mt-16 grid max-w-[1580px] gap-6 md:grid-cols-6">
        {projects.map(([name, photo], index) => <Reveal key={name} className={index === 0 || index === 3 ? "md:col-span-4" : "md:col-span-2"}><motion.button onClick={() => go("projects")} whileHover={{ y: -8 }} className="group relative h-[520px] w-full overflow-hidden rounded-[30px] bg-white shadow-[0_30px_100px_rgba(31,31,31,0.1)]"><img src={photo} alt={name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/68 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 p-8 text-left"><p className="text-xs uppercase tracking-[0.32em] text-[#E2C675]">{name}</p><p className="mt-4 text-3xl font-semibold uppercase tracking-[-0.045em] text-white">Case-study grade delivery.</p></div></motion.button></Reveal>)}
      </div>
    </section>
  );
}

function Home() {
  return <><HomeHero /><Metrics /><Overview /><Divisions /><IconGrid bg="white" /><Timeline items={why} kicker="Why Choose Swastik" title="A refined execution model for industrial certainty." /><ProjectsPreview /></>;
}

function PageHero({ kicker, title, text, photo }: { kicker: string; title: string; text: string; photo: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 760], [0, 105]);
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-[#FAF8F3] pt-24">
      <motion.img src={photo} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-35" style={{ y }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,243,0.98)_0%,rgba(250,248,243,0.88)_48%,rgba(250,248,243,0.46)_100%)]" />
      <AmbientGlow />
      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-[1680px] items-end px-6 pb-20 md:px-10">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-6xl">
          <Kicker>{kicker}</Kicker>
          <h1 className="mt-7 text-balance text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.075em] text-[#1F1F1F] md:text-8xl">{title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-[#5E5E5E]">{text}</p>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return <><PageHero kicker="About" title="A premium engineering house built on trust and precision." text="Premium corporate narrative for SWASTIK ENGINEERING, a leading engineering and fabrication company." photo={img.weld} /><section className="bg-white px-6 py-32 md:px-10"><div className="mx-auto max-w-[1480px]"><Reveal><Kicker>Company Story</Kicker><h2 className="mt-7 max-w-6xl text-5xl font-semibold uppercase leading-[0.96] tracking-[-0.06em] text-[#1F1F1F] md:text-7xl">A leading engineering and fabrication company delivering world-class PEB structures and industrial process equipment through advanced manufacturing, precision engineering, and turnkey execution.</h2></Reveal><div className="mt-20 grid gap-6 md:grid-cols-2">{[["Vision", "To be recognized as a leading engineering and fabrication company delivering world-class PEB structures and industrial process equipment."], ["Mission", "To deliver premium steel structures and process equipment manufacturing solutions trusted across industrial sectors."]].map(([a, b]) => <Reveal key={a} className="rounded-[24px] border border-[#C9A14A]/18 bg-[#FAF8F3] p-10 shadow-[0_25px_80px_rgba(31,31,31,0.06)]"><Kicker>{a}</Kicker><p className="mt-8 text-3xl leading-tight tracking-[-0.04em] text-[#1F1F1F]">{b}</p></Reveal>)}</div></div></section><IconGrid items={values} kicker="Core Values" title="Integrity. Quality. Safety. Innovation. Sustainability." bg="ivory" /></>;
}

function SpecList({ title, items, photo, bg = "white" }: { title: string; items: string[]; photo?: string; bg?: "white" | "ivory" | "champagne" }) {
  const bgClass = bg === "ivory" ? "bg-[#FAF8F3]" : bg === "champagne" ? "bg-[#EFE7D6]" : "bg-white";
  return <section className={`${bgClass} px-6 py-32 md:px-10`}><div className="mx-auto grid max-w-[1520px] gap-14 lg:grid-cols-[0.86fr_1.14fr]"><Reveal><Kicker>{title}</Kicker>{photo && <div className="mt-10 overflow-hidden rounded-[32px] border border-[#C9A14A]/18 bg-white p-3 shadow-[0_28px_90px_rgba(31,31,31,0.08)]"><img src={photo} alt={title} className="h-[560px] w-full rounded-[24px] object-cover" /></div>}</Reveal><div className="grid gap-4">{items.map((item, i) => <Reveal key={item} delay={i * 0.025} className="rounded-[24px] border border-[#C9A14A]/18 bg-white/82 p-7 shadow-[0_18px_60px_rgba(31,31,31,0.05)] backdrop-blur-xl"><div className="flex items-center justify-between gap-5"><p className="text-3xl font-semibold uppercase tracking-[-0.05em] text-[#1F1F1F] md:text-5xl">{item}</p><span className="text-xs font-semibold text-[#C9A14A]">{String(i + 1).padStart(2, "0")}</span></div></Reveal>)}</div></div></section>;
}

function PEB() {
  return <><PageHero kicker="PEB Division" title="Pre-engineered buildings with architectural discipline." text="Luxury engineering presentation for massive warehouse structures and complete PEB systems." photo={img.peb} /><section className="bg-white px-6 py-32 md:px-10"><SectionTitle kicker="What is PEB" title="Single-source engineered building systems for industrial scale." text="Pre-Engineered Buildings deliver single source responsibility, lower cost, fast construction, earthquake resistant performance, low maintenance, energy efficient operation, future expansion and durability." /></section><SpecList title="Applications" items={pebApplications} photo={img.shed} bg="ivory" /><SpecList title="PEB Benefits" items={pebBenefits} bg="champagne" /><SpecList title="Components" items={pebComponents} photo={img.steel} /></>;
}

function Process() {
  return <><PageHero kicker="Process Equipment" title="Critical plant equipment with refined manufacturing control." text="Pressure vessels, storage tanks, reactors, heat exchangers, receiver tanks, distillation columns, chlorine vaporizers, lead-lined equipment and ISO containers." photo={img.process} /><section className="bg-white px-6 py-32 md:px-10"><SectionTitle kicker="Products" title="Industrial manufacturing showcase." /><div className="mx-auto mt-20 grid max-w-[1520px] gap-14">{processProducts.map((product, index) => <Reveal key={product}><div className={`grid gap-10 rounded-[32px] border border-[#C9A14A]/18 bg-[#FAF8F3] p-5 shadow-[0_28px_90px_rgba(31,31,31,0.07)] lg:grid-cols-[0.95fr_1.05fr] ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}><div className="h-[430px] overflow-hidden rounded-[24px]"><img src={[img.gauge, img.tanks, img.process][index % 3]} alt={product} className="h-full w-full object-cover transition duration-700 hover:scale-105" /></div><div className="flex flex-col justify-center p-4 md:p-8"><Kicker>{String(index + 1).padStart(2, "0")}</Kicker><h2 className="mt-6 text-5xl font-semibold uppercase tracking-[-0.06em] text-[#1F1F1F] md:text-7xl">{product}</h2><p className="mt-8 text-lg leading-9 text-[#5E5E5E]">Technical highlights include precision fabrication, advanced welding control, material quality assurance, dimensional accuracy and application-focused engineering for chemical, pharmaceutical, petrochemical and manufacturing industries.</p><p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#8A7A55]">Application overview: process plant operations, industrial production, storage, transfer, separation, thermal exchange and specialized equipment duties.</p></div></div></Reveal>)}</div></section></>;
}

function Infrastructure() {
  return <><PageHero kicker="Infrastructure" title="A 40,000 sq ft manufacturing ecosystem." text="Rolling machines, welding rotators, hydraulic testing, dish end forming, heat treatment, MIG welding, TIG welding, machining, grinding and painting facilities." photo={img.shed} /><SpecList title="Manufacturing Capability" items={infrastructure} photo={img.weld} bg="white" /><section className="grid bg-[#FAF8F3] gap-6 px-6 py-32 md:px-10 lg:grid-cols-3">{[img.weld, img.gauge, img.steel].map((photo, i) => <Reveal key={photo} className="relative h-[520px] overflow-hidden rounded-[30px] shadow-[0_30px_90px_rgba(31,31,31,0.1)]"><img src={photo} alt="Infrastructure" className="h-full w-full object-cover transition duration-700 hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/58 to-transparent" /><p className="absolute bottom-8 left-8 text-xs uppercase tracking-[0.34em] text-[#E2C675]">Manufacturing Visual 0{i + 1}</p></Reveal>)}</section></>;
}

function Projects() {
  const filters = ["PEB Projects", "Industrial Buildings", "Heavy Structures", "Process Equipment"];
  const [filter, setFilter] = useState(filters[0]);
  return <><PageHero kicker="Projects" title="A portfolio experience built around industrial proof." text="Premium case study layout across PEB Projects, Industrial Buildings, Heavy Structures and Process Equipment." photo={img.steel} /><section className="bg-white px-6 py-32 md:px-10"><div className="mx-auto max-w-[1520px]"><div className="flex flex-wrap gap-3">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition ${filter === item ? "bg-[#C9A14A] text-white shadow-[0_16px_50px_rgba(201,161,74,0.22)]" : "border border-[#C9A14A]/22 bg-[#FAF8F3] text-[#1F1F1F] hover:border-[#C9A14A]"}`}>{item}</button>)}</div><div className="mt-14 grid gap-6 md:grid-cols-6">{[img.peb, img.shed, img.steel, img.process, img.tanks, img.gauge].map((photo, index) => <Reveal key={`${filter}-${photo}`} className={index % 4 === 0 ? "md:col-span-4" : "md:col-span-2"}><motion.div whileHover={{ y: -8 }} className="group relative h-[460px] overflow-hidden rounded-[30px] shadow-[0_28px_90px_rgba(31,31,31,0.1)]"><img src={photo} alt={filter} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/72 via-transparent to-transparent" /><div className="absolute bottom-0 p-8"><p className="text-xs uppercase tracking-[0.32em] text-[#E2C675]">{filter}</p><p className="mt-4 text-3xl font-semibold uppercase tracking-[-0.045em] text-white">Case Study {String(index + 1).padStart(2, "0")}</p></div></motion.div></Reveal>)}</div></div></section></>;
}

function Industries() {
  return <><PageHero kicker="Industries Served" title="Engineered for sectors where reliability is non-negotiable." text="For EPC contractors, chemical industries, pharmaceutical industries, petrochemical plants, manufacturing industries, warehousing companies, infrastructure developers, government projects and export clients." photo={img.tanks} /><IconGrid bg="white" /><IconGrid items={customers} kicker="Target Customers" title="Industrial buyers and project owners served with turnkey confidence." bg="ivory" /></>;
}

function WhyPage() {
  return <><PageHero kicker="Why Swastik" title="One controlled workflow from requirement to completion." text="Identify requirement, solution proposal, quotation, design approval, fabrication, supply, erection and completion." photo={img.hero} /><Timeline items={workflow} kicker="Project Workflow" title="From need to operational handover." /><Timeline items={why} kicker="Why Choose Swastik" title="Execution advantages that compound project certainty." dark /></>;
}

function Info({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="flex gap-5 border-t border-[#C9A14A]/18 pt-6"><Icon className="h-6 w-6 shrink-0 text-[#C9A14A]" strokeWidth={1.35} /><div><p className="text-xs uppercase tracking-[0.3em] text-[#5E5E5E]">{title}</p><p className="mt-2 text-xl leading-8 text-[#1F1F1F]">{text}</p></div></div>;
}

function Contact() {
  return <><PageHero kicker="Contact" title="Start a precision-engineered industrial project." text="Connect with Swastik Industries for PEB structures, structural fabrication and process equipment requirements." photo={img.hero} /><section className="bg-[#FAF8F3] px-6 py-32 md:px-10"><div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1fr_0.9fr]"><Reveal><form onSubmit={(e) => e.preventDefault()} className="grid gap-5 rounded-[32px] border border-[#C9A14A]/18 bg-white p-8 shadow-[0_30px_100px_rgba(31,31,31,0.08)] md:p-10">{["Name", "Company", "Email", "Phone"].map((field) => <label key={field}><span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A14A]">{field}</span><input type={field === "Email" ? "email" : field === "Phone" ? "tel" : "text"} className="w-full rounded-2xl border border-[#C9A14A]/18 bg-[#FAF8F3] px-5 py-5 text-[#1F1F1F] outline-none transition focus:border-[#C9A14A]" /></label>)}<label><span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#C9A14A]">Requirement</span><textarea rows={7} className="w-full rounded-2xl border border-[#C9A14A]/18 bg-[#FAF8F3] px-5 py-5 text-[#1F1F1F] outline-none transition focus:border-[#C9A14A]" /></label><Button>Submit Inquiry</Button></form></Reveal><Reveal className="rounded-[32px] border border-[#C9A14A]/18 bg-white p-8 shadow-[0_30px_100px_rgba(31,31,31,0.08)] md:p-10"><Kicker>Contact Details</Kicker><div className="mt-10 space-y-8"><Info icon={MapPin} title="Address" text="Swastik Industries, 1601/1 GIDC, Ankleshwar - 393002" /><Info icon={Phone} title="Phone" text="9104567596 / 9157646407" /><Info icon={Mail} title="Email" text="Swastikind1601@gmail.com" /></div><div className="mt-12 h-[360px] overflow-hidden rounded-[24px] border border-[#C9A14A]/18"><iframe title="Swastik Industries Ankleshwar map" src="https://www.google.com/maps?q=GIDC%20Ankleshwar%20393002&output=embed" className="h-full w-full grayscale" loading="lazy" /></div></Reveal></div></section></>;
}

function Footer() {
  return <footer className="bg-[#1F1F1F] px-6 py-16 text-white md:px-10"><div className="mx-auto grid max-w-[1580px] gap-12 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]"><div><Logo inverse /><p className="mt-8 max-w-md text-sm leading-7 text-white/58">A leading engineering and fabrication company delivering world-class PEB structures and industrial process equipment through advanced manufacturing, precision engineering, and turnkey execution.</p></div><div><Kicker>Quick Links</Kicker><div className="mt-6 grid gap-3">{nav.slice(0, 6).map((item) => <button key={item.page} onClick={() => go(item.page)} className="text-left text-sm text-white/58 transition hover:text-[#E2C675]">{item.label}</button>)}</div></div><div><Kicker>Business Divisions</Kicker><div className="mt-6 grid gap-3">{divisions.slice(0, 6).map(([name]) => <p key={name} className="text-sm text-white/58">{name}</p>)}</div></div><div><Kicker>Contact</Kicker><p className="mt-6 text-sm leading-7 text-white/62">Swastik Industries<br />1601/1 GIDC<br />Ankleshwar - 393002</p><p className="mt-5 text-sm text-white/62">9104567596 / 9157646407</p><p className="mt-3 text-sm text-white/62">Swastikind1601@gmail.com</p></div></div><div className="mx-auto mt-14 flex max-w-[1580px] flex-col justify-between gap-4 border-t border-[#E2C675]/16 pt-8 text-xs uppercase tracking-[0.24em] text-white/38 md:flex-row"><p>SWASTIK ENGINEERING</p><p>Engineering Strength. Delivering Precision.</p></div></footer>;
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
    infrastructure: <Infrastructure />,
    projects: <Projects />,
    industries: <Industries />,
    why: <WhyPage />,
    contact: <Contact />,
  }), []);

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1F1F1F] selection:bg-[#C9A14A] selection:text-white" style={{ ["--gold" as string]: colors.gold, ["--ivory" as string]: colors.ivory, ["--warm" as string]: colors.warm, ["--champagne" as string]: colors.champagne, ["--text" as string]: colors.text, ["--muted" as string]: colors.muted, ["--gold2" as string]: colors.gold2 }}>
      <Header active={page} />
      <AnimatePresence mode="wait">
        <motion.main key={page} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.5 }}>{pages[page]}</motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}