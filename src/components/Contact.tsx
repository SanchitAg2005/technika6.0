import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { timelineConfig } from "@/data/timeline";
import { Link } from "@tanstack/react-router";

export function Contact() {
  const { contact, event } = siteConfig;

  const renderSocialIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Share2;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <footer id="contact" className="relative w-full bg-[var(--navy)] text-[var(--parchment)] pt-20 pb-8 overflow-hidden">
      {/* Background mandala watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -bottom-20 h-[300px] w-[300px] rounded-full opacity-[0.02]"
        style={{
          background:
            "repeating-radial-gradient(circle, var(--gold) 0 1px, transparent 1px 16px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/10 pb-16">
          {/* Column 1: Festival Info */}
          <div className="flex flex-col text-left">
            <span className="font-display text-[0.6rem] tracking-[0.25em] font-semibold text-[var(--gold-soft)] block mb-1">
              {siteConfig.collegeBanner.name}
            </span>
            <span className="font-display text-xl tracking-[0.1em] font-bold text-[var(--parchment)] uppercase">
              {event.title}
            </span>
            <span className="font-avinya text-xs tracking-widest text-[var(--gold-soft)] block mt-1">
              {event.theme}
            </span>
            <p className="text-xs text-[var(--parchment)]/60 leading-relaxed mt-4 max-w-xs font-medium">
              Experience a celebration of creativity, technology, and engineering. Challenge your peers, learn from professionals, and innovate for the future.
            </p>
          </div>

          {/* Column 2: Direct Contact Channels */}
          <div className="flex flex-col text-left">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--gold-soft)] mb-6">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4 text-xs font-semibold">
              <li className="flex items-center gap-3">
                <Icons.Mail className="h-4 w-4 text-[var(--gold-soft)] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[var(--gold-soft)] transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icons.Phone className="h-4 w-4 text-[var(--gold-soft)] shrink-0 mt-0.5" />
                <span className="leading-tight text-[var(--parchment)]/90">
                  {contact.phone}
                </span>
              </li>
              <li className="flex items-start gap-3 text-[var(--parchment)]/75 leading-relaxed font-normal">
                <Icons.MapPin className="h-4 w-4 text-[var(--gold-soft)] shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Stay Connected */}
          <div className="flex flex-col text-left">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[var(--gold-soft)] mb-6">
              Stay Connected
            </h4>
            {/* Social Grid */}
            <div className="flex items-center gap-3 mb-6">
              {contact.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name}`}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-[var(--gold)]/30 hover:text-[var(--gold-soft)] transition-all duration-300"
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-4 items-center text-[10px] font-bold uppercase tracking-wider text-[var(--parchment)]/50">
              <Link to="/brochure" className="hover:text-[var(--gold-soft)] transition-colors">Brochure</Link>
              <span className="opacity-30">·</span>
              <Link to="/register" className="hover:text-[var(--gold-soft)] transition-colors">Register</Link>
              <span className="opacity-30">·</span>
              {timelineConfig.enabled && (
                <>
                  <a href="#timeline" className="hover:text-[var(--gold-soft)] transition-colors">Timeline</a>
                  <span className="opacity-30">·</span>
                </>
              )}
              <Link to="/query-desk" className="hover:text-[var(--gold-soft)] transition-colors">Query Desk</Link>
            </div>
          </div>
        </div>

        {/* Footer Credit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[9px] uppercase tracking-[0.3em] text-[var(--parchment)]/40 font-semibold text-center sm:text-left gap-4">
          <p>© 2026 Technica 6.0. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Designed for Excellence</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] opacity-60" />
            <span>ITS Technical Association</span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
