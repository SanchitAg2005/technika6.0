import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { collaborators } from "@/data/sponsors";

export function Collaborations() {
  // Group sponsors by tier
  const tiers = {
    Title: collaborators.filter((c) => c.tier === "Title"),
    Gold: collaborators.filter((c) => c.tier === "Gold"),
    Silver: collaborators.filter((c) => c.tier === "Silver"),
    Partner: collaborators.filter((c) => c.tier === "Partner"),
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Shield;
    return <IconComponent className="h-7 w-7 text-[var(--gold)]" />;
  };

  return (
    <section id="collaborations" className="relative w-full py-24 bg-[var(--navy)] text-[var(--parchment)] overflow-hidden">
      {/* Background mandala accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-20 h-[400px] w-[400px] rounded-full opacity-[0.02]"
        style={{
          background:
            "repeating-radial-gradient(circle, var(--gold) 0 1px, transparent 1px 16px)",
        }}
      />

      {/* Single scroll reveal observer for the entire collaborations section */}
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
              सहयोगे सिद्धिः
            </p>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            COLLABORATIONS & <span className="italic text-[var(--gold-soft)]">SPONSORS</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-[var(--parchment)]/60 uppercase mt-2 font-bold">
            Corporate Partners
          </p>
        </div>

        {/* Title Sponsor Section */}
        {tiers.Title.length > 0 && (
          <div className="mb-16 flex flex-col items-center">
            <h3 className="text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--gold-soft)] mb-6">
              Title Sponsor
            </h3>
            <div className="flex justify-center w-full">
              {tiers.Title.map((sponsor, idx) => (
                <motion.a
                  key={idx}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center hover:border-[var(--gold)]/30 hover:bg-white/[0.05] transition-all duration-300 shadow-xl shadow-black/30"
                >
                  <div className="flex justify-center mb-5">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      {renderIcon(sponsor.logo)}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold tracking-wide">{sponsor.name}</h4>
                  <p className="text-xs text-[var(--parchment)]/70 mt-3 leading-relaxed font-medium">
                    {sponsor.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Gold & Silver Tiers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Gold Sponsors */}
          {tiers.Gold.map((sponsor, idx) => (
            <motion.a
              key={idx}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] hover:border-[var(--gold)]/20 transition-all duration-300 shadow-lg shadow-black/25"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  {renderIcon(sponsor.logo)}
                </div>
              </div>
              <span className="text-[0.55rem] uppercase tracking-widest text-[var(--gold-soft)] font-bold mb-1.5 block">
                Gold Partner
              </span>
              <h4 className="text-sm font-bold tracking-wide">{sponsor.name}</h4>
              <p className="text-xs text-[var(--parchment)]/60 mt-2 leading-relaxed">
                {sponsor.description}
              </p>
            </motion.a>
          ))}

          {/* Silver Sponsors */}
          {tiers.Silver.map((sponsor, idx) => (
            <motion.a
              key={idx}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/25"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  {renderIcon(sponsor.logo)}
                </div>
              </div>
              <span className="text-[0.55rem] uppercase tracking-widest text-slate-400 font-bold mb-1.5 block">
                Silver Partner
              </span>
              <h4 className="text-sm font-bold tracking-wide">{sponsor.name}</h4>
              <p className="text-xs text-[var(--parchment)]/60 mt-2 leading-relaxed">
                {sponsor.description}
              </p>
            </motion.a>
          ))}

          {/* General Partners */}
          {tiers.Partner.map((sponsor, idx) => (
            <motion.a
              key={idx}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 shadow-lg shadow-black/25"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  {renderIcon(sponsor.logo)}
                </div>
              </div>
              <span className="text-[0.55rem] uppercase tracking-widest text-emerald-400 font-bold mb-1.5 block">
                Eco Partner
              </span>
              <h4 className="text-sm font-bold tracking-wide">{sponsor.name}</h4>
              <p className="text-xs text-[var(--parchment)]/60 mt-2 leading-relaxed">
                {sponsor.description}
              </p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
