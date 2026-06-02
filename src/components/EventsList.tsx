import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { Link } from "@tanstack/react-router";
import { events } from "@/data/events";

export function EventsList() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Coding", "Robotics", "Gaming", "Workshops"];

  const filteredEvents = activeCategory === "All"
    ? events
    : events.filter((e) => e.category === activeCategory);

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Code2;
    return <IconComponent className="h-6 w-6 text-[var(--gold)]" />;
  };

  return (
    <section id="events" className="relative w-full py-24 bg-[var(--navy)] text-[var(--parchment)] overflow-hidden">
      {/* Visual background details */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] rounded-full opacity-[0.01] -translate-y-1/2"
        style={{
          background:
            "repeating-radial-gradient(circle, var(--gold) 0 1px, transparent 1px 20px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <p className="font-sanskrit text-xs tracking-wider text-[var(--gold-soft)]">
              प्रतियोगिताः
            </p>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            FEATURED <span className="italic text-[var(--gold-soft)]">EVENTS</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-[var(--parchment)]/60 uppercase mt-2 font-bold">
            Build, Compete, and Showcase
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--navy)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-[var(--parchment)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: "easeOut" as const }}
                className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--gold)]/40 hover:bg-white/[0.05] transition-all duration-300 shadow-lg shadow-black/25"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      {renderIcon(event.image)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-soft)] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-wide">{event.name}</h3>
                  <p className="text-xs text-[var(--parchment)]/70 mt-3 leading-relaxed font-medium">
                    {event.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to="/register"
                    className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--gold-soft)] hover:text-[var(--parchment)] transition-colors flex items-center gap-1.5"
                  >
                    Register Now <Icons.ArrowRight size={12} />
                  </Link>
                  <span className="text-[10px] font-semibold text-[var(--parchment)]/30 uppercase tracking-widest">
                    Technica 6.0
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
