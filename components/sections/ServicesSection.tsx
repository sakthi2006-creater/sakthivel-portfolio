"use client";

import { motion } from "framer-motion";
import { 
  Building2, Rocket, Layout, Database, Code2, RefreshCw, 
  MonitorSmartphone, Zap, CheckCircle2, MessageSquare, Paintbrush,
  Search, Server, Globe
} from "lucide-react";
import { GlobalCTA } from "@/components/ui/GlobalCTA";

const services = [
  { id: "business", title: "Business Websites", description: "Professional websites designed to build trust and generate enquiries.", icon: Building2 },
  { id: "landing", title: "Landing Pages", description: "High-converting landing pages for products, services and campaigns.", icon: Rocket },
  { id: "portfolio", title: "Portfolio Websites", description: "Premium personal and professional portfolios.", icon: Layout },
  { id: "saas", title: "SaaS Websites", description: "Modern interfaces for software and technology products.", icon: Database },
  { id: "web-apps", title: "Web Applications", description: "Responsive, interactive web applications with real functionality.", icon: Code2 },
  { id: "redesign", title: "Website Redesign", description: "Modernize outdated websites with better UI, performance and responsiveness.", icon: RefreshCw },
];

const whatYouGet = [
  { title: "Premium responsive design", icon: Paintbrush },
  { title: "Mobile-first implementation", icon: MonitorSmartphone },
  { title: "Performance optimization", icon: Zap },
  { title: "Cross-browser testing", icon: CheckCircle2 },
  { title: "SEO-ready structure", icon: Search },
  { title: "Deployment support", icon: Server },
];

const whyMe = [
  { title: "Modern Design", desc: "Premium interfaces designed for today's web.", icon: Paintbrush },
  { title: "Responsive by Default", desc: "Works perfectly across desktop, tablet and mobile.", icon: MonitorSmartphone },
  { title: "Performance Focused", desc: "Fast, optimized and smooth user experiences.", icon: Zap },
  { title: "Built With Real Functionality", desc: "Not just static designs—real software architecture.", icon: CheckCircle2 },
  { title: "Direct Communication", desc: "Simple, clear, and efficient project collaboration.", icon: MessageSquare },
];

const processSteps = [
  { num: "01", title: "DISCOVER", desc: "Understand your idea and business requirements." },
  { num: "02", title: "PLAN", desc: "Define structure, features and visual direction." },
  { num: "03", title: "DESIGN", desc: "Create a premium, user-centric interface design." },
  { num: "04", title: "BUILD", desc: "Develop the responsive, functional website." },
  { num: "05", title: "TEST", desc: "Check performance, responsiveness and functionality." },
  { num: "06", title: "LAUNCH", desc: "Deploy and hand over the completed project." },
];

const faqs = [
  { q: "What types of websites do you build?", a: "I specialize in premium business websites, landing pages, portfolio sites, and frontend development for SaaS and web applications." },
  { q: "How long does a project usually take?", a: "It depends on the project scope. A landing page might take 1-2 weeks, while a full web application can take several weeks or months." },
  { q: "How do you determine pricing?", a: "Pricing is based on project complexity, feature requirements, and timeline. I provide custom quotes after our initial discovery discussion." },
  { q: "Do you handle deployment and hosting?", a: "Yes, I provide deployment support (e.g., Vercel, Netlify) and ensure your site is live and performing well." },
  { q: "Can you redesign an existing website?", a: "Absolutely. I can take your outdated website and modernize it with a premium UI, better performance, and full responsiveness." },
  { q: "How do we start a project?", a: "Fill out the contact form below with your project details, and I will typically respond within 24 hours to discuss the next steps." },
];

export function ServicesSection() {
  return (
    <section className="relative min-h-screen bg-[#020617] font-mono overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee05_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee05_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* 1. SERVICES HERO & GRID */}
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col justify-center relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-[10px] font-mono tracking-[0.5em] text-cyan-500 mb-6 uppercase">
            02 / EXPERTISE
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest mb-6 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            WEB DEVELOPMENT SERVICES
          </h1>
          <div className="text-sm md:text-base text-white/50 max-w-2xl font-light tracking-wide">
            Modern digital experiences built for businesses, startups and personal brands.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#0f172a]/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 p-8 rounded-xl transition-colors duration-300 flex flex-col items-start overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-12 h-12 flex items-center justify-center bg-[#020617] border border-white/10 rounded-lg mb-6 group-hover:border-cyan-400/30 transition-colors duration-300 relative z-10">
                <service.icon size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide mb-3 uppercase relative z-10">{service.title}</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed relative z-10">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WHAT YOU GET */}
      <div className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10 flex flex-col items-center">
        <h2 className="text-2xl font-black text-white tracking-widest mb-12 uppercase">
          WHAT YOU GET
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 max-w-5xl">
          {whatYouGet.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-full border border-white/5"
            >
              <item.icon size={18} className="text-cyan-400" />
              <span className="text-sm text-white/80 font-bold uppercase tracking-wide">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WHY WORK WITH ME */}
      <div className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-widest mb-4 uppercase">
            WHY WORK WITH ME
          </h2>
          <div className="w-12 h-1 bg-cyan-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {whyMe.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="mt-1 flex-shrink-0">
                <item.icon size={24} className="text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-widest mb-2 uppercase">{item.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HOW I WORK (Process) */}
      <div className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-widest mb-4 uppercase">
            HOW I WORK
          </h2>
          <div className="w-12 h-1 bg-cyan-400 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {processSteps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-6 bg-white/5 p-6 rounded-xl border border-white/5 hover:border-cyan-500/20 transition-colors"
            >
              <div className="text-3xl font-black text-cyan-900/80 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                {step.num}
              </div>
              <div className="pt-2">
                <h3 className="text-base font-bold text-white tracking-widest mb-2 uppercase">— {step.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="py-24 px-6 max-w-4xl mx-auto border-t border-white/5 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-widest mb-4 uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-12 h-1 bg-cyan-400 mx-auto" />
        </div>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0f172a]/50 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
            >
              <h3 className="text-base font-bold text-white tracking-wide mb-3 uppercase">{faq.q}</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* GLOBAL CTA */}
      <div className="border-t border-white/5 relative z-10">
        <GlobalCTA />
      </div>
    </section>
  );
}
