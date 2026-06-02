import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronRight } from "lucide-react";
import { HimalayanSunrise } from "./HimalayanSunrise";
import { siteConfig } from "@/data/site";
import { timelineConfig } from "@/data/timeline";

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const menuVariants = {
    closed: { x: "100%", transition: { type: "tween" as const, duration: 0.35, ease: "easeInOut" as const } },
    open: { x: 0, transition: { type: "tween" as const, duration: 0.4, ease: "easeOut" as const } },
  };

  const overlayVariants = {
    closed: { opacity: 0, transition: { duration: 0.25 } },
    open: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-between" style={{ background: "#F4EEE0" }}>
      {/* faint mandala watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -bottom-40 h-[600px] w-[600px] rounded-full opacity-[0.05]"
        style={{
          background:
            "repeating-radial-gradient(circle, var(--bronze) 0 1px, transparent 1px 24px)",
        }}
      />

      {/* 1. Header (Banner Left, Nav Right) */}
      <header className="relative z-50 w-full flex items-center justify-between px-6 py-6 md:px-12 lg:px-20">
        {/* TOP LEFT: College Banner */}
        <Link to="/" className="flex flex-col text-left max-w-[280px] sm:max-w-md transition-opacity hover:opacity-90">
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] font-bold text-[var(--navy)] leading-tight uppercase">
            {siteConfig.collegeBanner.name}
          </span>
          <span className="font-sanskrit text-[0.65rem] sm:text-[0.7rem] tracking-[0.05em] text-[var(--bronze)] font-semibold mt-0.5">
            {siteConfig.collegeBanner.department}
          </span>
        </Link>

        {/* TOP RIGHT: Nav Bar (Desktop Only) */}
        <nav className="hidden md:flex items-center gap-8 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-[var(--navy)]/80">
          <Link to="/brochure" className="hover:text-[var(--gold)] transition-colors">Brochure</Link>
          <a href="#collaborations" className="hover:text-[var(--gold)] transition-colors">Collaborations</a>
          {timelineConfig.enabled && (
            <a href="#timeline" className="hover:text-[var(--gold)] transition-colors">Timeline</a>
          )}
          <Link to="/query-desk" className="hover:text-[var(--gold)] transition-colors">Query Desk</Link>
        </nav>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          className="block md:hidden p-2 text-[var(--navy)] hover:text-[var(--gold)] transition-colors relative z-50 focus:outline-none"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Slide-out Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={toggleMobileMenu}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            />

            {/* Menu container */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 z-40 w-[280px] bg-[#fbf9f4]/95 border-l border-[var(--gold)]/20 shadow-2xl p-8 pt-24 flex flex-col justify-between md:hidden"
            >
              <div className="flex flex-col gap-6">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[var(--bronze)] border-b border-[var(--gold)]/20 pb-3">
                  Navigation Menu
                </p>
                <nav className="flex flex-col gap-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--navy)]">
                  <Link
                    to="/brochure"
                    onClick={toggleMobileMenu}
                    className="hover:text-[var(--gold)] transition-colors flex items-center justify-between"
                  >
                    Brochure <ChevronRight size={16} className="text-[var(--gold)]" />
                  </Link>
                  <a
                    href="#collaborations"
                    onClick={toggleMobileMenu}
                    className="hover:text-[var(--gold)] transition-colors flex items-center justify-between"
                  >
                    Collaborations <ChevronRight size={16} className="text-[var(--gold)]" />
                  </a>
                  {timelineConfig.enabled && (
                    <a
                      href="#timeline"
                      onClick={toggleMobileMenu}
                      className="hover:text-[var(--gold)] transition-colors flex items-center justify-between"
                    >
                      Timeline <ChevronRight size={16} className="text-[var(--gold)]" />
                    </a>
                  )}
                  <Link
                    to="/query-desk"
                    onClick={toggleMobileMenu}
                    className="hover:text-[var(--gold)] transition-colors flex items-center justify-between"
                  >
                    Query Desk <ChevronRight size={16} className="text-[var(--gold)]" />
                  </Link>
                </nav>
              </div>

              {/* Bottom detail inside mobile drawer */}
              <div className="flex flex-col gap-2 border-t border-[var(--gold)]/10 pt-6">
                <Link
                  to="/register"
                  onClick={toggleMobileMenu}
                  className="w-full text-center rounded-full bg-[#050A14] py-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#F6F1E7]"
                >
                  Register Now
                </Link>
                <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--navy)]/40 text-center mt-2">
                  TECHNICA 6.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* full-bleed cinematic background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <HimalayanSunrise className="w-full h-full" />
      </div>

      {/* 2. CENTER: Technica Logo */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center items-center px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="flex flex-col items-center text-center max-w-3xl animate-fadeIn"
        >
          {/* Sanskrit Tagline */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-[var(--gold)] to-transparent opacity-80" />
            <p className="font-sanskrit text-[0.7rem] sm:text-[0.8rem] tracking-[0.12em] text-[var(--gold)] font-semibold drop-shadow-sm">
              अविन्या नवसृजनस्य शक्तिः
            </p>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-[var(--gold)] to-transparent opacity-80" />
          </div>

          {/* Centered Main Title: TECHNICA 6.0 */}
          <h1
            className="font-display text-[2.8rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] tracking-tight text-[#040810] font-bold uppercase"
            style={{ textShadow: "0 2px 25px rgba(246,241,231,1)" }}
          >
            TECHNICA 6.0
          </h1>

          {/* Subtitle / Tagline: AVINYA */}
          <h2
            className="font-avinya text-[2.2rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[5.5rem] leading-none tracking-widest mt-4 bg-gradient-to-r from-[#4A148C] via-[#7B1FA2] to-[#C2185B] bg-clip-text text-transparent font-medium"
            style={{ filter: "drop-shadow(0 2px 10px rgba(123,31,162,0.2))" }}
          >
            AVINYĀ
          </h2>

          {/* Theme / Motto */}
          <p className="mt-8 text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[var(--navy)]/65 drop-shadow-sm">
            {siteConfig.event.motto}
          </p>

          {/* Short description */}
          <p className="mt-6 max-w-[480px] text-[0.85rem] sm:text-[0.9rem] leading-[1.7] text-[#1A2538]/85 font-medium tracking-wide">
            Our annual tech fest bringing together bright minds to build, compete, and innovate with purpose and harmony.
          </p>
        </motion.div>
      </div>

      {/* 3. BOTTOM CENTER: Register Button */}
      <div className="relative z-10 w-full flex flex-col items-center pb-8 pt-4 px-6 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
          className="flex flex-col items-center gap-6"
        >
          {/* Main Action Register Button */}
          <Link
            to="/register"
            className="group relative rounded-full bg-[#050A14] px-10 py-4.5 text-[0.7rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.3em] text-[#F6F1E7] shadow-2xl transition-all duration-700 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.6)] hover:bg-[#0A1222] text-center"
          >
            Register Now
            <span className="ml-3 transition-transform duration-500 group-hover:translate-x-1.5 inline-block opacity-80">
              →
            </span>
          </Link>

          {/* Fine Print / Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-[var(--navy)]/50 font-bold">
            <span>Scroll Down ↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
