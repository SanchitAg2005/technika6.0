import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineConfig } from "@/data/timeline";

export function Timeline() {
  const [activeDay, setActiveDay] = useState<"dayOne" | "dayTwo">("dayOne");

  // If the timeline is disabled in data, do not render the section
  if (!timelineConfig.enabled) return null;

  const currentSchedule = timelineConfig[activeDay];

  return (
    <section id="timeline" className="relative w-full py-24 bg-parchment-texture text-[var(--navy)] overflow-hidden">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, var(--gold) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <p className="font-sanskrit text-xs tracking-wider text-[var(--bronze)]">
              समयसारिणी
            </p>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            EVENT <span className="italic text-[var(--gold)]">TIMELINE</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-[var(--bronze)]/70 uppercase mt-2 font-bold">
            Schedule of Activities
          </p>
        </div>

        {/* Day Selectors */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveDay("dayOne")}
            className={`relative px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border cursor-pointer ${
              activeDay === "dayOne"
                ? "bg-[#050A14] text-[#F6F1E7] border-[#050A14] shadow-md"
                : "bg-white/40 border-[var(--gold)]/20 hover:bg-white/60 text-[var(--navy)]"
            }`}
          >
            Day One
          </button>
          <button
            onClick={() => setActiveDay("dayTwo")}
            className={`relative px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border cursor-pointer ${
              activeDay === "dayTwo"
                ? "bg-[#050A14] text-[#F6F1E7] border-[#050A14] shadow-md"
                : "bg-white/40 border-[var(--gold)]/20 hover:bg-white/60 text-[var(--navy)]"
            }`}
          >
            Day Two
          </button>
        </div>

        {/* Timeline Schedule Cards */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {currentSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-md bg-white/35 border border-[var(--gold)]/15 hover:border-[var(--gold)]/30 hover:bg-white/50 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Time Label */}
                    <div className="min-w-[150px] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-bold tracking-wider text-[var(--bronze)] font-mono">
                        {item.time}
                      </span>
                    </div>

                    {/* Event Detail */}
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[var(--navy)] tracking-wide">
                        {item.event}
                      </h4>
                    </div>
                  </div>

                  {/* Venue Detail */}
                  <div className="sm:text-right shrink-0 mt-1 sm:mt-0 pl-5 sm:pl-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--navy)]/40 block mb-0.5">
                      Venue
                    </span>
                    <span className="text-xs font-bold text-[var(--gold)]">
                      {item.venue}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
