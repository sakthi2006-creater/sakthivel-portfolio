"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type NavItem = {
  id: string;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { id: "hero", label: "Command", href: "#top" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

function useScrollHideShow() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;

      if (y < 60) {
        setHidden(false);
        return;
      }

      // Hide when scrolling down, show when scrolling up.
      if (dy > 10) setHidden(true);
      if (dy < -10) setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

function useActiveSection() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const ids = ["top", "about", "skills", "projects", "experience", "contact"];

    const obs = new IntersectionObserver(
      (entries) => {
        // Choose the most visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      { root: null, threshold: [0.15, 0.25, 0.35, 0.5], rootMargin: "-20% 0px -65% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return active;
}

function useMagnetic() {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const strength = 0.18;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = (x / rect.width - 0.5) * 2;
      const ny = (y / rect.height - 0.5) * 2;

      const tx = nx * rect.width * strength;
      const ty = ny * rect.height * strength;

      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
    };

    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0) scale(1)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}

export default function Navbar() {
  const reducedMotion = useReducedMotion();
  const hidden = useScrollHideShow();
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeHref = useMemo(() => {
    const found = navItems.find((i) => i.href === `#${active}` || i.id === active);
    return found?.href ?? "#top";
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const desktop = (
    <div className="hidden items-center gap-2 lg:flex">
      {navItems.map((item) => {
        const isActive = activeHref === item.href || active === item.id || active === item.href.replace("#", "");
        const magnetRef = useMagnetic();

        return (
          <Link
            key={item.id}
            href={item.href}
            ref={magnetRef}
            aria-current={isActive ? "page" : undefined}
            className={
              "relative rounded-xl px-3 py-2 font-mono text-xs transition-colors " +
              (isActive ? "text-neon-cyan/95" : "text-white/65 hover:text-white/85")
            }
          >
            <span className="relative z-10">{item.label}</span>
            <span
              aria-hidden
              className={
                "absolute inset-x-3 -bottom-1 h-[2px] origin-left bg-gradient-to-r from-neon-cyan/0 via-neon-cyan/60 to-neon-purple/0 transition-transform " +
                (isActive ? "scale-x-100" : "scale-x-0")
              }
              style={{ transformOrigin: "left" }}
            />
            {isActive && !reducedMotion ? (
              <motion.span
                aria-hidden
                layoutId="navGlow"
                className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_50%,rgba(39,247,255,0.20),transparent_60%)]"
              />
            ) : null}
          </Link>
        );
      })}

      <Link
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 rounded-xl border border-white/10 bg-black/25 px-4 py-2 font-mono text-xs text-white/70 transition-colors hover:border-neon-cyan/30 hover:text-white/90"
      >
        Resume
      </Link>
    </div>
  );

  const mobile = (
    <div className="flex items-center gap-3 lg:hidden">
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-white/80 backdrop-blur transition hover:border-neon-cyan/30 hover:text-white"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
      >
        <span className="font-mono text-xs">{mobileOpen ? "×" : "≡"}</span>
      </button>

      <Link
        href="#top"
        className="font-mono text-xs font-bold tracking-[0.18em] text-neon-cyan/90"
        aria-label="Go to top"
      >
        SAKTHIVEL R
      </Link>
    </div>
  );

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0.0 : 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-[100]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-3">
        <div className="relative rounded-2xl border border-white/10 bg-black/35 backdrop-blur">
          {/* blurred glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_10%_30%,rgba(39,247,255,0.22),transparent_55%),radial-gradient(circle_at_90%_20%,rgba(124,58,237,0.22),transparent_50%)] opacity-60" />

          <div className="relative flex items-center justify-between px-3">
            {desktop}
            {mobile}

            <AnimatePresence>
              {mobileOpen ? (
                <motion.nav
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-3 right-3 top-full mt-3 rounded-2xl border border-white/10 bg-black/55 p-3 backdrop-blur"
                >
                  <div className="grid gap-2">
                    {navItems.map((item) => {
                      const isActive = activeHref === item.href || active === item.id || active === item.href.replace("#", "");
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={
                            "rounded-xl px-3 py-3 font-mono text-sm transition " +
                            (isActive
                              ? "bg-neon-cyan/10 text-neon-cyan/95"
                              : "text-white/70 hover:bg-white/5 hover:text-white/90")
                          }
                        >
                          {item.label}
                        </Link>
                      );
                    })}

                    <Link
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-3 py-3 font-mono text-sm text-white/70 transition hover:bg-white/5 hover:text-white/90"
                    >
                      Download Resume
                    </Link>
                  </div>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

