"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/profile";
import { Mail, Github, Linkedin, Send, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const type = formData.get("type") as string;
    const budget = formData.get("budget") as string;
    const msg = formData.get("message") as string;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // 1. WHATSAPP AUTO-PREFILL (Opens WhatsApp with all details typed out)
    const waText = encodeURIComponent(
      `Hi Sakthivel, I want to start a web project!\n\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company || "N/A"}\n*Project Type:* ${type}\n*Budget:* ${budget || "Not specified"}\n\n*Details:* ${msg}`
    );
    window.open(`https://wa.me/919361506217?text=${waText}`, "_blank");

    // 2. BACKGROUND EMAIL VIA WEB3FORMS
    if (!accessKey || accessKey === "YOUR_REAL_WEB3FORMS_KEY" || !accessKey.includes("-")) {
      setSubmitStatus("error");
      setErrorMessage("Developer Error: Please add a valid Web3Forms Access Key in .env.local to receive emails.");
      setIsSubmitting(false);
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("subject", "New Web Development Project Inquiry");
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Failed to send email. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center font-mono py-32 px-6" id="contact">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee05_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee05_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div 
        className="z-10 flex flex-col items-center text-center w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="text-[10px] tracking-[0.5em] text-cyan-500 mb-8 uppercase">
          06 / CONTACT
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest mb-6 uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          START A WEB PROJECT
        </h1>

        <div className="text-sm md:text-base text-white/50 max-w-2xl mb-8 leading-relaxed font-light tracking-wide">
          Have a website idea or an existing site that needs a modern redesign? Tell me what you're building.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <div className="text-xs font-mono tracking-[0.2em] text-cyan-300 border border-cyan-500/30 bg-cyan-900/20 px-4 py-2 rounded flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AVAILABLE FOR SELECTED PROJECTS
          </div>
          <div className="text-xs font-mono tracking-[0.2em] text-white/60 border border-white/10 bg-white/5 px-4 py-2 rounded flex items-center justify-center">
            TYPICAL RESPONSE: WITHIN 24 HOURS
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-16 text-left shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-bold text-white/70 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-bold text-white/70 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-xs font-bold text-white/70 uppercase tracking-widest">Company / Brand</label>
                <input 
                  type="text" 
                  id="company"
                  name="company"
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="Optional"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="type" className="text-xs font-bold text-white/70 uppercase tracking-widest">Website Type</label>
                <select 
                  id="type"
                  name="type"
                  className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white/80 focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none"
                >
                  <option value="Business Website">Business Website</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="SaaS / Web App">SaaS / Web App</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-xs font-bold text-white/70 uppercase tracking-widest">Budget (Optional)</label>
              <input 
                type="text" 
                id="budget"
                name="budget"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                placeholder="e.g. $1,000 - $3,000"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs font-bold text-white/70 uppercase tracking-widest">Project Details</label>
              <textarea 
                id="message"
                name="message"
                required
                rows={5}
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                placeholder="Tell me about your project, goals, and timeline..."
              />
            </div>

            {/* Checkbox for bot spam prevention */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            {submitStatus === "success" && (
              <div className="flex items-center gap-3 text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-3 rounded-lg">
                <CheckCircle2 size={18} />
                <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-lg">
                <AlertCircle size={18} />
                <span className="text-sm">{errorMessage}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full px-8 py-4 bg-cyan-400 text-[#020617] flex items-center justify-center gap-3 text-sm font-black tracking-[0.3em] uppercase hover:bg-cyan-300 transition-all rounded shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  SENDING...
                </>
              ) : (
                <>
                  START PROJECT <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Links underneath */}
        <div className="flex gap-6">
          <a href={`mailto:${personalInfo.email}`} className="text-zinc-400 hover:text-cyan-400 transition-colors bg-[#0f172a] p-4 rounded-full border border-white/5 hover:border-cyan-500/50">
            <Mail size={24} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors bg-[#0f172a] p-4 rounded-full border border-white/5 hover:border-cyan-500/50">
            <Linkedin size={24} />
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-cyan-400 transition-colors bg-[#0f172a] p-4 rounded-full border border-white/5 hover:border-cyan-500/50">
            <Github size={24} />
          </a>
        </div>

      </motion.div>
    </section>
  );
}
