import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";

const BROCHURE_PDF_URL = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // Configurable URL

export const Route = createFileRoute("/brochure")({
  component: BrochurePage,
  head: () => ({
    meta: [
      { title: "Event Brochure | Technica 6.0" },
      { name: "description", content: "Download or view the official event brochure for Technica 6.0." },
    ],
  }),
});

function BrochurePage() {
  return (
    <div className="min-h-screen bg-parchment-texture text-[var(--navy)] flex flex-col justify-between p-6 md:p-12">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between border-b border-[var(--gold)]/20 pb-6 mb-8">
        <Link to="/" className="flex flex-col text-left transition-opacity hover:opacity-90">
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] font-bold text-[var(--navy)] leading-tight uppercase">
            TECHNICA 6.0
          </span>
          <span className="font-sanskrit text-[0.65rem] sm:text-[0.7rem] tracking-[0.05em] text-[var(--bronze)] font-semibold mt-0.5">
            OFFICIAL BROCHURE (AVINYĀ)
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-bold uppercase tracking-wider text-[var(--navy)]/80 hover:text-[var(--gold)] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft size={14} /> Back Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          {/* Header Copy */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-5xl leading-tight">
              EVENT <span className="italic text-[var(--gold)]">BROCHURE</span>
            </h1>
            <p className="text-xs sm:text-sm tracking-wide text-[var(--bronze)]/70 uppercase mt-2">
              Schedules, Guidelines, and Registration Details
            </p>
          </div>

          {/* Interactive Frame */}
          <div className="w-full backdrop-blur-md bg-white/40 border border-[var(--gold)]/10 rounded-2xl p-6 shadow-md flex flex-col items-center">
            {/* Desktop Iframe / Mobile Download Prompt */}
            <div className="w-full h-[60vh] hidden md:block rounded-lg overflow-hidden border border-[var(--gold)]/10 bg-white/20">
              <iframe
                src={`${BROCHURE_PDF_URL}#toolbar=0&navpanes=0`}
                className="w-full h-full"
                title="Technica Avinya 6.0 Brochure"
              />
            </div>

            {/* Mobile View Card */}
            <div className="md:hidden w-full py-12 flex flex-col items-center text-center">
              <div className="p-5 rounded-2xl bg-white/60 border border-[var(--gold)]/20 text-[var(--gold)] mb-6 shadow-inner animate-pulse">
                <FileText size={48} />
              </div>
              <h3 className="text-base font-bold text-[var(--navy)]">Read the Details On the Go</h3>
              <p className="text-xs text-[var(--navy)]/70 max-w-xs mt-2 leading-relaxed">
                Mobile viewports do not render PDF files inline natively. Please download the brochure to view the complete event rulebooks and agendas.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 w-full">
              <a
                href={BROCHURE_PDF_URL}
                download="Technica_Avinya_6_Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#050A14] text-[#F6F1E7] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-md hover:bg-[#0A1222] transition-colors focus:outline-none w-full sm:w-auto"
              >
                <Download size={16} /> Download PDF
              </a>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--gold)]/30 bg-[#F6F1E7]/40 backdrop-blur-md text-[var(--navy)] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-sm hover:border-[var(--gold)]/95 hover:bg-[var(--gold)]/10 transition-colors w-full sm:w-auto text-center"
              >
                Register For Events →
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto pt-8 border-t border-[var(--gold)]/10 mt-8 text-center text-[9px] uppercase tracking-[0.25em] text-[var(--navy)]/40 font-semibold">
        © 2026 Technica 6.0 · Department of Computer Science & Engineering
      </footer>
    </div>
  );
}
