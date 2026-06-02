import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface Incentive {
  title: string;
  icon: string;
  description: string;
}

const incentives: Incentive[] = [
  {
    title: "Technological Innovation",
    icon: "Lightbulb",
    description: "Transform your abstract concepts into functional prototypes. Challenge standard conventions by building solutions for local real-world issues.",
  },
  {
    title: "National Competition",
    icon: "Trophy",
    description: "Compete head-to-head with the top technical talents from universities nationwide. Prove your expertise and win substantial prize pools.",
  },
  {
    title: "Corporate Networking",
    icon: "Users2",
    description: "Pitch your ideas directly to developers, venture capitalists, and industry executives. Establish connections that open pathways to internships and career opportunities.",
  },
];

export function WhyParticipate() {
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className="h-7 w-7 text-[var(--gold)]" />;
  };

  return (
    <section className="relative w-full py-24 bg-parchment-texture text-[var(--navy)] overflow-hidden">
      {/* Visual top blend from dark Collaborations */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--navy)]/10 to-transparent"
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
            <p className="font-sanskrit text-xs tracking-wider text-[var(--bronze)]">
              किमर्थं सहभागिता
            </p>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            WHY <span className="italic text-[var(--gold)]">PARTICIPATE</span>?
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-[var(--bronze)]/70 uppercase mt-2 font-bold">
            Accelerate Your Technical Journey
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {incentives.map((incentive, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-[var(--gold)]/15 bg-white/35 backdrop-blur-md px-8 py-8 shadow-sm hover:border-[var(--gold)]/30 hover:bg-white/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-white/60 border border-[var(--gold)]/10">
                  {renderIcon(incentive.icon)}
                </div>
                <span className="text-xs font-mono text-[var(--gold)] opacity-55">0{idx + 1}</span>
              </div>
              <h3 className="font-display text-xl font-bold tracking-wide text-[var(--navy)]">
                {incentive.title}
              </h3>
              <p className="text-sm text-[var(--navy)]/80 mt-4 leading-relaxed font-medium">
                {incentive.description}
              </p>

              {/* Decorative corner accents */}
              <span
                aria-hidden
                className="absolute left-2.5 top-2.5 h-1.5 w-1.5 border-l border-t border-[var(--gold)]/30"
              />
              <span
                aria-hidden
                className="absolute right-2.5 top-2.5 h-1.5 w-1.5 border-r border-t border-[var(--gold)]/30"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
