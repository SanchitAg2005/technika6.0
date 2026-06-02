import { motion } from "framer-motion";
import { organisers, OrganiserMember } from "@/data/organisers";

export function Organisers() {
  const sections = [
    { title: "Convenors", list: organisers.convenors },
    { title: "Faculty Coordinators", list: organisers.faculty },
    { title: "Core Team", list: organisers.core },
    { title: "Technical Coordinators", list: organisers.technical },
  ];

  const renderProfileImage = (member: OrganiserMember) => {
    const isInitials = member.image.length <= 3;

    if (isInitials) {
      return (
        <div className="h-16 w-16 rounded-full border border-[var(--gold)]/40 bg-[var(--navy)] flex items-center justify-center text-[var(--gold-soft)] font-display text-lg font-bold tracking-wider shadow-inner">
          {member.image}
        </div>
      );
    }

    return (
      <img
        src={member.image}
        alt={member.name}
        className="h-16 w-16 rounded-full object-cover border border-[var(--gold)]/30"
      />
    );
  };

  return (
    <section id="organisers" className="relative w-full py-24 bg-parchment-texture text-[var(--navy)] overflow-hidden">
      {/* Top visual divider overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--navy)]/5 to-transparent"
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
              आयोजकाः
            </p>
            <span className="h-px w-8 bg-[var(--gold)]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl leading-tight">
            MEET OUR <span className="italic text-[var(--gold)]">ORGANISERS</span>
          </h2>
          <p className="text-xs sm:text-sm tracking-wide text-[var(--bronze)]/70 uppercase mt-2 font-bold">
            The Team Behind Technika 6.0
          </p>
        </div>

        {/* Committee Categories */}
        <div className="flex flex-col gap-16">
          {sections.map((section, sIdx) => {
            if (section.list.length === 0) return null;
            return (
              <div key={sIdx}>
                {/* Section Title */}
                <h3 className="text-center text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--bronze)] border-b border-[var(--gold)]/20 pb-3 mb-8 max-w-xs mx-auto">
                  {section.title}
                </h3>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                  {section.list.map((member, mIdx) => (
                    <motion.div
                      key={mIdx}
                      whileHover={{ y: -3 }}
                      className="backdrop-blur-md bg-white/35 border border-[var(--gold)]/15 hover:border-[var(--gold)]/30 hover:bg-white/50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm transition-all duration-300"
                    >
                      <div className="mb-4">
                        {renderProfileImage(member)}
                      </div>
                      <h4 className="text-sm font-bold tracking-wide text-[var(--navy)]">
                        {member.name}
                      </h4>
                      <p className="text-[10px] font-semibold text-[var(--bronze)] mt-1.5 uppercase tracking-wider leading-relaxed">
                        {member.designation}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
