import { motion } from "framer-motion";
import campusImage from "@/assets/campus-aerial.jpg";
import { siteConfig } from "@/data/site";

export function CampusReveal() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--navy)] min-h-screen flex items-center py-24">
      {/* Gradient blend from parchment hero -> dark cinematic */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-[var(--parchment)] via-[var(--parchment)]/30 to-transparent"
      />

      {/* Static Background Image with Parallax removed for low-end device performance */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src={campusImage}
          alt="Aerial view of the Technica campus at golden hour"
          loading="lazy"
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      {/* Dark cinematic gradient for text readability */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,18,32,0.85) 0%, rgba(11,18,32,0.55) 40%, rgba(11,18,32,0.65) 70%, rgba(11,18,32,0.9) 100%)",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Viewport Reveal Content Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12 w-full"
      >
        <div className="max-w-2xl text-center md:text-left w-full">
          {/* Tagline */}
          <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <p className="font-sanskrit text-[0.65rem] sm:text-xs text-[var(--gold-soft)] tracking-wider">
              विद्या अमृतमश्नुते ।
            </p>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-[var(--parchment)]">
            EXPERIENCE THE
            <br />
            <span className="italic text-[var(--gold-soft)]">SACRED AWAKENING</span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-[var(--parchment)]/80 mx-auto md:mx-0 font-medium">
            Join us for a two-day technical odyssey. Discover cutting-edge innovations, participate in national competitions, and expand your professional networks.
          </p>

          {/* Date and Venue Cards Grid (Polished Light Glassmorphism) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
            {/* Date Card */}
            <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4.5 flex flex-col text-left transition-colors hover:bg-white/10 shadow-lg shadow-black/25">
              <span className="text-[0.6rem] uppercase tracking-widest text-[var(--gold-soft)] font-bold mb-1.5">Event Date</span>
              <span className="text-sm font-bold text-[var(--parchment)] tracking-wide">{siteConfig.event.dates}</span>
              <span className="text-[10px] text-[var(--parchment)]/60 mt-1 font-semibold">{siteConfig.event.duration}</span>
            </div>
            {/* Venue Card */}
            <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4.5 flex flex-col text-left transition-colors hover:bg-white/10 shadow-lg shadow-black/25">
              <span className="text-[0.6rem] uppercase tracking-widest text-[var(--gold-soft)] font-bold mb-1.5">Venue</span>
              <span className="text-sm font-bold text-[var(--parchment)] tracking-wide">{siteConfig.event.venue}</span>
              <span className="text-[10px] text-[var(--parchment)]/60 mt-1 font-semibold">Main Campus Area</span>
            </div>
          </div>

          {/* Scroll Anchor Button */}
          <div className="mt-10">
            <motion.a
              href="#collaborations"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-full border border-[var(--gold)] bg-transparent px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--gold-soft)] transition-shadow duration-300 hover:shadow-[0_0_25px_-5px_var(--gold)] text-center"
            >
              Our Partners ↓
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--navy)] to-transparent z-20"
      />
    </section>
  );
}
